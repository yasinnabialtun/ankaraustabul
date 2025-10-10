import React from 'react';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';
import { logger } from '../utils';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
  // Log the error
  React.useEffect(() => {
    logger.error('Application error boundary triggered', {
      errorMessage: error.message,
      errorStack: error.stack,
      url: typeof window !== 'undefined' ? window.location.href : 'unknown',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
    }, error);
  }, [error]);

  const handleRefresh = () => {
    logger.info('User clicked refresh button in error boundary');
    window.location.reload();
  };

  const handleGoHome = () => {
    logger.info('User clicked go home button in error boundary');
    window.location.href = '/';
  };

  const handleReset = () => {
    logger.info('User clicked try again button in error boundary');
    resetErrorBoundary();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-2xl w-full">
        <Card className="p-8 text-center">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-red-50 text-red-500 mx-auto mb-6">
            <AlertTriangle className="w-10 h-10" />
          </div>

          <h1 className="text-3xl font-bold mb-4 text-gray-900">
            Bir Hata Oluştu
          </h1>

          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Üzgünüz, beklenmeyen bir hata oluştu. Lütfen tekrar deneyin veya ana sayfaya dönün.
          </p>

          <Alert variant="destructive" className="mb-6 text-left">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Hata Detayları</AlertTitle>
            <AlertDescription className="font-mono text-sm">
              {error.message}
            </AlertDescription>
          </Alert>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleReset}
              className="px-6 py-3 text-base font-semibold hover:-translate-y-0.5 transition-all duration-300"
            >
              <RefreshCcw className="mr-2" size={18} />
              Tekrar Dene
            </Button>

            <Button
              variant="secondary"
              onClick={handleRefresh}
              className="px-6 py-3 text-base font-semibold hover:-translate-y-0.5 transition-all duration-300"
            >
              <RefreshCcw className="mr-2" size={18} />
              Sayfayı Yenile
            </Button>

            <Button
              variant="outline"
              onClick={handleGoHome}
              className="px-6 py-3 text-base font-semibold border-2 hover:-translate-y-0.5 transition-all duration-300"
            >
              <Home className="mr-2" size={18} />
              Ana Sayfaya Dön
            </Button>
          </div>

          <div className="mt-6">
            <p className="text-sm text-gray-600">
              Sorun devam ederse lütfen{' '}
              <a
                href="/iletisim"
                className="text-primary font-semibold hover:underline"
              >
                bizimle iletişime geçin
              </a>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ErrorFallback;
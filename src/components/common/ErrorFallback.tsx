import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ErrorFallbackProps {
  error: Error;
  resetError: () => void;
}

function ErrorFallback({ error, resetError }: ErrorFallbackProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Bir Hata Oluştu
          </h1>
          <p className="text-gray-600 mb-4">
            Üzgünüz, beklenmeyen bir hata meydana geldi.
          </p>
          
          {/* Error Details - Only in development */}
          {process.env.NODE_ENV === 'development' && (
            <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-6 text-left">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">
                Hata Detayları:
              </h3>
              <p className="text-xs text-gray-600 font-mono break-all">
                {error.message}
              </p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <button
            onClick={resetError}
            className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Tekrar Dene</span>
          </button>
          
          <Link
            to="/"
            className="w-full flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
          >
            <Home className="w-5 h-5" />
            <span>Ana Sayfaya Dön</span>
          </Link>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>Sorun devam ederse:</p>
          <a 
            href="mailto:info@ankaraustabul.com" 
            className="text-blue-600 hover:text-blue-700 underline"
          >
            info@ankaraustabul.com
          </a>
        </div>
      </div>
    </div>
  );
}

export default ErrorFallback;

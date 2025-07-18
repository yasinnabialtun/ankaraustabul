import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl font-bold text-gray-300 mb-4">404</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Sayfa Bulunamadı</h1>
        <p className="text-gray-600 mb-8">
          Aradığınız sayfa mevcut değil veya taşınmış olabilir.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
          >
            <Home className="w-5 h-5 mr-2" />
            Ana Sayfa
          </Link>
          <button
            onClick={() => window.history.back()}
            className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors inline-flex items-center"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Geri Dön
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFound; 
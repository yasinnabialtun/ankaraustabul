import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ustalar } from '../data';
import ShopierPayment from '../components/ShopierPayment';
import PaymentSuccess from '../components/PaymentSuccess';
import { ArrowLeft, User, Phone, MapPin, Star, Clock, AlertCircle } from 'lucide-react';

function Payment() {
  const { ustaId } = useParams<{ ustaId: string }>();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [error, setError] = useState('');

  const usta = ustalar.find(u => u.id === ustaId);

  if (!usta) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Usta Bulunamadı</h1>
          <p className="text-gray-600 mb-8">Aradığınız usta mevcut değil.</p>
          <button
            onClick={() => navigate('/ustalar')}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Ustalar Listesine Dön
          </button>
        </div>
      </div>
    );
  }

  const handlePaymentSuccess = (transactionId: string) => {
    setTransactionId(transactionId);
    setIsSuccess(true);
  };

  const handlePaymentError = (error: string) => {
    setError(error);
  };

  if (isSuccess) {
    return (
      <PaymentSuccess
        transactionId={transactionId}
        amount={usta.hourlyRate}
        description={`${usta.name} - ${usta.category} hizmeti`}
        customerName="Müşteri"
        customerEmail="musteri@email.com"
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-blue-100 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Geri Dön
            </button>
            <h1 className="text-2xl font-bold">Güvenli Ödeme</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </section>

      {/* Payment Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Usta Information */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Hizmet Detayları</h2>
                
                <div className="space-y-6">
                  {/* Usta Card */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                        {usta.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">{usta.name}</h3>
                        <p className="text-gray-600">{usta.category}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-gray-600">{usta.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-2" />
                        <span className="text-gray-600">{usta.rating}/5</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-gray-600">{usta.experience} yıl</span>
                      </div>
                      <div className="flex items-center">
                        <User className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-gray-600">{usta.reviews} değerlendirme</span>
                      </div>
                    </div>
                  </div>

                  {/* Service Details */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-800">Hizmet Bilgileri</h4>
                    
                    <div className="bg-blue-50 rounded-xl p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Hizmet Türü</span>
                        <span className="font-semibold text-gray-800">{usta.category}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Saatlik Ücret</span>
                        <span className="font-semibold text-gray-800">{usta.hourlyRate} ₺</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Tahmini Süre</span>
                        <span className="font-semibold text-gray-800">2-4 saat</span>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-xl p-4">
                      <h5 className="font-semibold text-green-800 mb-2">Hizmet Kapsamı</h5>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Profesyonel hizmet</li>
                        <li>• Garantili işçilik</li>
                        <li>• Malzeme dahil</li>
                        <li>• 7/24 destek</li>
                      </ul>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-800 mb-3">İletişim Bilgileri</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-gray-600">{usta.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-gray-600">{usta.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Form */}
              <div>
                <ShopierPayment
                  amount={usta.hourlyRate}
                  description={`${usta.name} - ${usta.category} hizmeti`}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                />

                {/* Error Display */}
                {error && (
                  <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4">
                    <div className="flex items-center">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                      <span className="text-red-700">{error}</span>
                    </div>
                  </div>
                )}

                {/* Security Notice */}
                <div className="mt-6 bg-yellow-50 rounded-xl p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">Güvenlik Bilgisi</h4>
                  <p className="text-sm text-yellow-700">
                    Ödeme işleminiz SSL şifreleme ile korunmaktadır. 
                    Kart bilgileriniz hiçbir şekilde saklanmamaktadır.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Payment; 
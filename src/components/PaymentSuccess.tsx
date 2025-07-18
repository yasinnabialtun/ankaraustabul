import { CheckCircle, Download, Mail, Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PaymentSuccessProps {
  transactionId: string;
  amount: number;
  description: string;
  customerName?: string;
  customerEmail?: string;
}

function PaymentSuccess({ 
  transactionId, 
  amount, 
  description, 
  customerName = 'Müşteri',
  customerEmail = 'musteri@email.com'
}: PaymentSuccessProps) {
  const handleDownloadReceipt = () => {
    // Simulate receipt download
    const receiptContent = `
      ÖDEME MAKBUZU
      ===============
      
      İşlem No: ${transactionId}
      Tarih: ${new Date().toLocaleDateString('tr-TR')}
      Saat: ${new Date().toLocaleTimeString('tr-TR')}
      
      Müşteri: ${customerName}
      E-posta: ${customerEmail}
      
      Açıklama: ${description}
      Tutar: ${amount.toLocaleString('tr-TR')} ₺
      
      Durum: BAŞARILI
      
      Bu makbuz elektronik ortamda oluşturulmuştur.
    `;
    
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `makbuz-${transactionId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleSendEmail = () => {
    const subject = encodeURIComponent('Ödeme Makbuzu');
    const body = encodeURIComponent(`
      Merhaba ${customerName},
      
      Ödeme işleminiz başarıyla tamamlanmıştır.
      
      İşlem Detayları:
      - İşlem No: ${transactionId}
      - Tutar: ${amount.toLocaleString('tr-TR')} ₺
      - Açıklama: ${description}
      - Tarih: ${new Date().toLocaleDateString('tr-TR')}
      
      Teşekkürler.
    `);
    
    window.open(`mailto:${customerEmail}?subject=${subject}&body=${body}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-16">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          {/* Success Icon */}
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Ödeme Başarılı!</h1>
            <p className="text-gray-600">
              İşleminiz başarıyla tamamlandı. Makbuzunuz aşağıda yer almaktadır.
            </p>
          </div>

          {/* Transaction Details */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div>
                <span className="text-sm text-gray-500">İşlem Numarası</span>
                <p className="font-semibold text-gray-800">{transactionId}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Tarih</span>
                <p className="font-semibold text-gray-800">
                  {new Date().toLocaleDateString('tr-TR')}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Tutar</span>
                <p className="font-semibold text-gray-800 text-xl">
                  {amount.toLocaleString('tr-TR')} ₺
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Durum</span>
                <p className="font-semibold text-green-600">Başarılı</p>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <span className="text-sm text-gray-500">Açıklama</span>
              <p className="font-semibold text-gray-800">{description}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <button
              onClick={handleDownloadReceipt}
              className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Makbuz İndir</span>
            </button>
            
            <button
              onClick={handleSendEmail}
              className="flex items-center justify-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>E-posta Gönder</span>
            </button>
            
            <button className="flex items-center justify-center space-x-2 bg-gray-600 text-white px-6 py-3 rounded-xl hover:bg-gray-700 transition-colors">
              <Phone className="w-4 h-4" />
              <span>Destek Ara</span>
            </button>
          </div>

          {/* Security Notice */}
          <div className="bg-green-50 rounded-xl p-4 mb-8">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-green-800 mb-1">Güvenli İşlem</h4>
                <p className="text-sm text-green-700">
                  Ödeme işleminiz SSL şifreleme ile güvenli bir şekilde gerçekleştirilmiştir. 
                  İşlem detayları e-posta adresinize gönderilmiştir.
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              <span>Ana Sayfaya Dön</span>
            </Link>
            
            <Link
              to="/ustalar"
              className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
            >
              <span>Usta Bul</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Herhangi bir sorunuz varsa <strong>0850 123 45 67</strong> numaralı telefondan bize ulaşabilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess; 
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, TrendingUp, DollarSign, Star, Clock, MapPin, Phone, Mail, Package, Calendar, LogOut, Shield } from 'lucide-react';

interface UstaRegistration {
  id: string;
  name: string;
  email: string;
  phone: string;
  category: string;
  experience: string;
  location: string;
  hourlyRate: string;
  specialties: string[];
  serviceAreas: string[];
  packageType: string;
  transactionId: string;
  registrationDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

function AdminDashboard() {
  const [ustalar, setUstalar] = useState<UstaRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    thisMonth: 0,
    thisWeek: 0
  });
  const navigate = useNavigate();

  // Security check
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuth') === 'true';
    if (!isAuthenticated) {
      navigate('/admin-login');
      return;
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin-login');
  };

  useEffect(() => {
    // Simulate loading usta data
    setTimeout(() => {
      const mockData: UstaRegistration[] = [
        {
          id: '1',
          name: 'Ahmet Yılmaz',
          email: 'ahmet@example.com',
          phone: '+905551234567',
          category: 'Elektrik',
          experience: '5',
          location: 'Çankaya',
          hourlyRate: '150',
          specialties: ['Elektrik Tesisatı', 'Aydınlatma'],
          serviceAreas: ['Çankaya', 'Keçiören'],
          packageType: 'Premium Paket',
          transactionId: 'TXN_123456',
          registrationDate: '2024-01-15T10:30:00Z',
          status: 'pending'
        },
        {
          id: '2',
          name: 'Mehmet Demir',
          email: 'mehmet@example.com',
          phone: '+905551234568',
          category: 'Su Tesisatı',
          experience: '8',
          location: 'Keçiören',
          hourlyRate: '200',
          specialties: ['Su Tesisatı', 'Kanal Açma'],
          serviceAreas: ['Keçiören', 'Mamak'],
          packageType: 'VIP Paket',
          transactionId: 'TXN_123457',
          registrationDate: '2024-01-14T14:20:00Z',
          status: 'approved'
        }
      ];

      setUstalar(mockData);
      setStats({
        total: mockData.length,
        pending: mockData.filter(u => u.status === 'pending').length,
        approved: mockData.filter(u => u.status === 'approved').length,
        rejected: mockData.filter(u => u.status === 'rejected').length,
        thisMonth: mockData.length,
        thisWeek: mockData.length
      });
      setLoading(false);
    }, 1000);
  }, []);

  const handleStatusChange = (ustaId: string, newStatus: 'approved' | 'rejected') => {
    setUstalar(prev => prev.map(usta => 
      usta.id === ustaId ? { ...usta, status: newStatus } : usta
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('tr-TR');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header with Logout */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">👨‍💼 Admin Dashboard</h1>
            <p className="text-gray-600">Usta kayıtlarını yönetin ve istatistikleri görüntüleyin</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Çıkış Yap
          </button>
        </div>

        {/* Security Banner */}
        <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl p-4 mb-8">
          <div className="flex items-center">
            <Shield className="w-6 h-6 text-red-500 mr-3" />
            <div>
              <h3 className="font-semibold text-red-800">🔒 Güvenli Admin Paneli</h3>
              <p className="text-sm text-red-700">Bu panel sadece yetkili yöneticiler içindir</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Toplam Usta</p>
                <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Bekleyen</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Onaylanan</p>
                <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Bu Ay</p>
                <p className="text-3xl font-bold text-purple-600">{stats.thisMonth}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Usta List */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800">📋 Usta Kayıtları</h2>
            <p className="text-gray-600 mt-1">Son kayıt olan ustaları görüntüleyin ve yönetin</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Usta</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Kategori</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Paket</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Durum</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Kayıt Tarihi</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {ustalar.map((usta) => (
                  <tr key={usta.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {usta.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <p className="font-semibold text-gray-800">{usta.name}</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <Mail className="w-4 h-4 mr-1" />
                            {usta.email}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Phone className="w-4 h-4 mr-1" />
                            {usta.phone}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-800">{usta.category}</p>
                        <p className="text-sm text-gray-500">{usta.experience} yıl deneyim</p>
                        <p className="text-sm text-gray-500">{usta.hourlyRate} ₺/saat</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Package className="w-4 h-4 mr-2 text-blue-600" />
                        <span className="text-sm font-medium text-gray-800">{usta.packageType}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        usta.status === 'approved' 
                          ? 'bg-green-100 text-green-800' 
                          : usta.status === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {usta.status === 'approved' ? 'Onaylandı' : 
                         usta.status === 'rejected' ? 'Reddedildi' : 'Bekliyor'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-2" />
                        {formatDate(usta.registrationDate)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        {usta.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleStatusChange(usta.id, 'approved')}
                              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors"
                            >
                              Onayla
                            </button>
                            <button
                              onClick={() => handleStatusChange(usta.id, 'rejected')}
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors"
                            >
                              Reddet
                            </button>
                          </>
                        )}
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors">
                          Detay
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard; 
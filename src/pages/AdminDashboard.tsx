import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, CheckCircle, Clock, DollarSign, LogOut } from 'lucide-react';

function AdminDashboard() {
  const [stats] = useState({
    totalUstalar: 156,
    approvedUstalar: 142,
    pendingUstalar: 14,
    totalRevenue: 45000
  });
  const [recentUstalar] = useState([
    {
      id: '1',
      name: 'Ahmet Yılmaz',
      category: 'Elektrik',
      status: 'approved',
      date: '2025-01-15'
    },
    {
      id: '2',
      name: 'Mehmet Demir',
      category: 'Su Tesisatı',
      status: 'pending',
      date: '2025-01-14'
    },
    {
      id: '3',
      name: 'Ali Kaya',
      category: 'Temizlik',
      status: 'approved',
      date: '2025-01-13'
    }
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is logged in
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin-login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin-login');
  };

  const getStatusColor = (status: string) => {
    return status === 'approved' ? 'text-green-600' : 'text-yellow-600';
  };

  const getStatusIcon = (status: string) => {
    return status === 'approved' ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <LogOut className="w-5 h-5" />
              <span>Çıkış Yap</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Toplam Usta</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUstalar}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Onaylı Usta</p>
                <p className="text-2xl font-bold text-gray-900">{stats.approvedUstalar}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Bekleyen Usta</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingUstalar}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Toplam Gelir</p>
                <p className="text-2xl font-bold text-gray-900">₺{stats.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Ustalar */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Son Kayıt Olan Ustalar</h2>
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              Tümünü Gör
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Usta</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Kategori</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Durum</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Tarih</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {recentUstalar.map((usta) => (
                  <tr key={usta.id} className="border-b border-gray-100">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-gray-600 font-semibold text-sm">
                            {usta.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="font-medium text-gray-900">{usta.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{usta.category}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(usta.status)}
                        <span className={`font-medium ${getStatusColor(usta.status)}`}>
                          {usta.status === 'approved' ? 'Onaylandı' : 'Beklemede'}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{usta.date}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        {usta.status === 'pending' && (
                          <>
                            <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                              Onayla
                            </button>
                            <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                              Reddet
                            </button>
                          </>
                        )}
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
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

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Hızlı İşlemler</h3>
            <div className="space-y-3">
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                Yeni Usta Onayla
              </button>
              <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                Rapor Oluştur
              </button>
              <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                Ayarları Düzenle
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sistem Durumu</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Sunucu</span>
                <span className="text-green-600 font-medium">Aktif</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Veritabanı</span>
                <span className="text-green-600 font-medium">Aktif</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Ödeme Sistemi</span>
                <span className="text-green-600 font-medium">Aktif</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Son Aktiviteler</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-gray-600">Yeni usta kaydı: Ahmet Yılmaz</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span className="text-gray-600">Usta onaylandı: Mehmet Demir</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                <span className="text-gray-600">Sistem güncellemesi tamamlandı</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard; 
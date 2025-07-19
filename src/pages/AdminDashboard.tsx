import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, TrendingUp, DollarSign, Star, Clock, MapPin, Phone, Mail, Package, Calendar, LogOut, Shield, CheckCircle, XCircle } from 'lucide-react';
import { ustaService, UstaData } from '../services/ustaService';

function AdminDashboard() {
  const [ustalar, setUstalar] = useState<UstaData[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    thisMonth: 0,
    thisWeek: 0,
    totalRevenue: 0
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

  // Load real data from Firestore
  useEffect(() => {
    const loadData = async () => {
      try {
        const allUstalar = await ustaService.getAllUstalar();
        const statistics = await ustaService.getStatistics();
        
        setUstalar(allUstalar);
        setStats(statistics);
        setLoading(false);
        
        console.log('📊 Dashboard verileri yüklendi:', {
          ustalar: allUstalar.length,
          statistics
        });
      } catch (error) {
        console.error('❌ Dashboard verileri yüklenemedi:', error);
        setLoading(false);
      }
    };

    loadData();
    
    // Refresh data every 30 seconds
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleStatusChange = async (ustaId: string, newStatus: 'approved' | 'rejected') => {
    const updatedUsta = await ustaService.updateUstaStatus(ustaId, newStatus);
    if (updatedUsta) {
      setUstalar(prev => prev.map(usta => 
        usta.id === ustaId ? updatedUsta : usta
      ));
      
      // Update statistics
      const newStats = await ustaService.getStatistics();
      setStats(newStats);
      
      console.log(`✅ Usta durumu güncellendi: ${ustaId} -> ${newStatus}`);
    }
  };

  const handleDeleteUsta = async (ustaId: string) => {
    if (window.confirm('Bu ustayı silmek istediğinizden emin misiniz?')) {
      const success = await ustaService.deleteUsta(ustaId);
      if (success) {
        setUstalar(prev => prev.filter(usta => usta.id !== ustaId));
        
        // Update statistics
        const newStats = await ustaService.getStatistics();
        setStats(newStats);
        
        console.log(`✅ Usta silindi: ${ustaId}`);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('tr-TR');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      default: return 'text-yellow-600 bg-yellow-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
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
                <p className="text-gray-600 text-sm">Toplam Gelir</p>
                <p className="text-3xl font-bold text-purple-600">{formatCurrency(stats.totalRevenue)}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Usta List */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Usta Kayıtları</h2>
            <div className="text-sm text-gray-600">
              Toplam: {ustalar.length} usta
            </div>
          </div>

          {ustalar.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Henüz Usta Kaydı Yok</h3>
              <p className="text-gray-500">Yeni usta kayıtları burada görünecek</p>
            </div>
          ) : (
            <div className="space-y-4">
              {ustalar.map((usta) => (
                <div key={usta.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <h3 className="text-xl font-semibold text-gray-800">{usta.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(usta.status)}`}>
                          {getStatusIcon(usta.status)}
                          {usta.status === 'pending' ? 'Beklemede' : usta.status === 'approved' ? 'Onaylandı' : 'Reddedildi'}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{usta.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{usta.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{usta.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{usta.packageType}</span>
                        </div>
                      </div>
                      
                      <div className="mt-3 text-sm text-gray-500">
                        <span>Kategori: {usta.category}</span>
                        <span className="mx-2">•</span>
                        <span>Deneyim: {usta.experience} yıl</span>
                        <span className="mx-2">•</span>
                        <span>Saatlik: {usta.hourlyRate} ₺</span>
                        <span className="mx-2">•</span>
                        <span>Kayıt: {formatDate(usta.registrationDate)}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 ml-4">
                      {usta.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(usta.id, 'approved')}
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm flex items-center gap-1 transition-colors"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Onayla
                          </button>
                          <button
                            onClick={() => handleStatusChange(usta.id, 'rejected')}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm flex items-center gap-1 transition-colors"
                          >
                            <XCircle className="w-4 h-4" />
                            Reddet
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleDeleteUsta(usta.id)}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-lg text-sm transition-colors"
                      >
                        Sil
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard; 
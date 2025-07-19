import React, { useState, useEffect } from 'react';
import { UstaData } from '../services/ustaService';
import { ustaService } from '../services/ustaService';
import { 
  Users, 
  CheckCircle, 
  XCircle, 
  Clock, 
  DollarSign, 
  Search, 
  Plus,
  Edit,
  Trash2,
  Star,
  Crown,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Package
} from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
}

function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [ustalar, setUstalar] = useState<UstaData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [showAddUsta, setShowAddUsta] = useState(false);
  const [newUsta, setNewUsta] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    experience: '',
    location: '',
    hourlyRate: '',
    specialties: [] as string[],
    serviceAreas: [] as string[],
    packageType: 'BASIC',
    status: 'approved' as 'pending' | 'approved' | 'rejected'
  });

  useEffect(() => {
    loadUstalar();
  }, []);

  const loadUstalar = async () => {
    try {
      setLoading(true);
      const data = await ustaService.getAllUstalar();
      setUstalar(data);
    } catch (error) {
      console.error('Ustalar yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (ustaId: string, status: 'approved' | 'rejected') => {
    try {
      const updatedUsta = await ustaService.updateUstaStatus(ustaId, status);
      if (updatedUsta) {
        setUstalar(prev => prev.map(u => u.id === ustaId ? updatedUsta : u));
      }
    } catch (error) {
      console.error('Durum güncellenemedi:', error);
    }
  };

  const handleDeleteUsta = async (ustaId: string) => {
    if (window.confirm('Bu ustayı silmek istediğinizden emin misiniz?')) {
      try {
        const success = await ustaService.deleteUsta(ustaId);
        if (success) {
          setUstalar(prev => prev.filter(u => u.id !== ustaId));
        }
      } catch (error) {
        console.error('Usta silinemedi:', error);
      }
    }
  };

  const handleAddUsta = async () => {
    try {
      const ustaData = {
        ...newUsta,
        transactionId: `MANUAL_${Date.now()}`,
        registrationDate: new Date().toISOString(),
        amount: newUsta.packageType === 'BASIC' ? 149 : newUsta.packageType === 'PREMIUM' ? 299 : 599
      };

      await ustaService.addUsta(ustaData);
      setShowAddUsta(false);
      setNewUsta({
        name: '',
        email: '',
        phone: '',
        category: '',
        experience: '',
        location: '',
        hourlyRate: '',
        specialties: [],
        serviceAreas: [],
        packageType: 'BASIC',
        status: 'approved'
      });
      loadUstalar();
    } catch (error) {
      console.error('Usta eklenemedi:', error);
    }
  };

  const filteredUstalar = ustalar.filter(usta => {
    const matchesSearch = usta.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         usta.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         usta.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || usta.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const statistics = {
    total: ustalar.length,
    pending: ustalar.filter(u => u.status === 'pending').length,
    approved: ustalar.filter(u => u.status === 'approved').length,
    rejected: ustalar.filter(u => u.status === 'rejected').length,
    totalRevenue: ustalar.reduce((sum, u) => sum + u.amount, 0)
  };

  const getPackageIcon = (packageType: string) => {
    switch (packageType) {
      case 'BASIC': return <Users className="w-4 h-4" />;
      case 'PREMIUM': return <Star className="w-4 h-4" />;
      case 'VIP': return <Crown className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Ankara Usta Bul Yönetim Paneli</p>
            </div>
            <button
              onClick={onLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Çıkış Yap
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Toplam Usta</p>
                <p className="text-2xl font-bold text-gray-900">{statistics.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Bekleyen</p>
                <p className="text-2xl font-bold text-gray-900">{statistics.pending}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Onaylanan</p>
                <p className="text-2xl font-bold text-gray-900">{statistics.approved}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Reddedilen</p>
                <p className="text-2xl font-bold text-gray-900">{statistics.rejected}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Toplam Gelir</p>
                <p className="text-2xl font-bold text-gray-900">{statistics.totalRevenue.toLocaleString()} TL</p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Usta ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tüm Durumlar</option>
                <option value="pending">Bekleyen</option>
                <option value="approved">Onaylanan</option>
                <option value="rejected">Reddedilen</option>
              </select>
            </div>
            <button
              onClick={() => setShowAddUsta(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Yeni Usta Ekle
            </button>
          </div>
        </div>

        {/* Add Usta Modal */}
        {showAddUsta && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6">Yeni Usta Ekle</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ad Soyad</label>
                  <input
                    type="text"
                    value={newUsta.name}
                    onChange={(e) => setNewUsta({...newUsta, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">E-posta</label>
                  <input
                    type="email"
                    value={newUsta.email}
                    onChange={(e) => setNewUsta({...newUsta, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                  <input
                    type="tel"
                    value={newUsta.phone}
                    onChange={(e) => setNewUsta({...newUsta, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                  <input
                    type="text"
                    value={newUsta.category}
                    onChange={(e) => setNewUsta({...newUsta, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Deneyim (Yıl)</label>
                  <input
                    type="number"
                    value={newUsta.experience}
                    onChange={(e) => setNewUsta({...newUsta, experience: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lokasyon</label>
                  <input
                    type="text"
                    value={newUsta.location}
                    onChange={(e) => setNewUsta({...newUsta, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Saatlik Ücret</label>
                  <input
                    type="number"
                    value={newUsta.hourlyRate}
                    onChange={(e) => setNewUsta({...newUsta, hourlyRate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Paket</label>
                  <select
                    value={newUsta.packageType}
                    onChange={(e) => setNewUsta({...newUsta, packageType: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="BASIC">Temel Usta Kayıt</option>
                    <option value="PREMIUM">Öne Çıkan Usta Kayıt</option>
                  </select>
                </div>
              </div>
              
              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleAddUsta}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Usta Ekle
                </button>
                <button
                  onClick={() => setShowAddUsta(false)}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  İptal
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Ustalar List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usta
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İletişim
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kategori
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Paket
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Durum
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tarih
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUstalar.map((usta) => (
                  <tr key={usta.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <User className="w-6 h-6 text-blue-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{usta.name}</div>
                          <div className="text-sm text-gray-500">{usta.location}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{usta.email}</div>
                      <div className="text-sm text-gray-500">{usta.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{usta.category}</div>
                      <div className="text-sm text-gray-500">{usta.experience} yıl deneyim</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getPackageIcon(usta.packageType)}
                        <span className="ml-2 text-sm text-gray-900">{usta.packageType}</span>
                      </div>
                      <div className="text-sm text-gray-500">{usta.amount} TL</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(usta.status)}`}>
                        {usta.status === 'approved' ? 'Onaylandı' : 
                         usta.status === 'pending' ? 'Bekliyor' : 'Reddedildi'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(usta.registrationDate).toLocaleDateString('tr-TR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {usta.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleStatusUpdate(usta.id!, 'approved')}
                              className="text-green-600 hover:text-green-900"
                            >
                              <CheckCircle className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(usta.id!, 'rejected')}
                              className="text-red-600 hover:text-red-900"
                            >
                              <XCircle className="w-5 h-5" />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleDeleteUsta(usta.id!)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-5 h-5" />
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
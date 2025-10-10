'use client'

import { useState, useEffect } from 'react'
import { Users, FileText, BarChart3, Package, MessageSquare, Settings, TrendingUp, Eye, CheckCircle, Clock, DollarSign, UserCheck, AlertCircle, Search, Filter, Download, Plus, Edit, Trash2, Star, Shield, Phone, Mail, MapPin, Calendar, Activity } from 'lucide-react'
import { AdminService, AdminStats, Usta, PaymentRecord } from '@/services/adminService'
import { DISTRICTS } from '@/data/constants'


export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats>({
    totalUstalar: 0,
    totalUsers: 0,
    totalViews: 0,
    pendingApprovals: 0,
    verifiedUstalar: 0,
    premiumUstalar: 0,
    activeUstalar: 0,
    totalRevenue: 0,
    monthlyRevenue: 0,
    monthlyGrowth: {
      ustalar: '0',
      users: '0',
      views: '0',
      revenue: '0'
    }
  })

  const [recentUstalar, setRecentUstalar] = useState<Usta[]>([])
  const [paymentRecords, setPaymentRecords] = useState<PaymentRecord[]>([])
  const [recentActivities, setRecentActivities] = useState<any[]>([])
  const [quickStats, setQuickStats] = useState<any>({})
  const [allUstalar, setAllUstalar] = useState<Usta[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [showUstaModal, setShowUstaModal] = useState(false)
  const [selectedUsta, setSelectedUsta] = useState<Usta | null>(null)
  const [districtStats, setDistrictStats] = useState<any[]>([])
  const [categoryStats, setCategoryStats] = useState<any[]>([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [statsData, ustalarData, paymentsData, activitiesData] = await Promise.all([
          AdminService.getStats(),
          AdminService.getAllUstalar(),
          AdminService.getPaymentRecords(),
          AdminService.getRecentActivities()
        ])
        
        setStats(statsData)
        setAllUstalar(ustalarData)
        setRecentUstalar(ustalarData.slice(0, 5))
        setPaymentRecords(paymentsData.slice(0, 5))
        setRecentActivities(activitiesData.slice(0, 5))
        
        // İlçe istatistikleri hesapla
        const districtCounts = ustalarData.reduce((acc, usta) => {
          acc[usta.district] = (acc[usta.district] || 0) + 1
          return acc
        }, {} as Record<string, number>)
        
        const districtStatsData = DISTRICTS.map(district => ({
          ...district,
          actualCount: districtCounts[district.name] || 0,
          percentage: ustalarData.length > 0 ? ((districtCounts[district.name] || 0) / ustalarData.length * 100).toFixed(1) : '0'
        })).sort((a, b) => b.actualCount - a.actualCount)
        
        setDistrictStats(districtStatsData)
        
        // Kategori istatistikleri hesapla
        const categoryCounts = ustalarData.reduce((acc, usta) => {
          acc[usta.category] = (acc[usta.category] || 0) + 1
          return acc
        }, {} as Record<string, number>)
        
        const categoryStatsData = Object.entries(categoryCounts).map(([category, count]) => ({
          category,
          count,
          percentage: ustalarData.length > 0 ? (count / ustalarData.length * 100).toFixed(1) : '0'
        })).sort((a, b) => b.count - a.count)
        
        setCategoryStats(categoryStatsData)
        
        // Quick stats hesapla
        const popularCategory = Object.keys(categoryCounts).length > 0 
          ? Object.keys(categoryCounts).reduce((a, b) => categoryCounts[a] > categoryCounts[b] ? a : b)
          : 'Veri yok'
        const popularDistrict = Object.keys(districtCounts).length > 0
          ? Object.keys(districtCounts).reduce((a, b) => districtCounts[a] > districtCounts[b] ? a : b)
          : 'Veri yok'
        
        setQuickStats({
          popularCategory,
          popularDistrict,
          averageResponseTime: 'Hesaplanıyor...',
          customerSatisfaction: 'Hesaplanıyor...',
          monthlyRevenue: statsData.monthlyRevenue,
          totalDistricts: districtStatsData.filter(d => d.actualCount > 0).length,
          totalCategories: categoryStatsData.length
        })
      } catch (error) {
        console.error('Admin verileri yüklenirken hata:', error)
        // Set empty stats instead of mock data
        setStats({
          totalUstalar: 0,
          totalUsers: 0,
          totalViews: 0,
          pendingApprovals: 0,
          verifiedUstalar: 0,
          premiumUstalar: 0,
          activeUstalar: 0,
          totalRevenue: 0,
          monthlyRevenue: 0,
          monthlyGrowth: {
            ustalar: '0',
            users: '0',
            views: '0',
            revenue: '0'
          }
        })
        setAllUstalar([])
        setRecentUstalar([])
        setPaymentRecords([])
        setRecentActivities([])
        setDistrictStats([])
        setCategoryStats([])
        setQuickStats({})
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Filtreleme fonksiyonları
  const filteredUstalar = allUstalar.filter(usta => {
    const matchesSearch = usta.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         usta.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         usta.district.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDistrict = !selectedDistrict || usta.district === selectedDistrict
    const matchesCategory = !selectedCategory || usta.category === selectedCategory
    const matchesStatus = !selectedStatus || 
      (selectedStatus === 'verified' && usta.isVerified) ||
      (selectedStatus === 'premium' && usta.isPremium) ||
      (selectedStatus === 'active' && usta.isActive) ||
      (selectedStatus === 'pending' && !usta.isVerified)
    
    return matchesSearch && matchesDistrict && matchesCategory && matchesStatus
  })

  // Usta işlemleri
  const handleApproveUsta = async (ustaId: string) => {
    try {
      await AdminService.approveUsta(ustaId)
      // Verileri yenile
      const updatedUstalar = allUstalar.map(usta => 
        usta.id === ustaId ? { ...usta, isVerified: true, isActive: true } : usta
      )
      setAllUstalar(updatedUstalar)
      setRecentUstalar(updatedUstalar.slice(0, 5))
      
      // Update stats
      const newStats = { ...stats }
      newStats.pendingApprovals = Math.max(0, newStats.pendingApprovals - 1)
      newStats.verifiedUstalar = newStats.verifiedUstalar + 1
      newStats.activeUstalar = newStats.activeUstalar + 1
      setStats(newStats)
      
      alert('Usta başarıyla onaylandı!')
    } catch (error) {
      console.error('Usta onaylanırken hata:', error)
      alert('Usta onaylanırken bir hata oluştu. Lütfen tekrar deneyin.')
    }
  }

  const handleRejectUsta = async (ustaId: string) => {
    if (confirm('Bu ustayı reddetmek istediğinizden emin misiniz?')) {
      try {
        await AdminService.rejectUsta(ustaId)
        // Verileri yenile
        const updatedUstalar = allUstalar.map(usta => 
          usta.id === ustaId ? { ...usta, isVerified: false, isActive: false } : usta
        )
        setAllUstalar(updatedUstalar)
        setRecentUstalar(updatedUstalar.slice(0, 5))
        
        // Update stats
        const newStats = { ...stats }
        newStats.pendingApprovals = Math.max(0, newStats.pendingApprovals - 1)
        setStats(newStats)
        
        alert('Usta reddedildi!')
      } catch (error) {
        console.error('Usta reddedilirken hata:', error)
        alert('Usta reddedilirken bir hata oluştu. Lütfen tekrar deneyin.')
      }
    }
  }

  const handleDeleteUsta = async (ustaId: string) => {
    if (confirm('Bu ustayı kalıcı olarak silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.')) {
      try {
        await AdminService.deleteUsta(ustaId)
        const updatedUstalar = allUstalar.filter(usta => usta.id !== ustaId)
        setAllUstalar(updatedUstalar)
        setRecentUstalar(updatedUstalar.slice(0, 5))
        
        // Update stats
        const newStats = { ...stats }
        newStats.totalUstalar = Math.max(0, newStats.totalUstalar - 1)
        newStats.verifiedUstalar = Math.max(0, newStats.verifiedUstalar - 1)
        newStats.activeUstalar = Math.max(0, newStats.activeUstalar - 1)
        newStats.pendingApprovals = Math.max(0, newStats.pendingApprovals - 1)
        setStats(newStats)
        
        alert('Usta başarıyla silindi!')
      } catch (error) {
        console.error('Usta silinirken hata:', error)
        alert('Usta silinirken bir hata oluştu. Lütfen tekrar deneyin.')
      }
    }
  }

  const handleViewUsta = (usta: Usta) => {
    setSelectedUsta(usta)
    setShowUstaModal(true)
  }

  const statCards = [
    {
      title: 'Toplam Ustalar',
      value: stats.totalUstalar,
      icon: Users,
      color: 'blue',
      growth: stats.monthlyGrowth.ustalar
    },
    {
      title: 'Kullanıcılar',
      value: stats.totalUsers,
      icon: UserCheck,
      color: 'green',
      growth: stats.monthlyGrowth.users
    },
    {
      title: 'Toplam Gelir',
      value: `₺${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'purple',
      growth: stats.monthlyGrowth.revenue
    },
    {
      title: 'Aylık Gelir',
      value: `₺${stats.monthlyRevenue.toLocaleString()}`,
      icon: TrendingUp,
      color: 'orange',
      growth: stats.monthlyGrowth.revenue
    }
  ]

  const statusCards = [
    {
      title: 'Onay Bekleyen',
      value: stats.pendingApprovals,
      icon: Clock,
      color: 'yellow'
    },
    {
      title: 'Doğrulanmış',
      value: stats.verifiedUstalar,
      icon: CheckCircle,
      color: 'green'
    },
    {
      title: 'Premium Ustalar',
      value: stats.premiumUstalar,
      icon: Package,
      color: 'purple'
    },
    {
      title: 'Aktif Ustalar',
      value: stats.activeUstalar,
      icon: TrendingUp,
      color: 'blue'
    }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Ankara Usta Bul yönetim paneli</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                Son güncelleme: {new Date().toLocaleDateString('tr-TR')}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((card, index) => {
            const Icon = card.icon
            return (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg bg-${card.color}-100`}>
                    <Icon className={`w-6 h-6 text-${card.color}-600`} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{card.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{card.value.toLocaleString()}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600 font-medium">{card.growth}</span>
                  <span className="text-sm text-gray-500 ml-1">bu ay</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statusCards.map((card, index) => {
            const Icon = card.icon
            return (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg bg-${card.color}-100`}>
                    <Icon className={`w-6 h-6 text-${card.color}-600`} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{card.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Usta ara (isim, kategori, ilçe)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Tüm İlçeler</option>
                {DISTRICTS.map(district => (
                  <option key={district.id} value={district.name}>{district.name}</option>
                ))}
              </select>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Tüm Kategoriler</option>
                <option value="Elektrik">Elektrik</option>
                <option value="Su Tesisatı">Su Tesisatı</option>
                <option value="Temizlik">Temizlik</option>
                <option value="Mobilya">Mobilya</option>
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Tüm Durumlar</option>
                <option value="verified">Doğrulanmış</option>
                <option value="premium">Premium</option>
                <option value="active">Aktif</option>
                <option value="pending">Onay Bekleyen</option>
              </select>
            </div>
          </div>
        </div>

        {/* Ustalar Tablosu */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">
              Ustalar ({filteredUstalar.length})
            </h3>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4 mr-2" />
              Yeni Usta
            </button>
          </div>
          {filteredUstalar.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Users className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {allUstalar.length === 0 ? 'Henüz usta kaydı bulunmuyor' : 'Arama kriterlerinize uygun usta bulunamadı'}
              </h3>
              <p className="text-gray-500">
                {allUstalar.length === 0 
                  ? 'İlk usta kaydı yapıldığında burada görünecek.'
                  : 'Farklı arama kriterleri deneyebilirsiniz.'
                }
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usta</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İlçe</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paket</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUstalar.map((usta) => (
                  <tr key={usta.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full" src={usta.image || `https://ui-avatars.com/api/?name=${usta.name}&background=random`} alt={usta.name} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{usta.name}</div>
                          <div className="text-sm text-gray-500">{usta.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{usta.category}</div>
                      <div className="text-sm text-gray-500">{usta.experience} yıl deneyim</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{usta.district}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {usta.isVerified && <Shield className="w-4 h-4 text-green-500" />}
                        {usta.isPremium && <Star className="w-4 h-4 text-yellow-500" />}
                        {usta.isActive ? (
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Aktif</span>
                        ) : (
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Pasif</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        usta.packageType === 'premium' ? 'bg-purple-100 text-purple-800' :
                        usta.packageType === 'pro' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {usta.packageType === 'premium' ? 'Premium' :
                         usta.packageType === 'pro' ? 'Pro' : 'Ücretsiz'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewUsta(usta)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {!usta.isVerified && (
                          <button
                            onClick={() => handleApproveUsta(usta.id)}
                            className="text-green-600 hover:text-green-900"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        {!usta.isVerified && (
                          <button
                            onClick={() => handleRejectUsta(usta.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <AlertCircle className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteUsta(usta.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* İstatistikler Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* İlçe İstatistikleri */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">İlçe Dağılımı</h3>
            </div>
            <div className="p-6">
              {districtStats.length === 0 ? (
                <div className="text-center py-8">
                  <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Henüz ilçe verisi bulunmuyor</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {districtStats.slice(0, 10).map((district, index) => (
                    <div key={district.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{district.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900">{district.actualCount}</span>
                        <span className="text-xs text-gray-500">({district.percentage}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Kategori İstatistikleri */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Kategori Dağılımı</h3>
            </div>
            <div className="p-6">
              {categoryStats.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Henüz kategori verisi bulunmuyor</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {categoryStats.map((category, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-900">{category.category}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900">{category.count}</span>
                        <span className="text-xs text-gray-500">({category.percentage}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Son Aktiviteler ve Hızlı İstatistikler */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activities */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Son Aktiviteler</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivities.length > 0 ? recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'success' ? 'bg-green-500' :
                      activity.type === 'warning' ? 'bg-yellow-500' : 
                      activity.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.user} • {activity.time}</p>
                    </div>
                  </div>
                )) : (
                  <div className="text-center text-gray-500 py-4">
                    <p>Henüz aktivite bulunmuyor</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Hızlı İstatistikler</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">En Popüler Kategori</span>
                  <span className="text-sm font-medium text-gray-900">{quickStats.popularCategory || 'Veri yok'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">En Aktif İlçe</span>
                  <span className="text-sm font-medium text-gray-900">{quickStats.popularDistrict || 'Veri yok'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Aktif İlçe Sayısı</span>
                  <span className="text-sm font-medium text-gray-900">{quickStats.totalDistricts || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Kategori Sayısı</span>
                  <span className="text-sm font-medium text-gray-900">{quickStats.totalCategories || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Ortalama Yanıt Süresi</span>
                  <span className="text-sm font-medium text-gray-900">{quickStats.averageResponseTime || 'Hesaplanıyor...'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Müşteri Memnuniyeti</span>
                  <span className="text-sm font-medium text-gray-900">{quickStats.customerSatisfaction || 'Hesaplanıyor...'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Usta Detay Modal */}
      {showUstaModal && selectedUsta && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Usta Detayları</h3>
              <button
                onClick={() => setShowUstaModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <span className="sr-only">Kapat</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Kişisel Bilgiler</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <UserCheck className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{selectedUsta.name}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{selectedUsta.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{selectedUsta.email}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{selectedUsta.district}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">İş Bilgileri</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600">Kategori:</span>
                      <span className="text-sm text-gray-900 ml-2">{selectedUsta.category}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600">Deneyim:</span>
                      <span className="text-sm text-gray-900 ml-2">{selectedUsta.experience} yıl</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600">Çalışma Saatleri:</span>
                      <span className="text-sm text-gray-900 ml-2">{selectedUsta.workingHours}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600">Değerlendirme:</span>
                      <span className="text-sm text-gray-900 ml-2">{selectedUsta.rating}/5 ({selectedUsta.reviews} değerlendirme)</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Açıklama</h4>
                <p className="text-sm text-gray-600">{selectedUsta.description}</p>
              </div>
              {selectedUsta.certifications && selectedUsta.certifications.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Sertifikalar</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {selectedUsta.certifications.map((cert, index) => (
                      <li key={index}>{cert}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, Eye, Edit, Trash2, CheckCircle, XCircle, Clock, Star, MapPin, Phone, Users } from 'lucide-react'

interface Usta {
  id: string
  name: string
  category: string
  location: string
  phone: string
  email: string
  status: 'pending' | 'approved' | 'rejected' | 'suspended'
  verified: boolean
  isPremium: boolean
  rating: number
  reviewCount: number
  registrationDate: string
  lastActive: string
}

export default function AdminUstalarPage() {
  const [ustalar, setUstalar] = useState<Usta[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedUstalar, setSelectedUstalar] = useState<string[]>([])

  useEffect(() => {
    // Load real data from Firebase
    const loadUstalar = async () => {
      try {
        // Import AdminService dynamically to avoid circular imports
        const { AdminService } = await import('@/services/adminService')
        const ustalarData = await AdminService.getAllUstalar()
        
        // Transform Firebase data to match component interface
        const transformedUstalar = ustalarData.map(usta => ({
          id: usta.id,
          name: usta.name,
          category: usta.category,
          location: usta.district,
          phone: usta.phone,
          email: usta.email,
          status: usta.isVerified ? 'approved' as const : 'pending' as const,
          verified: usta.isVerified,
          isPremium: usta.isPremium,
          rating: usta.rating,
          reviewCount: usta.reviews,
          registrationDate: usta.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
          lastActive: usta.updatedAt?.toDate?.()?.toISOString() || new Date().toISOString()
        }))
        
        setUstalar(transformedUstalar)
      } catch (error) {
        console.error('Ustalar yüklenirken hata:', error)
        // Set empty array instead of mock data
        setUstalar([])
      } finally {
        setLoading(false)
      }
    }

    loadUstalar()
  }, [])

  const filteredUstalar = ustalar.filter(usta => {
    const matchesSearch = usta.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         usta.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         usta.location.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || usta.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const handleStatusChange = (ustaId: string, newStatus: string) => {
    setUstalar(prev => prev.map(usta => 
      usta.id === ustaId ? { ...usta, status: newStatus as 'pending' | 'approved' | 'rejected' | 'suspended' } : usta
    ))
  }

  const handleBulkAction = (action: string) => {
    if (action === 'approve') {
      setUstalar(prev => prev.map(usta => 
        selectedUstalar.includes(usta.id) ? { ...usta, status: 'approved' as const } : usta
      ))
    } else if (action === 'reject') {
      setUstalar(prev => prev.map(usta => 
        selectedUstalar.includes(usta.id) ? { ...usta, status: 'rejected' as const } : usta
      ))
    }
    setSelectedUstalar([])
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      case 'suspended': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved': return 'Onaylandı'
      case 'pending': return 'Beklemede'
      case 'rejected': return 'Reddedildi'
      case 'suspended': return 'Askıya Alındı'
      default: return status
    }
  }

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
              <h1 className="text-2xl font-bold text-gray-900">Usta Yönetimi</h1>
              <p className="text-gray-600">Kayıtlı ustaları yönetin ve onaylayın</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                Toplam {ustalar.length} usta
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Usta ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tüm Durumlar</option>
                <option value="pending">Beklemede</option>
                <option value="approved">Onaylandı</option>
                <option value="rejected">Reddedildi</option>
                <option value="suspended">Askıya Alındı</option>
              </select>

              {selectedUstalar.length > 0 && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleBulkAction('approve')}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Toplu Onayla
                  </button>
                  <button
                    onClick={() => handleBulkAction('reject')}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Toplu Reddet
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Ustalar Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {filteredUstalar.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Users className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {ustalar.length === 0 ? 'Henüz usta kaydı bulunmuyor' : 'Arama kriterlerinize uygun usta bulunamadı'}
              </h3>
              <p className="text-gray-500">
                {ustalar.length === 0 
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
                    <th className="px-6 py-3 text-left">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedUstalar(filteredUstalar.map(u => u.id))
                          } else {
                            setSelectedUstalar([])
                          }
                        }}
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Usta
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kategori
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Konum
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Durum
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Değerlendirme
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kayıt Tarihi
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
                      <input
                        type="checkbox"
                        checked={selectedUstalar.includes(usta.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedUstalar(prev => [...prev, usta.id])
                          } else {
                            setSelectedUstalar(prev => prev.filter(id => id !== usta.id))
                          }
                        }}
                        className="rounded border-gray-300"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-bold text-sm">
                            {usta.name.charAt(0)}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{usta.name}</div>
                          <div className="text-sm text-gray-500">{usta.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{usta.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                        {usta.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(usta.status)}`}>
                        {getStatusText(usta.status)}
                      </span>
                      <div className="flex items-center mt-1">
                        {usta.verified && (
                          <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                        )}
                        {usta.isPremium && (
                          <span className="text-xs text-purple-600 font-medium">Premium</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="text-sm text-gray-900">{usta.rating}</span>
                        <span className="text-sm text-gray-500 ml-1">({usta.reviewCount})</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(usta.registrationDate).toLocaleDateString('tr-TR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <Edit className="w-4 h-4" />
                        </button>
                        {usta.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleStatusChange(usta.id, 'approved')}
                              className="text-green-600 hover:text-green-900"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleStatusChange(usta.id, 'rejected')}
                              className="text-red-600 hover:text-red-900"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

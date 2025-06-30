'use client'

import { useState, useEffect } from 'react'
import { 
  Users, 
  Building2, 
  TrendingUp, 
  MessageSquare, 
  Star, 
  Eye,
  Calendar,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Activity
} from 'lucide-react'
import { getProviders } from '@/data/providers'
import { getCategories } from '@/data/categories'

interface StatCard {
  title: string
  value: string
  change: string
  changeType: 'increase' | 'decrease'
  icon: React.ComponentType<any>
  color: string
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<StatCard[]>([])
  const [recentActivity, setRecentActivity] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      const providers = getProviders()
      const categories = getCategories()
      
      setStats([
        {
          title: 'Toplam Usta',
          value: providers.length.toString(),
          change: '+12%',
          changeType: 'increase',
          icon: Users,
          color: 'bg-blue-500'
        },
        {
          title: 'Aktif Firmalar',
          value: '45',
          change: '+8%',
          changeType: 'increase',
          icon: Building2,
          color: 'bg-green-500'
        },
        {
          title: 'Aylık Görüntülenme',
          value: '12.5K',
          change: '+23%',
          changeType: 'increase',
          icon: Eye,
          color: 'bg-purple-500'
        },
        {
          title: 'Ortalama Puan',
          value: '4.8',
          change: '+0.2',
          changeType: 'increase',
          icon: Star,
          color: 'bg-yellow-500'
        },
        {
          title: 'Yeni Mesajlar',
          value: '28',
          change: '-5%',
          changeType: 'decrease',
          icon: MessageSquare,
          color: 'bg-red-500'
        },
        {
          title: 'Aylık Gelir',
          value: '₺45.2K',
          change: '+15%',
          changeType: 'increase',
          icon: DollarSign,
          color: 'bg-emerald-500'
        }
      ])

      setRecentActivity([
        {
          id: 1,
          type: 'new_provider',
          title: 'Yeni usta kaydı',
          description: 'Ahmet Usta elektrik kategorisinde kayıt oldu',
          time: '2 saat önce',
          icon: Users
        },
        {
          id: 2,
          type: 'review',
          title: 'Yeni değerlendirme',
          description: 'Mehmet Usta için 5 yıldız değerlendirme',
          time: '4 saat önce',
          icon: Star
        },
        {
          id: 3,
          type: 'message',
          title: 'Yeni mesaj',
          description: 'Müşteriden yeni hizmet talebi',
          time: '6 saat önce',
          icon: MessageSquare
        },
        {
          id: 4,
          type: 'payment',
          title: 'Ödeme alındı',
          description: 'Premium paket ödemesi tamamlandı',
          time: '1 gün önce',
          icon: DollarSign
        }
      ])

      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Ankara Usta Bul platformunun genel durumu ve istatistikleri
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <div className="flex items-center mt-2">
                  {stat.changeType === 'increase' ? (
                    <ArrowUpRight className="w-4 h-4 text-green-500" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-sm font-medium ml-1 ${
                    stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">geçen aya göre</span>
                </div>
              </div>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Aylık Görüntülenme</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Grafik burada görünecek</p>
              <p className="text-sm text-gray-400">Chart.js veya Recharts entegrasyonu</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Son Aktiviteler</h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <activity.icon className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Hızlı İşlemler</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Users className="w-6 h-6 text-blue-600 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Usta Ekle</p>
              <p className="text-sm text-gray-600">Yeni usta kaydı</p>
            </div>
          </button>
          
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Building2 className="w-6 h-6 text-green-600 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Firma Ekle</p>
              <p className="text-sm text-gray-600">Yeni firma kaydı</p>
            </div>
          </button>
          
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <MessageSquare className="w-6 h-6 text-purple-600 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Mesajları Görüntüle</p>
              <p className="text-sm text-gray-600">Yeni mesajlar</p>
            </div>
          </button>
          
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Calendar className="w-6 h-6 text-orange-600 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Rapor Oluştur</p>
              <p className="text-sm text-gray-600">Aylık rapor</p>
            </div>
          </button>
        </div>
      </div>

      {/* Top Categories */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">En Popüler Kategoriler</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {getCategories().slice(0, 6).map((category) => (
            <div key={category.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-semibold">{category.icon}</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{category.name}</p>
                  <p className="text-sm text-gray-600">{category.providerCount} usta</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{category.rating}</p>
                <p className="text-xs text-gray-500">ortalama puan</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 
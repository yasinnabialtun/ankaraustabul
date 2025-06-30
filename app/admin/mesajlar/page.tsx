'use client'

import { useState, useEffect } from 'react'
import { 
  Search, 
  Filter, 
  Mail, 
  Phone, 
  Clock, 
  CheckCircle, 
  XCircle,
  Reply,
  Archive,
  Trash2,
  Star,
  User,
  Calendar
} from 'lucide-react'

interface Message {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  subject: string
  message: string
  category: string
  priority: 'low' | 'medium' | 'high'
  status: 'new' | 'read' | 'replied' | 'archived'
  createdAt: string
  repliedAt?: string
  providerId?: string
  providerName?: string
}

export default function MessagesManagement() {
  const [messages, setMessages] = useState<Message[]>([])
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('Tümü')
  const [selectedPriority, setSelectedPriority] = useState('Tümü')
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)

  const statuses = ['Tümü', 'Yeni', 'Okundu', 'Yanıtlandı', 'Arşivlendi']
  const priorities = ['Tümü', 'Düşük', 'Orta', 'Yüksek']

  useEffect(() => {
    // Simulate loading messages
    setTimeout(() => {
      const mockMessages: Message[] = [
        {
          id: '1',
          customerName: 'Ahmet Yılmaz',
          customerEmail: 'ahmet@email.com',
          customerPhone: '0532 123 45 67',
          subject: 'Elektrik arızası için usta arıyorum',
          message: 'Çankaya\'da evimizde elektrik arızası var. Acil bir usta arıyoruz. Mümkünse bugün gelebilir mi?',
          category: 'Elektrik',
          priority: 'high',
          status: 'new',
          createdAt: '2024-01-15T10:30:00Z'
        },
        {
          id: '2',
          customerName: 'Fatma Demir',
          customerEmail: 'fatma@email.com',
          customerPhone: '0533 987 65 43',
          subject: 'Su tesisatı onarımı',
          message: 'Mamak\'ta su kaçağı var. Hafta sonu uygun olan bir usta arıyoruz.',
          category: 'Su Tesisatı',
          priority: 'medium',
          status: 'read',
          createdAt: '2024-01-15T09:15:00Z'
        },
        {
          id: '3',
          customerName: 'Mehmet Kaya',
          customerEmail: 'mehmet@email.com',
          customerPhone: '0534 456 78 90',
          subject: 'Temizlik hizmeti talebi',
          message: 'Ofisimiz için düzenli temizlik hizmeti arıyoruz. Haftada 3 gün.',
          category: 'Temizlik',
          priority: 'low',
          status: 'replied',
          createdAt: '2024-01-14T16:45:00Z',
          repliedAt: '2024-01-15T08:30:00Z',
          providerId: 'provider-1',
          providerName: 'Temizlik Uzmanı'
        },
        {
          id: '4',
          customerName: 'Ayşe Özkan',
          customerEmail: 'ayse@email.com',
          customerPhone: '0535 111 22 33',
          subject: 'Nakliyat hizmeti',
          message: 'Etimesgut\'tan Çankaya\'ya ev taşıma hizmeti arıyoruz.',
          category: 'Nakliye',
          priority: 'medium',
          status: 'archived',
          createdAt: '2024-01-13T14:20:00Z'
        }
      ]
      setMessages(mockMessages)
      setFilteredMessages(mockMessages)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    let filtered = messages

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(msg =>
        msg.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.message.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Status filter
    if (selectedStatus !== 'Tümü') {
      const statusMap: { [key: string]: string } = {
        'Yeni': 'new',
        'Okundu': 'read',
        'Yanıtlandı': 'replied',
        'Arşivlendi': 'archived'
      }
      filtered = filtered.filter(msg => msg.status === statusMap[selectedStatus])
    }

    // Priority filter
    if (selectedPriority !== 'Tümü') {
      const priorityMap: { [key: string]: string } = {
        'Düşük': 'low',
        'Orta': 'medium',
        'Yüksek': 'high'
      }
      filtered = filtered.filter(msg => msg.priority === priorityMap[selectedPriority])
    }

    setFilteredMessages(filtered)
  }, [messages, searchTerm, selectedStatus, selectedPriority])

  const handleStatusChange = (id: string, newStatus: Message['status']) => {
    setMessages(messages.map(msg =>
      msg.id === id ? { ...msg, status: newStatus } : msg
    ))
  }

  const handleReply = (message: Message) => {
    setSelectedMessage(message)
    // In real app, this would open a reply modal
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800'
      case 'read': return 'bg-gray-100 text-gray-800'
      case 'replied': return 'bg-green-100 text-green-800'
      case 'archived': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Mesaj Yönetimi</h1>
        <p className="mt-2 text-gray-600">
          Müşteri mesajlarını yönetin ve yanıtlayın
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Mesaj ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>

          {/* Priority Filter */}
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {priorities.map((priority) => (
              <option key={priority} value={priority}>{priority}</option>
            ))}
          </select>

          {/* Clear Filters */}
          <button
            onClick={() => {
              setSearchTerm('')
              setSelectedStatus('Tümü')
              setSelectedPriority('Tümü')
            }}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Filtreleri Temizle
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Toplam Mesaj</p>
              <p className="text-2xl font-bold text-gray-900">{messages.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Yeni Mesajlar</p>
              <p className="text-2xl font-bold text-gray-900">
                {messages.filter(m => m.status === 'new').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <span className="text-red-600 font-semibold">!</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Yanıtlandı</p>
              <p className="text-2xl font-bold text-gray-900">
                {messages.filter(m => m.status === 'replied').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Arşivlenmiş</p>
              <p className="text-2xl font-bold text-gray-900">
                {messages.filter(m => m.status === 'archived').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Archive className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Müşteri
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Konu
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kategori
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Öncelik
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tarih
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMessages.map((message) => (
                <tr key={message.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{message.customerName}</div>
                        <div className="text-sm text-gray-500">{message.customerEmail}</div>
                        <div className="text-sm text-gray-500">{message.customerPhone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{message.subject}</div>
                    <div className="text-sm text-gray-500 line-clamp-2">{message.message}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {message.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(message.priority)}`}>
                      {message.priority === 'high' ? 'Yüksek' : message.priority === 'medium' ? 'Orta' : 'Düşük'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(message.status)}`}>
                      {message.status === 'new' ? 'Yeni' : 
                       message.status === 'read' ? 'Okundu' : 
                       message.status === 'replied' ? 'Yanıtlandı' : 'Arşivlendi'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(message.createdAt).toLocaleDateString('tr-TR')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleReply(message)}
                        className="text-blue-600 hover:text-blue-900 p-1"
                        title="Yanıtla"
                      >
                        <Reply className="w-4 h-4" />
                      </button>
                      {message.status !== 'archived' && (
                        <button
                          onClick={() => handleStatusChange(message.id, 'archived')}
                          className="text-purple-600 hover:text-purple-900 p-1"
                          title="Arşivle"
                        >
                          <Archive className="w-4 h-4" />
                        </button>
                      )}
                      {message.status === 'new' && (
                        <button
                          onClick={() => handleStatusChange(message.id, 'read')}
                          className="text-gray-600 hover:text-gray-900 p-1"
                          title="Okundu olarak işaretle"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleStatusChange(message.id, 'archived')}
                        className="text-red-600 hover:text-red-900 p-1"
                        title="Sil"
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
      </div>

      {/* Empty State */}
      {filteredMessages.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Mesaj bulunamadı</h3>
          <p className="text-gray-600">
            Arama kriterlerinize uygun mesaj bulunmuyor.
          </p>
        </div>
      )}
    </div>
  )
} 
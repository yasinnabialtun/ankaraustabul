import { useState, useEffect } from 'react';
import { Bell, X, CheckCircle, AlertCircle, Info, Users, Clock, MapPin, Phone, Star, DollarSign, MessageSquare, Heart, TrendingUp, UserPlus, Search, Wrench, Home, Car, Building } from 'lucide-react';

interface Notification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
  icon: React.ReactNode;
  timestamp: Date;
  read: boolean;
  user?: {
    name: string;
    location: string;
    service: string;
  };
}

const fakeNotifications: Omit<Notification, 'id' | 'timestamp' | 'read'>[] = [
  // Aktif Üyeler ve Hizmet Arayanlar
  {
    type: 'success',
    title: 'Yeni Aktif Üye',
    message: 'Şu anda 1,247 aktif üye var',
    icon: <UserPlus className="w-5 h-5" />,
    user: {
      name: 'Ahmet Yılmaz',
      location: 'Çankaya',
      service: 'Elektrik'
    }
  },
  {
    type: 'info',
    title: 'Hizmet Arayan Müşteri',
    message: '3 kişi Keçiören\'de su tesisatı arıyor',
    icon: <Search className="w-5 h-5" />,
    user: {
      name: 'Fatma Demir',
      location: 'Keçiören',
      service: 'Su Tesisatı'
    }
  },
  {
    type: 'success',
    title: 'Premium Üye Kaydı',
    message: 'Şu anda 89 VIP üye aktif',
    icon: <Star className="w-5 h-5" />,
    user: {
      name: 'Mehmet Kaya',
      location: 'Mamak',
      service: 'İnşaat & Tadilat'
    }
  },
  {
    type: 'info',
    title: 'Acil Hizmet Talebi',
    message: '5 kişi Çankaya\'da acil temizlik arıyor',
    icon: <AlertCircle className="w-5 h-5" />,
    user: {
      name: 'Ayşe Özkan',
      location: 'Çankaya',
      service: 'Temizlik'
    }
  },
  {
    type: 'success',
    title: 'Yeni Usta Onaylandı',
    message: 'Şu anda 2,156 onaylı usta var',
    icon: <CheckCircle className="w-5 h-5" />,
    user: {
      name: 'Ali Veli',
      location: 'Yenimahalle',
      service: 'Elektrik'
    }
  },
  {
    type: 'info',
    title: 'Hizmet Arayan',
    message: '7 kişi Etimesgut\'ta boya badana arıyor',
    icon: <Home className="w-5 h-5" />,
    user: {
      name: 'Zeynep Kaya',
      location: 'Etimesgut',
      service: 'Boya & Badana'
    }
  },
  {
    type: 'success',
    title: 'Aktif Üye Girişi',
    message: 'Şu anda 342 üye online',
    icon: <Users className="w-5 h-5" />,
    user: {
      name: 'Hasan Yıldız',
      location: 'Sincan',
      service: 'Mobilya'
    }
  },
  {
    type: 'info',
    title: 'Yeni Hizmet Talebi',
    message: '4 kişi Polatlı\'da klima servisi arıyor',
    icon: <Wrench className="w-5 h-5" />,
    user: {
      name: 'Emine Demir',
      location: 'Polatlı',
      service: 'Klima & Havalandırma'
    }
  },
  {
    type: 'success',
    title: 'VIP Üye Aktivitesi',
    message: 'Şu anda 156 VIP üye aktif',
    icon: <TrendingUp className="w-5 h-5" />,
    user: {
      name: 'Mustafa Öz',
      location: 'Gölbaşı',
      service: 'Bahçe & Peyzaj'
    }
  },
  {
    type: 'info',
    title: 'Acil Elektrik Arızası',
    message: '6 kişi Çankaya\'da acil elektrik arızası bildirdi',
    icon: <AlertCircle className="w-5 h-5" />,
    user: {
      name: 'Fatih Yılmaz',
      location: 'Çankaya',
      service: 'Elektrik'
    }
  },
  {
    type: 'success',
    title: 'Yeni Usta Kaydı',
    message: 'Şu anda 1,289 temizlik uzmanı var',
    icon: <UserPlus className="w-5 h-5" />,
    user: {
      name: 'Selin Demir',
      location: 'Kazan',
      service: 'Temizlik'
    }
  },
  {
    type: 'info',
    title: 'Hizmet Arayan Müşteri',
    message: '2 kişi Akyurt\'ta güvenlik sistemi arıyor',
    icon: <Building className="w-5 h-5" />,
    user: {
      name: 'Kemal Yıldız',
      location: 'Akyurt',
      service: 'Güvenlik Sistemleri'
    }
  },
  {
    type: 'success',
    title: 'Premium Üye Aktivitesi',
    message: 'Şu anda 234 premium üye aktif',
    icon: <Star className="w-5 h-5" />,
    user: {
      name: 'Elif Kaya',
      location: 'Haymana',
      service: 'Cam & Pencere'
    }
  },
  {
    type: 'info',
    title: 'Acil Su Arızası',
    message: '8 kişi Beypazarı\'nda acil su tesisatı arızası',
    icon: <AlertCircle className="w-5 h-5" />,
    user: {
      name: 'Beyza Özkan',
      location: 'Beypazarı',
      service: 'Su Tesisatı'
    }
  },
  {
    type: 'success',
    title: 'Yeni Aktif Üye',
    message: 'Şu anda 67 asansör servisi uzmanı var',
    icon: <UserPlus className="w-5 h-5" />,
    user: {
      name: 'Can Yılmaz',
      location: 'Nallıhan',
      service: 'Asansör & Yürüyen Merdiven'
    }
  },
  {
    type: 'info',
    title: 'Hizmet Arayan',
    message: '3 kişi Kızılcahamam\'da hali perde servisi arıyor',
    icon: <Home className="w-5 h-5" />,
    user: {
      name: 'Deniz Kaya',
      location: 'Kızılcahamam',
      service: 'Halı & Perde'
    }
  },
  {
    type: 'success',
    title: 'VIP Üye Başarısı',
    message: 'Şu anda 89 VIP üye aylık 50.000₺+ kazanıyor',
    icon: <DollarSign className="w-5 h-5" />,
    user: {
      name: 'Gizem Demir',
      location: 'Çamlıdere',
      service: 'İnşaat & Tadilat'
    }
  },
  {
    type: 'info',
    title: 'Acil Mobilya Servisi',
    message: '5 kişi Çankaya\'da acil mobilya montajı arıyor',
    icon: <AlertCircle className="w-5 h-5" />,
    user: {
      name: 'Burak Özkan',
      location: 'Çankaya',
      service: 'Mobilya'
    }
  },
  {
    type: 'success',
    title: 'Yeni Üye Aktivitesi',
    message: 'Şu anda 1,567 üye online',
    icon: <TrendingUp className="w-5 h-5" />,
    user: {
      name: 'Sude Yıldız',
      location: 'Keçiören',
      service: 'Temizlik'
    }
  },
  {
    type: 'info',
    title: 'Hizmet Arayan Müşteri',
    message: '4 kişi Mamak\'ta klima bakımı arıyor',
    icon: <Wrench className="w-5 h-5" />,
    user: {
      name: 'Arda Kaya',
      location: 'Mamak',
      service: 'Klima & Havalandırma'
    }
  },
  {
    type: 'success',
    title: 'Premium Üye Onayı',
    message: 'Şu anda 445 premium üye aktif',
    icon: <CheckCircle className="w-5 h-5" />,
    user: {
      name: 'Ece Demir',
      location: 'Yenimahalle',
      service: 'Bahçe & Peyzaj'
    }
  },
  {
    type: 'info',
    title: 'Yeni Hizmet Talebi',
    message: '6 kişi Sincan\'da elektrik tesisatı arıyor',
    icon: <Search className="w-5 h-5" />,
    user: {
      name: 'Mert Yılmaz',
      location: 'Sincan',
      service: 'Elektrik'
    }
  },
  {
    type: 'success',
    title: 'Aktif Üye Sayısı',
    message: 'Şu anda 2,847 aktif üye var',
    icon: <Users className="w-5 h-5" />,
    user: {
      name: 'Büşra Kaya',
      location: 'Gölbaşı',
      service: 'Temizlik'
    }
  },
  {
    type: 'info',
    title: 'Acil Hizmet Talebi',
    message: '9 kişi Yenimahalle\'de acil su tesisatı arıyor',
    icon: <AlertCircle className="w-5 h-5" />,
    user: {
      name: 'Emre Demir',
      location: 'Yenimahalle',
      service: 'Su Tesisatı'
    }
  },
  {
    type: 'success',
    title: 'VIP Üye Aktivitesi',
    message: 'Şu anda 123 VIP üye online',
    icon: <Star className="w-5 h-5" />,
    user: {
      name: 'Zehra Yıldız',
      location: 'Kazan',
      service: 'Cam & Pencere'
    }
  },
  {
    type: 'info',
    title: 'Hizmet Arayan',
    message: '7 kişi Akyurt\'ta boya badana arıyor',
    icon: <Home className="w-5 h-5" />,
    user: {
      name: 'Kaan Özkan',
      location: 'Akyurt',
      service: 'Boya & Badana'
    }
  },
  {
    type: 'success',
    title: 'Yeni Üye Kaydı',
    message: 'Şu anda 3,156 toplam üye var',
    icon: <UserPlus className="w-5 h-5" />,
    user: {
      name: 'Selin Kaya',
      location: 'Haymana',
      service: 'Mobilya'
    }
  },
  {
    type: 'info',
    title: 'Acil Klima Servisi',
    message: '5 kişi Beypazarı\'nda acil klima servisi arıyor',
    icon: <Wrench className="w-5 h-5" />,
    user: {
      name: 'Berk Demir',
      location: 'Beypazarı',
      service: 'Klima & Havalandırma'
    }
  },
  {
    type: 'success',
    title: 'Premium Üye Başarısı',
    message: 'Şu anda 178 premium üye aylık 30.000₺+ kazanıyor',
    icon: <DollarSign className="w-5 h-5" />,
    user: {
      name: 'Deniz Yılmaz',
      location: 'Nallıhan',
      service: 'İnşaat & Tadilat'
    }
  },
  {
    type: 'info',
    title: 'Hizmet Arayan Müşteri',
    message: '4 kişi Kızılcahamam\'da güvenlik sistemi arıyor',
    icon: <Building className="w-5 h-5" />,
    user: {
      name: 'Eylül Kaya',
      location: 'Kızılcahamam',
      service: 'Güvenlik Sistemleri'
    }
  },
  {
    type: 'success',
    title: 'Aktif Usta Sayısı',
    message: 'Şu anda 1,892 aktif usta var',
    icon: <Users className="w-5 h-5" />,
    user: {
      name: 'Can Demir',
      location: 'Çamlıdere',
      service: 'Bahçe & Peyzaj'
    }
  }
];

const getNotificationColor = (type: Notification['type']) => {
  switch (type) {
    case 'success':
      return 'bg-green-50 border-green-200 text-green-800';
    case 'info':
      return 'bg-blue-50 border-blue-200 text-blue-800';
    case 'warning':
      return 'bg-yellow-50 border-yellow-200 text-yellow-800';
    case 'error':
      return 'bg-red-50 border-red-200 text-red-800';
    default:
      return 'bg-gray-50 border-gray-200 text-gray-800';
  }
};

const getNotificationIconColor = (type: Notification['type']) => {
  switch (type) {
    case 'success':
      return 'text-green-600';
    case 'info':
      return 'text-blue-600';
    case 'warning':
      return 'text-yellow-600';
    case 'error':
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
};

function NotificationBar() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Fake notification generator
  useEffect(() => {
    const generateNotification = () => {
      const randomNotification = fakeNotifications[Math.floor(Math.random() * fakeNotifications.length)];
      const newNotification: Notification = {
        ...randomNotification,
        id: Date.now().toString(),
        timestamp: new Date(),
        read: false
      };

      setNotifications(prev => [newNotification, ...prev.slice(0, 9)]); // Keep max 10 notifications
      setUnreadCount(prev => prev + 1);
    };

    // Generate notifications at random intervals - very frequent for realistic feel
    const intervals = [1500, 2000, 2500, 3000, 4000, 5000]; // Very frequent intervals
    const interval = intervals[Math.floor(Math.random() * intervals.length)];
    
    const timer = setTimeout(generateNotification, interval);
    
    return () => clearTimeout(timer);
  }, [notifications.length]);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    setUnreadCount(0);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    const notification = notifications.find(n => n.id === id);
    if (notification && !notification.read) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Az önce';
    if (minutes < 60) return `${minutes} dakika önce`;
    if (hours < 24) return `${hours} saat önce`;
    if (days < 7) return `${days} gün önce`;
    return timestamp.toLocaleDateString('tr-TR');
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Notification Bell */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative bg-white rounded-2xl p-3 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <Bell className="w-6 h-6 text-gray-600" />
          {unreadCount > 0 && (
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-bounce">
              {unreadCount > 9 ? '9+' : unreadCount}
            </div>
          )}
        </button>
      </div>

      {/* Notification Panel */}
      {isOpen && (
        <div className="absolute top-16 right-0 w-96 bg-white rounded-3xl shadow-2xl border border-gray-200 max-h-96 overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-800 text-lg">Bildirimler</h3>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Tümünü okundu işaretle
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            {unreadCount > 0 && (
              <p className="text-sm text-gray-600 mt-1">
                {unreadCount} okunmamış bildirim
              </p>
            )}
          </div>

          {/* Notification List */}
          <div className="max-h-80 overflow-y-auto custom-scrollbar">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Henüz bildirim yok</p>
              </div>
            ) : (
              <div className="p-4 space-y-3">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`relative p-4 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg ${
                      notification.read 
                        ? 'bg-gray-50 border-gray-100 opacity-75' 
                        : getNotificationColor(notification.type)
                    } ${!notification.read ? 'animate-pulse-glow' : ''}`}
                  >
                    {/* Unread indicator */}
                    {!notification.read && (
                      <div className="absolute top-3 right-3 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    )}
                    
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${getNotificationColor(notification.type).replace('bg-', 'bg-').replace('border-', 'border-').replace('text-', 'text-')}`}>
                        <div className={getNotificationIconColor(notification.type)}>
                          {notification.icon}
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <h4 className={`font-semibold text-sm ${notification.read ? 'text-gray-600' : 'text-gray-800'}`}>
                              {notification.title}
                            </h4>
                            <p className={`text-sm mt-1 ${notification.read ? 'text-gray-500' : 'text-gray-700'}`}>
                              {notification.message}
                            </p>
                            
                            {/* User Info */}
                            {notification.user && (
                              <div className="mt-2 p-2 bg-white rounded-lg border border-gray-200">
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                    {notification.user.name.charAt(0)}
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-xs font-medium text-gray-800">{notification.user.name}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                      <div className="flex items-center gap-1">
                                        <MapPin className="w-3 h-3 text-gray-400" />
                                        <span className="text-xs text-gray-500">{notification.user.location}</span>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <Wrench className="w-3 h-3 text-gray-400" />
                                        <span className="text-xs text-gray-500">{notification.user.service}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            <p className="text-xs text-gray-400 mt-2">
                              {formatTime(notification.timestamp)}
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                              >
                                Okundu
                              </button>
                            )}
                            <button
                              onClick={() => removeNotification(notification.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>{notifications.length} bildirim</span>
                <button
                  onClick={() => setNotifications([])}
                  className="text-red-600 hover:text-red-700 font-medium"
                >
                  Tümünü temizle
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

export default NotificationBar; 
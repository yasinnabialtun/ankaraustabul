import React, { useState, useEffect } from 'react';
import { Users, Search, Clock, MapPin, Star } from 'lucide-react';

interface Notification {
  id: number;
  type: 'search' | 'registration' | 'review' | 'service';
  message: string;
  location: string;
  time: string;
  icon: React.ReactNode;
}

const NotificationBar: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  const fakeNotifications: Omit<Notification, 'id'>[] = [
    {
      type: 'search',
      message: 'Elektrikçi arıyor',
      location: 'Çankaya',
      time: '2 dk önce',
      icon: <Search size={16} className="text-blue-500" />
    },
    {
      type: 'registration',
      message: 'Yeni usta kaydoldu',
      location: 'Keçiören',
      time: '5 dk önce',
      icon: <Users size={16} className="text-green-500" />
    },
    {
      type: 'service',
      message: 'Tesisat tamir hizmeti',
      location: 'Yenimahalle',
      time: '8 dk önce',
      icon: <Clock size={16} className="text-purple-500" />
    },
    {
      type: 'search',
      message: 'Boyacı arıyor',
      location: 'Etimesgut',
      time: '12 dk önce',
      icon: <Search size={16} className="text-blue-500" />
    },
    {
      type: 'registration',
      message: 'Yeni usta kaydoldu',
      location: 'Sincan',
      time: '15 dk önce',
      icon: <Users size={16} className="text-green-500" />
    },
    {
      type: 'service',
      message: 'Elektrik arıza hizmeti',
      location: 'Gölbaşı',
      time: '18 dk önce',
      icon: <Clock size={16} className="text-purple-500" />
    },
    {
      type: 'search',
      message: 'Temizlikçi arıyor',
      location: 'Mamak',
      time: '22 dk önce',
      icon: <Search size={16} className="text-blue-500" />
    },
    {
      type: 'registration',
      message: 'Yeni usta kaydoldu',
      location: 'Polatlı',
      time: '25 dk önce',
      icon: <Users size={16} className="text-green-500" />
    }
  ];

  useEffect(() => {
    // İlk bildirimleri yükle
    const initialNotifications = fakeNotifications.slice(0, 3).map((notification, index) => ({
      ...notification,
      id: index + 1
    }));
    setNotifications(initialNotifications);

    // Yeni bildirimler ekle
    const interval = setInterval(() => {
      const randomNotification = fakeNotifications[Math.floor(Math.random() * fakeNotifications.length)];
      const newNotification = {
        ...randomNotification,
        id: Date.now()
      };

      setNotifications(prev => {
        const updated = [newNotification, ...prev.slice(0, 2)];
        return updated;
      });
    }, 8000); // 8 saniyede bir yeni bildirim

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200 py-2">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Sol taraf - Aktif kullanıcı sayısı */}
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2 text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-medium">247 aktif kullanıcı</span>
            </div>
            <div className="flex items-center space-x-2 text-blue-600">
              <MapPin size={14} />
              <span>Ankara geneli</span>
            </div>
          </div>

          {/* Sağ taraf - Canlı bildirimler */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-center space-x-2 text-xs bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm animate-fade-in"
                >
                  {notification.icon}
                  <span className="text-gray-700">{notification.message}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-500">{notification.location}</span>
                  <span className="text-gray-400">{notification.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationBar; 
import React, { useState, useEffect } from 'react';
import { Users, Search, Star, Clock, MapPin, TrendingUp } from 'lucide-react';

interface Activity {
  id: number;
  type: 'search' | 'registration' | 'review' | 'service' | 'online';
  user: string;
  action: string;
  location: string;
  time: string;
  icon: React.ReactNode;
  color: string;
}

const LiveActivity: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [onlineUsers, setOnlineUsers] = useState(247);

  const fakeActivities: Omit<Activity, 'id'>[] = [
    {
      type: 'search',
      user: 'Ahmet Y.',
      action: 'elektrikçi arıyor',
      location: 'Çankaya',
      time: 'şimdi',
      icon: <Search size={16} />,
      color: 'text-blue-500'
    },
    {
      type: 'registration',
      user: 'Mehmet K.',
      action: 'yeni usta olarak kaydoldu',
      location: 'Keçiören',
      time: '2 dk önce',
      icon: <Users size={16} />,
      color: 'text-green-500'
    },
    {
      type: 'service',
      user: 'Ali R.',
      action: 'tesisat tamir hizmeti aldı',
      location: 'Yenimahalle',
      time: '5 dk önce',
      icon: <Clock size={16} />,
      color: 'text-purple-500'
    },
    {
      type: 'search',
      user: 'Ayşe M.',
      action: 'boyacı arıyor',
      location: 'Etimesgut',
      time: '8 dk önce',
      icon: <Search size={16} />,
      color: 'text-blue-500'
    },
    {
      type: 'registration',
      user: 'Hasan T.',
      action: 'yeni usta olarak kaydoldu',
      location: 'Sincan',
      time: '12 dk önce',
      icon: <Users size={16} />,
      color: 'text-green-500'
    },
    {
      type: 'service',
      user: 'Mustafa A.',
      action: 'elektrik arıza hizmeti aldı',
      location: 'Gölbaşı',
      time: '15 dk önce',
      icon: <Clock size={16} />,
      color: 'text-purple-500'
    },
    {
      type: 'search',
      user: 'Fatma S.',
      action: 'temizlikçi arıyor',
      location: 'Mamak',
      time: '18 dk önce',
      icon: <Search size={16} />,
      color: 'text-blue-500'
    },
    {
      type: 'registration',
      user: 'Zeynep K.',
      action: 'yeni usta olarak kaydoldu',
      location: 'Polatlı',
      time: '22 dk önce',
      icon: <Users size={16} />,
      color: 'text-green-500'
    }
  ];

  useEffect(() => {
    // İlk aktiviteleri yükle
    const initialActivities = fakeActivities.slice(0, 5).map((activity, index) => ({
      ...activity,
      id: index + 1
    }));
    setActivities(initialActivities);

    // Yeni aktiviteler ekle
    const activityInterval = setInterval(() => {
      const randomActivity = fakeActivities[Math.floor(Math.random() * fakeActivities.length)];
      const newActivity = {
        ...randomActivity,
        id: Date.now()
      };

      setActivities(prev => {
        const updated = [newActivity, ...prev.slice(0, 4)];
        return updated;
      });
    }, 12000); // 12 saniyede bir yeni aktivite

    // Online kullanıcı sayısını güncelle
    const userInterval = setInterval(() => {
      setOnlineUsers(prev => {
        const change = Math.floor(Math.random() * 6) - 3; // -3 ile +3 arası değişim
        return Math.max(240, Math.min(260, prev + change));
      });
    }, 15000); // 15 saniyede bir kullanıcı sayısı güncelle

    return () => {
      clearInterval(activityInterval);
      clearInterval(userInterval);
    };
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <TrendingUp size={20} className="text-green-500" />
          <span>Canlı Aktivite</span>
        </h3>
        <div className="flex items-center space-x-2 text-sm text-green-600">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>{onlineUsers} aktif kullanıcı</span>
        </div>
      </div>

      <div className="space-y-3">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg animate-fade-in"
          >
            <div className={`${activity.color} flex-shrink-0`}>
              {activity.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 text-sm">
                <span className="font-medium text-gray-900">{activity.user}</span>
                <span className="text-gray-600">{activity.action}</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                <MapPin size={12} />
                <span>{activity.location}</span>
                <span>•</span>
                <span>{activity.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4 text-center text-xs">
            <div className="bg-blue-50 rounded-lg p-2">
              <div className="text-blue-600 font-semibold">23</div>
              <div className="text-gray-600">Arama</div>
            </div>
            <div className="bg-green-50 rounded-lg p-2">
              <div className="text-green-600 font-semibold">8</div>
              <div className="text-gray-600">Kayıt</div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default LiveActivity; 
import React, { useState, useEffect } from 'react';
import { Users, TrendingUp } from 'lucide-react';

const OnlineUsers: React.FC = () => {
  const [userCount, setUserCount] = useState(247);
  const [isIncreasing, setIsIncreasing] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setUserCount(prev => {
        const change = Math.floor(Math.random() * 5) - 2; // -2 ile +2 arası değişim
        const newCount = Math.max(240, Math.min(260, prev + change));
        setIsIncreasing(change > 0);
        return newCount;
      });
    }, 10000); // 10 saniyede bir güncelle

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Users size={20} className="text-green-600" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Aktif Kullanıcı</div>
            <div className="text-xl font-bold text-green-600 flex items-center space-x-2">
              <span>{userCount}</span>
              {isIncreasing && (
                <TrendingUp size={16} className="text-green-500 animate-bounce" />
              )}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-500">Ankara geneli</div>
          <div className="text-xs text-green-600 font-medium">Canlı</div>
        </div>
      </div>
    </div>
  );
};

export default OnlineUsers; 
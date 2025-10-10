import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Settings, 
  BarChart3,
  Package,
  MessageSquare,
  Bell,
  LogOut,
  Home,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    { 
      id: 'dashboard', 
      name: 'Dashboard', 
      href: '/admin', 
      icon: LayoutDashboard, 
      color: 'blue', 
    },
    { 
      id: 'ustalar', 
      name: 'Ustalar', 
      href: '/admin/ustalar', 
      icon: Users, 
      color: 'green', 
    },
    { 
      id: 'blogs', 
      name: 'Blog Yazıları', 
      href: '/admin/blog', 
      icon: FileText, 
      color: 'purple', 
    },
    { 
      id: 'analytics', 
      name: 'Analytics', 
      href: '/admin/analytics', 
      icon: BarChart3, 
      color: 'orange', 
    },
    { 
      id: 'packages', 
      name: 'Paketler', 
      href: '/admin/packages', 
      icon: Package, 
      color: 'indigo', 
    },
    { 
      id: 'messages', 
      name: 'Mesajlar', 
      href: '/admin/messages', 
      icon: MessageSquare, 
      color: 'pink', 
    },
    { 
      id: 'settings', 
      name: 'Ayarlar', 
      href: '/admin/settings', 
      icon: Settings, 
      color: 'gray', 
    },
  ];

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(href);
  };

  const getColorClass = (color: string, active: boolean) => {
    const colors = {
      blue: active ? 'bg-blue-50 text-blue-600 border-blue-200' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600',
      green: active ? 'bg-green-50 text-green-600 border-green-200' : 'text-gray-700 hover:bg-green-50 hover:text-green-600',
      purple: active ? 'bg-purple-50 text-purple-600 border-purple-200' : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600',
      orange: active ? 'bg-orange-50 text-orange-600 border-orange-200' : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600',
      indigo: active ? 'bg-indigo-50 text-indigo-600 border-indigo-200' : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600',
      pink: active ? 'bg-pink-50 text-pink-600 border-pink-200' : 'text-gray-700 hover:bg-pink-50 hover:text-pink-600',
      gray: active ? 'bg-gray-50 text-gray-600 border-gray-200' : 'text-gray-700 hover:bg-gray-50',
    };
    return colors[color as keyof typeof colors] || colors.gray;
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 lg:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Sidebar Header */}
        <div className="h-16 lg:h-20 border-b border-gray-200 flex items-center px-6">
          <Link href="/admin" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">AU</span>
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900">Admin Panel</div>
              <div className="text-xs text-gray-500">Yönetim Sistemi</div>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={onClose}
                className={`
                  w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                  ${getColorClass(item.color, active)}
                  ${active ? 'border shadow-sm' : 'border border-transparent'}
                `}
              >
                <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
                <span>{item.name}</span>
                
                {/* Active Indicator */}
                {active && (
                  <div className="ml-auto w-2 h-2 bg-current rounded-full opacity-60" />
                )}
              </Link>
            );
          })}
          
          {/* Divider */}
          <div className="border-t border-gray-200 my-4" />
          
          {/* Additional Links */}
          <Link
            href="/"
            onClick={onClose}
            className="w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Home className="w-5 h-5 mr-3" />
            <span>Ana Siteye Dön</span>
          </Link>
          
          <button className="w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
            <LogOut className="w-5 h-5 mr-3" />
            <span>Çıkış Yap</span>
          </button>
        </nav>

        {/* User Info */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">Admin User</div>
              <div className="text-xs text-gray-500">admin@ankaraustabul.com</div>
            </div>
            <button className="p-1 text-gray-400 hover:text-gray-600">
              <Bell className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;

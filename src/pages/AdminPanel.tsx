import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Search,
  Filter,
  UserCheck,
  BarChart3,
  RefreshCw,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Minus,
  Clock,
  CheckCircle,
  Star,
  Package,
} from 'lucide-react';
import { BlogPost } from '../data/blogData';
import blogService from '../services/blogService';
import adminService, { AdminStats, ActivityItem } from '../services/adminService';
import { ustaService } from '../services/ustaService';
import type { Usta } from '../types';
import { useToast } from '../components/ui/Toast';
import ConfirmDialog from '../components/ui/ConfirmDialog';

function AdminPanel() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [adminStats, setAdminStats] = useState<AdminStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [ustalar, setUstalar] = useState<Usta[]>([]);
  const [ustaLoading, setUstaLoading] = useState(false);
  const [ustaError, setUstaError] = useState<string | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; blogId: string | null }>({
    isOpen: false,
    blogId: null,
  });

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'blogs', name: 'Blog Yazıları', icon: FileText },
    { id: 'users', name: 'Ustalar', icon: Users },
    { id: 'settings', name: 'Ayarlar', icon: Settings },
  ];

  const stats = adminStats ? [
    { title: 'Toplam Usta', value: adminStats.totalUstalar.toString(), change: `+${adminStats.monthlyGrowth.ustalar}`, icon: Users, color: 'blue' },
    { title: 'Blog Yazısı', value: adminStats.totalBlogs.toString(), change: `+${adminStats.monthlyGrowth.blogs}`, icon: FileText, color: 'green' },
    { title: 'Aktif Kullanıcı', value: adminStats.totalUsers.toLocaleString(), change: `+${adminStats.monthlyGrowth.users}`, icon: UserCheck, color: 'purple' },
    { title: 'Toplam Görüntülenme', value: adminStats.totalViews.toLocaleString(), change: `+${adminStats.monthlyGrowth.views}`, icon: Eye, color: 'orange' },
  ] : [
    { title: 'Toplam Usta', value: '---', change: '--', icon: Users, color: 'blue' },
    { title: 'Blog Yazısı', value: '---', change: '--', icon: FileText, color: 'green' },
    { title: 'Aktif Kullanıcı', value: '---', change: '--', icon: UserCheck, color: 'purple' },
    { title: 'Toplam Görüntülenme', value: '---', change: '--', icon: Eye, color: 'orange' },
  ];

  // Verileri yükle
  useEffect(() => {
    loadBlogs();
    loadAdminStats();
    if (activeTab === 'users') {
      loadUstalar();
    }
  }, [activeTab]);

  const loadAdminStats = async () => {
    try {
      setStatsLoading(true);
      const stats = await adminService.getAdminStats();
      setAdminStats(stats);
    } catch (err) {
      console.error('Admin stats loading error:', err);
    } finally {
      setStatsLoading(false);
    }
  };

  const loadBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const blogData = await blogService.getAllBlogs();
      setBlogs(blogData);
    } catch (err) {
      setError('Blog verileri yüklenirken hata oluştu');
      console.error('Blog loading error:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadUstalar = async () => {
    try {
      setUstaLoading(true);
      setUstaError(null);
      const ustaData = await ustaService.getAllUstalar();
      setUstalar(ustaData);
    } catch (err) {
      setUstaError('Usta verileri yüklenirken hata oluştu');
      console.error('Usta loading error:', err);
    } finally {
      setUstaLoading(false);
    }
  };

  const handleApproveUsta = async (ustaId: string) => {
    try {
      await adminService.approveUsta(ustaId);
      // Listeyi yenile
      await loadUstalar();
      await loadAdminStats();
      showToast({
        type: 'success',
        title: 'Başarılı!',
        message: 'Usta başarıyla onaylandı!'
      });
    } catch (error) {
      console.error('Usta onaylanırken hata:', error);
      showToast({
        type: 'error',
        title: 'Hata!',
        message: 'Usta onaylanırken bir hata oluştu.'
      });
    }
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.author.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleDeleteBlog = async (id: string) => {
    setDeleteDialog({ isOpen: true, blogId: id });
  };

  const confirmDeleteBlog = async () => {
    if (!deleteDialog.blogId) return;
    
    try {
      await blogService.deleteBlog(deleteDialog.blogId);
      setBlogs(blogs.filter(blog => blog.id !== deleteDialog.blogId));
      showToast({
        type: 'success',
        title: 'Başarılı!',
        message: 'Blog yazısı başarıyla silindi.'
      });
    } catch (err) {
      showToast({
        type: 'error',
        title: 'Hata!',
        message: 'Blog yazısı silinirken hata oluştu'
      });
      console.error('Delete error:', err);
    } finally {
      setDeleteDialog({ isOpen: false, blogId: null });
    }
  };

  const getStatColor = (color: string) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      purple: 'from-purple-500 to-purple-600',
      orange: 'from-orange-500 to-orange-600',
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getActivityIcon = (activity: ActivityItem) => {
    const iconMap = {
      'user_registration': Users,
      'blog_post': FileText,
      'usta_approval': CheckCircle,
      'premium_upgrade': Star,
    };
    return iconMap[activity.type] || Users;
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return TrendingUp;
      case 'down': return TrendingDown;
      default: return Minus;
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-body-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-h3 font-bold">{statsLoading ? '...' : stat.value}</p>
                  <p className="text-body-sm text-green-600 font-medium">{statsLoading ? '--' : stat.change}</p>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-r ${getStatColor(stat.color)} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                        </div>
      </div>

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, blogId: null })}
        onConfirm={confirmDeleteBlog}
        title="Blog Yazısını Sil"
        message="Bu blog yazısını silmek istediğinizden emin misiniz? Bu işlem geri alınamaz."
        variant="danger"
        confirmText="Sil"
        cancelText="İptal"
      />
    </div>
  );
})}
      </div>

      {/* Additional Stats Row */}
      {adminStats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card p-4">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-yellow-600 mr-3" />
              <div>
                <p className="text-body-sm text-gray-600">Bekleyen Onay</p>
                <p className="text-h4 font-bold">{adminStats.pendingApprovals}</p>
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-body-sm text-gray-600">Doğrulanmış</p>
                <p className="text-h4 font-bold">{adminStats.verifiedUstalar}</p>
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center">
              <Star className="w-8 h-8 text-purple-600 mr-3" />
              <div>
                <p className="text-body-sm text-gray-600">Premium</p>
                <p className="text-h4 font-bold">{adminStats.premiumUstalar}</p>
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center">
              <UserCheck className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="text-body-sm text-gray-600">Aktif Usta</p>
                <p className="text-h4 font-bold">{adminStats.activeUstalar}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <div className="card p-6">
            <h3 className="text-h4 mb-4">Son Aktiviteler</h3>
            <div className="space-y-4">
              {statsLoading ? (
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center p-3 bg-gray-50 rounded-lg animate-pulse">
                      <div className="w-10 h-10 bg-gray-200 rounded-full mr-4"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                      </div>
                      <div className="w-16 h-3 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : adminStats?.recentActivities && adminStats.recentActivities.length > 0 ? (
                adminStats.recentActivities.slice(0, 8).map((activity) => {
                  const ActivityIcon = getActivityIcon(activity);
                  return (
                    <div key={activity.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                        <ActivityIcon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-body font-medium">{activity.title}</h4>
                        <p className="text-body-sm text-gray-600">{activity.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-body-sm text-gray-500">{activity.time}</p>
                        {activity.user && (
                          <p className="text-body-sm text-blue-600">{activity.user}</p>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Henüz aktivite bulunmuyor</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions & Stats */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="card p-6">
            <h3 className="text-h4 mb-4">Hızlı İşlemler</h3>
            <div className="space-y-3">
              <Link 
                to="/admin/blog/new"
                className="w-full btn-primary flex items-center justify-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Yeni Blog Yazısı
              </Link>
              <button 
                onClick={() => setActiveTab('users')}
                className="w-full btn-secondary flex items-center justify-center"
              >
                <Users className="w-5 h-5 mr-2" />
                Usta Yönetimi
              </button>
              <button className="w-full btn-outline flex items-center justify-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Raporları Görüntüle
              </button>
            </div>
          </div>

          {/* Category Stats */}
          {statsLoading ? (
            <div className="card p-6">
              <h3 className="text-h4 mb-4">Kategori Dağılımı</h3>
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between animate-pulse">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-gray-200 rounded mr-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-20"></div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-3 bg-gray-200 rounded w-8"></div>
                      <div className="h-3 bg-gray-200 rounded w-12"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : adminStats && adminStats.categoryStats.length > 0 && (
            <div className="card p-6">
              <h3 className="text-h4 mb-4">Kategori Dağılımı</h3>
              <div className="space-y-3">
                {adminStats.categoryStats.slice(0, 5).map((category) => {
                  const TrendIcon = getTrendIcon(category.trend);
                  return (
                    <div key={category.category} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <TrendIcon className={`w-4 h-4 mr-2 ${
                          category.trend === 'up' ? 'text-green-600' : 
                            category.trend === 'down' ? 'text-red-600' : 'text-gray-400'
                        }`} />
                        <span className="text-body-sm">{category.category}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-body-sm font-medium">{category.count}</span>
                        <span className="text-body-sm text-gray-500 ml-2">(%{category.percentage})</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Package Stats */}
          {statsLoading ? (
            <div className="card p-6">
              <h3 className="text-h4 mb-4">Paket Dağılımı</h3>
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between animate-pulse">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-gray-200 rounded mr-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-16"></div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-3 bg-gray-200 rounded w-8"></div>
                      <div className="h-3 bg-gray-200 rounded w-12"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : adminStats && adminStats.packageStats.length > 0 && (
            <div className="card p-6">
              <h3 className="text-h4 mb-4">Paket Dağılımı</h3>
              <div className="space-y-3">
                {adminStats.packageStats.map((pkg) => (
                  <div key={pkg.package} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Package className="w-4 h-4 mr-2 text-gray-600" />
                      <span className="text-body-sm">{pkg.package}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-body-sm font-medium">{pkg.count}</span>
                      <span className="text-body-sm text-gray-500 ml-2">(%{pkg.percentage})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderBlogs = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-h2">Blog Yönetimi</h2>
          <p className="text-body text-gray-600">Blog yazılarınızı yönetin ve yeni içerik ekleyin</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={loadBlogs}
            disabled={loading}
            className="btn-secondary flex items-center"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Yenile
          </button>
          <Link 
            to="/admin/blog/new"
            className="btn-primary flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Yeni Yazı Ekle
          </Link>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Blog yazısı ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10"
            />
          </div>
          <button className="btn-secondary flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filtrele
          </button>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="card p-6 border-red-200 bg-red-50">
          <div className="flex items-center text-red-700">
            <AlertCircle className="w-5 h-5 mr-2" />
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="card p-12 text-center">
          <RefreshCw className="w-8 h-8 text-blue-600 mx-auto mb-4 animate-spin" />
          <p className="text-body text-gray-600">Blog yazıları yükleniyor...</p>
        </div>
      )}

      {/* Blog List */}
      {!loading && !error && (
        <div className="grid grid-cols-1 gap-6">
          {filteredBlogs.map((blog) => (
            <div key={blog.id} className="card p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Image */}
                <div className="lg:w-48 h-32 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={blog.image} 
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-h4 mb-2 line-clamp-2">{blog.title}</h3>
                      <p className="text-body-sm text-gray-600 line-clamp-2">{blog.excerpt}</p>
                    </div>
                    <span className="badge badge-primary ml-4">{blog.category}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-body-sm text-gray-500 space-x-4">
                      <span>{blog.author}</span>
                      <span>•</span>
                      <span>{blog.date}</span>
                      <span>•</span>
                      <span>{blog.readTime}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Link
                        to={`/blog/${blog.id}`}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Görüntüle"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        to={`/admin/blog/edit/${blog.id}`}
                        className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                        title="Düzenle"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDeleteBlog(blog.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        title="Sil"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredBlogs.length === 0 && (
        <div className="card p-12 text-center">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-h3 text-gray-900 mb-2">Blog yazısı bulunamadı</h3>
          <p className="text-body text-gray-600 mb-6">
            Arama kriterlerinizi değiştirin veya yeni bir blog yazısı ekleyin.
          </p>
          <Link to="/admin/blog/new" className="btn-primary">
            İlk Blog Yazınızı Ekleyin
          </Link>
        </div>
      )}
    </div>
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved': return 'Onaylandı';
      case 'pending': return 'Bekliyor';
      case 'rejected': return 'Reddedildi';
      default: return 'Bilinmiyor';
    }
  };

  const renderUsers = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-h2">Usta Yönetimi</h2>
          <p className="text-body text-gray-600">Kayıtlı ustaları yönetin ve onaylayın</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={loadUstalar}
            disabled={ustaLoading}
            className="btn-secondary flex items-center"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${ustaLoading ? 'animate-spin' : ''}`} />
            Yenile
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      {adminStats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card p-4">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="text-body-sm text-gray-600">Toplam Usta</p>
                <p className="text-h4 font-bold">{adminStats.totalUstalar}</p>
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-yellow-600 mr-3" />
              <div>
                <p className="text-body-sm text-gray-600">Bekleyen Onay</p>
                <p className="text-h4 font-bold">{adminStats.pendingApprovals}</p>
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-body-sm text-gray-600">Onaylanmış</p>
                <p className="text-h4 font-bold">{adminStats.verifiedUstalar}</p>
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center">
              <Star className="w-8 h-8 text-purple-600 mr-3" />
              <div>
                <p className="text-body-sm text-gray-600">Premium</p>
                <p className="text-h4 font-bold">{adminStats.premiumUstalar}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Usta ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10"
            />
          </div>
        </div>
      </div>

      {/* Error State */}
      {ustaError && (
        <div className="card p-6 border-red-200 bg-red-50">
          <div className="flex items-center text-red-700">
            <AlertCircle className="w-5 h-5 mr-2" />
            <span>{ustaError}</span>
          </div>
        </div>
      )}

      {/* Loading State */}
      {ustaLoading && (
        <div className="card p-12 text-center">
          <RefreshCw className="w-8 h-8 text-blue-600 mx-auto mb-4 animate-spin" />
          <p className="text-body text-gray-600">Ustalar yükleniyor...</p>
        </div>
      )}

      {/* Usta List */}
      {!ustaLoading && !ustaError && (
        <div className="grid grid-cols-1 gap-4">
          {ustalar
            .filter(usta => 
              usta.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              usta.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
              usta.location.toLowerCase().includes(searchTerm.toLowerCase()),
            )
            .map((usta) => (
              <div key={usta.id} className="card p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-h5 font-semibold">{usta.name}</h3>
                      <p className="text-body-sm text-gray-600">
                        {usta.category} • {usta.location}
                      </p>
                      <p className="text-body-sm text-gray-500">
                        {usta.experience} deneyim • {usta.hourlyRate}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(usta.status)}`}>
                      {getStatusText(usta.status)}
                    </span>
                    
                    {usta.verified && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        Doğrulanmış
                      </span>
                    )}
                    
                    {usta.isPremium && (
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                        Premium
                      </span>
                    )}
                    
                    <div className="flex space-x-1">
                      <button 
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                        title="Detayları Görüntüle"
                        onClick={() => window.open(`/usta/${usta.id}`, '_blank')}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-2 text-green-600 hover:bg-green-50 rounded"
                        title="Onayla"
                        onClick={() => handleApproveUsta(usta.id)}
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Ek bilgiler */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Tamamlanan İş:</span>
                      <span className="ml-2 font-medium">{usta.completedJobs}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Yanıt Süresi:</span>
                      <span className="ml-2 font-medium">{usta.responseTime}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Kayıt Tarihi:</span>
                      <span className="ml-2 font-medium">{usta.registrationDate}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Müsaitlik:</span>
                      <span className={`ml-2 font-medium ${usta.available ? 'text-green-600' : 'text-red-600'}`}>
                        {usta.available ? 'Müsait' : 'Meşgul'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Empty State */}
      {!ustaLoading && !ustaError && ustalar.length === 0 && (
        <div className="card p-12 text-center">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-h3 text-gray-900 mb-2">Henüz usta bulunmuyor</h3>
          <p className="text-body text-gray-600">
            Sistem henüz usta kaydı içermiyor.
          </p>
        </div>
      )}
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-h2">Sistem Ayarları</h2>
        <p className="text-body text-gray-600">Platform ayarlarını yönetin</p>
      </div>
      <div className="card p-8 text-center">
        <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-h3 text-gray-900 mb-2">Sistem Ayarları</h3>
        <p className="text-body text-gray-600">
          Bu bölüm geliştirme aşamasındadır.
        </p>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'blogs':
        return renderBlogs();
      case 'users':
        return renderUsers();
      case 'settings':
        return renderSettings();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">AU</span>
                </div>
                <div>
                  <h1 className="text-h5 font-bold">Admin Panel</h1>
                  <p className="text-body-sm text-gray-500">Yönetim Paneli</p>
                </div>
              </Link>
            </div>
            <Link to="/" className="btn-outline">
              Siteye Dön
            </Link>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-50 text-blue-600 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default AdminPanel;

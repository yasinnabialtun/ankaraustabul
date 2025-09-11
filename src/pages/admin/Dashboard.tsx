import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Chip,
  Button,
  Divider,
  Alert,
  LinearProgress
} from '@mui/material';
import {
  TrendingUp,
  Users,
  FileText,
  MessageSquare,
  Calendar,
  DollarSign,
  Activity,
  Award,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  UserPlus,
  Eye,
  MoreVertical
} from 'lucide-react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  icon: React.ElementType;
  color: 'primary' | 'success' | 'warning' | 'error';
  trend?: 'up' | 'down';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon: Icon, color, trend = 'up' }) => {
  const colorMap = {
    primary: '#3b82f6',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-readable" sx={{ height: '100%', position: 'relative', overflow: 'visible' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box>
              <Typography variant="h6" className="text-readable" gutterBottom>
                {title}
              </Typography>
              <Typography variant="h4" className="text-readable" component="div" sx={{ fontWeight: 'bold' }}>
                {value}
              </Typography>
            </Box>
            <Box
              sx={{
                background: colorMap[color],
                borderRadius: '12px',
                p: 1.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Icon size={24} color="white" />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TrendingUp 
              size={16} 
              color={trend === 'up' ? colorMap.success : colorMap.error}
              style={{ transform: trend === 'down' ? 'rotate(180deg)' : 'none' }}
            />
            <Typography 
              variant="body2" 
              className="text-readable-light"
              sx={{ ml: 0.5, color: trend === 'up' ? colorMap.success : colorMap.error }}
            >
              {change}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    {
      title: 'Toplam Usta',
      value: '1,247',
      change: '+12% bu ay',
      icon: Users,
      color: 'primary' as const,
      trend: 'up' as const
    },
    {
      title: 'Aktif İşler',
      value: '89',
      change: '+5% bu hafta',
      icon: Activity,
      color: 'success' as const,
      trend: 'up' as const
    },
    {
      title: 'Toplam Gelir',
      value: '₺125,430',
      change: '+23% bu ay',
      icon: DollarSign,
      color: 'warning' as const,
      trend: 'up' as const
    },
    {
      title: 'Müşteri Memnuniyeti',
      value: '4.8',
      change: '+0.2 puan',
      icon: Star,
      color: 'error' as const,
      trend: 'up' as const
    }
  ];

  const monthlyData = [
    { name: 'Oca', ustalar: 65, işler: 28, gelir: 15000 },
    { name: 'Şub', ustalar: 89, işler: 45, gelir: 23000 },
    { name: 'Mar', ustalar: 124, işler: 67, gelir: 34000 },
    { name: 'Nis', ustalar: 156, işler: 89, gelir: 45000 },
    { name: 'May', ustalar: 198, işler: 112, gelir: 58000 },
    { name: 'Haz', ustalar: 234, işler: 134, gelir: 67000 },
  ];

  const categoryData = [
    { name: 'Elektrik', value: 35, color: '#3b82f6' },
    { name: 'Tesisatçı', value: 28, color: '#10b981' },
    { name: 'Boyacı', value: 20, color: '#f59e0b' },
    { name: 'Tadilat', value: 17, color: '#ef4444' },
  ];

  const recentActivities = [
    {
      id: 1,
      user: 'Ahmet Yılmaz',
      action: 'Yeni usta kaydı oluşturdu',
      time: '2 dakika önce',
      type: 'success'
    },
    {
      id: 2,
      user: 'Ayşe Demir',
      action: 'İş tamamlandı olarak işaretledi',
      time: '15 dakika önce',
      type: 'info'
    },
    {
      id: 3,
      user: 'Mehmet Kaya',
      action: 'Yeni yorum bıraktı',
      time: '1 saat önce',
      type: 'warning'
    },
    {
      id: 4,
      user: 'Fatma Şahin',
      action: 'Profil fotoğrafını güncelledi',
      time: '3 saat önce',
      type: 'info'
    }
  ];

  const topUstalar = [
    {
      id: 1,
      name: 'Ali Veli',
      category: 'Elektrikçi',
      rating: 4.9,
      completedJobs: 156,
      avatar: '/images/ustalar/ali-veli.jpg'
    },
    {
      id: 2,
      name: 'Hasan Özkan',
      category: 'Tesisatçı',
      rating: 4.8,
      completedJobs: 142,
      avatar: '/images/ustalar/hasan-ozkan.jpg'
    },
    {
      id: 3,
      name: 'Mustafa Çelik',
      category: 'Boyacı',
      rating: 4.7,
      completedJobs: 128,
      avatar: '/images/ustalar/mustafa-celik.jpg'
    }
  ];

  if (loading) {
    return (
      <Container maxWidth="xl">
        <Box sx={{ py: 4 }}>
          <Typography variant="h4" className="text-readable" gutterBottom>
            Dashboard Yükleniyor...
          </Typography>
          <LinearProgress sx={{ mt: 2 }} />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" className="text-readable" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Admin Dashboard
          </Typography>
          <Typography variant="body1" className="text-readable-light">
            Ankara Usta Bul platform istatistikleri ve yönetim paneli
          </Typography>
        </Box>

        {/* Quick Actions */}
        <Box sx={{ mb: 4 }}>
          <Alert severity="info" sx={{ mb: 2 }}>
            <strong>Bilgi:</strong> Son 24 saatte 15 yeni usta kaydı oluşturuldu ve 23 iş tamamlandı.
          </Alert>
        </Box>

        {/* Stats Grid */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <StatCard {...stat} />
            </Grid>
          ))}
        </Grid>

        {/* Charts and Analytics */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Monthly Trends */}
          <Grid item xs={12} lg={8}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="bg-readable">
                <CardContent>
                  <Typography variant="h6" className="text-readable" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Aylık Trend Analizi
                  </Typography>
                  <Box sx={{ height: 300, mt: 2 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="ustalar" stroke="#3b82f6" strokeWidth={2} />
                        <Line type="monotone" dataKey="işler" stroke="#10b981" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Category Distribution */}
          <Grid item xs={12} lg={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="bg-readable">
                <CardContent>
                  <Typography variant="h6" className="text-readable" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Kategori Dağılımı
                  </Typography>
                  <Box sx={{ height: 250, mt: 2 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                  <Box sx={{ mt: 2 }}>
                    {categoryData.map((item, index) => (
                      <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Box 
                          sx={{ 
                            width: 12, 
                            height: 12, 
                            borderRadius: '50%', 
                            backgroundColor: item.color,
                            mr: 1
                          }} 
                        />
                        <Typography variant="body2" className="text-readable-light">
                          {item.name}: {item.value}%
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>

        {/* Bottom Section */}
        <Grid container spacing={3}>
          {/* Recent Activities */}
          <Grid item xs={12} lg={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="bg-readable">
                <CardContent>
                  <Typography variant="h6" className="text-readable" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Son Aktiviteler
                  </Typography>
                  <List>
                    {recentActivities.map((activity, index) => (
                      <ListItem key={activity.id} divider={index < recentActivities.length - 1}>
                        <ListItemIcon>
                          <Avatar sx={{ width: 32, height: 32, bgcolor: '#3b82f6' }}>
                            <Users size={16} />
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="body2" className="text-readable">
                              <strong>{activity.user}</strong> {activity.action}
                            </Typography>
                          }
                          secondary={
                            <Typography variant="caption" className="text-readable-light">
                              <Clock size={12} style={{ marginRight: 4 }} />
                              {activity.time}
                            </Typography>
                          }
                        />
                        <Chip 
                          size="small" 
                          label={activity.type} 
                          color={activity.type === 'success' ? 'success' : activity.type === 'warning' ? 'warning' : 'primary'}
                        />
                      </ListItem>
                    ))}
                  </List>
                  <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Button variant="outlined" size="small">
                      Tüm Aktiviteleri Görüntüle
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Top Performers */}
          <Grid item xs={12} lg={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card className="bg-readable">
                <CardContent>
                  <Typography variant="h6" className="text-readable" gutterBottom sx={{ fontWeight: 'bold' }}>
                    En Başarılı Ustalar
                  </Typography>
                  <List>
                    {topUstalar.map((usta, index) => (
                      <ListItem key={usta.id} divider={index < topUstalar.length - 1}>
                        <ListItemIcon>
                          <Avatar src={usta.avatar} sx={{ width: 40, height: 40 }}>
                            {usta.name.charAt(0)}
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography variant="body2" className="text-readable" sx={{ fontWeight: 'bold' }}>
                                {usta.name}
                              </Typography>
                              <Chip label={usta.category} size="small" />
                            </Box>
                          }
                          secondary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 0.5 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <Star size={14} color="#f59e0b" fill="#f59e0b" />
                                <Typography variant="caption" className="text-readable-light">
                                  {usta.rating}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <CheckCircle size={14} color="#10b981" />
                                <Typography variant="caption" className="text-readable-light">
                                  {usta.completedJobs} iş
                                </Typography>
                              </Box>
                            </Box>
                          }
                        />
                        <Button size="small" variant="outlined" startIcon={<Eye size={14} />}>
                          Görüntüle
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                  <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Button variant="outlined" size="small">
                      Tüm Ustaları Görüntüle
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;
import {
  TrendingUp,
  Users,
  FileText,
  MessageSquare,
  Calendar,
  DollarSign,
  Activity,
  Award,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  UserPlus,
  Eye,
  MoreVertical
} from 'lucide-react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  icon: React.ElementType;
  color: 'primary' | 'success' | 'warning' | 'error';
  trend?: 'up' | 'down';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon: Icon, color, trend = 'up' }) => {
  const colorMap = {
    primary: '#3b82f6',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-readable" sx={{ height: '100%', position: 'relative', overflow: 'visible' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box>
              <Typography variant="h6" className="text-readable" gutterBottom>
                {title}
              </Typography>
              <Typography variant="h4" className="text-readable" component="div" sx={{ fontWeight: 'bold' }}>
                {value}
              </Typography>
            </Box>
            <Box
              sx={{
                background: colorMap[color],
                borderRadius: '12px',
                p: 1.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Icon size={24} color="white" />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TrendingUp 
              size={16} 
              color={trend === 'up' ? colorMap.success : colorMap.error}
              style={{ transform: trend === 'down' ? 'rotate(180deg)' : 'none' }}
            />
            <Typography 
              variant="body2" 
              className="text-readable-light"
              sx={{ ml: 0.5, color: trend === 'up' ? colorMap.success : colorMap.error }}
            >
              {change}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    {
      title: 'Toplam Usta',
      value: '1,247',
      change: '+12% bu ay',
      icon: Users,
      color: 'primary' as const,
      trend: 'up' as const
    },
    {
      title: 'Aktif İşler',
      value: '89',
      change: '+5% bu hafta',
      icon: Activity,
      color: 'success' as const,
      trend: 'up' as const
    },
    {
      title: 'Toplam Gelir',
      value: '₺125,430',
      change: '+23% bu ay',
      icon: DollarSign,
      color: 'warning' as const,
      trend: 'up' as const
    },
    {
      title: 'Müşteri Memnuniyeti',
      value: '4.8',
      change: '+0.2 puan',
      icon: Star,
      color: 'error' as const,
      trend: 'up' as const
    }
  ];

  const monthlyData = [
    { name: 'Oca', ustalar: 65, işler: 28, gelir: 15000 },
    { name: 'Şub', ustalar: 89, işler: 45, gelir: 23000 },
    { name: 'Mar', ustalar: 124, işler: 67, gelir: 34000 },
    { name: 'Nis', ustalar: 156, işler: 89, gelir: 45000 },
    { name: 'May', ustalar: 198, işler: 112, gelir: 58000 },
    { name: 'Haz', ustalar: 234, işler: 134, gelir: 67000 },
  ];

  const categoryData = [
    { name: 'Elektrik', value: 35, color: '#3b82f6' },
    { name: 'Tesisatçı', value: 28, color: '#10b981' },
    { name: 'Boyacı', value: 20, color: '#f59e0b' },
    { name: 'Tadilat', value: 17, color: '#ef4444' },
  ];

  const recentActivities = [
    {
      id: 1,
      user: 'Ahmet Yılmaz',
      action: 'Yeni usta kaydı oluşturdu',
      time: '2 dakika önce',
      type: 'success'
    },
    {
      id: 2,
      user: 'Ayşe Demir',
      action: 'İş tamamlandı olarak işaretledi',
      time: '15 dakika önce',
      type: 'info'
    },
    {
      id: 3,
      user: 'Mehmet Kaya',
      action: 'Yeni yorum bıraktı',
      time: '1 saat önce',
      type: 'warning'
    },
    {
      id: 4,
      user: 'Fatma Şahin',
      action: 'Profil fotoğrafını güncelledi',
      time: '3 saat önce',
      type: 'info'
    }
  ];

  const topUstalar = [
    {
      id: 1,
      name: 'Ali Veli',
      category: 'Elektrikçi',
      rating: 4.9,
      completedJobs: 156,
      avatar: '/images/ustalar/ali-veli.jpg'
    },
    {
      id: 2,
      name: 'Hasan Özkan',
      category: 'Tesisatçı',
      rating: 4.8,
      completedJobs: 142,
      avatar: '/images/ustalar/hasan-ozkan.jpg'
    },
    {
      id: 3,
      name: 'Mustafa Çelik',
      category: 'Boyacı',
      rating: 4.7,
      completedJobs: 128,
      avatar: '/images/ustalar/mustafa-celik.jpg'
    }
  ];

  if (loading) {
    return (
      <Container maxWidth="xl">
        <Box sx={{ py: 4 }}>
          <Typography variant="h4" className="text-readable" gutterBottom>
            Dashboard Yükleniyor...
          </Typography>
          <LinearProgress sx={{ mt: 2 }} />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" className="text-readable" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Admin Dashboard
          </Typography>
          <Typography variant="body1" className="text-readable-light">
            Ankara Usta Bul platform istatistikleri ve yönetim paneli
          </Typography>
        </Box>

        {/* Quick Actions */}
        <Box sx={{ mb: 4 }}>
          <Alert severity="info" sx={{ mb: 2 }}>
            <strong>Bilgi:</strong> Son 24 saatte 15 yeni usta kaydı oluşturuldu ve 23 iş tamamlandı.
          </Alert>
        </Box>

        {/* Stats Grid */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <StatCard {...stat} />
            </Grid>
          ))}
        </Grid>

        {/* Charts and Analytics */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Monthly Trends */}
          <Grid item xs={12} lg={8}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="bg-readable">
                <CardContent>
                  <Typography variant="h6" className="text-readable" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Aylık Trend Analizi
                  </Typography>
                  <Box sx={{ height: 300, mt: 2 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="ustalar" stroke="#3b82f6" strokeWidth={2} />
                        <Line type="monotone" dataKey="işler" stroke="#10b981" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Category Distribution */}
          <Grid item xs={12} lg={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="bg-readable">
                <CardContent>
                  <Typography variant="h6" className="text-readable" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Kategori Dağılımı
                  </Typography>
                  <Box sx={{ height: 250, mt: 2 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                  <Box sx={{ mt: 2 }}>
                    {categoryData.map((item, index) => (
                      <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Box 
                          sx={{ 
                            width: 12, 
                            height: 12, 
                            borderRadius: '50%', 
                            backgroundColor: item.color,
                            mr: 1
                          }} 
                        />
                        <Typography variant="body2" className="text-readable-light">
                          {item.name}: {item.value}%
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>

        {/* Bottom Section */}
        <Grid container spacing={3}>
          {/* Recent Activities */}
          <Grid item xs={12} lg={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="bg-readable">
                <CardContent>
                  <Typography variant="h6" className="text-readable" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Son Aktiviteler
                  </Typography>
                  <List>
                    {recentActivities.map((activity, index) => (
                      <ListItem key={activity.id} divider={index < recentActivities.length - 1}>
                        <ListItemIcon>
                          <Avatar sx={{ width: 32, height: 32, bgcolor: '#3b82f6' }}>
                            <Users size={16} />
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="body2" className="text-readable">
                              <strong>{activity.user}</strong> {activity.action}
                            </Typography>
                          }
                          secondary={
                            <Typography variant="caption" className="text-readable-light">
                              <Clock size={12} style={{ marginRight: 4 }} />
                              {activity.time}
                            </Typography>
                          }
                        />
                        <Chip 
                          size="small" 
                          label={activity.type} 
                          color={activity.type === 'success' ? 'success' : activity.type === 'warning' ? 'warning' : 'primary'}
                        />
                      </ListItem>
                    ))}
                  </List>
                  <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Button variant="outlined" size="small">
                      Tüm Aktiviteleri Görüntüle
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Top Performers */}
          <Grid item xs={12} lg={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card className="bg-readable">
                <CardContent>
                  <Typography variant="h6" className="text-readable" gutterBottom sx={{ fontWeight: 'bold' }}>
                    En Başarılı Ustalar
                  </Typography>
                  <List>
                    {topUstalar.map((usta, index) => (
                      <ListItem key={usta.id} divider={index < topUstalar.length - 1}>
                        <ListItemIcon>
                          <Avatar src={usta.avatar} sx={{ width: 40, height: 40 }}>
                            {usta.name.charAt(0)}
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography variant="body2" className="text-readable" sx={{ fontWeight: 'bold' }}>
                                {usta.name}
                              </Typography>
                              <Chip label={usta.category} size="small" />
                            </Box>
                          }
                          secondary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 0.5 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <Star size={14} color="#f59e0b" fill="#f59e0b" />
                                <Typography variant="caption" className="text-readable-light">
                                  {usta.rating}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <CheckCircle size={14} color="#10b981" />
                                <Typography variant="caption" className="text-readable-light">
                                  {usta.completedJobs} iş
                                </Typography>
                              </Box>
                            </Box>
                          }
                        />
                        <Button size="small" variant="outlined" startIcon={<Eye size={14} />}>
                          Görüntüle
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                  <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Button variant="outlined" size="small">
                      Tüm Ustaları Görüntüle
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;

import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
  Button,
  TextField,
  Chip,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  Alert,
  Pagination
} from '@mui/material';
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  MoreVertical,
  Calendar,
  User,
  Tag,
  TrendingUp,
  FileText,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorAvatar: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  publishDate: Date;
  views: number;
  comments: number;
  featured: boolean;
  coverImage?: string;
}

const AdminBlog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, postId: '' });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  // Mock data
  useEffect(() => {
    const mockPosts: BlogPost[] = [
      {
        id: '1',
        title: 'Ankara\'da En İyi Elektrikçi Nasıl Bulunur?',
        excerpt: 'Evinizdeki elektrik sorunları için güvenilir bir elektrikçi bulmak önemli. Bu rehberde size en iyi elektrikçiyi bulma yollarını anlatıyoruz.',
        content: '',
        author: 'Ahmet Yılmaz',
        authorAvatar: '/images/authors/ahmet.jpg',
        category: 'Elektrik',
        tags: ['elektrikçi', 'ev tamiri', 'güvenlik'],
        status: 'published',
        publishDate: new Date('2024-01-15'),
        views: 1245,
        comments: 23,
        featured: true,
        coverImage: '/images/blog/elektrikci-rehber.jpg'
      },
      {
        id: '2',
        title: 'Su Tesisatı Arızaları: Ne Zaman Usta Çağırmalısınız?',
        excerpt: 'Evinizdeki su tesisatı sorunlarının hangilerini kendiniz çözebilir, hangilerinde mutlaka uzman yardımı almalısınız?',
        content: '',
        author: 'Ayşe Demir',
        authorAvatar: '/images/authors/ayse.jpg',
        category: 'Tesisat',
        tags: ['tesisat', 'su kaçağı', 'acil durum'],
        status: 'published',
        publishDate: new Date('2024-01-12'),
        views: 892,
        comments: 15,
        featured: false
      },
      {
        id: '3',
        title: 'Ev Boyama İşi: Hangi Boya Türünü Seçmelisiniz?',
        excerpt: 'Evinizdeki duvarları boyarken doğru boya türünü seçmek önemli. Plastik mi saten mi? İşte rehberiniz.',
        content: '',
        author: 'Mehmet Kaya',
        authorAvatar: '/images/authors/mehmet.jpg',
        category: 'Boyama',
        tags: ['boya', 'dekorasyon', 'ıp uçları'],
        status: 'draft',
        publishDate: new Date('2024-01-20'),
        views: 0,
        comments: 0,
        featured: false
      },
      {
        id: '4',
        title: 'Klima Bakımı: Yazdan Önce Yapmanız Gerekenler',
        excerpt: 'Yaz aylarında klimadan verimli bir şekilde yararlanmak için önceden yapılması gereken bakım işlemleri.',
        content: '',
        author: 'Fatma Şahin',
        authorAvatar: '/images/authors/fatma.jpg',
        category: 'Klima',
        tags: ['klima', 'bakım', 'enerji tasarrufu'],
        status: 'published',
        publishDate: new Date('2024-01-10'),
        views: 1567,
        comments: 31,
        featured: true
      },
      {
        id: '5',
        title: 'Mutfak Tadilatı Planlama Rehberi',
        excerpt: 'Mutfağınızı yenilemek mi istiyorsunuz? İşte dikkat etmeniz gereken noktalar ve planlama süreci.',
        content: '',
        author: 'Hasan Özkan',
        authorAvatar: '/images/authors/hasan.jpg',
        category: 'Tadilat',
        tags: ['mutfak', 'tadilat', 'planlama'],
        status: 'archived',
        publishDate: new Date('2023-12-28'),
        views: 734,
        comments: 12,
        featured: false
      }
    ];
    
    setTimeout(() => {
      setPosts(mockPosts);
      setFilteredPosts(mockPosts);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter posts
  useEffect(() => {
    let filtered = posts;

    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterCategory !== 'all') {
      filtered = filtered.filter(post => post.category === filterCategory);
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(post => post.status === filterStatus);
    }

    setFilteredPosts(filtered);
    setCurrentPage(1);
  }, [searchTerm, filterCategory, filterStatus, posts]);

  const handleDeletePost = (postId: string) => {
    setPosts(posts.filter(post => post.id !== postId));
    setDeleteDialog({ open: false, postId: '' });
  };

  const handleStatusChange = (postId: string, newStatus: 'draft' | 'published' | 'archived') => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, status: newStatus } : post
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'success';
      case 'draft': return 'warning';
      case 'archived': return 'error';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'published': return 'Yayınlandı';
      case 'draft': return 'Taslak';
      case 'archived': return 'Arşivlendi';
      default: return status;
    }
  };

  const categories = ['Elektrik', 'Tesisat', 'Boyama', 'Klima', 'Tadilat'];
  const statuses = ['published', 'draft', 'archived'];

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const stats = [
    { label: 'Toplam Yazı', value: posts.length, icon: FileText, color: '#3b82f6' },
    { label: 'Yayınlandı', value: posts.filter(p => p.status === 'published').length, icon: TrendingUp, color: '#10b981' },
    { label: 'Taslak', value: posts.filter(p => p.status === 'draft').length, icon: Edit, color: '#f59e0b' },
    { label: 'Toplam Görüntülenme', value: posts.reduce((sum, post) => sum + post.views, 0).toLocaleString(), icon: Eye, color: '#ef4444' }
  ];

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" className="text-readable" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Blog Yönetimi
          </Typography>
          <Typography variant="body1" className="text-readable-light" gutterBottom>
            Blog yazılarını yönetin, düzenleyin ve yayınlayın
          </Typography>
        </Box>

        {/* Quick Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-readable">
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="h4" className="text-readable" sx={{ fontWeight: 'bold', mb: 1 }}>
                          {stat.value}
                        </Typography>
                        <Typography variant="body2" className="text-readable-light">
                          {stat.label}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          background: stat.color,
                          borderRadius: '12px',
                          p: 1.5,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <stat.icon size={20} color="white" />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Filters and Actions */}
        <Card className="bg-readable" sx={{ mb: 3 }}>
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Yazılarda ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search size={20} />
                      </InputAdornment>
                    ),
                  }}
                  className="text-readable"
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <FormControl size="small" fullWidth>
                  <InputLabel>Kategori</InputLabel>
                  <Select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    label="Kategori"
                  >
                    <MenuItem value="all">Tüm Kategoriler</MenuItem>
                    {categories.map(cat => (
                      <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={2}>
                <FormControl size="small" fullWidth>
                  <InputLabel>Durum</InputLabel>
                  <Select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    label="Durum"
                  >
                    <MenuItem value="all">Tüm Durumlar</MenuItem>
                    {statuses.map(status => (
                      <MenuItem key={status} value={status}>{getStatusLabel(status)}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4} sx={{ textAlign: 'right' }}>
                <Button
                  variant="contained"
                  startIcon={<Plus size={20} />}
                  sx={{ mr: 1 }}
                >
                  Yeni Yazı
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Filter size={20} />}
                >
                  Filtrele
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Blog Posts Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="bg-readable">
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className="text-readable"><strong>Yazı</strong></TableCell>
                    <TableCell className="text-readable"><strong>Yazar</strong></TableCell>
                    <TableCell className="text-readable"><strong>Kategori</strong></TableCell>
                    <TableCell className="text-readable"><strong>Durum</strong></TableCell>
                    <TableCell className="text-readable"><strong>Tarih</strong></TableCell>
                    <TableCell className="text-readable"><strong>Görüntülenme</strong></TableCell>
                    <TableCell className="text-readable"><strong>Yorumlar</strong></TableCell>
                    <TableCell className="text-readable"><strong>İşlemler</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentPosts.map((post, index) => (
                    <TableRow key={post.id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          {post.coverImage && (
                            <Avatar
                              src={post.coverImage}
                              sx={{ width: 40, height: 40, borderRadius: 1 }}
                              variant="rounded"
                            />
                          )}
                          <Box>
                            <Typography variant="body2" className="text-readable" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                              {post.title}
                            </Typography>
                            <Typography variant="caption" className="text-readable-light" sx={{ display: 'block' }}>
                              {post.excerpt.substring(0, 80)}...
                            </Typography>
                            {post.featured && (
                              <Chip label="Öne Çıkan" size="small" color="primary" sx={{ mt: 0.5 }} />
                            )}
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Avatar src={post.authorAvatar} sx={{ width: 24, height: 24 }}>
                            {post.author.charAt(0)}
                          </Avatar>
                          <Typography variant="body2" className="text-readable">
                            {post.author}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip label={post.category} size="small" variant="outlined" />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={getStatusLabel(post.status)} 
                          size="small" 
                          color={getStatusColor(post.status) as any}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Calendar size={14} className="text-readable-light" />
                          <Typography variant="body2" className="text-readable">
                            {format(post.publishDate, 'dd MMM yyyy', { locale: tr })}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Eye size={14} className="text-readable-light" />
                          <Typography variant="body2" className="text-readable">
                            {post.views.toLocaleString()}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" className="text-readable">
                          {post.comments}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                          <IconButton size="small" color="primary">
                            <Eye size={16} />
                          </IconButton>
                          <IconButton size="small" color="primary">
                            <Edit size={16} />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            color="error"
                            onClick={() => setDeleteDialog({ open: true, postId: post.id })}
                          >
                            <Trash2 size={16} />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination */}
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(e, page) => setCurrentPage(page)}
                color="primary"
                size="large"
              />
            </Box>
          </Card>
        </motion.div>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialog.open}
          onClose={() => setDeleteDialog({ open: false, postId: '' })}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle className="text-readable">Yazıyı Sil</DialogTitle>
          <DialogContent>
            <Typography className="text-readable">
              Bu yazıyı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialog({ open: false, postId: '' })}>
              İptal
            </Button>
            <Button 
              onClick={() => handleDeletePost(deleteDialog.postId)} 
              color="error" 
              variant="contained"
            >
              Sil
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default AdminBlog;

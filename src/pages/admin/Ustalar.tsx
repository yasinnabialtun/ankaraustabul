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
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  Rating
} from '@mui/material';
import {
  Search,
  UserPlus,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Star,
  Phone,
  Mail,
  Award,
  Users,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Usta {
  id: string;
  name: string;
  email: string;
  phone: string;
  category: string;
  experience: number;
  rating: number;
  completedJobs: number;
  location: string;
  hourlyRate: number;
  status: 'pending' | 'approved' | 'rejected';
  verified: boolean;
  featured: boolean;
}

const AdminUstalar: React.FC = () => {
  const [ustalar, setUstalar] = useState<Usta[]>([]);
  const [filteredUstalar, setFilteredUstalar] = useState<Usta[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [deleteDialog, setDeleteDialog] = useState({ open: false, ustaId: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [ustalarPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  // Mock data
  useEffect(() => {
    const mockUstalar: Usta[] = [
      {
        id: '1',
        name: 'Ali Veli',
        email: 'ali.veli@email.com',
        phone: '+90 532 123 45 67',
        category: 'Elektrikçi',
        experience: 8,
        rating: 4.9,
        completedJobs: 156,
        location: 'Çankaya, Ankara',
        hourlyRate: 150,
        status: 'approved',
        verified: true,
        featured: true
      },
      {
        id: '2',
        name: 'Ayşe Demir',
        email: 'ayse.demir@email.com',
        phone: '+90 543 234 56 78',
        category: 'Tesisatçı',
        experience: 12,
        rating: 4.8,
        completedJobs: 203,
        location: 'Kızılay, Ankara',
        hourlyRate: 180,
        status: 'approved',
        verified: true,
        featured: false
      },
      {
        id: '3',
        name: 'Mehmet Kaya',
        email: 'mehmet.kaya@email.com',
        phone: '+90 554 345 67 89',
        category: 'Boyacı',
        experience: 6,
        rating: 4.6,
        completedJobs: 98,
        location: 'Mamak, Ankara',
        hourlyRate: 120,
        status: 'pending',
        verified: false,
        featured: false
      }
    ];
    
    setTimeout(() => {
      setUstalar(mockUstalar);
      setFilteredUstalar(mockUstalar);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter ustalar
  useEffect(() => {
    let filtered = ustalar;

    if (searchTerm) {
      filtered = filtered.filter(usta => 
        usta.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        usta.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        usta.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterCategory !== 'all') {
      filtered = filtered.filter(usta => usta.category === filterCategory);
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(usta => usta.status === filterStatus);
    }

    setFilteredUstalar(filtered);
    setCurrentPage(1);
  }, [searchTerm, filterCategory, filterStatus, ustalar]);

  const handleDeleteUsta = (ustaId: string) => {
    setUstalar(ustalar.filter(usta => usta.id !== ustaId));
    setDeleteDialog({ open: false, ustaId: '' });
  };

  const handleStatusChange = (ustaId: string, newStatus: 'approved' | 'rejected') => {
    setUstalar(ustalar.map(usta => 
      usta.id === ustaId ? { ...usta, status: newStatus } : usta
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'success';
      case 'pending': return 'warning';
      case 'rejected': return 'error';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'approved': return 'Onaylı';
      case 'pending': return 'Bekliyor';
      case 'rejected': return 'Reddedildi';
      default: return status;
    }
  };

  const categories = ['Elektrikçi', 'Tesisatçı', 'Boyacı'];
  const statuses = ['approved', 'pending', 'rejected'];

  // Pagination
  const indexOfLastUsta = currentPage * ustalarPerPage;
  const indexOfFirstUsta = indexOfLastUsta - ustalarPerPage;
  const currentUstalar = filteredUstalar.slice(indexOfFirstUsta, indexOfLastUsta);
  const totalPages = Math.ceil(filteredUstalar.length / ustalarPerPage);

  const stats = [
    { label: 'Toplam Usta', value: ustalar.length, icon: Users, color: '#3b82f6' },
    { label: 'Aktif Usta', value: ustalar.filter(u => u.status === 'approved').length, icon: CheckCircle, color: '#10b981' },
    { label: 'Bekleyen', value: ustalar.filter(u => u.status === 'pending').length, icon: Clock, color: '#f59e0b' },
    { label: 'Ortalama Puan', value: (ustalar.reduce((sum, usta) => sum + usta.rating, 0) / ustalar.length).toFixed(1), icon: Star, color: '#ef4444' }
  ];

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" className="text-readable" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Usta Yönetimi
          </Typography>
          <Typography variant="body1" className="text-readable-light" gutterBottom>
            Ustaları yönetin, onaylayın ve profillerini düzenleyin
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
                  placeholder="Ustalar arasında ara..."
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
                  startIcon={<UserPlus size={20} />}
                >
                  Yeni Usta Ekle
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Ustalar Table */}
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
                    <TableCell className="text-readable"><strong>Usta</strong></TableCell>
                    <TableCell className="text-readable"><strong>İletişim</strong></TableCell>
                    <TableCell className="text-readable"><strong>Kategori</strong></TableCell>
                    <TableCell className="text-readable"><strong>Deneyim</strong></TableCell>
                    <TableCell className="text-readable"><strong>Puan</strong></TableCell>
                    <TableCell className="text-readable"><strong>Durum</strong></TableCell>
                    <TableCell className="text-readable"><strong>İşlemler</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentUstalar.map((usta, index) => (
                    <TableRow key={usta.id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={{ width: 40, height: 40 }}>
                            {usta.name.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography variant="body2" className="text-readable" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                              {usta.name}
                              {usta.verified && <CheckCircle size={14} color="#10b981" style={{ marginLeft: 8 }} />}
                            </Typography>
                            <Typography variant="caption" className="text-readable-light">
                              {usta.location}
                            </Typography>
                            {usta.featured && (
                              <Chip label="Öne Çıkan" size="small" color="primary" sx={{ ml: 1 }} />
                            )}
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                            <Phone size={12} className="text-readable-light" />
                            <Typography variant="caption" className="text-readable">
                              {usta.phone}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Mail size={12} className="text-readable-light" />
                            <Typography variant="caption" className="text-readable">
                              {usta.email}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip label={usta.category} size="small" variant="outlined" />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Award size={14} className="text-readable-light" />
                          <Typography variant="body2" className="text-readable">
                            {usta.experience} yıl
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Rating value={usta.rating} readOnly size="small" precision={0.1} />
                          <Typography variant="body2" className="text-readable">
                            {usta.rating}
                          </Typography>
                        </Box>
                        <Typography variant="caption" className="text-readable-light">
                          {usta.completedJobs} iş
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={getStatusLabel(usta.status)} 
                          size="small" 
                          color={getStatusColor(usta.status) as any}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                          <IconButton size="small" color="primary">
                            <Eye size={16} />
                          </IconButton>
                          <IconButton size="small" color="primary">
                            <Edit size={16} />
                          </IconButton>
                          {usta.status === 'pending' && (
                            <>
                              <IconButton 
                                size="small" 
                                color="success"
                                onClick={() => handleStatusChange(usta.id, 'approved')}
                              >
                                <CheckCircle size={16} />
                              </IconButton>
                              <IconButton 
                                size="small" 
                                color="error"
                                onClick={() => handleStatusChange(usta.id, 'rejected')}
                              >
                                <XCircle size={16} />
                              </IconButton>
                            </>
                          )}
                          <IconButton 
                            size="small" 
                            color="error"
                            onClick={() => setDeleteDialog({ open: true, ustaId: usta.id })}
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
          onClose={() => setDeleteDialog({ open: false, ustaId: '' })}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle className="text-readable">Ustayı Sil</DialogTitle>
          <DialogContent>
            <Typography className="text-readable">
              Bu ustayı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialog({ open: false, ustaId: '' })}>
              İptal
            </Button>
            <Button 
              onClick={() => handleDeleteUsta(deleteDialog.ustaId)} 
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

export default AdminUstalar;

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Test endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Ankara Usta Bul Backend API',
    status: 'running',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Backend API çalışıyor',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Test payment endpoint
app.post('/api/payment/initiate', (req, res) => {
  console.log('Payment initiated:', req.body);
  res.json({
    success: true,
    transactionId: 'TEST_' + Date.now(),
    redirectUrl: 'https://ankaraustabulweb.vercel.app/payment-success'
  });
});

// Test payment status
app.get('/api/payment/status/:transactionId', (req, res) => {
  console.log('Payment status check:', req.params.transactionId);
  res.json({
    success: true,
    transactionId: req.params.transactionId,
    status: 'success'
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Sunucu hatası'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint bulunamadı',
    path: req.originalUrl
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Server URL: http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
}); 
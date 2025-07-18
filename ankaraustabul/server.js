import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Backend API çalışıyor',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.post('/api/payment/initiate', (req, res) => {
  console.log('Payment initiated:', req.body);
  
  res.json({
    success: true,
    transactionId: 'TEST_' + Date.now(),
    redirectUrl: 'https://ankaraustabul.onrender.com/payment-success'
  });
});

app.get('/api/payment/status/:transactionId', (req, res) => {
  const { transactionId } = req.params;
  console.log('Payment status check:', transactionId);
  
  res.json({
    success: true,
    transactionId: transactionId,
    status: 'success'
  });
});

// SPA Routes - Catch all handler
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 
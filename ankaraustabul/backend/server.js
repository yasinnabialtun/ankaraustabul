const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Memory optimization
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

// Middleware with memory optimization
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5177',
  credentials: true
}));

// Limit body size to prevent memory issues
app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));

// Memory monitoring
const used = process.memoryUsage();
console.log(`Memory usage: ${Math.round(used.heapUsed / 1024 / 1024 * 100) / 100} MB`);

// Shopier konfigürasyonu
const SHOPIER_CONFIG = {
  apiKey: process.env.SHOPIER_API_KEY || 'sandbox_api_key',
  secretKey: process.env.SHOPIER_SECRET_KEY || 'sandbox_secret_key',
  merchantId: process.env.SHOPIER_MERCHANT_ID || 'sandbox_merchant_id',
  environment: process.env.SHOPIER_ENVIRONMENT || 'sandbox'
};

// Shopier API URL'leri
const getShopierApiUrl = () => {
  return SHOPIER_CONFIG.environment === 'production' 
    ? 'https://api.shopier.com/v1'
    : 'https://sandbox-api.shopier.com/v1';
};

// İmza oluşturma fonksiyonu
const generateSignature = (data) => {
  const hash = crypto.createHmac('sha256', SHOPIER_CONFIG.secretKey);
  hash.update(JSON.stringify(data));
  return hash.digest('hex');
};

// Rate limiting for memory optimization
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

app.use('/api/', limiter);

// Ödeme başlatma endpoint'i
app.post('/api/payment/initiate', async (req, res) => {
  try {
    const { amount, currency, orderId, customerInfo, items } = req.body;

    // Input validation
    if (!amount || !currency || !orderId || !customerInfo || !items) {
      return res.status(400).json({
        success: false,
        error: 'Eksik parametreler'
      });
    }

    // Ödeme verisi hazırlama
    const paymentData = {
      amount,
      currency,
      orderId,
      customerInfo,
      items,
      merchantId: SHOPIER_CONFIG.merchantId,
      timestamp: Date.now(),
      callbackUrl: `${req.protocol}://${req.get('host')}/api/payment/callback`,
      returnUrl: `${req.protocol}://${req.get('host')}/api/payment/return`
    };

    // İmza oluşturma
    paymentData.signature = generateSignature(paymentData);

    // Shopier API'ye istek gönderme
    const response = await axios.post(`${getShopierApiUrl()}/payment/init`, paymentData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SHOPIER_CONFIG.apiKey}`,
        'X-Merchant-Id': SHOPIER_CONFIG.merchantId
      },
      timeout: 10000 // 10 second timeout
    });

    if (response.data.success) {
      res.json({
        success: true,
        transactionId: response.data.transactionId,
        redirectUrl: response.data.redirectUrl
      });
    } else {
      res.status(400).json({
        success: false,
        error: response.data.error || 'Ödeme başlatılamadı'
      });
    }
  } catch (error) {
    console.error('Payment initiation error:', error);
    res.status(500).json({
      success: false,
      error: 'Ödeme servisi şu anda kullanılamıyor'
    });
  }
});

// Ödeme durumu sorgulama endpoint'i
app.get('/api/payment/status/:transactionId', async (req, res) => {
  try {
    const { transactionId } = req.params;

    if (!transactionId) {
      return res.status(400).json({
        success: false,
        error: 'Transaction ID gerekli'
      });
    }

    const response = await axios.get(`${getShopierApiUrl()}/payment/status/${transactionId}`, {
      headers: {
        'Authorization': `Bearer ${SHOPIER_CONFIG.apiKey}`,
        'X-Merchant-Id': SHOPIER_CONFIG.merchantId
      },
      timeout: 5000 // 5 second timeout
    });

    res.json({
      success: response.data.status === 'success',
      transactionId: response.data.transactionId,
      status: response.data.status,
      error: response.data.status === 'failed' ? response.data.error : undefined
    });
  } catch (error) {
    console.error('Payment status check error:', error);
    res.status(500).json({
      success: false,
      error: 'Ödeme durumu sorgulanamadı'
    });
  }
});

// Webhook endpoint'i
app.post('/api/payment/webhook', (req, res) => {
  try {
    const { signature } = req.headers;
    const payload = req.body;

    // Webhook imzasını doğrulama
    const expectedSignature = generateSignature(payload);
    
    if (signature !== expectedSignature) {
      console.error('Invalid webhook signature');
      return res.status(400).json({ error: 'Invalid signature' });
    }

    // Webhook verilerini işleme
    console.log('Webhook received:', payload);

    // Burada veritabanına kaydetme işlemleri yapılabilir
    // Örneğin: ödeme durumunu güncelleme, kullanıcıya bildirim gönderme vb.

    res.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

// Callback endpoint'i (Shopier'den dönüş)
app.get('/api/payment/callback', (req, res) => {
  const { transactionId, status } = req.query;
  console.log('Payment callback:', { transactionId, status });
  
  // Burada gerekli işlemleri yapabilirsiniz
  res.json({ success: true });
});

// Return endpoint'i (kullanıcı dönüşü)
app.get('/api/payment/return', (req, res) => {
  const { transactionId, status } = req.query;
  console.log('Payment return:', { transactionId, status });
  
  // Frontend'e yönlendirme
  res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5177'}/payment-result?transactionId=${transactionId}&status=${status}`);
});

// Test endpoint'i
app.get('/api/health', (req, res) => {
  const used = process.memoryUsage();
  res.json({ 
    status: 'OK', 
    message: 'Backend API çalışıyor',
    memory: {
      heapUsed: `${Math.round(used.heapUsed / 1024 / 1024 * 100) / 100} MB`,
      heapTotal: `${Math.round(used.heapTotal / 1024 / 1024 * 100) / 100} MB`,
      external: `${Math.round(used.external / 1024 / 1024 * 100) / 100} MB`
    },
    shopierConfig: {
      environment: SHOPIER_CONFIG.environment,
      merchantId: SHOPIER_CONFIG.merchantId
    }
  });
});

// Error handling middleware
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
    error: 'Endpoint bulunamadı'
  });
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
  console.log(`Shopier Environment: ${SHOPIER_CONFIG.environment}`);
  console.log(`Memory usage: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100} MB`);
}); 
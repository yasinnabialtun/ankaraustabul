const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

// Ödeme başlatma endpoint'i
app.post('/api/payment/initiate', async (req, res) => {
  try {
    const { amount, currency, orderId, customerInfo, items } = req.body;

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
      }
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

    const response = await axios.get(`${getShopierApiUrl()}/payment/status/${transactionId}`, {
      headers: {
        'Authorization': `Bearer ${SHOPIER_CONFIG.apiKey}`,
        'X-Merchant-Id': SHOPIER_CONFIG.merchantId
      }
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
  res.redirect(`http://localhost:5177/payment-result?transactionId=${transactionId}&status=${status}`);
});

// Test endpoint'i
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Backend API çalışıyor',
    shopierConfig: {
      environment: SHOPIER_CONFIG.environment,
      merchantId: SHOPIER_CONFIG.merchantId
    }
  });
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
  console.log(`Shopier Environment: ${SHOPIER_CONFIG.environment}`);
}); 
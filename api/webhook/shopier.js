// Shopier Webhook Handler
import { verifyWebhook } from '../../src/services/shopierService';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { body, headers } = req;
    const signature = headers['x-shopier-signature'];

    // Webhook doğrulama
    if (!verifyWebhook(body, signature)) {
      console.error('❌ Webhook doğrulama başarısız');
      return res.status(401).json({ error: 'Invalid signature' });
    }

    const { transaction_id, status, amount } = body;

    console.log('✅ Shopier webhook alındı:', {
      transaction_id,
      status,
      amount
    });

    // Ödeme durumuna göre işlem
    if (status === 'completed') {
      // Ödeme başarılı - usta kaydını onayla
      console.log('💰 Ödeme başarılı:', transaction_id);
      
      // Firebase'de usta durumunu güncelle
      // Bu kısım Firebase Admin SDK ile yapılacak
    } else if (status === 'failed') {
      // Ödeme başarısız
      console.log('❌ Ödeme başarısız:', transaction_id);
    }

    res.status(200).json({ success: true });

  } catch (error) {
    console.error('❌ Webhook işleme hatası:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
} 
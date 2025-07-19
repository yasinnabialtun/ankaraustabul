// Shopier API Proxy Endpoint
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { paymentData, targetUrl } = req.body;

    console.log('💳 Shopier API proxy isteği:', {
      targetUrl,
      paymentData: { ...paymentData, api_password: '***' }
    });

    // Shopier API'ye istek gönder
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'AnkaraUstaBul/1.0'
      },
      body: JSON.stringify(paymentData)
    });

    console.log('💳 Shopier API yanıt durumu:', response.status, response.statusText);

    if (response.ok) {
      const result = await response.json();
      console.log('💳 Shopier API yanıtı:', result);

      res.status(200).json(result);
    } else {
      const errorText = await response.text();
      console.error('❌ Shopier API HTTP hatası:', errorText);
      
      res.status(response.status).json({
        success: false,
        error: `API hatası: ${response.status} ${response.statusText}`
      });
    }

  } catch (error) {
    console.error('❌ Shopier API proxy hatası:', error);
    
    res.status(500).json({
      success: false,
      error: 'Proxy bağlantı hatası'
    });
  }
} 
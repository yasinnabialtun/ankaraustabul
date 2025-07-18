module.exports = (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  console.log('Payment initiated:', req.body);
  
  res.status(200).json({
    success: true,
    transactionId: 'TEST_' + Date.now(),
    redirectUrl: 'https://ankaraustabulweb.vercel.app/payment-success'
  });
} 
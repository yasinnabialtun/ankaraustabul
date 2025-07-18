module.exports = function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { transactionId } = req.query;
  console.log('Payment status check:', transactionId);
  
  res.status(200).json({
    success: true,
    transactionId: transactionId,
    status: 'success'
  });
} 
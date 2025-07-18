module.exports = function handler(req, res) {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Backend API çalışıyor',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
} 
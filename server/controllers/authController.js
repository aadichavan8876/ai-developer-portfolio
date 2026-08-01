const jwt = require('jsonwebtoken');

const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@adityachavan.dev';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';

  if (email === adminEmail && password === adminPassword) {
    const token = jwt.sign(
      { email, role: 'admin' },
      process.env.JWT_SECRET || 'super_secret_jwt_key_aditya_portfolio_2026',
      { expiresIn: '7d' }
    );
    return res.json({
      success: true,
      token,
      admin: { name: 'Aditya Rajesh Chavan', email }
    });
  }

  return res.status(401).json({ success: false, message: 'Invalid admin credentials.' });
};

module.exports = { adminLogin };

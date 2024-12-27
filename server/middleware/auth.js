const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {  
    console.log(req.cookies);
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: 'Token missing' });
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        console.error('Token verification failed:');
        return res.status(401).json({ error: 'Unauthorized access' });
      }
      req.user = decoded;
      next();
    });
  };
const jwt = require("jsonwebtoken");
require('dotenv').config();
exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(403).json({ message: "No token provided" });  
    const SECRET_KEY = process.env.JWT_SECRET;
    jwt.verify(token, SECRET_KEY, (err, decoded) => { 
      if (err) return res.status(401).json({ message: "Invalid token" });  
      // req.user = decoded;  
      next();  
    });
  };
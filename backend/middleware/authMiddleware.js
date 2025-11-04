require('dotenv').config();
const jwt = require("jsonwebtoken");

// Secret key untuk sign token
const SECRET_KEY = process.env.JWT_SECRET || "";

// Middleware untuk memeriksa token JWT
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // simpan payload token di req.user
    next();
  } catch (err) {
    console.log(err)
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = verifyToken;
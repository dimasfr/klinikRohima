// middleware/authorizeRole.js
const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user?.role;

    if (!userRole) {
      return res.status(401).json({ message: "Role tidak ditemukan di token" });
    }

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: "Akses ditolak: tidak memiliki izin" });
    }

    next();
  };
};

module.exports = authorizeRole;
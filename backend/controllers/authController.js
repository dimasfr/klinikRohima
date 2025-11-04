import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// ==================== LOGIN ====================
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Password salah" });

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.position },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );

    res.json({
      message: "Login berhasil",
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        username: user.username,
        position: user.position,
        department: user.department,
        phone: user.phone,
        email: user.email,
        avatarUrl: user.avatarUrl,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  position: { type: String, default: "User", required: true },
  department: [{ type: String, required: true }],
  noId: { type: String, required: true, unique: true },
  jenisKelamin: { type: String },
  tempatLahir: { type: String, required: true },
  tanggalLahir: { type: Date, required: true },
  provinsi: { type: String, default: null },
  kabupaten: { type: String, default: null },
  kecamatan: { type: String, default: null },
  kelurahan: { type: String, default: null },
  alamat: { type: String, default: null },
  kodePos: { type: String, default: null },
  tanggalMulaiKontrak: { type: Date, default: null },
  tanggalSelesaiKontrak: { type: Date, default: null },
  statusMenikah: { type: String, default: null },
  avatarUrl: { type: String, default: null },
  createdAt: { type: Date, default: null },
  updatedAt: { type: Date, default: null },
  deletedAt: { type: Date, default: null },
});

export default mongoose.model("User", userSchema);

// controllers/employeeController.js
import Employee from "../models/User.js";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

// GET all employees
export const getAllEmployees = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", status = "", role = "" } = req.query;

    const query = {};

    // filter by status
    if (status === "Aktif") query.deletedAt = null;
    else if (status === "Non-Aktif") query.deletedAt = { $ne: null };

    // filter by role/department
    if (role) query.department = role;

    // search by name (case-insensitive)
    if (search) query.fullName = { $regex: search, $options: "i" };

    // count total data
    const total = await Employee.countDocuments(query);

    // ambil data dengan pagination
    const employees = await Employee.find(query)
      .select("-username -phone -email -password")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      data: employees,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

};

// GET employee by id
export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findOne({ id: req.params.id }).select("-password");
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE employee
export const createEmployee = async (req, res) => {
  try {
    const {
      fullName,
      username,
      email,
      password,
      phone,
      department,
      avatarUrl,
      noId,
      jenisKelamin,
      tempatLahir,
      tanggalLahir,
      provinsi,
      kabupaten,
      kecamatan,
      kelurahan,
      alamat,
      kodePos,
      tanggalMulaiKontrak,
      tanggalSelesaiKontrak,
      statusMenikah,
    } = req.body;

    // Validasi dasar
    if (!fullName || !username || !email || !password) {
      return res.status(400).json({
        message: "fullName, username, email, dan password wajib diisi",
      });
    }

    // Cek duplikat email/username
    const existingEmployee = await Employee.findOne({
      $or: [{ email }, { username }],
    });
    if (existingEmployee) {
      return res
        .status(409)
        .json({ message: "Username atau email sudah terdaftar" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const employee = await Employee.create({
      id: uuidv4(),
      fullName,
      username,
      email,
      password: hashedPassword,
      phone: phone || null,
      department: department || [],
      avatarUrl: avatarUrl || null,
      noId: noId || null,
      jenisKelamin: jenisKelamin || null,
      tempatLahir: tempatLahir || null,
      tanggalLahir: tanggalLahir || null,
      provinsi: provinsi || null,
      kabupaten: kabupaten || null,
      kecamatan: kecamatan || null,
      kelurahan: kelurahan || null,
      alamat: alamat || null,
      kodePos: kodePos || null,
      tanggalMulaiKontrak: tanggalMulaiKontrak || null,
      tanggalSelesaiKontrak: tanggalSelesaiKontrak || null,
      statusMenikah: statusMenikah || null,
      createdAt: new Date(),
    });

    res.status(201).json({
      message: "Employee berhasil dibuat",
      employee: {
        id: employee.id,
        fullName: employee.fullName,
        username: employee.username,
        email: employee.email,
        phone: employee.phone,
        department: employee.department,
        avatarUrl: employee.avatarUrl,
        noId: employee.noId,
        jenisKelamin: employee.jenisKelamin,
        tempatLahir: employee.tempatLahir,
        tanggalLahir: employee.tanggalLahir,
        provinsi: employee.provinsi,
        kabupaten: employee.kabupaten,
        kecamatan: employee.kecamatan,
        kelurahan: employee.kelurahan,
        alamat: employee.alamat,
        kodePos: employee.kodePos,
        tanggalMulaiKontrak: employee.tanggalMulaiKontrak,
        tanggalSelesaiKontrak: employee.tanggalSelesaiKontrak,
        statusMenikah: employee.statusMenikah,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE employee
export const updateEmployee = async (req, res) => {
  try {
    const updateData = { ...req.body, updatedAt: new Date() };

    // Jika password ada dan tidak kosong → hash password
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    } else {
      delete updateData.password; // hapus agar tidak overwrite password lama
    }

    const updatedEmployee = await Employee.findOneAndUpdate(
      { id: req.params.id },
      updateData,
      { new: true }
    );

    if (!updatedEmployee)
      return res.status(404).json({ message: "Employee not found" });

    res.json(updatedEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE employee
export const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    // Set deletedAt ke waktu saat ini
    employee.deletedAt = new Date();
    await employee.save();

    res.json({
      message: "Employee deleted",
      data: {
        id: employee.id,
        fullName: employee.fullName,
        deletedAt: employee.deletedAt,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


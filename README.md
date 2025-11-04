# 🏥 Klinik Rohima

**Klinik Rohima** adalah aplikasi web internal untuk mengelola data karyawan dan aktivitas operasional dasar di lingkungan Klinik Rohima.  
Aplikasi ini dibangun menggunakan **React** untuk frontend dan **Express.js** untuk backend, dengan penyimpanan data pada **MongoDB**.  

Proyek ini dilengkapi autentikasi berbasis **JWT**, sistem hak akses **User dan Admin**, serta pengalaman pengguna yang interaktif berkat integrasi **Toast Notification**, **Tailwind CSS**, dan **React Router**.

---

## ✨ Fitur Utama

- 🔐 **Login** dengan autentikasi JWT  
- 📊 **Dashboard** menampilkan ringkasan data dan statistik  
- 👥 **Daftar Karyawan**: tambah, ubah, dan lihat data karyawan  
- 🧩 **Role-based Access Control (RBAC)**  
  - **Admin:** dapat menambah & memperbarui data karyawan  
  - **User:** hanya dapat melihat daftar karyawan 
- ⚡ **Notifikasi Real-time** menggunakan **Toast (error, success, warning)**  
- 🧭 Navigasi modern dengan **React Router**  
- 🎨 Desain bersih dan responsif dengan **Tailwind CSS**

---

## 🛠️ Teknologi yang Digunakan

### **Frontend**
- ⚛️ React.js  
- 🌈 Tailwind CSS  
- 🔔 React Hot Toast  
- 🔗 React Router DOM  
- ⚙️ Axios  

### **Backend**
- 🚀 Express.js  
- 🧱 MongoDB + Mongoose  
- 🔐 JWT (JSON Web Token) untuk autentikasi  
- 🔒 bcrypt.js untuk enkripsi password  

---

## ⚙️ Instalasi & Menjalankan Proyek

### 1. Clone Repository
```bash
git clone https://github.com/dimasfr/klinikRohima.git
cd klinikRohima
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Buat file `.env` di folder `backend`:
```
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
JWT_EXPIRES=7d
```

Jalankan server backend:
```bash
npm run dev
```

### 3. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

Akses aplikasi di:
👉 `http://localhost:5173`

---

## 📁 Struktur Proyek

```
Klinik-Rohima/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── employeeController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── authorizeRole.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── employeeRoutes.js
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── LoadingOverlay.jsx
│   │   │   │   └── Toast.jsx
│   │   │   ├── DatePickerField.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── NotificationBell.jsx
│   │   │   ├── ProfileModal.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── data/
│   │   │   └── dataWilayah.js
│   │   ├── hooks/
│   │   │   └── useAuthCheck.js
│   │   ├── layouts/
│   │   │   └── MainLayout.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── DataKaryawan.jsx
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   └── employeeService.js
│   │   ├── utils/
│   │   │   └── apiClient.js
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

---

## 📡 API Endpoint

### **Auth (`/auth`)**
| Method | Endpoint | Deskripsi |
|--------|-----------|-----------|
| POST | `/auth/login` | Login pengguna & generate JWT |
| GET | `/auth/verify` | Verifikasi token JWT dan ambil data user |

### **Employee (`/employee`)**
| Method | Endpoint | Deskripsi |
|--------|-----------|-----------|
| GET | `/employee` | Ambil semua data karyawan |
| GET | `/employee/:id` | Ambil satu data karyawan |
| POST | `/employee` | Tambah karyawan (Admin only) |
| PUT | `/employee/:id` | Update data karyawan (Admin only) |
| DELETE | `/employee/:id` | Hapus karyawan (Admin only) |

---

## 🔐 Role & Akses

| Role | Hak Akses |
|------|------------|
| **Admin** | Tambah, ubah, dan lihat karyawan |
| **User** | Hanya dapat melihat daftar karyawan |

---

## 💬 Notifikasi Toast

Terdapat 3 jenis toast:
- ✅ **Success** — operasi berhasil  
- ⚠️ **Warning** — aksi perlu perhatian  
- ❌ **Error** — terjadi kesalahan (contoh: gagal memuat data, token tidak valid)

Dikonfigurasi menggunakan:
```jsx
import { Toaster, toast } from "react-hot-toast";
```

---

## 🧑‍💻 Author

**Dimas Fajar Ramadhan**  
Fullstack Developer — Laravel + Vue  
📧 dimasfr918@gmail.com  
🌐 https://github.com/dimasfr

---

## 📜 License

This project is licensed under the **MIT License**.

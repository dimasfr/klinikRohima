import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import DatePickerField from "../components/DatePickerField";
import { User, MoreVertical, ChevronRight, Search, Plus } from "lucide-react";
import dataWilayah from "../data/dataWilayah";
import { getEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployee } from "../services/employeeService";
import LoadingOverlay from "../components/common/LoadingOverlay";
import { toastError, toastSuccess, toastWarning } from "../components/common/Toast";

const employeeSchema = Yup.object().shape({
  fullName: Yup.string().required("Nama lengkap wajib diisi"),
  noId: Yup.string().required("Nomor identitas wajib diisi"),
  jenisKelamin: Yup.string().required("Jenis kelamin wajib dipilih"),
  tempatLahir: Yup.string().required("Tempat lahir wajib diisi"),
  tanggalLahir: Yup.date()
    .transform((value, originalValue) =>
      originalValue === "" ? null : value
    )
    .nullable()
    .required("Tanggal lahir wajib diisi")
    .max(new Date(), "Tanggal lahir tidak boleh di masa depan"),
  username: Yup.string()
    .required("Username wajib diisi")
    .matches(/^[a-zA-Z0-9_]+$/, "Username hanya boleh huruf, angka, dan underscore")
    .min(3, "Username minimal 3 karakter")
    .max(30, "Username maksimal 30 karakter"),
  email: Yup.string()
    .email("Format email tidak valid")
    .required("Email wajib diisi"),
  password: Yup.string().when("status", {
    is: "New",
    then: (schema) => schema.required("Password wajib diisi"),
  }),
  department: Yup.array()
    .min(1, "Pilih minimal satu department")
    .required("Department wajib dipilih"),
});

const DataKaryawan = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [roleFilter, setRoleFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage] = useState(10);

  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("New"); // "New" atau "Edit"
  const [error, setError] = useState({});

  const toggleMenu = () => setShowMenu((prev) => !prev);
  const user = JSON.parse(localStorage.getItem("user"));

  // State untuk form
  const [formData, setFormData] = useState({
    id: "",
    fullName: "",
    noId: "",
    jenisKelamin: "",
    tempatLahir: "",
    tanggalLahir: "",
    phone: "",
    provinsi: "",
    kabupaten: "",
    kecamatan: "",
    kelurahan: "",
    alamat: "",
    kodePos: "",
    username: "",
    email: "",
    password: "",
    department: [],
    tanggalMulaiKontrak: "",
    tanggalSelesaiKontrak: "",
    statusMenikah: ""
  });

  useEffect(() => {
    fetchEmployees();
  }, [page, search, roleFilter, statusFilter]);

  const fetchEmployees = async () => {
    setLoading(true);
    setError({});

    try {
      const response = await getEmployees({
        page,
        limit: perPage,
        search,
        status: statusFilter,
        role: roleFilter
      });

      setEmployees(response.data);
      setTotalPages(response.totalPages);
    } catch (err) {
      if (err.response?.status === 401) {
        // Token habis → logout otomatis
        localStorage.removeItem("token");
        window.location.href = "/login";
      } else {
        console.error("Gagal mengambil data:", err);
        setError({ global: "Gagal mengambil data karyawan" });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDetail = async (id) => {
    setLoading(true);
    setError({});

    try {
      const data = await getEmployeeById(id);
      setFormData((prev) => ({
        ...prev,
        ...data,
      }));
      setStatus("Edit");
    } catch (error) {
      console.error("Gagal mengambil data karyawan:", err);
      setError({ global: "Gagal mengambil data karyawan" });
    } finally {
      setLoading(false);
    }
  }

  const handleBatal = () => {
    handleResetForm();
  }

  const handleDelete = async (id) => {
    await deleteEmployee(id);
    fetchEmployees(); // refresh list
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => {
      // Untuk dropdown wilayah berantai
      if (name === "provinsi") {
        return { ...prev, provinsi: value, kabupaten: "", kecamatan: "", kelurahan: "" };
      } else if (name === "kabupaten") {
        return { ...prev, kabupaten: value, kecamatan: "", kelurahan: "" };
      } else if (name === "kecamatan") {
        return { ...prev, kecamatan: value, kelurahan: "" };
      } 
      
      // Untuk checkbox multiple (department)
      if (type === "checkbox") {
        return {
          ...prev,
          [name]: checked
            ? [...prev[name], value] // tambah value jika dicentang
            : prev[name].filter((v) => v !== value), // hapus value jika dicentang lagi
        };
      }

      // Untuk input / select biasa
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);

    try {
      await employeeSchema.validate({ ...formData, status }, { abortEarly: false });

      if (status === "New") {
        await createEmployee(formData);
        toastSuccess("Data karyawan berhasil ditambahkan!");
      } else if (status === "Edit") {
        await updateEmployee(formData.id, formData);
        toastSuccess("Data karyawan berhasil diperbarui!");
      }

      handleResetForm();
    } catch (err) {
      if (err.name === "ValidationError") {
        // Mapping semua error Yup ke bentuk object agar mudah ditampilkan
        const formattedErrors = {};
        err.inner.forEach((e) => {
          formattedErrors[e.path] = e.message;
        });
        setError(formattedErrors);
      } else {
        toastError(err.response?.data?.message || err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetForm = () => {
    // Reset form setelah submit
    setFormData({
      id: "",
      fullName: "",
      noId: "",
      jenisKelamin: "",
      tempatLahir: "",
      tanggalLahir: "",
      phone: "",
      provinsi: "",
      kabupaten: "",
      kecamatan: "",
      kelurahan: "",
      alamat: "",
      kodePos: "",
      username: "",
      email: "",
      password: "",
      department: [],
      tanggalMulaiKontrak: "",
      tanggalSelesaiKontrak: "",
      statusMenikah: ""
    });
    setError({});
    setStatus("New");
  }

  const handleTambahKaryawan = () => {
    handleResetForm();
    setShowMenu(false);
  };

  const departmentOptions = [
    "Resepsionis", "Manager", "Purchasing", "Keuangan", "Kasir", "Farmasi", "Laboran"
  ];

  const departmentMedicalOptions = [
    "Perawat", "Bidan", "Dokter", "Lainnya"
  ]

  const filterDepartments = departmentOptions.concat(departmentMedicalOptions);

  const kabupatenList = formData.provinsi
    ? Object.keys(dataWilayah[formData.provinsi] || {})
    : [];

  const kecamatanList = Object.keys(
    dataWilayah[formData.provinsi]?.[formData.kabupaten] ?? {}
  );

  const kelurahanList = Object.values(
    dataWilayah[formData.provinsi]?.[formData.kabupaten]?.[formData.kecamatan] ?? {}
  );

  return (
    <div className={`${loading ? "opacity-30 pointer-events-none" : "grid lg:grid-cols-[30%_70%] gap-4"}`}>
      <LoadingOverlay show={loading} text="Memuat data pengguna..." />
      {/* Daftar Karyawan */}
      <div className="bg-white rounded-xl shadow border border-gray-100">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-semibold text-gray-700 flex items-center gap-2 uppercase text-sm">
            <User size={18} className="text-blue-600" />
            Data Karyawan & Tenaga Kesehatan
          </h3>
          <div className="relative">
            <button
              className="text-gray-400 hover:text-gray-600 relative"
              onClick={toggleMenu}
            >
              <MoreVertical size={18} />
            </button>

            {/* Dropdown Menu */}
            {showMenu && (
              <div className="absolute right-2 top-4 bg-white border border-gray-200 shadow-lg rounded-md w-44 z-10">
                <button
                  onClick={handleTambahKaryawan}
                  className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Plus size={14} className="text-blue-600" />
                  Tambah Karyawan
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="p-4">
        {/* Dropdown Filter Role */}
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 text-sm mb-3 focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Semua Karyawan</option>
          {filterDepartments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        {/* Filter Status */}
        <label className="block mb-1 text-gray-500 text-xs font-medium">Status</label>
        <div className="grid grid-cols-3 gap-2 mb-3">
          {["Semua", "Aktif", "Non-Aktif"].map((status) => (
            <button
              key={status}
              onClick={() => {
                setStatusFilter(status);
                setPage(1);
              }}
              className={`py-2 rounded-md text-xs font-medium w-full border ${
                statusFilter === status
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100 border-gray-200"
              }`}
            >
              {status.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <input
            type="text"
            placeholder="Pencarian"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full border border-gray-300 rounded-md p-2 text-sm pl-3 pr-9 focus:ring-2 focus:ring-blue-500"
          />
          <Search
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>

        {/* Tabel */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-100 rounded-md overflow-hidden">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="text-center py-2 px-2 font-medium text-xs w-5">#</th>
                <th className="text-left py-2 px-3 font-medium text-xs">
                  Karyawan / Tenaga Kesehatan
                </th>
                <th className="text-center py-2 px-3 font-medium text-xs w-12"></th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, idx) => (
                <tr
                  key={emp.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="py-2 px-2 text-gray-600 text-center text-xs">
                    {(page - 1) * perPage + idx + 1}
                  </td>
                  <td className="py-2 px-3">
                    <p className="font-semibold text-gray-800 text-sm">
                      {emp.fullName}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {Array.isArray(emp.department)
                        ? emp.department.join(", ")
                        : emp.department}
                    </p>
                    <span
                      className={`inline-block mt-1 px-2 py-0.5 text-xs rounded ${
                        emp.deletedAt
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {emp.deletedAt ? "Non-Aktif" : "Aktif"}
                    </span>
                  </td>
                  <td className="text-center">
                    <button
                      className="p-2 bg-blue-50 text-blue-500 rounded-full hover:bg-blue-100"
                      onClick={() => handleDetail(emp.id)}
                    >
                      <ChevronRight size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {employees.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center py-3 text-gray-500 text-sm">
                    Tidak ada data ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center text-xs text-gray-600 mt-3">
          <span>
            Halaman {page} dari {totalPages}
          </span>
          <div className="flex gap-1">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-2 py-1 rounded ${
                  page === i + 1
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
      </div>

      {/* Form Tambah Karyawan */}
      <div className="bg-white rounded-xl shadow border border-gray-100 p-4">
        <h3 className="font-semibold text-gray-700 mb-3 text-lg">FORM TAMBAH KARYAWAN</h3>
        
        <form onSubmit={handleSubmit} className="text-sm grid lg:grid-cols-2 gap-4">
          {/* Kolom Kiri */}
          <div className="space-y-3 flex-1 pr-4 border-r border-gray-300">
            {/* Nama Lengkap */}
            <div>
              <label className="block mb-2 text-gray-700 font-medium">
                Nama Lengkap *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Nama Lengkap"
                className={`w-full border rounded-lg p-3 focus:ring-2 ${
                  error.fullName
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {error.fullName && (
                <p className="text-red-500 text-xs mt-1">{error.fullName}</p>
              )}
            </div>

            {/* No. Kartu Identitas */}
            <div>
              <label className="block mb-2 text-gray-700 font-medium">
                No. Kartu Identitas *
              </label>
              <input
                type="text"
                name="noId"
                value={formData.noId}
                onChange={handleInputChange}
                placeholder="No. Kartu Identitas"
                className={`w-full border rounded-lg p-3 focus:ring-2 ${
                  error.noId
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {error.noId && (
                <p className="text-red-500 text-xs mt-1">{error.noId}</p>
              )}
            </div>

            {/* Jenis Kelamin */}
            <div>
              <label className="block mb-2 text-gray-700 font-medium">
                Jenis Kelamin *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {["Laki-laki", "Perempuan"].map((gender) => (
                  <label
                    key={gender}
                    className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="jenisKelamin"
                      value={gender}
                      checked={formData.jenisKelamin === gender}
                      onChange={handleInputChange}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span>{gender}</span>
                  </label>
                ))}
              </div>
              {error.jenisKelamin && (
                <p className="text-red-500 text-xs mt-1">{error.jenisKelamin}</p>
              )}
            </div>

            {/* Tempat Lahir */}
            <div>
              <label className="block mb-2 text-gray-700 font-medium">
                Tempat Lahir *
              </label>
              <input
                type="text"
                name="tempatLahir"
                value={formData.tempatLahir}
                onChange={handleInputChange}
                placeholder="Tempat Lahir"
                className={`w-full border rounded-lg p-3 focus:ring-2 ${
                  error.fullName
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {error.fullName && (
                <p className="text-red-500 text-xs mt-1">{error.fullName}</p>
              )}
            </div>

            {/* Tanggal Lahir */}
            <div>
              <DatePickerField
                label="Tanggal Lahir *"
                name="tanggalLahir"
                value={formData.tanggalLahir}
                onChange={handleInputChange}
              />
              {error.tanggalLahir && (
                <p className="text-red-500 text-xs mt-1">{error.tanggalLahir}</p>
              )}
            </div>

            {/* No. Telepon */}
            <div>
              <label className="block mb-2 text-gray-700 font-medium">
                No. Telepon
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="No. Telepon"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Alamat */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-gray-700 font-medium">Provinsi</label>
                <select
                  name="provinsi"
                  value={formData.provinsi}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Provinsi...</option>
                  {Object.keys(dataWilayah).map((prov) => (
                    <option key={prov} value={prov}>
                      {prov}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block mb-2 text-gray-700 font-medium">
                  Kabupaten / Kota
                </label>
                <select
                  name="kabupaten"
                  value={formData.kabupaten}
                  onChange={handleInputChange}
                  disabled={!formData.provinsi}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                >
                  <option value="">Pilih Kabupaten/Kota...</option>
                  {kabupatenList.map((kab) => (
                    <option key={kab} value={kab}>
                      {kab}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dropdown Kecamatan */}
              <div>
                <label className="block mb-2 text-gray-700 font-medium">Kecamatan</label>
                <select
                  name="kecamatan"
                  value={formData.kecamatan}
                  onChange={handleInputChange}
                  disabled={!formData.kabupaten}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                >
                  <option value="">Pilih Kecamatan...</option>
                  {kecamatanList.map((kec) => (
                    <option key={kec} value={kec}>
                      {kec}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dropdown Kelurahan */}
              <div>
                <label className="block mb-2 text-gray-700 font-medium">Kelurahan</label>
                <select
                  name="kelurahan"
                  value={formData.kelurahan}
                  onChange={handleInputChange}
                  disabled={!formData.kecamatan}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                >
                  <option value="">Pilih Kelurahan...</option>
                  {kelurahanList.map((kel) => (
                    <option key={kel} value={kel}>
                      {kel}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Detil Alamat
              </label>
              <textarea
                id="alamat"
                name="alamat"
                rows="4"
                value={formData.alamat}
                onChange={handleInputChange}
                placeholder="Alamat"
                className="w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2 resize-none"
              ></textarea>
            </div>


            {/* Kode Pos */}
            <div>
              <label className="block mb-2 text-gray-700 font-medium">Kode Pos</label>
              <input
                type="text"
                name="kodePos"
                value={formData.kodePos}
                onChange={handleInputChange}
                placeholder="Kode Pos"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Kolom Kanan */}
          <div className="space-y-3">
            {/* Username & Email */}
            <div>
              <label className="block mb-2 text-gray-700 font-medium">
                Username *
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Username"
                className={`w-full border rounded-lg p-3 focus:ring-2 ${
                  error.username
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {error.username && (
                <p className="text-red-500 text-xs mt-1">{error.username}</p>
              )}
            </div>
            
            <div>
              <label className="block mb-2 text-gray-700 font-medium">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className={`w-full border rounded-lg p-3 focus:ring-2 ${
                  error.email
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {error.email && (
                <p className="text-red-500 text-xs mt-1">{error.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 text-gray-700 font-medium">
                Password {status === "New" ? "*" : ""}
              </label>
              <input
                type="password"
                name="password"
                value={formData.password || ""}
                onChange={handleInputChange}
                placeholder="Password"
                className={`w-full border rounded-lg p-3 focus:ring-2 ${
                  error.password
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {error.password && (
                <p className="text-red-500 text-xs mt-1">{error.password}</p>
              )}
            </div>

            {/* Tipe */}
            <div>
              <label className="block mb-2 text-gray-700 font-medium">
                Tipe *
              </label>
              
              {/* Bagian Department (Checkbox) */}
              <div className="grid grid-cols-2 gap-2">
                <div className="pr-4 border-r border-gray-300">
                  <div className="grid grid-cols-1 gap-2">
                    {departmentOptions.map((role) => (
                      <label
                        key={role}
                        className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          value={role}
                          checked={formData.department.includes(role)}
                          onChange={(e) => {
                            const { checked, value } = e.target;
                            setFormData((prev) => ({
                              ...prev,
                              department: checked
                                ? [...prev.department, value] // tambah role
                                : prev.department.filter((r) => r !== value), // hapus role
                            }));
                          }}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{role}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Bagian Department Medical (Radio) */}
                <div>
                  <div className="grid grid-cols-1 gap-2">
                    {departmentMedicalOptions.map((role) => (
                      <label
                        key={role}
                        className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        <input
                          type="radio"
                          value={role}
                          checked={formData.department.includes(role)}
                          onChange={(e) => {
                            const { value } = e.target;
                            setFormData((prev) => {
                              // hapus semua value sebelumnya dari departmentMedicalOptions
                              const filtered = prev.department.filter(
                                (r) => !departmentMedicalOptions.includes(r)
                              );
                              return {
                                ...prev,
                                department: [...filtered, value], // tambah role radio
                              };
                            });
                          }}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{role}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              {error.department && (
                <p className="text-red-500 text-xs mt-1 text-right">{error.department}</p>
              )}
            </div>

            {/* Tanggal Kontrak */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DatePickerField
                label="Tanggal Mulai Kontrak"
                name="tanggalMulaiKontrak"
                value={formData.tanggalMulaiKontrak}
                onChange={handleInputChange}
              />

              <DatePickerField
                label="Tanggal Selesai Kontrak"
                name="tanggalSelesaiKontrak"
                value={formData.tanggalSelesaiKontrak}
                onChange={handleInputChange}
              />
            </div>

            {/* Status Menikah */}
            <div>
              <label className="block mb-2 text-gray-700 font-medium">Status Menikah</label>
              <select
                name="statusMenikah"
                value={formData.statusMenikah}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select...</option>
                <option value="Menikah">Menikah</option>
                <option value="Belum">Belum Menikah</option>
                <option value="Cerai">Cerai</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="col-span-2 flex justify-between sticky bottom-0 bg-white p-4 border-t">
            <button
              type="button"
              onClick={handleBatal}
              className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={user.position !== "Admin"}
              className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200
                ${
                  user.position !== "Admin"
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }
              `}
            >
              {status === "New" ? "Simpan" : "Update"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default DataKaryawan;
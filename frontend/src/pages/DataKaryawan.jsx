import React from "react";
import { User, ChevronRight, MoreVertical } from "lucide-react";

const employees = [
  { id: 1, name: "FATIMAH ZAHROUN NIKMAH", position: "Purchasing, Manager", status: "Aktif" },
  { id: 2, name: "dr. Galih Satryo Hutomo", position: "Dokter, Purchasing", status: "Aktif" },
  { id: 3, name: "DWI DARA CAHAYANI, S.FARM., APT", position: "Purchasing", status: "Aktif" },
];

const DataKaryawan = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-4">
      {/* List Karyawan */}
      <div className="bg-white rounded-xl shadow border border-gray-100">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-semibold text-gray-700 flex items-center gap-2">
            <User size={18} className="text-blue-600" />
            Data Karyawan & Tenaga Kesehatan
          </h3>
          <button className="text-gray-400 hover:text-gray-600">
            <MoreVertical size={18} />
          </button>
        </div>

        <div className="p-4">
          <div className="flex gap-2 mb-3">
            <button className="px-3 py-1 rounded-md text-sm bg-blue-600 text-white">
              Aktif
            </button>
            <button className="px-3 py-1 rounded-md text-sm bg-gray-100 text-gray-600 hover:bg-gray-200">
              Non-Aktif
            </button>
          </div>

          <ul className="divide-y text-sm">
            {employees.map((emp) => (
              <li key={emp.id} className="flex justify-between items-center py-3">
                <div>
                  <p className="font-semibold text-gray-800">{emp.name}</p>
                  <p className="text-gray-500 text-xs">{emp.position}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded">
                    {emp.status}
                  </span>
                </div>
                <button className="p-2 bg-blue-50 text-blue-500 rounded-full hover:bg-blue-100">
                  <ChevronRight size={18} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Form Tambah Karyawan */}
      <div className="bg-white rounded-xl shadow border border-gray-100 p-4">
        <h3 className="font-semibold text-gray-700 mb-3">Form Tambah Karyawan</h3>
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div>
            <label className="block mb-1 text-gray-600">Nama Lengkap *</label>
            <input
              type="text"
              placeholder="Nama Lengkap"
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-600">No. Kartu Identitas *</label>
            <input
              type="text"
              placeholder="Nomor KTP"
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="col-span-2 flex justify-end gap-2 mt-3">
            <button
              type="button"
              className="px-4 py-2 rounded-md border text-gray-600 hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DataKaryawan;

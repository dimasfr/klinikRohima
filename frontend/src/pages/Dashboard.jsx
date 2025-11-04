import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const visitData = [
    { time: "00-04", male: 0, female: 0, other: 0 },
    { time: "08-12", male: 19, female: 15, other: 9 },
    { time: "12-16", male: 6, female: 2, other: 1 },
  ];

  const cards = [
    {
      title: "Kunjungan Asuransi",
      value: 0,
      desc: "Tidak ada penambahan jumlah Kunjungan Asuransi pada daftar klinik anda",
    },
    {
      title: "Kunjungan BPJS",
      value: 50,
      desc: "Terdapat penambahan jumlah Kunjungan BPJS sebanyak 50 pada daftar klinik anda",
    },
    {
      title: "Kunjungan Umum",
      value: 2,
      desc: "Terdapat penambahan jumlah Kunjungan Umum sebanyak 2 pada daftar klinik anda",
    },
  ];

  const events = [
    { title: "Jadwal Jaga", start: "2025-11-03" },
    { title: "Jadwal Jaga", start: "2025-11-05" },
    { title: "Jadwal Pengganti", start: "2025-11-07", color: "#facc15" },
  ];

  return (
    <main className="space-y-6">
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow p-4 border border-gray-100"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {card.title}
                </p>
                <h3 className="text-3xl font-bold text-blue-600">
                  {card.value}
                </h3>
              </div>
              <button className="text-xs bg-gray-50 px-2 py-1 rounded-md text-gray-500 hover:text-blue-600">
                Hari ini
              </button>
            </div>
            <p className="text-sm text-gray-500 leading-snug">
              {card.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Chart + Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-4 border border-gray-100">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-gray-700">
              Jumlah Kunjungan
            </h3>
            <button className="text-xs bg-gray-50 px-2 py-1 rounded-md text-gray-500 hover:text-blue-600">
              Hari ini
            </button>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={visitData}>
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="male" fill="#3b82f6" name="Laki-laki" />
              <Bar dataKey="female" fill="#ec4899" name="Perempuan" />
              <Bar dataKey="other" fill="#f97316" name="Lainnya" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* FullCalendar */}
        <div className="bg-white rounded-xl shadow p-4 border border-gray-100">
          <h3 className="font-semibold text-gray-700 mb-3">
            Jadwal Jaga
          </h3>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "",
            }}
            height="auto"
            dateClick={(info) => alert(`Tanggal dipilih: ${info.dateStr}`)}
          />
          <div className="flex justify-center gap-4 mt-3 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
              <span>Jadwal Jaga</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
              <span>Jadwal Pengganti</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;

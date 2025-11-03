import React from "react";

const Dashboard = () => {
  const stats = [
    { title: "Total Users", value: "1,245" },
    { title: "Revenue", value: "$12,300" },
    { title: "Active Sessions", value: "87" },
  ];

  const data = [
    { id: 1, name: "Dimas Fajar", email: "dimas@example.com", status: "Active" },
    { id: 2, name: "Rina Putri", email: "rina@example.com", status: "Inactive" },
    { id: 3, name: "Andi Pratama", email: "andi@example.com", status: "Active" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4 text-xl font-bold text-blue-600 border-b">
          MedevaMint
        </div>
        <nav className="p-4 space-y-2">
          <a
            href="#"
            className="block rounded-lg px-3 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="block rounded-lg px-3 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600"
          >
            Users
          </a>
          <a
            href="#"
            className="block rounded-lg px-3 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600"
          >
            Settings
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
          <div className="flex items-center gap-2">
            <img
              src="https://ui-avatars.com/api/?name=Dimas+Fajar"
              alt="User avatar"
              className="w-8 h-8 rounded-full"
            />
            <span className="font-medium text-gray-700">Dimas</span>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-xl shadow hover:shadow-md transition"
            >
              <p className="text-gray-500 text-sm">{item.title}</p>
              <h2 className="text-2xl font-bold text-blue-600">{item.value}</h2>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold mb-3">Recent Users</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left text-gray-600 border-b">
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => (
                <tr
                  key={user.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-2">{user.name}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

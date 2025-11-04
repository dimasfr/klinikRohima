import React, { useState } from "react";
import {
  LayoutDashboard,
  Settings,
  Menu,
  X,
  ChevronLeft,
  Users
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(false); // sidebar (mobile)
  const [flyout, setFlyout] = useState(null); // flyout aktif
  
  const location = useLocation();

  // Struktur menu dengan flyout sections
  const menus = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/" },
    {
      name: "Pengaturan",
      icon: Settings,
      path: "/settings",
      submenu: [
        {
          title: "Karyawan",
          items: [
            { name: "Data Karyawan", key: "dataKaryawan", icon: Users, path: "/settings/karyawan" },
          ],
        },
      ],
    },
  ];

  return (
    <>
      {/* Tombol toggle sidebar (mobile) */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-md shadow"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay (mobile) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
        ></div>
      )}

      {/* Sidebar utama */}
      <aside
        className={`fixed top-16 left-0 h-[calc(100%-4rem)] bg-white shadow-lg z-40 transition-all duration-300 
        ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 w-24`}
      >
        {/* Header logo */}
        <div className="p-4 flex items-center justify-between lg:justify-center">
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden text-gray-500"
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu utama */}
        <nav className="p-2 flex flex-col items-center gap-2">
          {menus.map((menu) => {
            const Icon = menu.icon;
            const isActive =
              location.pathname === menu.path ||
              location.pathname.startsWith(menu.path + "/");

            if (!menu.submenu) {
              return (
                <Link
                  key={menu.name}
                  to={menu.path}
                  onClick={() => {
                    setOpen(false);
                    setFlyout(null);
                  }}
                  className={`flex flex-col items-center justify-center gap-1 py-4 px-2 text-xs font-medium transition
                    ${
                      isActive
                        ? "bg-blue-100 text-blue-700 border-l-4 border-blue-600"
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                >
                  <Icon size={28} strokeWidth={1.8} />
                  <span className="text-[11px]">{menu.name}</span>
                </Link>
              );
            }

            // menu dengan flyout
            return (
              <button
                key={menu.name}
                onClick={() =>
                  setFlyout(flyout === menu.name ? null : menu.name)
                }
                className={`flex flex-col items-center justify-center gap-1 py-4 px-2 text-xs font-medium transition
                  ${
                    flyout === menu.name
                      ? "bg-blue-50 text-blue-600 border-l-4 border-blue-400"
                      : isActive
                      ? "bg-blue-100 text-blue-700 border-l-4 border-blue-600"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
              >
                <Icon size={28} strokeWidth={1.8} />
                <span className="text-[11px]">{menu.name}</span>
              </button>
            );

          })}
        </nav>
      </aside>

      {/* Flyout menu */}
      {flyout && (
        <aside
          className={`fixed top-16 left-24 h-[calc(100%-4rem)] bg-white shadow-lg w-64 z-30 border-l transition-transform duration-300 
          ${flyout ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFlyout(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <ChevronLeft size={18} />
              </button>
              <h2 className="text-sm font-semibold text-gray-700">{flyout}</h2>
            </div>
          </div>

          {/* Sectioned submenu */}
          <nav className="p-2 flex flex-col items-center gap-2">
            {menus
              .find((m) => m.name === flyout)
              ?.submenu.map((section, i) => (
                <div key={i}>
                  <h3 className="text-xs font-semibold text-gray-400 mb-2 tracking-wider">
                    {section.title}
                  </h3>
                  <div className="flex flex-col gap-1">
                    {section.items.map((sub) => {
                      const SubIcon = sub.icon;
                      return (
                        <Link
                          key={sub.key}
                          to={sub.path} // ✅ arahkan ke path halaman
                          onClick={() => setFlyout(null)}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-blue-50 rounded-lg transition"
                        >
                          <SubIcon size={14} />
                          {sub.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
          </nav>
        </aside>
      )}
    </>
  );
};

export default Sidebar;

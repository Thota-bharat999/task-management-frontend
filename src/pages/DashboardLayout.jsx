import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

function DashboardLayout() {
  const { user, logout } = useAuth();
  const role = user?.role?.toLowerCase();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path) =>
    location.pathname === path
      ? "bg-blue-100 text-blue-700 font-medium"
      : "hover:bg-gray-100";

  return (
    <div className="h-screen flex bg-gray-100 overflow-hidden">

      {/* ===== MOBILE OVERLAY ===== */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ===== SIDEBAR ===== */}
      <aside
        className={`
        fixed md:static z-50
        w-64 bg-white shadow-md flex flex-col
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 font-bold text-xl border-b">
          Task Manager

          {/* Mobile close */}
          <button
            className="md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <FiX size={22} />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/dashboard"
            className={`block px-4 py-2 rounded-md ${isActive("/dashboard")}`}
            onClick={() => setSidebarOpen(false)}
          >
            Dashboard
          </Link>

          {(role === "admin" || role === "manager") && (
            <>
              <Link
                to="/dashboard/tasks"
                className={`block px-4 py-2 rounded-md ${isActive(
                  "/dashboard/tasks"
                )}`}
                onClick={() => setSidebarOpen(false)}
              >
                All Tasks
              </Link>

              <Link
                to="/dashboard/tasks/create"
                className={`block px-4 py-2 rounded-md ${isActive(
                  "/dashboard/tasks/create"
                )}`}
                onClick={() => setSidebarOpen(false)}
              >
                Create Task
              </Link>
            </>
          )}

          {role === "user" && (
            <Link
              to="/dashboard/my-tasks"
              className={`block px-4 py-2 rounded-md ${isActive(
                "/dashboard/my-tasks"
              )}`}
              onClick={() => setSidebarOpen(false)}
            >
              My Tasks
            </Link>
          )}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t">
          <button
            onClick={logout}
            className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* ===== MAIN AREA ===== */}
      <div className="flex-1 flex flex-col w-full">

        {/* ===== HEADER ===== */}
        <header className="h-16 bg-white shadow flex items-center justify-between px-4 md:px-6">

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <FiMenu size={24} />
          </button>

          <h1 className="text-lg md:text-xl font-semibold text-gray-700">
            Dashboard
          </h1>

          <div className="flex items-center gap-3">
            <span className="hidden md:block text-sm text-gray-600">
              Welcome, {user?.name}
            </span>

            <div className="w-9 h-9 bg-blue-500 text-white rounded-full flex items-center justify-center font-medium">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* ===== PAGE CONTENT ===== */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

export default DashboardLayout;
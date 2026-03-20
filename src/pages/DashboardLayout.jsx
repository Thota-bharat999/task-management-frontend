import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function DashboardLayout() {
  const { user, logout } = useAuth();
  const role = user?.role?.toLowerCase();
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? "bg-blue-100 text-blue-700 font-medium"
      : "hover:bg-gray-100";

  return (
    <div className="h-screen flex bg-gray-200">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="h-16 flex items-center justify-center font-bold text-xl border-b">
          Task Manager
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/dashboard"
            className={`block px-4 py-2 rounded-md ${isActive(
              "/dashboard"
            )}`}
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
              >
                All Tasks
              </Link>

              <Link
                to="/dashboard/tasks/create"
                className={`block px-4 py-2 rounded-md ${isActive(
                  "/dashboard/tasks/create"
                )}`}
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
            >
              My Tasks
            </Link>
          )}
        </nav>

        <div className="p-4 border-t">
          <button
            onClick={logout}
            className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white shadow flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold text-gray-700">
            Dashboard
          </h1>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">
              Welcome, {user?.name}
            </span>

            <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-medium">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DashboardLayout from "../pages/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import TaskList from "../pages/TaskList";
import CreateTask from "../pages/CreateTask";
import MyTasks from "../pages/MyTasks";
import ProtectedRoute from "./ProtectedRoute";
import RoleProtectedRoute from "./RoleProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />

          <Route
            path="tasks"
            element={
              <RoleProtectedRoute allowedRoles={["Admin", "Manager"]}>
                <TaskList />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="tasks/create"
            element={
              <RoleProtectedRoute allowedRoles={["Admin", "Manager"]}>
                <CreateTask />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="my-tasks"
            element={
              <RoleProtectedRoute allowedRoles={["User"]}>
                <MyTasks />
              </RoleProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
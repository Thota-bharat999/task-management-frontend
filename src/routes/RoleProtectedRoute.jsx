import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RoleProtectedRoute({ allowedRoles, children }) {
  const { user } = useAuth(); // ✅ lowercase user

  // Not logged in
  if (!user) {
    return <Navigate to="/" replace />;
  }
console.log("ROLE CHECK:", user?.role, allowedRoles);
  // Logged in but role not allowed
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />; 
    // OR "/unauthorized" if you create that page
  }

  // Allowed
  return children;
}

export default RoleProtectedRoute;
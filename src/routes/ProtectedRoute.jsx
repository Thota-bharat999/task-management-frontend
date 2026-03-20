import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"
import { Children } from "react";

function ProtectedRoute({children}){
    const {token}=useAuth()
      // If not logged in → redirect to login
    if(!token){
        return <Navigate to="/" replace />
    }
     // If logged in → allow access
    return children

}
export default ProtectedRoute
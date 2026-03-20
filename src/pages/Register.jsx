import { useState } from "react";
import { apiRequest } from "../api/apiClient";
import BASE_URL from "../api/baseUrl";
import { Link,useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

function Register() {
  const [name,setName]=useState("");
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[role,setRole]=useState("User");
  const[loading,setLoading]=useState(false);
  const[error,setError]=useState("")
const navigate=useNavigate()
  const handleRegister=async()=>{
    try{
      setLoading(true)
      setError("")
      // console.log("REGISTER PAYLOAD 👉", { name, email, password, role });
      const response=await apiRequest(`${BASE_URL}/auth/register`, {
        method:"POST",
        headers:{
          "Content-type":"application/json",
        },
        body:JSON.stringify({
          name,
          email,
          password,
          role
        })

      })
      const data=await response.json()
      if(!response.ok){
        throw new Error(data.message || "Registration failed")
      }
       navigate("/");
    }catch(error){
      setError(error.message)
    }finally{
      setLoading(false)
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-400">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h2>
        {error &&(
          <p className="text-red-500 text-sm text-center mb-4">
            {error}
          </p>
        )}

        <form className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
           <select
  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
  value={role}
  onChange={(e) => setRole(e.target.value)}
>
  <option value="User">User</option>
  <option value="Manager">Manager</option>
  <option value="Admin">Admin</option>
</select>
          </div>

          {/* Button */}
         
          <button
  onClick={handleRegister}
  disabled={loading}
  className="w-full bg-blue-600 text-white py-2 rounded-md flex justify-center items-center gap-2 disabled:opacity-50"
>
  {loading ? <Spinner /> : "Register"}
</button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-green-600 cursor-pointer hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;

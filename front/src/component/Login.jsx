import React, { useState } from "react";
import {Navigate, useNavigate} from "react-router-dom"
function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",

  });
  const [errorMessage, setErrorMessage] = useState("")

  const navigate = useNavigate()

  const handleSubmit=async (e)=>{
    e.preventDefault();
   const res = await fetch("http://localhost:4000/api/auth/login",{
        method:"POST",
        headers:{
            "Content-Type":"Application/json"
        },
        body:JSON.stringify(form)
    });

     const data =await res.json();
     
     if(res.ok){
      const token = data.token;
      localStorage.setItem("Authorization",token);
   navigate("/dashboard")
     }else{
      alert("user is not created:",data.message);
      setErrorMessage(data.message)
      return
     }
  }

  return (
    <div className="h-screen w-full flex justify-center items-center bg-blue-200">
      <div className="bg-blue-500 p-5 w-[50%] h-auto space-y-4 flex flex-col justify-center rounded-lg items-center py-5">
          <h1 className="text-2xl text-white font-bold underline">
            Login to get Entry
          </h1>
        <form onSubmit={handleSubmit}
         className="space-y-4 flex flex-col">
          

          <div className="text-xl font-semibold text-white flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              className="bg-blue-300 p-1 border border-blue-700 rounded-xl"
              type="text"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="text-xl font-semibold text-white flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              className="bg-blue-300 p-1 border border-blue-700 rounded-xl"
              type="text"
              id="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>


          <div className="text-xl font-semibold text-white flex gap-5">
            <button className="bg-gray-900 px-10 py-1 text-xl font-semibold rounded-xl">
              Login
            </button>
            <button onClick={()=>navigate("/signup")} type="button"
            className="bg-gray-900 px-10 py-1 text-xl font-semibold rounded-xl">
              SignUp
            </button>
          </div>
          <div className="text-lg text-red-500 text-center">
            <h1>{errorMessage !== "" ? errorMessage : ""}</h1>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

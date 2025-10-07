import React, { useState } from "react";
import {Navigate, useNavigate} from "react-router-dom"
import useAxios from "../hooks/useAxios";
import Loading from "./Loading";
function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const [errorMessage , setErrorMessage] = useState("")
  const navigate = useNavigate()
  const {fetchData , loading } = useAxios();

  const handleSubmit=async (e)=>{
    e.preventDefault();
  //  const res = await fetch("http://localhost:4000/api/auth/signup",{
  //       method:"POST",
  //       headers:{
  //           "Content-Type":"application/json",
           
  //       },
  //       body:JSON.stringify(form)
  //   });

  // const res = await api.post("/api/auth/signup",form)

  // url: , method , data
  const data = await fetchData({url:`/auth/signup`,method:"POST" , data:form})  
    // console.log(res)
    
     
     if(data.success){
      const token = data.token;
      localStorage.setItem("Authorization",token);
      // <Navigate to={"/dashboard"} replace/>
      navigate("/dashboard")
     }else{
      alert("user is not created:",data.message);
      setErrorMessage(data.message)
      return
     }
  }

    if(loading){
      return <Loading msg={"Loading"} />
    }

  return (
    <div className="h-screen w-full flex justify-center items-center bg-blue-200">
      <div className="bg-blue-500 p-5 w-[50%] h-auto space-y-4 flex flex-col justify-center rounded-lg items-center py-5">
          <h1 className="text-2xl text-white font-bold underline">
            SignUp to get Entry
          </h1>
        <form onSubmit={handleSubmit}
         className="space-y-4 flex flex-col">
          <div className="text-xl font-semibold text-white flex flex-col">
            <label htmlFor="username" className="">User name</label>
            <input
              id="username"
              className="bg-blue-300 p-1 border border-blue-700 rounded-xl"
              type="text"
              placeholder="User Name"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </div>

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

          <div className="text-xl font-semibold  flex flex-col">
            <label htmlFor="role" className="text-white">Role</label>
            <select
              name=""
              id="role"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="text-white"
            >
              <option value="" className="text-black">-- select role --</option>
              <option value="USER" className="text-black">USER</option>
              <option value="ADMIN" className="text-black">ADMIN</option>
            </select>
            <hr className="border-2 rounded-xl"/>
          </div>

          <div className="text-xl font-semibold text-white flex gap-5">
            <button className="bg-gray-900 px-10 py-1 text-xl font-semibold rounded-xl">
              SignUp
            </button>
            <button onClick={()=>navigate("/login")} type="button"
            className="bg-gray-900 px-10 py-1 text-xl font-semibold rounded-xl">
              Login
            </button>
          </div>
          <div className="text-lg text-red-500 text-center">
            <h1>{errorMessage ? errorMessage : ""}</h1>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;

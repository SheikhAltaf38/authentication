import React from "react";
import { Link, useNavigate } from "react-router-dom";

const navItems = {
  signup: "/signup",
  login: "/login",
};



function Dashboard() {
  const navigate = useNavigate()


function handleLogout(){
  localStorage.removeItem("Authorization");
  navigate("/login")
  alert("user Logged out")
}
  return (
    <div className="">
      <nav className="fixed top-0 bg-[#03045e] h-15 w-[100%] flex items-center justify-between">
        <div className="text-white text-lg font-semibold flex justify-start gap-8 px-10 w-[80%]">
          {Object.entries(navItems).map(([key, value]) => (
            <Link key={key} to={value} className="px-2 py-1 rounded-2xl  hover:bg-gray-100/20 transition-colors duration-200" >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </Link>
          ))}
        </div>
        <div className="flex px-5">
          <button onClick={handleLogout}
          className="self-end px-3 py-1 rounded-2xl bg-gradient-to-b from-blue-200 to-blue-400 hover:from-blue-300 hover:to-blue-500 text-white">
            Logout
          </button>
        </div>
      </nav>
      <div className="h-screen w-full flex justify-center items-center bg-gradient-to-r from-[#4cc9f0] via-[#48bfe3] to-[#5390d9]">
        <h1 className="text-3xl font-bold text-white underline">This is Protected Route</h1>{" "}
      </div>
    </div>
  );
}

export default Dashboard;

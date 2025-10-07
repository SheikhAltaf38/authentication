import React from "react";
import SignUp from "./component/Signup.jsx";
import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./component/Signup.jsx";
import Login from "./component/Login.jsx";
import Dashboard from "./component/Dashboard.jsx";
import ProtectedRoute from "./lib/ProtectedRoute.jsx";
import NotFound from "./component/NotFound.jsx";
function App() {
  return (
    <div>
      {/* <SignUp/>
       */}
      <Routes>
        <Route path="/" element={<Navigate to={"/signup"} />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute/>} >
          <Route path="/dashboard" element={<Dashboard/>} />
        </Route>

        {/* unmatched routed */}
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </div>
  );
}

export default App;

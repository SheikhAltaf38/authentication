import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function ProtectedRoute() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    verifyAuth();
  }, []);

  const verifyAuth = async () => {
    setLoading(true);
    const token = localStorage.getItem("Authorization");
    // console.log(token, "token")
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const isVerified = await fetch(
        "http://localhost:4000/api/auth/check-auth",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          method: "GET",
        }
      );

      if (isVerified.status === 401) {
        localStorage.removeItem("Authorization");
        navigate("/login");
        return;
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center text-2xl font-bold">
        Loading ....
      </div>
    );
  }
  return <Outlet />;
}

export default ProtectedRoute;

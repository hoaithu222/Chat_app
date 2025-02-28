import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import image from "../assets/banner/image03.jpg";

export default function LayoutForm() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/");
    }
  }, []);
  return (
    <div className="bg-gray-500 relative min-h-screen overflow-hidden ">
      <div className="z-50 relative">
        <Outlet />
      </div>
      <div className="absolute inset-0 z-1 opacity-90">
        <img src={image} alt="banner" className="w-full h-full object-fill" />
      </div>
    </div>
  );
}

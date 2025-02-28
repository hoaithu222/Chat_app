import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ListConversation from "./components/ListConversation";
import { useEffect } from "react";
import fetchUser from "./utils/fetchUser";

export default function App() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      fetchUser();
    } else {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/login");
    }
  }, [navigate]);
  return (
    <div className="bg-background-light text-text-light dark:bg-background-dark dark:text-text-dark p-2 h-screen overflow-hidden">
      <div className="flex gap-4 ">
        <Navbar />
        <ListConversation />
        <Outlet />
      </div>
    </div>
  );
}

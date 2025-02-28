import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ListConversation from "./components/ListConversation";
import { useEffect } from "react";
import fetchUser from "./utils/fetchUser";
import { useDispatch, useSelector } from "react-redux";
import { setOnlineUser } from "./redux/userSlice";
import { SocketProvider, useSocket } from "./context/SocketProvider";

export default function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const socket = useSocket(); // Lấy socket từ Context

  console.log("user", user);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      fetchUser();
    } else {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/login");
    }
  }, [navigate]);

  /*
   socket connect
  */
  useEffect(() => {
    if (!socket) return;

    socket.on("onlineUser", (data) => {
      dispatch(setOnlineUser(data));
    });

    return () => {
      socket.off("onlineUser");
    };
  }, [socket]);

  return (
    <SocketProvider>
      <div className="bg-background-light text-text-light dark:bg-background-dark dark:text-text-dark p-2 h-screen overflow-hidden">
        <div className="flex gap-4">
          <Navbar />
          <ListConversation />
          <Outlet />
        </div>
      </div>
    </SocketProvider>
  );
}

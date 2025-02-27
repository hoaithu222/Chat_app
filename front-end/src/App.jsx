import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import { ThemeContext } from "./context/ThemeContext";

export default function App() {
  return (
    <ThemeContext>
      <div className="bg-background-light text-text-light dark:bg-background-dark dark:text-text-dark">
        <div className="flex gap-4">
          <Navbar className="w-[5%]" />
          <Outlet />
          <ToastContainer className="flex  justify-center" />
        </div>
      </div>
    </ThemeContext>
  );
}

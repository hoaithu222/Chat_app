import { useContext } from "react";

import { ThemeContext } from "../context/ThemeContext";
import { CiLight, CiLogout } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { FaUserCircle, FaUserPlus } from "react-icons/fa";
import { LuMessageCircleHeart } from "react-icons/lu";
import { useSelector } from "react-redux";

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const user = useSelector((state) => state.user);
  const handleLogout = async () => {};

  return (
    <div className="h-screen p-2 rounded-md shadow-md shadow-red-300 dark:shadow-sky-200 flex flex-col">
      <div className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark p-2 flex flex-col h-full space-y-2 sm:space-y-4 md:space-y-6">
        <div className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16">
          <LuMessageCircleHeart className="w-full h-full text-pink-400 cursor-pointer" />
        </div>
        <div className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16">
          <FaUserPlus className="w-full h-full text-pink cursor-pointer text-sky-400" />
        </div>

        <div className="flex-grow"></div>

        <div className="flex flex-col items-center gap-4">
          <button
            onClick={toggleTheme}
            className="px-6 py-2 rounded-lg bg-purple-400 text-white hover:bg-secondary transition-all"
          >
            {theme === "light" ? (
              <MdDarkMode className="text-xl sm:text-2xl md:text-3xl" />
            ) : (
              <CiLight className="text-xl sm:text-2xl md:text-3xl" />
            )}
          </button>

          <div className="w-10 h-10 md:w-14 md:h-14 lg:w-20 lg:h-20 rounded-full overflow-hidden">
            {user?.profile_pic ? (
              <img src={user?.profile_pic} alt={user?.name} />
            ) : (
              <FaUserCircle className="text-purple-400 dark:text-purple-50 w-full h-full" />
            )}
          </div>
          <div
            className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full overflow-hidden"
            onClick={handleLogout}
          >
            <CiLogout className="text-gray-400 dark:text-purple-50 w-full h-full cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
}

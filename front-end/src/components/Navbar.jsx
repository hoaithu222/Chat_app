import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { CiLight, CiLogout } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { FaUserCircle, FaUserPlus } from "react-icons/fa";
import { LuMessageCircleHeart } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";

import colors from "../style/colors";
import UserMenu from "./UserMenu";
import { useNavigate } from "react-router-dom";
import { AiFillMessage } from "react-icons/ai";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);

  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  return (
    <div
      className="sm:h-[calc(100vh-20px)] border-2 border-gray-200 p-0 lg:p-2 rounded-md shadow-md 
      shadow-red-300 dark:shadow-sky-200 flex sm:flex-col flex-row justify-evenly items-center
      w-[calc(100%-30px)] z-40 fixed bottom-5 left-4 right-0 h-12 sm:static sm:w-[50px] md:w-[60px] lg:w-[80px]"
    >
      <div
        className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark 
        p-1 lg:p-2 flex sm:flex-col flex-row items-center justify-evenly sm:justify-start w-full h-full sm:space-y-6 md:space-y-8 lg:space-y-10 relative"
      >
        {/* Logo Button */}
        <div
          className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10"
          onClick={() => navigate("/")}
        >
          <LuMessageCircleHeart className="w-full h-full text-pink-400 cursor-pointer" />
        </div>

        {/* User Search Button */}
        <div
          className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10"
          onClick={() => {
            navigate("/search-user");
          }}
        >
          <FaUserPlus className="w-full h-full text-pink cursor-pointer text-sky-400" />
        </div>

        {/* Messages Button */}
        <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10">
          <AiFillMessage
            className="w-full h-full text-pink cursor-pointer text-purple-300"
            title="Tin nhắn chờ"
          />
        </div>

        {/* On mobile, we don't need flex-grow as buttons are spaced evenly */}
        <div className="hidden sm:block sm:flex-grow"></div>

        {/* User Profile Button */}
        <div
          className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full overflow-hidden p-0.5 cursor-pointer"
          style={{ background: colors.gradients.purpleToPinkBlur }}
          onClick={() => setOpenMenu(true)}
        >
          {user?.profile_pic ? (
            <img
              src={user?.profile_pic}
              alt={user?.name}
              className="text-white w-full h-full rounded-full object-cover"
            />
          ) : (
            <FaUserCircle className="text-white w-full h-full rounded-full" />
          )}
        </div>

        {/* User Menu */}
        {openMenu && (
          <div className="absolute sm:bottom-0 right-2 bottom-10  sm:left-12 md:left-14 lg:left-20">
            <UserMenu onClose={() => setOpenMenu(false)} />
          </div>
        )}
      </div>
    </div>
  );
}

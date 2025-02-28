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
    <div className="h-[calc(100vh-20px)] border-2 border-gray-200 p-2 rounded-md shadow-md shadow-red-300 dark:shadow-sky-200 flex flex-col w-40px sm:w-[60px] md:w-[80px]  lg:w-[100px] ">
      <div className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark p-2 flex flex-col h-full space-y-2 sm:space-y-4 md:space-y-6 relative">
        <div
          className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16"
          onClick={() => navigate("/")}
        >
          <LuMessageCircleHeart className="w-full h-full text-pink-400 cursor-pointer" />
        </div>
        <div
          className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16"
          onClick={() => {
            navigate("/search-user");
          }}
        >
          <FaUserPlus className="w-full h-full text-pink cursor-pointer text-sky-400" />
        </div>
        <div className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16">
          <AiFillMessage
            className="w-full h-full text-pink cursor-pointer text-purple-300"
            title="Tin nhắn chờ"
          />
        </div>

        <div className="flex-grow"></div>

        <div className="flex flex-col items-center gap-4">
          <div
            className={`w-10 h-10 md:w-14 md:h-14 lg:w-20 lg:h-20 rounded-full overflow-hidden p-1 ${colors.gradients.purpleToPinkBlur} cursor-pointer `}
            onClick={() => setOpenMenu(true)}
          >
            {user?.profile_pic ? (
              <img
                src={user?.profile_pic}
                alt={user?.name}
                className=" text-white w-full h-full rounded-full object-cover"
              />
            ) : (
              <FaUserCircle className=" text-white w-full h-full rounded-full" />
            )}
          </div>
        </div>
        {openMenu && (
          <div className="absolute  bottom-0 left-20">
            <UserMenu onClose={() => setOpenMenu(false)} />
          </div>
        )}
      </div>
    </div>
  );
}

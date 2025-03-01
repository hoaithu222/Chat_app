import { Link } from "lucide-react";
import { FaEdit } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { CiLogout } from "react-icons/ci";
import { ThemeContext } from "../context/ThemeContext";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import colors from "../style/colors";
export default function UserMenu({ onClose }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const refreshToken = localStorage.getItem("refreshToken");
  const navigate = useNavigate();
  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await Axios({
        ...SummaryApi.logout,
        data: {
          refreshToken: refreshToken,
        },
      });
      toast.success("Đăng xuất thành công");
      navigate("/login");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      dispatch(logout);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`z-50 relative shadow-2xl rounded-md  w-[165px] p-1 ${colors.gradients.frostToFlame}`}
    >
      <div className="flex justify-end " onClick={onClose}>
        <IoMdClose className="text-2xl lg:text-3xl text-white hover:text-red-200 cursor-pointer " />
      </div>
      <div className="flex flex-col w-full text-white cursor-pointer">
        <div
          className={` flex items-center justify-center sm:gap-2  p-2 lg:p-3 hover:bg-pink-100 hover:text-sky-300 rounded-lg`}
          onClick={() => {
            onClose();
            navigate("/profile");
          }}
        >
          <FaEdit className="text-2xl lg:text-3xl" />
          <p className="text-lg lg:text-xl">Profile</p>
        </div>
        <div
          className="flex items-center justify-center gap-2 p-2 lg:p-3 hover:bg-pink-100 hover:text-sky-300 rounded-lg"
          onClick={() => {
            onClose();
            navigate("/setting");
          }}
        >
          <IoSettingsOutline className="text-2xl lg:text-3xl" />
          <p className="text-lg lg:text-xl">Cài đặt</p>
        </div>
        <div
          className="flex items-center justify-center gap-2 p-2 lg:p-3 hover:bg-pink-100 hover:text-sky-300 rounded-lg"
          onClick={() => {
            handleLogout();
            onClose();
          }}
        >
          <CiLogout className="text-2xl lg:text-3xl" />
          <p className="text-lg lg:text-xl">Đăng xuất</p>
        </div>
      </div>
    </div>
  );
}

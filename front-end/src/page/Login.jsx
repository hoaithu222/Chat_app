import {
  FcBiohazard,
  FcCheckmark,
  FcInvite,
  FcLikePlaceholder,
} from "react-icons/fc";
import { MdDriveFileRenameOutline } from "react-icons/md";
import InputFile from "../components/InputFile";
import InputPassword from "../components/InputPassword";
import { useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import fetchUser from "../utils/fetchUser";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import colors from "../style/colors";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.email || !data.password) {
      toast.error("Vui lòng nhập thông tin đầy đủ");
      return;
    }
    setLoading(true);
    try {
      const response = await Axios({
        ...SummaryApi.login,
        data,
      });
      if (!response) {
        toast.error("Đăng nhập không thành công");
      }
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      const user = await fetchUser();
      console.log(user);
      dispatch(setUser(user.data.data));
      toast.success("Đăng nhập thành công");
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto container min-h-screen flex items-center justify-center">
      <div
        className={`shadow-2xl shadow-slate-300 p-4 sm:p-6 md:p-8 lg:p-10 rounded-xl bg-white `}
      >
        <div className="p-2">
          <h2
            className={`${colors.textColors.gradientLimeToPink}  font-semibold text-xl sm:text-2xl md:text-3xl`}
          >
            Chào mừng bạn đến với chat !
          </h2>
          <FcLikePlaceholder className="text-2xl mx-auto sm:text-3xl md:text-4xl lg:text-5xl" />
          <p
            className={`text-transparent text-center ${colors.textColors.gradientCyanToLime} text-base sm:text-lg md:text-xl lg:text-2xl`}
          >
            Hãy đăng nhập
          </p>
        </div>
        <div className="mt-2">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-4  rounded-lg hover:shadow-red-100"
          >
            <InputFile
              type="email"
              name="email"
              placeholder="Vui lòng nhập email"
              label="Email"
              onChange={handleChange}
              id="email"
              icon={
                <FcInvite className=" text-1xl sm:text-2xl md:text-3xl lg:text-4xl" />
              }
              required={true}
            />
            <InputPassword
              name="password"
              placeholder="Vui lòng nhập mật khẩu"
              label="Mật khẩu"
              onChange={handleChange}
              id="password"
              icon={
                <FcBiohazard className="ml-1 text-1xl sm:text-2xl md:text-3xl lg:text-4xl" />
              }
              required={true}
            />
            <button
              className={`px-3 py-1 sm:px-4 sm:py-2 md:px-5 md:py-2  rounded-md mt-4 sm:mt-5 md:mt-6 lg:mt-7 text-white ${colors.gradients.pinkToPurple}  mx-auto flex items-center justify-center`}
            >
              {loading ? "Loading...." : "Đăng nhập"}
            </button>
          </form>
        </div>
        <div className="mt-3">
          <p className="text-gray-400 text-base sm:text-lg p-2 md:p-3">
            Nếu bạn chưa có tài khoản!
            <Link
              to="/register"
              className="text-green-300 font-semibold text-lg"
            >
              Đăng kí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

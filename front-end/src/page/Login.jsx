import { FcBiohazard, FcInvite, FcLikePlaceholder } from "react-icons/fc";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import fetchUser from "../utils/fetchUser";
import { setUser } from "../redux/userSlice";
import InputFile from "../components/InputFile";
import InputPassword from "../components/InputPassword";
import colors from "../style/colors";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.email || !data.password) {
      toast.error("Vui lòng nhập thông tin đầy đủ");
      return;
    }
    setLoading(true);
    try {
      const response = await Axios({ ...SummaryApi.login, data });
      if (!response) {
        toast.error("Đăng nhập không thành công");
      }
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      const user = await fetchUser();
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
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full transform transition duration-300 hover:shadow-2xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-lime-400 to-pink-500">
            Chào mừng bạn!
          </h2>
          <FcLikePlaceholder className="text-4xl mx-auto mt-2" />
          <p className="text-lg text-gray-600 mt-2">Hãy đăng nhập</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <InputFile
            type="email"
            name="email"
            placeholder="Nhập email"
            label="Email"
            onChange={handleChange}
            icon={<FcInvite className="text-2xl" />}
            required
          />
          <InputPassword
            name="password"
            placeholder="Nhập mật khẩu"
            label="Mật khẩu"
            onChange={handleChange}
            icon={<FcBiohazard className="text-2xl" />}
            required
          />
          <button
            className="w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 shadow-md transition duration-300"
            disabled={loading}
          >
            {loading ? "Đang xử lý..." : "Đăng nhập"}
          </button>
        </form>
        <p className="text-center text-gray-500 mt-4">
          Chưa có tài khoản?
          <Link to="/register" className="text-blue-500 font-semibold ml-1">
            Đăng ký
          </Link>
        </p>
      </div>
    </div>
  );
}

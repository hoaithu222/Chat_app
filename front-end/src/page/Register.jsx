import {
  FcApproval,
  FcBiohazard,
  FcInvite,
  FcLikePlaceholder,
} from "react-icons/fc";
import InputFile from "../components/InputFile";
import InputPassword from "../components/InputPassword";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import uploadImage from "../utils/uploadImage";
import { Link, useNavigate } from "react-router-dom";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";

export default function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: "",
  });
  const [loading, setLoading] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error("Bạn vui lòng chọn ảnh");
      return;
    }

    setLoadingUpload(true);
    try {
      const response = await uploadImage(file);

      if (response?.data?.data) {
        setData((prev) => ({
          ...prev,
          profile_pic: response.data.data,
        }));
        toast.success("Tải ảnh lên thành công");
      } else {
        throw new Error("Không nhận được URL ảnh từ server");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error.message || "Đã xảy ra lỗi khi tải ảnh lên");
    } finally {
      setLoadingUpload(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.name || !data.email || !data.password) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }
    setLoading(true);
    try {
      const response = await Axios({
        ...SummaryApi.register,
        data,
      });

      toast.success("Đã tạo tài khoản thành công");
      navigate("/login");
      setData({
        name: "",
        email: "",
        password: "",
        profile_pic: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Đã xảy ra lỗi khi đăng kí");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto container min-h-screen flex items-center justify-center">
      <div className="shadow-2xl shadow-slate-300 p-4 sm:p-6 md:p-8 lg:p-10 rounded-xl ">
        <div className="p-2">
          <h2 className="text-red-300 font-semibold text-xl sm:text-2xl md:text-3xl">
            Chào mừng bạn đến với chat !
          </h2>
          <FcLikePlaceholder className="text-2xl mx-auto sm:text-3xl md:text-4xl lg:text-5xl" />
          <p className="text-transparent text-center bg-clip-text bg-gradient-to-br from-rose-500 to-purple-300 text-base sm:text-lg md:text-xl lg:text-2xl">
            Hãy tạo tài khoản để tiếp tục
          </p>
        </div>
        <div className="mt-2">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-4 shadow-lg rounded-lg shadow-red-50 hover:shadow-red-100"
          >
            <div className="space-y-2 md:space-y-3 lg:space-y-4 flex items-center justify-center mb-2 sm:mb-3 lg:mb-4">
              <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 relative rounded-full overflow-hidden">
                {data.profile_pic ? (
                  <img
                    src={data.profile_pic}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaUserCircle className="w-full h-full object-cover text-pink-300" />
                )}
                <label
                  htmlFor="image"
                  className="absolute bottom-0 left-0 right-0 flex justify-center items-center gap-1 text-white bg-gradient-to-br from-sky-400 to-purple-400 p-1 cursor-pointer"
                >
                  {loadingUpload ? (
                    <span>Đang tải...</span>
                  ) : (
                    <>
                      <span>{data.profile_pic ? "Thay đổi" : "Thêm ảnh"}</span>
                    </>
                  )}
                </label>
                <input
                  type="file"
                  id="image"
                  name="profile_pic"
                  className="hidden"
                  onChange={handleUpload}
                  disabled={loadingUpload}
                  accept="image/jpeg,image/png,image/gif,image/webp"
                />
              </div>
            </div>
            <InputFile
              name="name"
              placeholder="Vui lòng nhập tên"
              label="Tên"
              onChange={handleChange}
              id="name"
              icon={
                <FcApproval className="text-1xl sm:text-2xl md:text-3xl lg:text-4xl" />
              }
            />
            <InputFile
              type="email"
              name="email"
              placeholder="Vui lòng nhập email"
              label="Email"
              onChange={handleChange}
              id="email"
              icon={
                <FcInvite className="text-1xl sm:text-2xl md:text-3xl lg:text-4xl" />
              }
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
            />
            <button
              type="submit"
              className="px-3 py-1 sm:px-4 sm:py-2 md:px-5 md:py-2 rounded-md mt-4 sm:mt-5 md:mt-6 lg:mt-7 text-white bg-red-300 mx-auto flex items-center justify-center"
              disabled={loadingUpload}
            >
              {loading ? "Loading...." : "Đăng kí"}
            </button>
          </form>
        </div>
        <div className="mt-3">
          <p className="text-gray-400 text-base sm:text-lg p-2 md:p-3">
            Nếu bạn đã có tài khoản!
            <Link to="/login" className="text-green-300 font-semibold text-lg">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

import { useDispatch, useSelector } from "react-redux";
import colors from "../style/colors";
import {
  FaCannabis,
  FaEarlybirds,
  FaUserCircle,
  FaCamera,
  FaTimesCircle,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import uploadImage from "../utils/uploadImage";
import { toast } from "react-toastify";
import InputProfile from "../components/InputProfile";
import image from "../assets/banner/image01.jpg";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { updateUser } from "../redux/userSlice";
import { IoIosSave } from "react-icons/io";

export default function Profile() {
  const [isEdit, setIsEdit] = useState(false);
  const user = useSelector((state) => state.user);
  const [data, setData] = useState(user);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [loadingCoverUpload, setLoadingCoverUpload] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user._id) {
      setData(user);
    }
  }, [user]);

  const handleUpload = async (e, type = "profile") => {
    const file = e.target.files[0];
    if (!file) {
      toast.error("Bạn vui lòng chọn ảnh");
      return;
    }

    if (type === "profile") {
      setLoadingUpload(true);
    } else {
      setLoadingCoverUpload(true);
    }

    try {
      const response = await uploadImage(file);

      if (response?.data?.data) {
        setData((prev) => ({
          ...prev,
          [type === "profile" ? "profile_pic" : "cover_photo"]:
            response.data.data,
        }));
        toast.success("Tải ảnh lên thành công");
      } else {
        throw new Error("Không nhận được URL ảnh từ server");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error.message || "Đã xảy ra lỗi khi tải ảnh lên");
    } finally {
      if (type === "profile") {
        setLoadingUpload(false);
      } else {
        setLoadingCoverUpload(false);
      }
    }
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      const response = await Axios({
        ...SummaryApi.updateUser,
        data,
      });
      dispatch(updateUser(response.data.data));
      toast.success("Cập nhật thông tin thành công");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
    toast.success("Cập nhật thông tin thành công");
    setIsEdit(false);
  };

  const handleCancel = () => {
    setData(user);
    setIsEdit(false);
  };
  console.log(data);

  return (
    <div className="shadow-lg w-4/6 rounded-xl shadow-red-200 border-gray-200 border overflow-hidden">
      <div className="p-2 md:p-3 lg:p-4">
        <div className="flex items-center justify-between border-b-2 pb-2 border-sky-200">
          <h2
            className={`text-2xl md:text-3xl lg:text-4xl font-medium md:font-semibold ${colors.textColors.gradientGreenToPurple} `}
          >
            Thông tin của tôi
          </h2>
          {!isEdit && (
            <div
              className={`${colors.button.large} ${colors.button.gradientRedToYellow} cursor-pointer hover:opacity-90 transition-all duration-300 transform hover:scale-105`}
              onClick={() => setIsEdit(true)}
            >
              Thay đổi thông tin
            </div>
          )}
        </div>
      </div>
      <div className="relative">
        <div className="w-full p-4 sm:h-60 md:h-72 lg:h-80 rounded-lg overflow-hidden relative">
          <img
            src={data.cover_photo ? data.cover_photo : image}
            alt="cover_photo"
            className="w-full h-full object-cover rounded-lg "
          />

          {isEdit && (
            <div
              className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-10 rounded-lg`}
            >
              <label
                htmlFor="cover-image"
                className="flex items-center justify-center gap-2 px-4 py-2 bg-white bg-opacity-80 rounded-full cursor-pointer hover:bg-opacity-100 transition-all duration-300 shadow-lg"
              >
                <FaCamera className="text-pink-500" />
                <span className="font-medium text-gray-800">
                  {loadingCoverUpload
                    ? "Đang tải..."
                    : data?.cover_photo
                    ? "Thay đổi ảnh bìa"
                    : "Thêm ảnh bìa"}
                </span>
              </label>
              <input
                type="file"
                id="cover-image"
                name="cover_photo"
                className="hidden"
                onChange={(e) => handleUpload(e, "cover")}
                disabled={loadingCoverUpload}
                accept="image/jpeg,image/png,image/gif,image/webp"
              />
            </div>
          )}
        </div>

        <div
          className={`flex flex-col md:flex-row items-start bg-white rounded-lg mx-4 -mt-12 relative z-10 ${
            isEdit ? "shadow-xl" : "shadow-md"
          } p-4 transition-all duration-300`}
        >
          <div className="space-y-2 md:space-y-3 p-5 flex flex-col md:flex-row w-full gap-6">
            <div className="flex flex-col items-center">
              <div
                className={`relative w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 overflow-hidden rounded-full p-1 ${colors.gradients.pinkToPurple}`}
              >
                {data?.profile_pic ? (
                  <img
                    src={data.profile_pic}
                    alt={data.name || "Avatar"}
                    className="w-full h-full rounded-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                ) : (
                  <FaUserCircle className="w-full h-full text-gray-200" />
                )}

                {isEdit && (
                  <label
                    htmlFor="profile-image"
                    className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-1 p-2 text-white bg-gradient-to-br from-sky-400 to-purple-400 cursor-pointer hover:from-sky-500 hover:to-purple-500 transition-all duration-300"
                  >
                    <FaCamera className="mr-1" />
                    {loadingUpload
                      ? "Đang tải..."
                      : data?.profile_pic
                      ? "Thay đổi"
                      : "Thêm ảnh"}
                  </label>
                )}

                <input
                  type="file"
                  id="profile-image"
                  name="profile_pic"
                  className="hidden"
                  onChange={(e) => handleUpload(e, "profile")}
                  disabled={loadingUpload}
                  accept="image/jpeg,image/png,image/gif,image/webp"
                />
              </div>
            </div>

            <div className="flex-1 w-full space-y-4">
              <InputProfile
                label={"Tên người dùng"}
                isEdit={isEdit}
                data={data.name}
                name="name"
                setData={setData}
                Icon={FaCannabis}
              />

              <div className="flex items-center gap-2 p-2">
                <span className="text-lg md:text-xl font-medium text-gray-700">
                  Email:
                </span>
                <h3 className="text-xl md:text-2xl text-gray-600">
                  {user.email}
                </h3>
              </div>

              <InputProfile
                label={"Tiểu sử"}
                isEdit={isEdit}
                name="bio"
                data={data.bio}
                setData={setData}
                Icon={FaEarlybirds}
              />
            </div>
          </div>
        </div>

        {isEdit && (
          <div className="mt-5 flex items-center justify-center gap-4 p-4">
            <button
              className={`${colors.button.btn2} ${colors.button.danger} flex items-center gap-2 transform hover:scale-105 transition-all duration-300`}
              onClick={handleCancel}
            >
              <FaTimesCircle />
              Hủy
            </button>
            <button
              className={`${colors.button.btn2} ${colors.button.gradientVioletToYellow} flex items-center gap-2 transform hover:scale-105 transition-all duration-300`}
              onClick={handleSaveChanges}
            >
              <IoIosSave />
              Lưu thay đổi
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

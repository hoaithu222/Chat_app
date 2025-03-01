import { useSelector } from "react-redux";
import { useContext, useState, useEffect } from "react";
import colors from "../style/colors";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { ThemeContext } from "../context/ThemeContext";

export default function Setting() {
  const user = useSelector((state) => state.user);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [darkMode, setDarkMode] = useState(theme === "dark");

  useEffect(() => {
    setDarkMode(theme === "dark");
  }, [theme]);

  const handleToggleDarkMode = () => {
    toggleTheme();
    setDarkMode(!darkMode);
  };

  return (
    <div className="shadow-lg  w-[100%] lg:w-4/6 rounded-xl shadow-red-200 border-gray-200 border  overflow-hidden">
      <div className="p-1 sm:p-2 md:p-4 lg:p-5">
        <div className="flex border-b-2 pb-2">
          <h2
            className={`xs:text-base text-lg md:text-xl lg:text-2xl font-medium md:font-semibold ${colors.textColors.gradientOceanWave}`}
          >
            Tùy chọn
          </h2>
        </div>
        <div className="mt-2 space-y-3 md:space-y-5 dark:hover:text-gray-800">
          <div className="space-y-1 lg:space-y-2 border-b-2 pb-2 border-gray-200 hover:bg-white rounded-lg p-3 shadow-sm transition duration-300">
            <p className="text-base md:text-lg  font-medium text-gray-400">
              Tài khoản
            </p>
            <div className="flex items-center gap-1 md:gap-2 lg:gap-3">
              <div
                className={`w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 p-0.5 ${colors.gradients.frostToFlame} rounded-full overflow-hidden`}
              >
                <img
                  src={user.profile_pic}
                  alt={user.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <h3 className="text-lg md:text-xl  font-semibold">
                  {user.name}
                </h3>
                <p className="text-xs sm:text-base text-gray-400">
                  Xem trang cá nhân của bạn
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-1 lg:space-y-2 border-b-2 pb-2 border-gray-200 hover:bg-white rounded-lg p-5 shadow-sm transition duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 md:w-12 md:h-12 p-1 md:p-2 ${
                    darkMode ? "bg-indigo-600" : "bg-orange-400"
                  } rounded-full overflow-hidden cursor-pointer flex items-center justify-center transition-all duration-300`}
                >
                  {darkMode ? (
                    <MdDarkMode className="w-full h-full text-white" />
                  ) : (
                    <MdLightMode className="w-full h-full text-white" />
                  )}
                </div>
                <div className="w-[65%]">
                  <h3 className=" text-base sm:text-lg md:text-xl  font-semibold">
                    Chế độ tối
                  </h3>
                  <p className="text-xs sm:text-base text-gray-400">
                    Điều chỉnh giao diện để giảm độ chói và cho đôi mắt được
                    nghỉ ngơi
                  </p>
                </div>
              </div>

              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={darkMode}
                  onChange={handleToggleDarkMode}
                />
                <div
                  className={`relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer ${
                    darkMode
                      ? "after:translate-x-full after:border-white bg-blue-600"
                      : "after:translate-x-0 after:border-gray-300 bg-gray-200"
                  } after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border after:rounded-full after:h-6 after:w-6 after:transition-all duration-300`}
                ></div>
              </label>
            </div>

            <div className="mt-4 flex items-center justify-between bg-gray-50 dark:bg-slate-700 p-3 rounded-lg text-xs">
              <span className="font-medium text-gray-600">
                Trạng thái hiện tại:
              </span>
              <span
                className={`font-medium  ${
                  darkMode ? "text-indigo-600" : "text-orange-500"
                }`}
              >
                {darkMode ? "Đã bật chế độ tối" : "Đang sử dụng chế độ sáng"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

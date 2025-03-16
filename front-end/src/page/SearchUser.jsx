import { BsSearchHeart } from "react-icons/bs";
import colors from "../style/colors";
import { useState, useEffect } from "react";
import { FaDropbox } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function SearchUser() {
  const [search, setSearch] = useState("");
  const userId = useSelector((state) => state.user._id);
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const searchUser = async () => {
    setLoading(true);
    try {
      const response = await Axios({
        ...SummaryApi.findUser,
        data: {
          search: search.trim() === "" ? null : search,
        },
      });
      const result = response.data.data.filter((user) => user._id !== userId);
      setResult(result);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Có lỗi xảy ra khi tìm kiếm"
      );
      setResult([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchUser();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      searchUser();
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchUser();
    }
  };

  return (
    <div className="shadow-lg  w-[100%] h-[calc(100%-80px)] sm:h-[100%] lg:w-4/6 rounded-xl shadow-red-200 border-gray-200 border overflow-hidden">
      <div className="p-1 md:p-2 lg:p-3">
        <div className={`flex items-center gap-1 md:gap-2 justify-center p-1 `}>
          <div
            className={`${colors.gradients.indigoToPink} flex p-1  lg:p-2 border-2 rounded-full w-[50%] lg:w-[60%]`}
          >
            <BsSearchHeart className="text-xl md:text-2xl lg:text-3xl text-red-400" />
            <input
              type="text"
              name="search"
              placeholder="Nhập tên người dùng cần tìm kiếm"
              className="outline-none bg-transparent text-sm sm:text-lg md:text-xl  w-full"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              onKeyDown={handleKeyDown}
            />
          </div>
          <button
            onClick={searchUser}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1   lg:px-4 lg:py-2 rounded-full hover:from-pink-600 hover:to-purple-600 transition-all"
            disabled={loading}
          >
            {loading ? "Đang tìm..." : "Tìm kiếm"}
          </button>
        </div>
      </div>
      <div className="shadow-2xl p-1 sm:p-2 border-2 m-3 rounded-lg  h-[calc(100vh-170px)] sm:h-[calc(100vh-130px)] overflow-y-auto">
        {search !== "" ? (
          <p className={`${colors.textColors.gradientIndigoToTeal} mb-4`}>
            Kết quả tìm kiếm: {result.length}
          </p>
        ) : (
          <p
            className={`${colors.textColors.gradientAurora} text-sm md:text-lg lg:text-xl mb-2 md:mb-3 lg:mb-4`}
          >
            Danh sách người dùng ({result.length})
          </p>
        )}
        <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-5">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 lg:gap-4">
              {Array(20)
                .fill(null)
                .map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 animate-pulse"
                  >
                    <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-5 bg-gray-300 dark:bg-gray-600 w-3/5 rounded"></div>
                      <div className="h-4 bg-gray-300 dark:bg-gray-600 w-4/5 mt-2 rounded"></div>
                    </div>
                  </div>
                ))}
            </div>
          ) : result.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 lg:gap-4">
              {result.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center p-3 border rounded-lg shadow-md dark:hover:bg-slate-700 hover:bg-slate-200 dark:hover:text-white   hover:text-gray-600 transition-colors"
                >
                  <div className="flex-shrink-0 mr-3">
                    {user.profile_pic ? (
                      <img
                        src={user.profile_pic}
                        alt={user.name}
                        className="w-8 h-8 md:w-10 md:h-10 lg:h-12 lg:w-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 md:w-10 md:h-10 lg:h-12 lg:w-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <FaUser className="text-gray-400 w-full h-full" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-lg">{user.name}</h3>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <button
                    className="ml-2 px-3 py-1 bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-md hover:from-indigo-600 hover:to-blue-600"
                    onClick={() => {
                      navigate(`/${user._id}`);
                    }}
                  >
                    Nhắn tin
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center mt-10 md:mt-14 lg:mt-20 flex-col">
              <FaDropbox className="text-3xl md:text-4xl lg:text-5xl text-rose-300 animate-pulse text-center" />
              <p className="text-xl md:text-2xl lg:text-3xl">
                Không tìm thấy người dùng
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

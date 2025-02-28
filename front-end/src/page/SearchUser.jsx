import { BsSearchHeart } from "react-icons/bs";
import colors from "../style/colors";
import { useState, useEffect } from "react";
import { FaDropbox } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { toast } from "react-toastify";

export default function SearchUser() {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchUser = async () => {
    if (search.trim() === "") {
      setResult([]);
      return;
    }
    setLoading(true);
    try {
      const response = await Axios({
        ...SummaryApi.findUser,
        data: {
          search,
        },
      });
      setResult(response.data.data);
      console.log(response);
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
    const timer = setTimeout(() => {
      if (search.trim() !== "") {
        searchUser();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchUser();
    }
  };

  return (
    <div className="shadow-lg w-4/6 rounded-xl shadow-red-200 border-gray-200 border overflow-hidden">
      <div className="p-3">
        <div className={`flex items-center gap-2 justify-center p-2`}>
          <div
            className={`${colors.gradients.indigoToPink} flex p-2 border-2 rounded-full w-[60%]`}
          >
            <BsSearchHeart className="text-2xl md:text-3xl lg:text-4xl text-red-400" />
            <input
              type="text"
              name="search"
              placeholder="Nhập tên người dùng cần tìm kiếm"
              className="outline-none bg-transparent text-xl md:text-2xl lg:text-3xl w-full"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              onKeyDown={handleKeyDown}
            />
          </div>
          <button
            onClick={searchUser}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-5 py-3 rounded-full hover:from-pink-600 hover:to-purple-600 transition-all"
            disabled={loading}
          >
            {loading ? "Đang tìm..." : "Tìm kiếm"}
          </button>
        </div>
      </div>
      <div className="shadow-2xl p-2 border-2 m-3 rounded-lg h-[calc(100vh-150px)] overflow-y-auto">
        {search !== "" ? (
          <p className={`${colors.textColors.gradientIndigoToTeal} mb-4`}>
            Kết quả tìm kiếm: {result.length}
          </p>
        ) : (
          <p
            className={`${colors.textColors.gradientAurora} text-lg md:text-xl lg:text-2xl`}
          >
            Vui lòng nhập tên để tìm kiếm
          </p>
        )}
        <div className="space-y-2 sm:space-y-4 md:space-y-5 lg:space-y-7">
          {loading ? (
            <div className="flex justify-center items-center mt-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : result.length > 0 && search !== "" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center p-3 border rounded-lg shadow-md hover:bg-gray-50 hover:text-gray-600 transition-colors"
                >
                  <div className="flex-shrink-0 mr-3">
                    {user.profile_pic ? (
                      <img
                        src={user.profile_pic}
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <FaUser className="text-gray-400" />
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
                      toast.success(`Kết bạn  ${user.name}`);
                    }}
                  >
                    Nhắn tin
                  </button>
                  <button
                    className="ml-2 px-3 py-1 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-md hover:from-indigo-600 hover:to-blue-600"
                    onClick={() => {
                      toast.success(`Kết bạn  ${user.name}`);
                    }}
                  >
                    Kết bạn
                  </button>
                </div>
              ))}
            </div>
          ) : search !== "" ? (
            <div className="flex justify-center items-center mt-20 flex-col">
              <FaDropbox className="text-5xl md:text-6xl lg:text-8xl text-rose-300 animate-pulse text-center" />
              <p className="text-xl md:text-2xl lg:text-3xl">
                Không tìm thấy người dùng thỏa mãn
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

import { FaFacebookMessenger } from "react-icons/fa";

import colors from "../style/colors";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ListConversation from "../components/ListConversation";

export default function Home() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="shadow-lg w-[100%] lg:w-4/6 rounded-xl shadow-red-200 border-gray-200 border overflow-hidden">
      {isMobile ? (
        <div>
          <ListConversation />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-96 p-5 text-center">
          <div
            className={`${colors.gradients.pinkToOrange} p-6 rounded-full mb-3 md:mb-4 lg:mb-6`}
          >
            <FaFacebookMessenger className="text-white text-6xl md:text-7xl lg:text-8xl animate-pulse" />
          </div>

          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-3">
            <span className={`${colors.textColors.gradientLimeToPink}`}>
              Message Chat
            </span>
          </h2>
          <p className="text-gray-500 text-base md:text-lg max-w-md mb-6">
            Hãy chọn người dùng để bắt đầu cuộc trò chuyện mới
          </p>
          <div className="w-full max-w-xs">
            <button
              className="w-full py-3 px-6 bg-gradient-to-r from-blue-200 to-indigo-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              onClick={() => {
                navigate("/search-user");
              }}
            >
              Tìm kiếm bạn bè
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

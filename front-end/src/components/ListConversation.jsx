import { BsSearchHeart } from "react-icons/bs";
import colors from "../style/colors";
import { useEffect, useState } from "react";
import { GoArrowUpLeft } from "react-icons/go";
import { useSelector } from "react-redux";
import { useSocket } from "../context/SocketProvider";
import { FaImage, FaVideo, FaBell } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { Link } from "react-router-dom";
import getRelativeTime from "../utils/getRelativeTime";

export default function ListConversation() {
  const [dataList, setDataList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const user = useSelector((state) => state.user);
  const socketConnection = useSocket();
  const onlineUser = useSelector((state) => state.user.onlineUser);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("listConversation", user._id);
      setLoading(true);
      socketConnection.on("conversation", (data) => {
        const conversationUserData = data.map((conversationUser) => {
          if (conversationUser.sender._id === conversationUser.receiver?._id) {
            return {
              ...conversationUser,
              userDetails: conversationUser.sender,
            };
          } else if (conversationUser.receiver._id !== user._id) {
            return {
              ...conversationUser,
              userDetails: conversationUser.receiver,
            };
          } else {
            return {
              ...conversationUser,
              userDetails: conversationUser.sender,
            };
          }
        });
        setDataList(conversationUserData);
        setLoading(false);
      });
    }
  }, [socketConnection, user]);

  const filteredList = dataList.filter((conv) =>
    conv.userDetails.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-20px)]  w-[100%] lg:flex flex-col lg:w-[30%] p-2 sm:p-3 md:p-5 overflow-hidden rounded-xl shadow-lg shadow-red-200 border border-gray-100 dark:shadow-sky-200 dark:border-gray-700">
      <div className="flex items-center justify-between border-b-2 border-pink-100 dark:border-indigo-800 pb-2 mb-2 md:pb-3 md:mb-3">
        <h2
          className={`text-xl lg:text-2xl font-semibold ${colors.textColors.gradientLimeToPink}`}
        >
          Đoạn chat
        </h2>
        <div
          className={`flex items-center border border-gray-200 rounded-full lg:p-1 ${colors.gradients.indigoToPink} text-white w-3/5`}
        >
          <BsSearchHeart className="text-xl text-sky-200 mr-2" />
          <input
            type="text"
            name="search"
            placeholder="Tìm kiếm đoạn chat"
            className="outline-none bg-transparent text-sm md:text-base lg:text-lg w-full text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="space-y-3 md:space-y-6">
          {Array(7)
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
      ) : (
        <div className="overflow-y-auto custom-scrollbar flex-grow">
          {filteredList.length > 0 ? (
            <div className="space-y-1 md:space-y-3 pr-1 md:pr-2">
              {filteredList.map((conv, index) => (
                <Link
                  to={`/${conv?.userDetails?._id}`}
                  key={`${conv._id}-${index}`}
                  className="block"
                >
                  <div className="flex items-start p-1 md:p-2 lg:p-3 hover:bg-gray-200 bg-gray-200   dark:bg-slate-800  dark:hover:bg-slate-700 rounded-xl transition-all duration-200 relative">
                    <div className="relative mr-3">
                      <div
                        className={` w-8 h-8 md:w-10 md:h-10 lg:w-14 lg:h-14 rounded-full overflow-hidden border lg:border-2 ${colors.gradients.orangeToRed}`}
                      >
                        <img
                          src={conv.userDetails.profile_pic}
                          alt={conv.userDetails.name}
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                      {onlineUser.includes(conv.userDetails._id) && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 lg:w-4 lg:h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                      )}
                    </div>

                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-base  lg:text-lg truncate max-w-[70%]">
                          {conv?.userDetails?.name}
                        </h3>
                        <span className="text-xs text-gray-500 flex items-center">
                          <IoMdTime className="mr-1" />
                          {getRelativeTime(conv?.lastMsg?.createdAt)}
                        </span>
                      </div>

                      <div className="text-gray-600 dark:text-gray-300 text-xs lg:text-sm flex items-center gap-1 mt-1 truncate">
                        {conv?.lastMsg?.imageUrl && (
                          <span className="inline-flex items-center text-blue-500">
                            <FaImage className="mr-1" />
                            {!conv?.lastMsg?.text && "Hình ảnh"}
                          </span>
                        )}
                        {conv?.lastMsg?.videoUrl && (
                          <span className="inline-flex items-center text-purple-500">
                            <FaVideo className="mr-1" />
                            {!conv?.lastMsg?.text && "Video"}
                          </span>
                        )}
                        <span className="truncate">{conv?.lastMsg?.text}</span>
                      </div>
                    </div>

                    {Boolean(conv?.unseenMsg) && (
                      <div className="absolute right-0 top-0">
                        <div className="flex items-center justify-center min-w-5 h-5 px-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold rounded-full">
                          {conv?.unseenMsg}
                        </div>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <GoArrowUpLeft className="text-7xl text-blue-500 mb-4 animate-pulse" />
              <p className="text-xl text-center text-gray-600 dark:text-gray-300">
                {searchTerm
                  ? "Không tìm thấy đoạn chat nào"
                  : "Hãy kết bạn và cùng trò chuyện..."}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

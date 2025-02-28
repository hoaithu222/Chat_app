import { BsSearchHeart } from "react-icons/bs";
import colors from "../style/colors";
import { useState } from "react";
import { GoArrowUpLeft } from "react-icons/go";

export default function ListConversation() {
  const [dataList, setDataList] = useState([]);
  return (
    <div className="h-[calc(100vh-20px)] hidden lg:flex border-2 rounded-md shadow-md shadow-red-300 dark:shadow-sky-200  flex-col w-[30%] p-3 md:p-5 overflow-y-auto hidden-scrollbar">
      <div className="flex items-center flex-wrap gap-2 lg:flex-row justify-between border-b-2 border-sky-100 pb-2">
        <h2
          className={`text-xl md:text-2xl lg:text-3xl font-medium md:font-semibold ${colors.textColors.gradientLimeToPink}`}
        >
          Đoạn chat
        </h2>
        <div
          className={`flex items-center border-2 border-dotted border-gray-100 ${colors.gradients.indigoToPink} rounded-full p-2 text-white`}
        >
          <BsSearchHeart className="text-lg sm:text-xl lg:text-2xl text-sky-200" />
          <input
            type="text"
            name="search"
            placeholder="Tìm kiếm đoạn chat"
            className=" outline-none bg-transparent text-lg md:text-xl"
          />
        </div>
      </div>
      <div className="mt-2">
        {dataList.length > 0 ? (
          <div></div>
        ) : (
          <div className="mt-10 flex justify-center">
            <p className="text-lg md:text-xl lg:text-2xl">
              <GoArrowUpLeft className="text-7xl md:text-8xl lg:text-9xl text-blue-500" />
              Hãy kết bạn và cùng trò chuyện,....
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

import { FiMoreHorizontal } from "react-icons/fi";
import colors from "../../style/colors";
import { useEffect, useState } from "react";

export default function HeaderConversation({ data }) {
  const [dataUser, setDataUser] = useState({});
  useEffect(() => {
    if (data?._id) {
      setDataUser(data);
    }
  }, [data]);
  return (
    <div className="flex items-center justify-between border-b-2 border-gray-200 dark:border-gray-900 pb-3">
      <div className="flex items-center gap-2">
        <div
          className={`w-20 h-20 md:w-22 md:h-22 lg:w-24 lg:h-24 rounded-full p-1  ${colors.gradients.blueToPink} relative`}
        >
          <img
            src={dataUser.profile_pic}
            alt={dataUser.name}
            className="w-full h-full object-cover rounded-full"
          />
          {dataUser.online && (
            <p className="w-2 h-2 md:w-3 md:h-3 lg:w-5 lg:h-5 bg-green-500 rounded-full absolute top-2 right-0"></p>
          )}
        </div>
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold">
          {dataUser.name}
        </h2>
      </div>
      <div>
        <FiMoreHorizontal className="text-4xl md:text-5xl lg:text-6xl text-purple-400" />
      </div>
    </div>
  );
}

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
    <div className="flex items-center justify-between border-b-2 border-gray-200 dark:border-gray-900 pb-1 md:pb-2 lg:pb-3">
      <div className="flex items-center gap-2">
        <div
          className={`w-12 h-12 md:w-14 md:h-14 lg:w-18 lg:h-18 rounded-full p-0.5  ${colors.gradients.purpleToPinkBlur} relative`}
        >
          <img
            src={dataUser.profile_pic}
            alt={dataUser.name}
            className="w-full h-full object-cover rounded-full"
          />
          {dataUser.online && (
            <p className="w-2 h-2 md:w-3 md:h-3 lg:w-4 lg:h-4 bg-green-500 rounded-full absolute bottom-0 right-0"></p>
          )}
        </div>
        <h2 className="text-base md:text-lg lg:text-xl font-semibold">
          {dataUser.name}
        </h2>
      </div>
      <div>
        <FiMoreHorizontal className="text-2xl md:text-3xl lg:text-4xl text-purple-400" />
      </div>
    </div>
  );
}

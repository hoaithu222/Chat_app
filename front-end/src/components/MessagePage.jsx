import { useEffect, useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";

import { useParams } from "react-router-dom";
import colors from "../style/colors";
import HeaderConversation from "./Conversation/HeaderConversation";
import { useSocket } from "../context/SocketProvider";

export default function MessagePage() {
  const params = useParams();
  const [dataUser, setDataUser] = useState();
  const socketConnection = useSocket();
  console.log(params.id);
  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("message page", params.id);
      socketConnection.on("message user", (data) => {
        setDataUser(data);
      });
    }
  }, [params, socketConnection]);
  return (
    <div className="shadow-lg w-4/6 rounded-xl shadow-red-200 border-gray-200 border overflow-hidden">
      <div className="p-2">
        {/* header */}
        <HeaderConversation data={dataUser} />

        {/* show message */}

        {/* send message */}
      </div>
    </div>
  );
}

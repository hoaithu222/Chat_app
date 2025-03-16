import { useEffect, useRef, useState } from "react";
import {
  FiMoreHorizontal,
  FiSend,
  FiImage,
  FiVideo,
  FiSmile,
} from "react-icons/fi";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import HeaderConversation from "./Conversation/HeaderConversation";
import SendMessage from "./Conversation/SendMessage";
import { useSocket } from "../context/SocketProvider";
import colors from "../style/colors";

export default function MessagePage() {
  const params = useParams();
  const user = useSelector((state) => state.user);
  const [dataUser, setDataUser] = useState();
  const [allMess, setAllMess] = useState([]);
  const [message, setMessage] = useState({
    text: "",
    imageUrl: "",
    videoUrl: "",
    seen: "",
  });
  const socketConnection = useSocket();
  const currentMessage = useRef();

  useEffect(() => {
    if (currentMessage.current) {
      currentMessage.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [allMess]);

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("message page", params.id);
      socketConnection.emit("seen", params.id);
      socketConnection.on("message user", (data) => {
        setDataUser(data);
      });
      socketConnection.on("message", (data) => {
        setAllMess(data);
        socketConnection.emit("seen", params.id);
      });
    }
  }, [params, socketConnection, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.text || message.imageUrl || message.videoUrl) {
      if (socketConnection) {
        socketConnection.emit("new message", {
          sender: user._id,
          receiver: params.id,
          text: message.text,
          imageUrl: message.imageUrl,
          videoUrl: message.videoUrl,
          msgByUserId: user._id,
        });

        setMessage({
          text: "",
          imageUrl: "",
          videoUrl: "",
          seen: "",
        });
      }
    }
  };

  const groupMessagesByDate = () => {
    const grouped = {};
    allMess?.forEach((msg) => {
      const date = moment(msg.createdAt).format("DD/MM/YYYY");
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(msg);
    });
    return grouped;
  };

  const groupedMessages = groupMessagesByDate();

  return (
    <div className="shadow-xl  w-[100%] lg:w-4/6 rounded-xl border h-[calc(100%-70px)] sm:h-[100%] border-gray-200 overflow-hidden bg-white dark:bg-gray-800 p-1 lg:p-2">
      <div className="flex flex-col h-full">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <HeaderConversation data={dataUser} />
        </div>

        <div
          className="h-[calc(100vh-170px)] sm:h-[calc(100vh-180px)] md:h-[calc(100vh-190px)] lg:h-[calc(100vh-200px)] hidden-scrollbar overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900"
          id="message-container"
        >
          <div
            className="flex flex-col  gap-2 md:gap-3 lg:gap-4"
            ref={currentMessage}
          >
            {Object.keys(groupedMessages).map((date) => (
              <div key={date} className="message-group">
                <div className="flex items-center justify-center my-2 md:my-3 lg:my-4">
                  <div className="bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-xs text-gray-600 dark:text-gray-300">
                    {date === moment().format("DD/MM/YYYY") ? "Hôm nay" : date}
                  </div>
                </div>

                {groupedMessages[date].map((msg, index) => {
                  const isSender = user._id === msg.msgByUserId;
                  const showAvatar =
                    !isSender &&
                    (index === 0 ||
                      groupedMessages[date][index - 1]?.msgByUserId !==
                        msg.msgByUserId);

                  return (
                    <div
                      className={`flex ${
                        isSender ? "justify-end" : "justify-start"
                      } mb-2`}
                      key={`${date}-${index}-${msg._id}`}
                    >
                      {!isSender && showAvatar && (
                        <div className="w-10 h-10 rounded-full overflow-hidden mr-2 flex-shrink-0">
                          <img
                            src={dataUser?.profile_pic}
                            alt="avatar"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      <div
                        className={`flex flex-col w-40 sm:w-80 lg:w-96 ${
                          isSender ? "items-end" : "items-start"
                        }`}
                      >
                        <div
                          className={`p-1 rounded-lg ${
                            isSender
                              ? ` ${colors.gradients.pinkToOrange} text-white rounded-tr-none`
                              : `dark:text-white rounded-tl-none ${colors.gradients.skyToOcean}`
                          }`}
                        >
                          {msg.imageUrl && (
                            <div className="rounded-lg overflow-hidden mb-2 h-52 sm:h-64  md:h-72 lg:h-80">
                              <img
                                src={msg.imageUrl}
                                alt={msg.text || "Hình ảnh"}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}

                          {msg.videoUrl && (
                            <div className="rounded-lg overflow-hidden mb-2">
                              <video
                                src={msg.videoUrl}
                                controls
                                className="w-full"
                              />
                            </div>
                          )}

                          {msg.text && (
                            <p className="whitespace-pre-wrap break-words">
                              {msg.text}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center text-xs mt-1 text-gray-500 dark:text-gray-400">
                          <span>{moment(msg.createdAt).format("HH:mm")}</span>
                          {isSender && (
                            <span className="ml-1">
                              {msg.seen ? "• Đã xem" : "• Đã gửi"}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700  bg-white dark:bg-gray-800">
          <SendMessage
            message={message}
            sendMessage={setMessage}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}

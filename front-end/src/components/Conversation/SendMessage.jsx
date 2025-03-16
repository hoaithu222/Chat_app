import { useState, useEffect } from "react";
import { FaRegFileVideo } from "react-icons/fa";
import { LuImagePlus } from "react-icons/lu";
import { MdOutlineSend } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import uploadImage from "../../utils/uploadImage";

export default function SendMessage({ message, sendMessage, handleSubmit }) {
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [loadingUploadVideo, setLoadingUploadVideo] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [mediaUrl, setMediaUrl] = useState(null);
  const [mediaType, setMediaType] = useState(null);

  useEffect(() => {
    if (message) {
      setInputValue(message.text || "");

      if (message.imageUrl) {
        setMediaUrl(message.imageUrl);
        setMediaType("image");
      } else if (message.videoUrl) {
        setMediaUrl(message.videoUrl);
        setMediaType("video");
      }
    }
  }, [message]);

  const handleUpload = async (e, type = "image") => {
    const file = e.target.files[0];

    if (!file) return;

    if (type === "image") {
      setLoadingUpload(true);
    } else {
      setLoadingUploadVideo(true);
    }

    try {
      const response = await uploadImage(file);

      if (response?.data?.data) {
        const serverUrl = response.data.data;
        setMediaUrl(serverUrl);
        setMediaType(type);

        sendMessage((prev) => ({
          ...prev,
          [type === "image" ? "imageUrl" : "videoUrl"]: serverUrl,
        }));

        toast.success("Tải file thành công");
      } else {
        throw new Error("Không nhận được URL từ server");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error.message || "Đã xảy ra lỗi khi tải file lên");
      setMediaUrl(null);
      setMediaType(null);
    } finally {
      if (type === "image") {
        setLoadingUpload(false);
      } else {
        setLoadingUploadVideo(false);
      }
    }
  };

  const handleRemoveMedia = () => {
    setMediaUrl(null);
    setMediaType(null);
    sendMessage((prev) => ({
      ...prev,
      imageUrl: "",
      videoUrl: "",
    }));
  };

  const handleSendMessage = (e) => {
    if (e) e.preventDefault();

    if (inputValue.trim() || mediaUrl) {
      const currentMessage = {
        text: inputValue,
        ...(mediaType === "image" ? { imageUrl: mediaUrl } : { imageUrl: "" }),
        ...(mediaType === "video" ? { videoUrl: mediaUrl } : { videoUrl: "" }),
      };

      sendMessage(currentMessage);

      if (handleSubmit) handleSubmit(e);

      setTimeout(() => {
        setInputValue("");
        setMediaUrl(null);
        setMediaType(null);
      }, 100);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <div className="border-t dark:border-gray-700 bg-white dark:bg-gray-900 px-1 py-3 md:p-4 lg:p-6 rounded-b-lg relative">
      {mediaUrl && (
        <div className="absolute bottom-20 left-2 md:left-3  lg:left-4 mb-2 z-10">
          <div className="relative inline-block">
            <button
              type="button"
              onClick={handleRemoveMedia}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-sm hover:bg-red-600 w-6 h-6 flex items-center justify-center shadow-md"
            >
              <IoMdClose />
            </button>
            {mediaType === "image" ? (
              <img
                src={mediaUrl}
                alt="Upload preview"
                className="max-h-20 sm:max-h-24 md:max-h-28 lg:max-h-32 max-w-xs object-contain rounded-lg border shadow-lg bg-white dark:bg-gray-800 dark:border-gray-700"
              />
            ) : (
              <video
                src={mediaUrl}
                controls
                className="max-h-20 sm:max-h-24 md:max-h-28 lg:max-h-32 max-w-xs object-contain rounded-lg border shadow-lg bg-white dark:bg-gray-800 dark:border-gray-700"
              />
            )}
            {(loadingUpload || loadingUploadVideo) && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-lg">
                <div className="loader w-4 h-4 md:h-6 md:w-6 lg:h-8 lg:w-8 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        </div>
      )}

      <form
        className="flex items-center gap-1 lg:gap-2 bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-1 lg:px-4 lg:py-2"
        onSubmit={handleSendMessage}
      >
        <div className="flex space-x-1 lg:space-x-2">
          <label htmlFor="image" className="cursor-pointer">
            <LuImagePlus className="text-xl md:text-2xl lg:text-3xl text-sky-500 dark:text-purple-400 hover:text-sky-600 dark:hover:text-purple-500 transition-colors" />
          </label>
          <input
            type="file"
            name="image"
            id="image"
            className="hidden"
            accept="image/*"
            onChange={(e) => handleUpload(e, "image")}
          />

          <label htmlFor="video" className="cursor-pointer">
            <FaRegFileVideo className="text-xl md:text-2xl lg:text-3xl text-sky-500 dark:text-purple-400 hover:text-sky-600 dark:hover:text-purple-500 transition-colors" />
          </label>
          <input
            type="file"
            name="video"
            id="video"
            className="hidden"
            accept="video/*"
            onChange={(e) => handleUpload(e, "video")}
          />
        </div>

        <input
          type="text"
          name="mess"
          placeholder="Nhập tin nhắn..."
          value={inputValue}
          onChange={(e) => {
            sendMessage((prev) => ({
              ...prev,
              text: e.target.value,
            }));
          }}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none px-1 py-1.5 lg:px-3 lg:py-2 text-gray-800 dark:text-gray-200 placeholder-gray-500"
        />

        <button
          type="submit"
          className={`p-1 lg:p-2 rounded-full ${
            inputValue.trim() || mediaUrl
              ? "bg-sky-500 dark:bg-purple-600 hover:bg-sky-600 dark:hover:bg-purple-700"
              : "bg-gray-300 dark:bg-gray-700"
          } transition-colors`}
        >
          <MdOutlineSend
            className={`text-lg ${
              inputValue.trim() || mediaUrl ? "text-white" : "text-gray-500"
            }`}
          />
        </button>
      </form>
    </div>
  );
}

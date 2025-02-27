import { MdDoNotDisturbAlt } from "react-icons/md";
import { Link } from "react-router-dom";

export default function NotPermission() {
  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-2xl rounded-md p-4 md:p-6 lg:p-10 shadow-rose-100 border border-gray-200">
        <div className="flex items-center justify-center">
          <MdDoNotDisturbAlt className="text-red-500 text-4xl" />
        </div>
        <h2 className="text-red-400 text-lg md:text-xl lg:text-2xl">
          Bạn không có quyền truy cập.Vui lòng đăng nhập
        </h2>
        <Link to="/login" className="">
          Đăng nhập
        </Link>
      </div>
    </div>
  );
}

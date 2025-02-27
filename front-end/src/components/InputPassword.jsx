import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
export default function InputPassword({
  label,
  placeholder,
  name,
  id,
  onChange,
  icon,
}) {
  const [isShowPassword, setIsShowPassword] = useState(false);
  return (
    <div className="space-y-2 md:space-y-3 lg:space-y-4">
      <label htmlFor={id} className="text-base sm:text-xl text-gray-400">
        {label} :
      </label>
      <div className="flex gap-1 sm:gap-2 items-center border-2 border-pink-200 overflow-hidden rounded-lg focus:border-pink-300 justify-between">
        {icon}
        <input
          type={isShowPassword ? "text" : "password"}
          name={name}
          id={id}
          placeholder={placeholder}
          className="outline-none bg-transparent text-base sm:text-lg p-2 w-full"
          onChange={onChange}
        />
        {isShowPassword ? (
          <IoEyeOff
            className="text-xl mr-2 sm:text-2xl  md:text-3xl text-gray-500"
            onClick={() => setIsShowPassword(!isShowPassword)}
          />
        ) : (
          <IoEye
            className="text-xl mr-2 sm:text-2xl  md:text-3xl text-gray-500"
            onClick={() => setIsShowPassword(!isShowPassword)}
          />
        )}
      </div>
    </div>
  );
}

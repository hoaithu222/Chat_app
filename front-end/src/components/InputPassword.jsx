import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function InputPassword({
  label,
  placeholder,
  name,
  id,
  onChange,
  icon,
  required = false,
}) {
  const [isShowPassword, setIsShowPassword] = useState(false);

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="text-sm font-medium text-gray-700 flex items-center"
      >
        {label} {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative group">
        <div className="flex items-center border-2 border-pink-200 rounded-lg overflow-hidden transition-all focus-within:border-pink-400 focus-within:ring-2 focus-within:ring-pink-100">
          <span className="pl-3 text-gray-500">{icon}</span>
          <input
            type={isShowPassword ? "text" : "password"}
            name={name}
            id={id}
            placeholder={placeholder}
            className="outline-none bg-transparent p-3 w-full text-gray-800"
            onChange={onChange}
            required
          />
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => setIsShowPassword(!isShowPassword)}
            aria-label={isShowPassword ? "Hide password" : "Show password"}
          >
            {isShowPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

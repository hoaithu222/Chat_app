export default function InputFile({
  type = "text",
  label,
  placeholder,
  name,
  icon,
  id,
  onChange,
  required = false,
}) {
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
            type={type}
            name={name}
            id={id}
            placeholder={placeholder}
            className="outline-none bg-transparent p-3 w-full text-gray-800"
            onChange={onChange}
            required
          />
        </div>
      </div>
    </div>
  );
}

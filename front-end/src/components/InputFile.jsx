export default function InputFile({
  type = "text",
  label,
  placeholder,
  name,
  icon,
  id,
  onChange,
}) {
  return (
    <div className="space-y-2 md:space-y-3 lg:space-y-4">
      <label htmlFor={id} className="text-base sm:text-xl text-gray-400">
        {label} :
      </label>
      <div className="flex gap-1 sm:gap-2 items-center border-2 border-pink-200 overflow-hidden rounded-lg focus:border-pink-300">
        {icon}
        <input
          type={type}
          name={name}
          id={id}
          placeholder={placeholder}
          className="outline-none bg-transparent text-base sm:text-lg p-2 w-full"
          onChange={onChange}
        />
      </div>
    </div>
  );
}

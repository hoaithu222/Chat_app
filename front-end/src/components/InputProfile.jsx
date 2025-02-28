import React from "react";

export default function InputProfile({
  label,
  isEdit,
  data,
  setData,
  name,
  Icon,
  onChange,
}) {
  // Handle onChange properly if no custom handler is provided
  const handleChange = (e) => {
    if (onChange) {
      onChange(e);
    } else if (setData) {
      setData((prev) => ({
        ...prev,
        [name]: e.target.value,
      }));
    }
  };

  return (
    <div className="space-y-3">
      {isEdit && (
        <label htmlFor={name} className="text-lg md:text-xl lg:text-2xl">
          {label}
        </label>
      )}
      <div
        className={`flex items-center gap-2 p-2 rounded-xl ${
          isEdit
            ? "border-2 border-red-200 focus-within:border-pink-300 focus-within:ring-2 focus-within:ring-pink-100"
            : ""
        }`}
      >
        {Icon && (
          <Icon className="text-green-300 text-xl md:text-2xl lg:text-3xl" />
        )}
        <input
          type="text"
          name={name}
          value={data || ""}
          id={name}
          className="text-2xl md:text-3xl outline-none text-gray-600 w-full bg-transparent"
          onChange={handleChange}
          readOnly={!isEdit}
          disabled={!isEdit}
        />
      </div>
    </div>
  );
}

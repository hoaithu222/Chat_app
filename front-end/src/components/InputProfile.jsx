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
    <div className="space-y-1 lg:space-y-3">
      {isEdit && (
        <label
          htmlFor={name}
          className="text-base md:text-lg lg:text-xl text-gray-700"
        >
          {label}
        </label>
      )}
      <div
        className={`flex items-center gap-1 lg:gap-2 p-1 lg:p-2 rounded-xl ${
          isEdit
            ? "border-2 border-red-200 focus-within:border-pink-300 focus-within:ring-2 focus-within:ring-pink-100"
            : ""
        }`}
      >
        {Icon && (
          <Icon className="text-green-300 text-lg md:text-xl lg:text-2xl" />
        )}
        <input
          type="text"
          name={name}
          value={data || ""}
          id={name}
          className="text-lg md:text-xl outline-none text-gray-600 w-full bg-transparent"
          onChange={handleChange}
          readOnly={!isEdit}
          disabled={!isEdit}
        />
      </div>
    </div>
  );
}

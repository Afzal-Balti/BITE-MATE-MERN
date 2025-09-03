import React from "react";

const InputsComp = ({ label, type, value, onChange, placeholder, ...rest }) => {
  return (
    <div className="form-group">
      <input
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        id={label}
        {...rest}
      />
    </div>
  );
};

export default InputsComp;

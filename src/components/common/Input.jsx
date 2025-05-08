import React from 'react';

const Input = ({ label, type, placeholder, value, onChange, name }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm mb-2">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
      />
    </div>
  );
};

export default Input;
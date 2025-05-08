import React from 'react';

const Button = ({ children, variant = 'primary', onClick, fullWidth }) => {
  const baseStyles = "px-4 py-2 rounded-md transition-colors";
  const variants = {
    primary: "bg-black text-white hover:bg-gray-800",
    secondary: "bg-white text-black border border-gray-300 hover:bg-gray-50"
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''}`}
    >
      {children}
    </button>
  );
};

export default Button;
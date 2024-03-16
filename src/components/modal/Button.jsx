import React from "react";

const Button = ({ label, onClick, disabled, outline, small, icon: Icon }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
          relative
          disabled:opacity-70
          disabled:cursor-not-allowed
          rounded-lg
          hover:opacity-80
          transition
          w-full
          bg-black
          text-white
          p-4
        `}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}
      {label}
    </button>
  );
};

export default Button;

import React from "react";

const Button = ({ children, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative text-white font-bold text-base
        bg-black border-4 border-yellow-400 rounded-xl
        px-8 py-3
        shadow-[-5px_5px_0_0_#facc15]
        transition-transform duration-300 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]
        hover:translate-x-[5px] hover:-translate-y-[5px]
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;

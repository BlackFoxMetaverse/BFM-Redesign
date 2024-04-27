import React from "react";

const SecondaryButton = ({
  children,
  onClick,
  border,
  borderColor,
  backgroundColor,
  width,
  height,
  type,
  disabled,
  fontSize,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={{
        width: width || "100%",
        height: height || "auto",
        border: border || "none",
        backgroundColor: backgroundColor || "#141414",
        borderColor: borderColor || "transparent",
        fontSize: fontSize || "16px",
        borderRadius: 8,
      }}
      className="px-5 py-2 flex justify-center text-nowrap whitespace-nowrap size-full items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
};

export default SecondaryButton;

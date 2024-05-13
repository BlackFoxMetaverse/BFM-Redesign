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
  disabled = false,
  fontSize,
  borderRadius,
  px = 20,
  py = 8,
  className = "",
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={{
        width: width || "",
        height: height || "auto",
        border: border || "none",
        backgroundColor: backgroundColor || "#141414",
        borderColor: borderColor || "transparent",
        fontSize: fontSize || "16px",
        borderRadius: borderRadius || 8,
        paddingTop: py,
        paddingBottom: py,
        paddingLeft: px,
        paddingRight: px,
      }}
      className={`flex justify-center text-nowrap whitespace-nowrap size-full items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;

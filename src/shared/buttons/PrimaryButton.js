import React from "react";

const PrimaryButton = ({
  children,
  backgroundColor,
  onClick,
  width,
  height,
  type,
  disabled,
  color,
  fontWeight,
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      style={{
        color: color || "black",
        fontWeight: fontWeight || "bold",
        width: width || "100%",
        height: height || "auto",
        backgroundColor: backgroundColor || "#fff",
        borderRadius: 8,
      }}
      className="px-5 py-2 disabled:opacity-50 text-nowrap whitespace-nowrap disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
};

export default PrimaryButton;

const PrimaryButton = ({
  children,
  backgroundColor,
  onClick,
  width,
  height,
  type,
  disabled = false,
  color,
  fontWeight,
  borderRadius,
  px = 20,
  py = 8,
  className = "",
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      style={{
        color: color || "black",
        fontWeight: fontWeight || "bold",
        width: width || "",
        height: height || "auto",
        backgroundColor: backgroundColor || "#fff",
        borderRadius: borderRadius || 8,
        paddingTop: py,
        paddingBottom: py,
        paddingLeft: px,
        paddingRight: px,
      }}
      className={`disabled:opacity-50 flex items-center justify-center gap-3 text-nowrap whitespace-nowrap disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;

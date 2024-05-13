import React from "react";

const SpinerLoader = ({ width, height, color, borderWidth }) => {
  return (
    <div
      style={{
        width: width || "100%",
        height: height || "100%",
        border: `${borderWidth}px solid transparent`,
        borderTop: `${borderWidth}px solid ${color}`,
        borderLeft: `${borderWidth}px solid ${color}`,
      }}
      className="animate-spin"
    />
  );
};

export default SpinerLoader;

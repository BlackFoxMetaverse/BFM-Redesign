import React from "react";

const SkeletonLoader = ({ width, height }) => {
  return (
    <div
      style={{
        width: width || "100%",
        height: height || "100%",
      }}
      className="bg-slate-500 animate-pulse"
    />
  );
};

export default SkeletonLoader;

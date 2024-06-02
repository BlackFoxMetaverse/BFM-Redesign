import React from "react";
import Media from "./Media";
import SkeletonLoader from "../loader/SkeletonLoader";

const MediaGallery = ({ medias = [], backgroundColor = "#1D1D1D" }) => {
  return medias.some((media) => media === null) ? null : (
    <div
      style={{
        backgroundColor: backgroundColor,
      }}
      className={`grid lg:grid-cols-3 grid-cols-1 gap-4 size-full p-5 rounded-xl`}
    >
      {medias?.map((media, index) => (
        <div
          key={index}
          className={`${
            index === 0 ? "lg:col-span-2 lg:row-span-2" : ""
          } md:aspect-square size-full`}
        >
          <Media mediaUrl={media} />
        </div>
      ))}
    </div>
  );
};

export default MediaGallery;

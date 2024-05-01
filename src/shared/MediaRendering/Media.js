"use client";

import Image from "next/image";
import React, { useRef } from "react";
import { IoIosVideocam } from "react-icons/io";
import Swal from "sweetalert2";

const Media = ({ mediaUrl }) => {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    if (videoRef.current && mediaUrl) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return mediaUrl?.endsWith(
    ".mp4" ||
      ".avi" ||
      ".wmv" ||
      ".mov" ||
      ".mkv" ||
      ".flv" ||
      ".webm" ||
      ".avchd"
  ) ? (
    <div className="size-full relative">
      <div className="z-10 size-fit bg-black/50 p-0.5 absolute top-1 right-1 rounded-full">
        <IoIosVideocam />
      </div>
      <video
        className="object-cover cursor-pointer size-full rounded-xl"
        src={mediaUrl}
        ref={videoRef}
        muted
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
          Swal.fire({
            html: `<video
                        class="object-cover size-full max-h-screen rounded-xl"
                        src="${mediaUrl}"
                        autoplay
                        onended="() => ${Swal.close()}"
                      />`,
            showConfirmButton: false,
            showCloseButton: true,
            padding: 0,
          });
        }}
      />
    </div>
  ) : (
    <Image
      src={mediaUrl}
      alt=""
      height={100}
      width={100}
      unoptimized
      priority
      onClick={() =>
        Swal.fire({
          html: `<img
                    class="object-contain size-full max-h-screen rounded-xl"
                    src="${mediaUrl}"
                    alt=""
                    />`,
          showConfirmButton: false,
          showCloseButton: true,
          padding: 0,
          heightAuto: true,
        })
      }
      className="object-cover size-full rounded-xl cursor-pointer"
    />
  );
};

export default Media;

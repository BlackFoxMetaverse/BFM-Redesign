import React from "react";
import { MdArrowOutward } from "react-icons/md";
import Swal from "sweetalert2";

const SellerCard = ({ title, subtitle, children, className, hr, glass }) => {
  return (
    <div
      className={`size-full ${glass && "bg-sellerImage bg-cover bg-no-repeat"}`}
    >
      <div
        className={`${className} ${glass && "backdrop-blur-2xl bg-black/80"}`}
      >
        <div className="flex justify-between gap-2">
          <p className="font-medium text-lg flex flex-col">
            {title}
            <span className="text-xs font-normal text-white/60">
              {subtitle}
            </span>
          </p>
          {/* <MdArrowOutward className="text-white/60" /> */}
        </div>
        {hr && <hr className="opacity-60" />}
        {children}
      </div>
    </div>
  );
};

export default SellerCard;

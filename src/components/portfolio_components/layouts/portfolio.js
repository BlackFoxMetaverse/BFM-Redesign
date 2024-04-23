import React from "react";
import SkeletonLoader from "../../../shared/loader/SkeletonLoader";

const PortfolioDetails = ({ details }) => {
  return (
    <section>
      <div className="w-11/12 mx-auto flex gap-10 py-12">
        <div className="left w-1/4 shrink-0 space-y-7">
          <div className="w-full overflow-hidden aspect-video max-w-full min-h-24 rounded-xl">
            <SkeletonLoader />
          </div>
          <div className="w-full overflow-hidden max-w-full aspect-[7/1] min-h-10 rounded-xl">
            <SkeletonLoader />
          </div>
          <div className="w-full overflow-hidden aspect-video max-w-full min-h-24 rounded-xl">
            <SkeletonLoader />
          </div>
          <div className="w-full overflow-hidden aspect-video max-w-full min-h-24 rounded-xl">
            <SkeletonLoader />
          </div>
          <div className="w-full overflow-hidden aspect-video max-w-full min-h-32 rounded-xl">
            <SkeletonLoader />
          </div>
        </div>
        <div className="right space-y-7 size-full">
          <div className="w-full overflow-hidden aspect-[4/1] max-w-full min-h-24 rounded-xl">
            <SkeletonLoader />
          </div>
          <div className="w-full overflow-hidden aspect-[3/1] max-w-full min-h-32 rounded-xl">
            <SkeletonLoader />
          </div>
          <div className="w-full overflow-hidden aspect-[2/1] max-w-full min-h-32 rounded-xl">
            <SkeletonLoader />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioDetails;

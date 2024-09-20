import React from "react";

const TagCardSkeleton = () => {
  return (
    <div className="flex flex-col pb-3">
      <div className="relative h-[150px] w-[150px] animate-pulse rounded-[10px] bg-[#262626]"></div>
      <div className="mt-[10px] h-[16px] w-[140px] animate-pulse rounded-xl bg-[#262626] pb-0"></div>
      <div className="h-[16px] w-20 animate-pulse rounded-xl bg-[#262626]"></div>
    </div>
  );
};

export default TagCardSkeleton;

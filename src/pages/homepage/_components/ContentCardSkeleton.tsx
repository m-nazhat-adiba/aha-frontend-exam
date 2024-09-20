import Image from "next/image";
import React from "react";

const ContentCardSkeleton = () => {
  return (
    <div className="flex w-full flex-col gap-3 pb-2 lg:w-auto">
      <div className="flex h-[222.67px] w-full animate-pulse bg-[#262626] lg:h-[146px] lg:w-[219px]"></div>
      <div className="flex h-[39px] max-h-[39px] flex-col justify-between">
        <div className="h-[14px] w-40 animate-pulse rounded-xl bg-[#262626]"></div>
        <div className="h-[8px] w-24 animate-pulse rounded-xl bg-[#262626]"></div>
      </div>
    </div>
  );
};

export default ContentCardSkeleton;

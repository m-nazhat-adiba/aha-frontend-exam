import React from "react";

const UserCardSkeleton = () => {
  return (
    <div className="flex w-full flex-row items-center justify-between">
      <div className="flex flex-row gap-[15px]">
        <div className="flex h-10 w-10 flex-row items-center bg-[#262626]"></div>
        <div className="flex animate-pulse flex-col justify-between">
          <div className="h-4 w-40 animate-pulse bg-[#262626]"></div>
          <div className="h-4 w-20 animate-pulse bg-[#262626]"></div>
        </div>
      </div>
      <div className="flex h-8 w-[80px] animate-pulse rounded-[20px] bg-[#262626]"></div>
    </div>
  );
};

export default UserCardSkeleton;

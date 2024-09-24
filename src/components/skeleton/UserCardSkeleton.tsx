import React from 'react';

export const UserCardSkeleton = () => {
  return (
    <div className="flex w-full flex-row items-center justify-between">
      <div className="flex flex-row gap-[15px]">
        <div className="flex h-10 w-10 flex-row items-center bg-neutrals-700"></div>
        <div className="flex animate-pulse flex-col justify-between">
          <div className="h-4 w-40 animate-pulse bg-neutrals-700"></div>
          <div className="h-4 w-20 animate-pulse bg-neutrals-700"></div>
        </div>
      </div>
      <div className="flex h-8 w-[80px] animate-pulse rounded-[20px] bg-neutrals-700"></div>
    </div>
  );
};

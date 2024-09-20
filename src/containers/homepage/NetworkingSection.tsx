"use client";

import { useEffect, useRef, useState } from "react";
import FollowerList from "./_components/FollowerList";
import FollowingList from "./_components/FollowingList";

const NetworkingSection = () => {
  const [tabActive, setTabActive] = useState(0);
  const tabRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (tabRef.current) {
      setHeight(tabRef.current.offsetHeight);
    }
  }, []);

  return (
    <div className="h-[102 hidden w-auto lg:flex lg:w-[375px] lg:flex-col">
      <div
        ref={tabRef}
        className="flex flex-row justify-between py-8 text-base"
      >
        <button
          onClick={() => setTabActive(0)}
          className={`h-[34px] w-1/2 pb-3 ${
            tabActive === 0
              ? "border-b-2 border-solid border-b-white font-bold text-white"
              : "font-normal text-[#929292] hover:text-slate-300"
          }`}
        >
          Followers
        </button>
        <button
          onClick={() => setTabActive(1)}
          className={`w-1/2 pb-3 ${
            tabActive === 1
              ? "border-b-2 border-solid border-b-white font-bold text-white"
              : "font-normal text-[#929292] hover:text-slate-300"
          }`}
        >
          Following
        </button>
      </div>

      {/* Account List */}
      {tabActive === 0 ? (
        <FollowerList offset={height} />
      ) : (
        <FollowingList offset={height} />
      )}
    </div>
  );
};

export default NetworkingSection;

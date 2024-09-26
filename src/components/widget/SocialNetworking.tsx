/**
 * @fileoverview A networking widget component that displays lists of
 * followers and following users.
 *
 * This component allows users to switch between viewing their followers
 * and the users they are following.
 * It utilizes React's state and effect hooks to manage the active tab
 * and dynamically adjust the height of the tab header.
 *
 * @returns The rendered NetworkingSection component containing
 * the tabs and the respective lists.
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import { FollowerList } from '../homepage/FollowerList';
import { FollowingList } from '../homepage/FollowingList';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export const SocialNetworking = () => {
  const [tabActive, setTabActive] = useState(0);
  const tabRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState(0);
  const path = usePathname();

  const allowedPath = ['/', '/result'];

  useEffect(() => {
    if (tabRef.current) {
      setHeight(tabRef.current.offsetHeight);
    }
  }, []);

  return (
    <div
      className={clsx(
        'h-[102 w-auto lg:w-[375px]',
        allowedPath.includes(path) ? 'hidden lg:flex lg:flex-col' : 'hidden',
      )}
    >
      <div
        ref={tabRef}
        className="flex flex-row justify-between py-8 text-base"
      >
        <button
          onClick={() => setTabActive(0)}
          className={`h-[34px] w-1/2 pb-3 ${
            tabActive === 0
              ? 'border-b-2 border-solid border-b-white font-bold text-white'
              : 'font-normal text-[#929292] hover:text-slate-300'
          }`}
        >
          Followers
        </button>
        <button
          onClick={() => setTabActive(1)}
          className={`w-1/2 pb-3 ${
            tabActive === 1
              ? 'border-b-2 border-solid border-b-white font-bold text-white'
              : 'font-normal text-[#929292] hover:text-slate-300'
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

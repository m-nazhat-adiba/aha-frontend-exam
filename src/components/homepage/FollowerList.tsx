/**
 * @fileoverview
 * The `FollowerList` component fetches and displays a list of followers.
 * It implements infinite scroll to manage loading more data when
 * the user scrolls to the bottom of the list. The component
 * also uses visibility and scroll observers to
 * stop the component to fetch the data when the
 * component was not appeared in the viewport.
 * The component includes skeleton loaders when the data is being fetched.
 *
 * @param  offset - The offset value used to manage infinite scroll position.
 * @returns Rendered follower list with infinite scrolling.
 */

import React, { useState, useRef, useEffect } from 'react';
import { UserCard } from '../cards/UserCard';
import { useFollowerQuery } from '@/lib/services/api';
import { useVisibilityObserver } from '@/hooks/useVisibilityObserver';
import { UserCardSkeleton } from '../skeleton/UserCardSkeleton';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

interface Props {
  offset: number;
}

export const FollowerList = ({ offset }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const followerContainerRef = useRef<HTMLDivElement | null>(null);

  useVisibilityObserver({
    setter: setIsVisible,
    reference: followerContainerRef,
  });

  const {
    data: followerResponse,
    error,
    isFetching,
  } = useFollowerQuery(
    {
      page: page,
      keyword: '',
      pageSize: 20,
    },
    {
      skip: !hasMore || !isVisible,
    },
  );

  const { items, handleScroll } = useInfiniteScroll(
    followerResponse?.data || [],
    setPage,
    setHasMore,
    hasMore,
    isFetching,
    followerContainerRef,
    followerResponse?.total || 0,
    offset,
  );

  const skeletonArray = Array.from({ length: 20 }, (_, i) => i);

  return (
    <div
      ref={followerContainerRef}
      onScroll={handleScroll}
      className="no-scrollbar sticky top-0 z-[9999] flex h-[calc(100vh_-_102px)] flex-col gap-4 overflow-y-scroll px-4"
    >
      {followerResponse
        ? items.map((item, key) => (
            <UserCard
              name={item.name}
              username={item.username}
              isFollowing={item.isFollowing}
              src={item.id}
              key={key}
            />
          ))
        : skeletonArray.map((key) => <UserCardSkeleton key={key} />)}

      {isFetching && followerResponse && <UserCardSkeleton />}
    </div>
  );
};

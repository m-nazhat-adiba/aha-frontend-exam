import React, { useRef, useState } from 'react';
import { UserCard } from '../cards/UserCard';
import { useFollowingQuery } from '@/lib/services/api';
import { UserCardSkeleton } from '../skeleton/UserCardSkeleton';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

interface Props {
  offset: number;
}

export const FollowingList = ({ offset }: Props) => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const followingContainerRef = useRef<HTMLDivElement | null>(null);

  const {
    data: followingResponse,
    error,
    isFetching,
  } = useFollowingQuery(
    {
      page: page,
      keyword: '',
      pageSize: 20,
    },
    {
      skip: !hasMore,
    },
  );

  const { items, handleScroll } = useInfiniteScroll(
    followingResponse?.data || [],
    setPage,
    setHasMore,
    hasMore,
    isFetching,
    followingContainerRef,
    followingResponse?.total || 0,
    offset,
  );

  const skeletonArray = Array.from({ length: 20 }, (_, i) => i);

  return (
    <div
      ref={followingContainerRef}
      onScroll={handleScroll}
      className="no-scrollbar sticky top-0 z-[9999] flex h-[calc(100vh_-_102px)] flex-col gap-4 overflow-y-scroll px-4"
    >
      {followingResponse
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

      {isFetching && followingResponse && <UserCardSkeleton />}
    </div>
  );
};

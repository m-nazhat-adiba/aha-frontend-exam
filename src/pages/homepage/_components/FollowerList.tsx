"use client";

import React, { useState, useRef, useEffect } from "react";
import UserCard from "./UserCard";
import { useFollowerQuery } from "@/services/api";
import useVisibilityObserver from "@/hooks/useVisibilityObserver";
import UserCardSkeleton from "./UserCardSkeleton";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";

interface Props {
  offset: number;
}

const FollowerList = ({ offset }: Props) => {
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
      keyword: "",
      pageSize: 20,
    },
    {
      skip: !isVisible || !hasMore,
    },
  );

  const { items, handleScroll } = useInfiniteScroll(
    followerResponse?.data,
    setPage,
    setHasMore,
    hasMore,
    isFetching,
    followerContainerRef,
    followerResponse?.total,
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

export default FollowerList;

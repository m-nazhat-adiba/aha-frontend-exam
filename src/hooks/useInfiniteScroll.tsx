import { useState, useEffect, useCallback } from "react";
import { User } from "@/models/UsersQuery";

const useInfiniteScroll = (
  fetchedData: User[] | undefined,
  setPage: React.Dispatch<React.SetStateAction<number>>,
  setHasMore: React.Dispatch<React.SetStateAction<boolean>>,
  hasMore: boolean,
  isFetching: boolean,
  containerRef: React.RefObject<HTMLDivElement>,
  total: number | undefined,
  offset: number,
) => {
  const [items, setItems] = useState<User[]>([]);

  // Check if the container's height is less than the viewport height
  const fetchUntilFull = useCallback(() => {
    if (containerRef.current) {
      const containerHeight = containerRef.current.scrollHeight + offset;
      const viewportHeight = window.innerHeight;
      // Continue fetching while the container's height is less than the viewport
      if (containerHeight < viewportHeight && hasMore && !isFetching) {
        setPage((prevPage) => prevPage + 1);
        console.log(containerHeight, viewportHeight, isFetching, "page");
      }
    }
  }, [containerRef, hasMore, isFetching, setPage]);

  useEffect(() => {
    if (fetchedData) {
      if (items.length === total) {
        setHasMore(false);
      }
      setItems((prevItems) => [...prevItems, ...fetchedData]);
    }
  }, [fetchedData, total]);

  const handleScroll = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    console.log(scrollHeight - scrollTop, clientHeight, "page scroll");
    if (
      scrollHeight - scrollTop <= clientHeight + 10 &&
      hasMore &&
      !isFetching
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // Trigger fetching until the container is full (height is the same as the screen)
  useEffect(() => {
    fetchUntilFull();
  }, [fetchUntilFull, fetchedData]);

  return {
    items,
    handleScroll,
  };
};

export default useInfiniteScroll;

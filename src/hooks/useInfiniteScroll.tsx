/**
 * @fileoverview Custom hook for managing infinite scroll in a container.
 * This hook listens to scroll events and triggers data fetching when the user
 * reaches the bottom of the container.
 *
 * @param fetchedData - The data fetched from the API.
 * @param setPage - Function to increment the current page number.
 * @param setHasMore - Function to set whether more data is available.
 * @param hasMore - Boolean flag indicating if more data is available for fetching.
 * @param isFetching -  Boolean flag indicating if data is currently being fetched.
 * @param containerRef - The container to monitor for scrolling.
 * @param total - The total number of items available for fetching.
 * @param offset - The pixel offset of the container.
 * @return The current list of items and the scroll handler function.
 */

import { useState, useEffect, useCallback } from 'react';
import { User } from '@/models/UsersQuery';

export const useInfiniteScroll = (
  fetchedData: User[],
  setPage: React.Dispatch<React.SetStateAction<number>>,
  setHasMore: React.Dispatch<React.SetStateAction<boolean>>,
  hasMore: boolean,
  isFetching: boolean,
  containerRef: React.RefObject<HTMLDivElement>,
  total: number,
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
      }
    }
  }, [containerRef, hasMore, isFetching, setPage, offset]);

  // Append new data to the items array
  useEffect(() => {
    if (fetchedData.length > 0) {
      setItems((prevItems) => [...prevItems, ...fetchedData]);

      if (items.length + fetchedData.length >= total) {
        setHasMore(false);
      }
    }
  }, [fetchedData, total, setHasMore]);

  // Scroll handler function to be returned
  const handleScroll = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
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
    if (fetchedData.length > 0) {
      fetchUntilFull();
    }
  }, [fetchUntilFull, fetchedData]);

  return {
    items,
    handleScroll,
  };
};

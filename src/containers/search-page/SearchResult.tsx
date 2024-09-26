/**
 * @fileoverview A search result component that displays a list of search results
 * based on a user's query. It supports pagination, infinite scrolling, and responsive design.
 *
 * This component fetches search results using the `useSearchQuery` hook and displays them
 * in a grid format. It also includes options to load more results and clear the search state.
 * The component automatically handles scrolling to fetch more results when `loadMore` is enabled.
 *
 * It also verifies if required search parameters are present, and redirects to an error page if missing.
 *
 * @returns The rendered SearchResult component displaying search results in a grid format with infinite scrolling.
 */

'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ContentCard } from '../../components/cards/ContentCard';
import Image from 'next/image';
import { BasicButton } from '@/components/button/BasicButton';
import { useDispatch, useSelector } from 'react-redux';
import { userApi, useSearchQuery } from '@/lib/services/api';
import { resetSearchState, setLoadMore } from '@/lib/features/SearchSlice';
import { RootState } from '@/lib/store';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { ContentCardSkeleton } from '../../components/skeleton/ContentCardSkeleton';
import { useRouter, useSearchParams } from 'next/navigation';

export const SearchResult = () => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [viewpoertWidth, setViewportWidth] = useState(window.innerWidth);
  const loadMore = useSelector((state: RootState) => state.search.loadMore);
  const resultContainerRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();

  const searchKeyword = searchParams.get('keyword') || '';
  const searchPageSize = searchParams.get('pageSize') || '0';
  const arrayLength = Math.floor(Number(searchPageSize));
  const skeletonArray = Array.from({ length: arrayLength }, (_, i) => i);

  const {
    data: searchResult,
    error,
    isFetching,
  } = useSearchQuery(
    {
      page: page,
      pageSize: searchPageSize,
      keyword: searchKeyword,
    },
    {
      skip: !hasMore,
    },
  );

  const { items, handleScroll } = useInfiniteScroll(
    searchResult?.data || [],
    setPage,
    setHasMore,
    hasMore,
    isFetching,
    resultContainerRef,
    searchResult?.total || 0,
    100,
    loadMore,
  );

  const handleBackward = () => {
    dispatch(userApi.util.invalidateTags(['SearchResult']));
    dispatch(resetSearchState());
    router.push('/');
  };

  const handleLoadMore = () => {
    dispatch(setLoadMore(true));
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    setViewportWidth(window.innerWidth);
    if (viewpoertWidth <= 640) {
      dispatch(setLoadMore(true));
    }
  }, [window.innerWidth]);

  useEffect(() => {
    if (!searchParams.has('keyword') || !searchParams.has('pageSize')) {
      router.push('/error');
    }
  }, []);

  return (
    <div
      ref={resultContainerRef}
      onScroll={loadMore ? handleScroll : undefined}
      className="no-scrollbar relative ml-0 flex h-auto w-full flex-col items-start overflow-y-auto px-5 lg:ml-[80px] lg:px-[130px] lg:pt-[92px]"
    >
      <div className="mb-5 flex max-h-[70px] min-h-[70px] -translate-x-0 flex-row items-center gap-[13px] lg:mb-0 lg:h-auto lg:min-h-[45px] lg:-translate-x-[38px] lg:transform lg:gap-[25px]">
        <div onClick={handleBackward}>
          <Image
            alt="back"
            src="/icons/chevron-back.svg"
            width={26}
            height={26}
            className="h-[26px] w-[26px] cursor-pointer"
          />
        </div>
        <span className="text-2xl lg:hidden">Home Page</span>
        <span className="hidden text-2xl lg:flex lg:text-[30px] lg:leading-[45px]">
          Results
        </span>
      </div>
      <div className="text-2xl lg:hidden">Results</div>

      <div className="grid w-full grid-cols-1 flex-wrap gap-[34px] pb-[58px] pt-6 sm:grid-cols-2 md:grid-cols-3 lg:flex lg:w-auto lg:flex-row lg:flex-wrap lg:items-start lg:justify-start lg:pb-[12px]">
        {searchResult
          ? items.map((item, key) => (
              <ContentCard
                src={item.id}
                title={item.name}
                author={item.username}
                key={key}
              />
            ))
          : skeletonArray.map((item, key) => <ContentCardSkeleton key={key} />)}
      </div>

      <div className="hidden w-[343px] pt-[23px] lg:flex">
        {searchResult && items.length < searchResult.total && !loadMore ? (
          <BasicButton onClick={handleLoadMore} variant="primary" size="large">
            MORE
          </BasicButton>
        ) : (
          <div className="flex h-10 w-full"></div>
        )}
      </div>
    </div>
  );
};

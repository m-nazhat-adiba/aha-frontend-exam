import React, { useRef, useState } from "react";
import ContentCard from "./_components/ContentCard";
import Image from "next/image";
import BasicButton from "@/components/button/BasicButton";
import { useDispatch, useSelector } from "react-redux";
import { avlApi, useSearchQuery } from "@/lib/services/api";
import { resetSearchState, setLoadMore } from "@/lib/slices/SearchSlice";
import { RootState } from "@/lib/store";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";

const SearchResult = () => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [infiniteScrollEnabled, setInfiniteScrollEnabled] = useState(false); // Control scroll

  const searchKeyword = useSelector((state: RootState) => state.search.keyword);
  const searchPageSize = useSelector(
    (state: RootState) => state.search.pageSize,
  );
  const loadMore = useSelector((state: RootState) => state.search.loadMore);

  const resultContainerRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useDispatch();

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
    searchResult?.data,
    setPage,
    setHasMore,
    hasMore,
    isFetching,
    resultContainerRef,
    searchResult?.total,
    0,
  );

  const handleClearSearchResult = () => {
    dispatch(avlApi.util.invalidateTags(["SearchResult"]));
    dispatch(resetSearchState());
  };

  const handleLoadMore = () => {
    dispatch(setLoadMore(true));
    setPage((prevPage) => prevPage + 1);
    setInfiniteScrollEnabled(true); // Enable infinite scroll after clicking load more
  };

  return (
    <div
      ref={resultContainerRef}
      onScroll={infiniteScrollEnabled ? handleScroll : undefined} // Scroll only if enabled
      className="ml-0 flex h-full w-full flex-col items-start justify-between overflow-y-auto px-5 lg:ml-[80px] lg:px-[130px] lg:pt-[92px]"
    >
      <div className="mb-5 flex h-[70px] -translate-x-0 flex-row items-center gap-[13px] lg:mb-0 lg:h-auto lg:-translate-x-[38px] lg:transform lg:gap-[25px]">
        <div onClick={handleClearSearchResult}>
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

      <div className="grid w-full grid-cols-1 flex-wrap gap-[34px] pb-[58px] pt-6 sm:grid-cols-2 md:grid-cols-3 lg:flex lg:w-auto lg:flex-row lg:justify-start">
        {searchResult &&
          items.map((item, key) => (
            <ContentCard
              src={item.id}
              title={item.name}
              author={item.username}
              key={key}
            />
          ))}
      </div>
      <div className="hidden w-[343px] pt-[23px] lg:flex">
        {searchResult && items.length < searchResult.total && !loadMore && (
          <BasicButton onClick={handleLoadMore} variant="primary" size="large">
            MORE
          </BasicButton>
        )}
      </div>
    </div>
  );
};

export default SearchResult;

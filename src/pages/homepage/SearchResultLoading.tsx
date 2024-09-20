import React from "react";
import Image from "next/image";
import ContentCardSkeleton from "./_components/ContentCardSkeleton";
import { useDispatch } from "react-redux";
import { avlApi } from "@/services/api";
import { resetSearchState } from "@/slices/SearchSlice";

const SearchResultLoading = () => {
  const dispatch = useDispatch();

  const arr = Array.from({ length: 9 }, (_, i) => i);
  const handleClearSearchResult = () => {
    dispatch(avlApi.util.invalidateTags(["SearchResult"]));
    dispatch(resetSearchState());
  };
  return (
    <div className="ml-0 flex h-auto w-full flex-col items-start justify-between px-5 lg:ml-[80px] lg:px-[130px] lg:pt-[92px]">
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

      <div className="flex w-full flex-col flex-wrap gap-[34px] pt-6 md:w-auto md:flex-row">
        {arr.map((item, key) => (
          <ContentCardSkeleton key={key} />
        ))}
      </div>
    </div>
  );
};

export default SearchResultLoading;

"use client";

import React from "react";
import TagCard from "./_components/TagCard";
import { useTagsQuery } from "@/services/api";
import TagCardSkeleton from "./_components/TagCardSkeleton";

const TagList = () => {
  const { data: tagsData, error, isFetching } = useTagsQuery();
  const skeletonArray = Array.from({ length: 12 }, (_, i) => i);
  return (
    <div className="grid grid-cols-2 gap-6 pt-6 sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:w-[846px] lg:grid-cols-5 lg:pb-8">
      {!isFetching && tagsData
        ? tagsData.map((item) => (
            <TagCard name={item.name} total={item.count} key={item.id} />
          ))
        : skeletonArray.map((key) => <TagCardSkeleton key={key} />)}
    </div>
  );
};

export default TagList;

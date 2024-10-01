/**
 * @fileoverview A component that displays a list of tags as TagCard components.
 *
 * The component fetches tags from an API and renders them in a grid layout.
 * If the data is still being fetched, it displays skeleton loaders for a better user experience.
 *
 * @returns The rendered TagList component containing TagCard or TagCardSkeleton components.
 */

import React from 'react';
import { TagCard } from '../../components/cards/TagCard';
import { useTagsQuery } from '@/lib/services/api';
import { TagCardSkeleton } from '../../components/skeleton/TagCardSkeleton';

export const TagList = () => {
  const { data: tagsData, error, isFetching } = useTagsQuery();
  const skeletonArray = Array.from({ length: 12 }, (_, i) => i);
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-2 gap-6 pt-6 sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:w-[846px] lg:grid-cols-5 lg:pb-8">
        {!isFetching && tagsData
          ? tagsData.map((item) => (
              <TagCard name={item.name} total={item.count} key={item.id} />
            ))
          : skeletonArray.map((key) => <TagCardSkeleton key={key} />)}
      </div>
    </div>
  );
};

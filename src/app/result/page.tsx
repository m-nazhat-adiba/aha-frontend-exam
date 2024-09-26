'use client';

/**
 * @fileoverview The main component of search result page.
 * It shows the fetched data based on the
 * parameter in grid view.
 * It also includes a fixed social widget
 * on the right side of the screen
 *
 * @returns The rendered search result component
 * containing fetched data (presented as cards)
 * and social widget
 */

import { SearchResult } from '@/containers/search-page/SearchResult';
import React from 'react';

const SearchPage = () => {
  return (
    <main className="flex h-screen w-screen flex-row overflow-y-auto">
      <div className="flex h-full w-full flex-col lg:w-[calc(100vw_-_455px)]">
        <SearchResult />
      </div>
    </main>
  );
};

export default SearchPage;

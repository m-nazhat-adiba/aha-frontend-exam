/**
 * @fileoverview The main component of the homepage that conditionally renders
 * the input section or the search result based on the search trigger state.
 *
 * This component uses Redux to determine if the user has initiated a search,
 * and it displays the appropriate section accordingly. It also includes a fixed
 * networking section on the right side of the screen.
 *
 * @returns The rendered Home component containing the input
 * section or search results, alongside the networking section.
 */

'use client';

import { InputsSection } from '@/containers/homepage/InputsSection';
import { NetworkingSection } from '@/containers/homepage/NetworkingSection';
import { SearchResult } from '@/containers/homepage/SearchResult';
import { RootState } from '@/lib/store';
import { useSelector } from 'react-redux';

const Home = () => {
  const searchTrigger = useSelector(
    (state: RootState) => state.search.searchTrigger,
  );
  return (
    <main className="flex h-screen w-screen flex-row overflow-y-auto">
      <div className="flex h-full w-full flex-col lg:w-[calc(100vw_-_455px)]">
        {searchTrigger ? <SearchResult /> : <InputsSection />}
      </div>
      <div className="fixed right-0 top-0 z-[9999] w-[375px] bg-[#181818]">
        <NetworkingSection />
      </div>
    </main>
  );
};

export default Home;

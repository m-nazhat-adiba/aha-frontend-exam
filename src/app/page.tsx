"use client";

import InputsSection from "@/pages/homepage/InputsSection";
import NetworkingSection from "@/pages/homepage/NetworkingSection";
import SearchResult from "@/pages/homepage/SearchResult";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function Home() {
  const searchTrigger = useSelector(
    (state: RootState) => state.search.searchTrigger,
  );
  return (
    <main className="flex max-h-full min-h-[100vh] w-screen flex-row md:h-screen">
      <div className="flex w-full flex-col lg:w-[calc(100vw_-_455px)]">
        {searchTrigger ? <SearchResult /> : <InputsSection />}
      </div>
      <div className="fixed right-0 top-0 z-[9999] w-[375px] bg-[#181818]">
        <NetworkingSection />
      </div>
    </main>
  );
}

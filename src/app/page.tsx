/**
 * @fileoverview The main component of the homepage.
 * This component uses Redux to determine if the user has initiated a search,
 * and it displays the appropriate section accordingly. It also includes a fixed
 * social widget on the right side of the screen.
 *
 * @returns The rendered Home component containing the input section alongside the
 * social widget.
 */

'use client';

import { InputsSection } from '@/containers/homepage/InputsSection';

const Home = () => {
  return (
    <main className="flex h-screen w-screen flex-row overflow-y-auto">
      <div className="flex h-full w-full flex-col lg:w-[calc(100vw_-_455px)]">
        <InputsSection />
      </div>
    </main>
  );
};

export default Home;

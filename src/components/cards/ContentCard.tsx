/**
 * @fileoverview This component displays a card with an image, title, and author.
 * It generates a random image based on the `src` prop using the Faker.js library.
 * The component is responsive and adjusts layout for larger screens.
 *
 * @param src - The source string used to generate a unique random image.
 * @param title - The title of the content displayed on the card.
 * @param author - The author of the content displayed on the card.
 *
 * @returns A rendered content card with an image, title, and author.
 */

import Image from 'next/image';
import React from 'react';
import { faker } from '@faker-js/faker';

interface CardProps {
  src: string;
  title: string;
  author: string;
}

export const ContentCard: React.FC<CardProps> = ({ src, title, author }) => {
  const seedNumber = Number(src.replace(/\D/g, '')) * 100;
  faker.seed(seedNumber);
  const fakeImage = faker.image.url({ width: 100, height: 50 });

  return (
    <div className="flex w-full flex-col gap-[20.33px] pb-2 md:gap-3 lg:w-auto">
      <div className="flex h-[222.67px] w-full overflow-hidden lg:h-[146px] lg:w-[219px]">
        <Image
          src={fakeImage}
          alt={`${title}.image`}
          height={50}
          width={100}
          className="h-auto w-full object-cover"
        />
      </div>
      <div className="flex max-h-[39px] flex-col">
        <span className="text-[14.9px] font-normal leading-[22.35px] text-white">
          {title}
        </span>
        <span className="text-[11.7px] font-normal leading-[16.76px] text-[#B2B2B2]">
          by {author}
        </span>
      </div>
    </div>
  );
};

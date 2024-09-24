import { BasicButton } from '@/components/button/BasicButton';
import { faker } from '@faker-js/faker';
import Image from 'next/image';
import React from 'react';

interface CardProps {
  name: string;
  username: string;
  src: string;
  isFollowing: boolean;
}

export const UserCard: React.FC<CardProps> = ({
  name,
  username,
  src,
  isFollowing,
}) => {
  const fakerSeed = Number(src.replace(/\D/g, '')) * 10;
  faker.seed(fakerSeed);
  const fakeAvatar = faker.image.avatarGitHub();

  return (
    <div className="flex w-full flex-row items-center justify-between">
      <div className="flex flex-row gap-[15px]">
        <div className="flex flex-row items-center">
          <Image
            src={fakeAvatar}
            alt={`${name} avatar`}
            height={50}
            width={50}
            className="w-10 rounded-[5px] border border-white"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-base font-normal">{name}</span>
          <span className="text-sm text-[#8d8d8d]">{`@${username}`}</span>
        </div>
      </div>
      {isFollowing ? (
        <div className="flex w-[80px]">
          <BasicButton variant="contained" type="button" size="small">
            Followed
          </BasicButton>
        </div>
      ) : (
        <div className="flex w-[60px]">
          <BasicButton variant="outlined" type="button" size="small">
            Follow
          </BasicButton>
        </div>
      )}
    </div>
  );
};

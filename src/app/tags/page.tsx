"use client";

import TagList from "@/pages/tags/TagList";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Tags() {
  return (
    <main className="flex w-full translate-x-0 flex-row justify-center lg:w-[calc(100vw_-_80px)] lg:translate-x-[80px]">
      <div className="flex h-auto w-full flex-col items-start justify-between px-5 lg:max-w-[846px] lg:px-0 lg:pt-[58px]">
        <div className="mb-5 flex h-[70px] flex-row items-center gap-[13px] md:mb-0 lg:-translate-x-[38px] lg:transform">
          <Link href={"/"}>
            <Image
              alt="back"
              src="/icons/chevron-back.svg"
              width={26}
              height={26}
              className="h-[26px] w-[26px] cursor-pointer lg:hidden"
            />
          </Link>
          <span className="text-2xl lg:hidden">Home Page</span>
          <span className="hidden text-2xl lg:flex lg:pl-6 lg:text-[30px]">
            Tags
          </span>
        </div>
        <div className="mx-auto flex flex-col">
          <div className="text-2xl lg:hidden">Tags</div>
          <TagList />
        </div>
      </div>
    </main>
  );
}

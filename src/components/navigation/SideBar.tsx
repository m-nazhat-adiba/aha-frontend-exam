/**
 * @fileoverview A sidebar component that provides navigation links
 * for the application.
 * The sidebar consists of a vertical navigation menu for desktop and
 * a bottom navigation bar for mobile devices.
 * Each menu item can display an icon and a name, highlighting the
 * current active route.
 *
 * @component Menu Component
 *
 * @param target - The target URL for the menu item.
 * @param icon - The icon URL for the menu item.
 * @param name - The display name for the menu item.
 * @param carrying - an additional path for highlighting the menu item when active
 * @returns The rendered Menu component.
 *
 * @component SideBar Component
 *
 * @returns The rendered sidebar component containing Menu items.
 */

'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MenuProps {
  target: string;
  icon: string;
  name: string;
  carrying?: string;
}

const Menu: React.FC<MenuProps> = ({
  target = '/',
  icon = '/Union.svg',
  name = 'Home',
  carrying,
}) => {
  let path = usePathname();

  return (
    <Link href={target} className="flex flex-col gap-0">
      <Image
        src={icon}
        alt={name}
        width={24}
        height={24}
        className={`mx-auto h-6 w-6 cursor-pointer p-[2px] hover:contrast-[2] ${
          (path === target || path === carrying) && 'contrast-[15] invert'
        }`}
      />
      <span className="mx-auto hidden text-xs leading-[18px] lg:inline-block">
        {(path === target || path === carrying) && name}
      </span>
    </Link>
  );
};

export const SideBar = () => {
  const path = usePathname();

  return (
    <>
      {/* Desktop */}
      <nav className="left-0 hidden h-full w-20 flex-col bg-[#202020] lg:fixed lg:flex">
        <div className="h-[88px] w-full">
          <div className="mb-2 flex h-[88px] w-full justify-center">
            <span className="flex items-center justify-center bg-gradient-to-r from-[#FFD25F] to-[#FF5C01] bg-clip-text text-[13px] font-bold leading-[15px] text-transparent">
              LOGO
            </span>
          </div>
        </div>
        <div className="mx-auto mt-[7px] flex h-auto w-full flex-col items-center gap-[22px]">
          <Menu
            target="/"
            name="Home"
            icon="/icons/union.svg"
            carrying="/result"
          />
          <Menu target="/tags" name="Tags" icon="/icons/union.svg" />
        </div>
      </nav>

      {/* Mobile */}
      <nav
        className={clsx(
          'bottom-0 z-[9999] flex h-[66px] w-full items-center bg-[#202020]',
          path !== '/' ? 'hidden' : 'fixed lg:hidden',
        )}
      >
        <div className="flex w-full flex-row justify-center gap-[50px] align-middle">
          <Menu target="/" name="Home" icon="/icons/union.svg" />
          <Menu target="/tags" name="Tags" icon="/icons/union.svg" />
        </div>
      </nav>
    </>
  );
};

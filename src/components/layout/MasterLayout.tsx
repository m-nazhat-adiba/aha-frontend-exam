/**
 * @fileoverview
 * The `MasterLayout` component serves as the general layout for the application.
 * It includes the `SideBar` on the left and a fixed `SocialNetworking` widget
 * on the right. The `children` prop represents the main content of the page that
 * is dynamically rendered within the layout.
 *
 * @param props - The props object containing the children components.
 * @returns Rendered layout structure with a sidebar and social networking widget.
 */

import React from 'react';
import { SideBar } from '../navigation/SideBar';
import { SocialNetworking } from '../widget/SocialNetworking';

interface Props {
  children: React.ReactNode;
}

export const MasterLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <SideBar />
      {children}
      <div className="fixed right-0 top-0 z-[9999] w-[375px] bg-[#181818]">
        <SocialNetworking />
      </div>
    </>
  );
};

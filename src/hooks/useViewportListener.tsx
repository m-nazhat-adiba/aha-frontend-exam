/**
 * @fileoverview Custom React hook that listens for window resize events and returns the current window dimensions.
 *
 * This hook tracks the browser's window width and height, updating the dimensions when the window is resized.
 * It sets up an event listener for the `resize` event and cleans it up when the component is unmounted.
 *
 * @returns  An object containing the current window width and height.
 *
 * @property  width - The current width of the window or undefined initially.
 * @property  height - The current height of the window or undefined initially.
 *
 */

import { useEffect, useState } from 'react';

type WindowDimentions = {
  width: number | undefined;
  height: number | undefined;
};

export const useViewportListener = (): WindowDimentions => {
  const [windowDimensions, setWindowDimensions] = useState<WindowDimentions>({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    function handleResize(): void {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return (): void => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
};

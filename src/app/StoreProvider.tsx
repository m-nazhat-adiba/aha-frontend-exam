/**
 * @fileoverview A provider component that wraps the application with a Redux store.
 *
 * This component uses the React Redux `Provider` to make the Redux store available
 * to the entire application. It initializes the store only once and reuses it across
 * renders, improving performance by preventing unnecessary store creations.
 *
 * @param children - The child components that will have access to the Redux store.
 *
 * @returns The rendered StoreProvider component wrapping the child components.
 */

'use client';

import React, { PropsWithChildren, useRef } from 'react';
import { AppStore, store } from '@/lib/store';
import { Provider } from 'react-redux';

export const StoreProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = store();
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
};

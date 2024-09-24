/**
 * @fileoverview Configures and creates the Redux store for the application.
 * It includes reducers for API state management (using RTK Query) and search state.
 *
 * @return A configured Redux store with middleware for RTK Query and search management.
 */

import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './features/SearchSlice';
import { userApi } from './services/api';

export const store = () => {
  return configureStore({
    reducer: {
      [userApi.reducerPath]: userApi.reducer,
      search: searchReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(userApi.middleware),
  });
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

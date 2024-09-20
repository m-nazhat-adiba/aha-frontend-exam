import { avlApi } from "@/lib/services/api";
import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "@/lib/features/SearchSlice";

export const store = () => {
  return configureStore({
    reducer: {
      [avlApi.reducerPath]: avlApi.reducer,
      search: searchReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(avlApi.middleware),
  });
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

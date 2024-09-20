import { createSlice } from "@reduxjs/toolkit";

interface SearchState {
  searchTrigger: boolean;
  keyword: string;
  pageSize: number;
  loadMore: boolean;
}

const initialState: SearchState = {
  searchTrigger: false,
  keyword: "",
  pageSize: 9,
  loadMore: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchTrigger(state, action) {
      state.searchTrigger = action.payload;
    },
    setKeyword(state, action) {
      state.keyword = action.payload;
    },
    setPageSize(state, action) {
      state.pageSize = action.payload;
    },
    setLoadMore(state, action) {
      state.loadMore = action.payload;
    },
    resetSearchState() {
      return initialState;
    },
  },
});

export const {
  setSearchTrigger,
  setKeyword,
  setPageSize,
  resetSearchState,
  setLoadMore,
} = searchSlice.actions;
export default searchSlice.reducer;

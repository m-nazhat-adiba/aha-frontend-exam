/**
 * @fileoverview Redux slice for managing search-related state, including keyword, page size, and load more functionality.
 *
 * @property searchTrigger - Indicates if a search should be triggered.
 * @property keyword - The search keyword.
 * @property pageSize - The number of items per page.
 * @property loadMore - Indicates whether to load more results.
 *
 * @module searchSlice
 */

import { createSlice } from '@reduxjs/toolkit';

interface SearchState {
  searchTrigger: boolean;
  keyword: string;
  pageSize: number;
  loadMore: boolean;
}

const initialState: SearchState = {
  searchTrigger: false,
  keyword: '',
  pageSize: 9,
  loadMore: false,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    /** Sets the search trigger state. */
    setSearchTrigger(state, action) {
      state.searchTrigger = action.payload;
    },

    /** Updates the search keyword. */
    setKeyword(state, action) {
      state.keyword = action.payload;
    },

    /** Sets the number of items to load per page. */
    setPageSize(state, action) {
      state.pageSize = action.payload;
    },

    /** Sets whether to load more search results. */
    setLoadMore(state, action) {
      state.loadMore = action.payload;
    },

    /** Resets the search state to its initial values. */
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

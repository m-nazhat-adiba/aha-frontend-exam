/**
 * @fileoverview Defines and configures API endpoints using RTK Query for handling search, follower, following, and tag data fetching.
 *
 * This file exports several hooks for interacting with the API:
 * `useSearchQuery`, `useFollowerQuery`, `useFollowingQuery`, and `useTagsQuery`.
 *
 * These hooks provide easy access to the search, follower, following, and tag data.
 *
 * @example
 * // Usage in a React component
 * import { useSearchQuery, useFollowerQuery, useFollowingQuery, useTagsQuery } from '@/lib/services/api';
 *
 * function ExampleComponent() {
 *   const { data: searchData } = useSearchQuery({ keyword: 'example', page: 1, pageSize: 10 });
 *   const { data: followerData } = useFollowerQuery({ keyword: 'user', page: 1, pageSize: 10 });
 *   const { data: followingData } = useFollowingQuery({ keyword: 'friend', page: 1, pageSize: 10 });
 *   const { data: tagsData } = useTagsQuery();
 * }
 */

import { SearchResponse, SearchQueryParams } from '@/models/SearchQuery';
import { TagsResponse } from '@/models/TagsQuery';
import { FollowerResponse, followingResponse } from '@/models/UsersQuery';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  }),
  tagTypes: ['SearchResult', 'Follower', 'Following', 'Tags'],
  endpoints: (builder) => ({
    // search
    search: builder.query<SearchResponse, SearchQueryParams>({
      query: (params) => {
        return {
          url: '/users/all',
          params,
        };
      },
      providesTags: ['SearchResult'],
      keepUnusedDataFor: 3600,
    }),

    // follower
    follower: builder.query<FollowerResponse, SearchQueryParams>({
      query: (params) => {
        return {
          url: '/users/all',
          params,
        };
      },
      providesTags: ['Follower'],
      keepUnusedDataFor: 3600,
    }),

    // following
    following: builder.query<followingResponse, SearchQueryParams>({
      query: (params) => {
        return {
          url: '/users/friends',
          params,
        };
      },
      providesTags: ['Following'],
      keepUnusedDataFor: 3600,
    }),

    // tags
    tags: builder.query<TagsResponse[], void>({
      query: () => 'tags',
      providesTags: ['Tags'],
      keepUnusedDataFor: 3600,
    }),
  }),
});

export const {
  useSearchQuery,
  useFollowerQuery,
  useFollowingQuery,
  useTagsQuery,
} = userApi;

import { SearchResponse, SearchQueryParams } from "@/models/SearchQuery";
import { TagsResponse } from "@/models/TagsQuery";
import { FollowerResponse, followingResponse } from "@/models/UsersQuery";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const avlApi = createApi({
  reducerPath: "avlApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  }),
  tagTypes: ["SearchResult", "Follower", "Following", "Tags"],
  endpoints: (builder) => ({
    // search
    search: builder.query<SearchResponse, SearchQueryParams>({
      query: (params) => {
        return {
          url: "/users/all",
          params,
        };
      },
      providesTags: ["SearchResult"],
      keepUnusedDataFor: 3600,
    }),

    // follower
    follower: builder.query<FollowerResponse, SearchQueryParams>({
      query: (params) => {
        return {
          url: "/users/all",
          params,
        };
      },
      providesTags: ["Follower"],
      keepUnusedDataFor: 3600,
    }),

    // following
    following: builder.query<followingResponse, SearchQueryParams>({
      query: (params) => {
        return {
          url: "/users/friends",
          params,
        };
      },
      providesTags: ["Following"],
      keepUnusedDataFor: 3600,
    }),

    // tags
    tags: builder.query<TagsResponse[], void>({
      query: () => "tags",
      providesTags: ["Tags"],
      keepUnusedDataFor: 3600,
    }),
  }),
});

export const {
  useSearchQuery,
  useFollowerQuery,
  useFollowingQuery,
  useTagsQuery,
} = avlApi;

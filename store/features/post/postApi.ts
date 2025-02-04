import type { TPost } from "@/types";
import apiSlice from "../api/apiSlice";

const postsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<TPost[], undefined>({
      query: () => `/posts`,
    }),
    getPost: builder.query<TPost, { id: string }>({
      query: ({ id }) => `/posts/${id}`,
    }),
  }),
});

export const { useGetPostsQuery, useGetPostQuery } = postsApi;

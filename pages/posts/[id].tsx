import { useGetPostQuery } from "@/store/features/post/postApi";
import { useRouter } from "next/router";
import React from "react";

const PostWithId = () => {
  const router = useRouter();
  const postId = router.query.id;

  const { data: post, isLoading: isPostLoading } = useGetPostQuery(
    {
      id: postId as string,
    },
    {
      skip: !!!postId,
    }
  );

  if (isPostLoading) return <p>loading....</p>;

  return <div>{JSON.stringify(post)}</div>;
};

export default PostWithId;

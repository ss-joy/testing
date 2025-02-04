import { useGetPostQuery } from "@/rtk/features/apiSlice";
import { useRouter } from "next/router";
import React from "react";

const JsonItemPage = () => {
  const router = useRouter();
  const postId = router.query.id;
  const { data, isLoading } = useGetPostQuery(postId);
  if (isLoading) return;
  return (
    <div className="border-2 my-[16px] flex flex-col">
      id:===={postId}
      {JSON.stringify(data)}
    </div>
  );
};

export default JsonItemPage;

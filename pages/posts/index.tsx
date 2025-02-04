import React from "react";

import { useRouter } from "next/router";
import Link from "next/link";
import { useGetPostsQuery } from "@/store/features/post/postApi";
import { Link2Icon, LucideLink, PiIcon } from "lucide-react";

const index = () => {
  const { data: posts, isLoading: isPostsLoading } =
    useGetPostsQuery(undefined);

  if (isPostsLoading) return <div>Loading....</div>;

  return (
    <div>
      {posts?.map((d, index) => {
        return (
          <div
            key={index}
            className="flex gap-5 justify-between relative border rounded-md border-slate-300 shadow-sm hover:shadow-md transition-all p-4 m-4"
          >
            {d.id}
            {d.title}
            <Link
              href={`/posts/${d.id}`}
              className="relative block rounded-md  hover:cursor-pointer"
            >
              <LucideLink className="stroke-indigo-300" />
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default index;

import JsonItem from "@/components/JsonItem";
import { useGetPostsQuery } from "@/rtk/features/apiSlice";
import React, { useEffect } from "react";

const IndexPage = () => {
  const { data, isLoading, refetch } = useGetPostsQuery(undefined);

  // useEffect(() => {
  //   setTimeout(() => {
  //     refetch();
  //   }, 3000);
  // }, []);
  if (isLoading) {
    return;
  }
  return (
    <div className="w-[500px] border mx-auto">
      {data.map((data: any) => (
        <JsonItem key={data.id} data={data} />
      ))}
    </div>
  );
};

export default IndexPage;

import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FeatherIcon, LoaderIcon } from "lucide-react";

const Tan = () => {
  const { data, isFetching, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: () => axios.get("https://jsonplaceholder.typicode.com/posts/1"),
    staleTime: 5 * 60 * 10000,
    // gcTime: Infinity,
    // refetchInterval: 3 * 1000,
    // refetchIntervalInBackground:
  });
  console.log({ isFetching, isLoading });

  return (
    <div>
      <div>
        {isLoading ? (
          <LoaderIcon className="size-[100px] stroke-orange-700" />
        ) : null}
        <hr />
        {isFetching ? (
          <FeatherIcon className="size-[200px] stroke-emerald-500" />
        ) : null}
        <hr />
        {JSON.stringify(data?.data)}
      </div>
    </div>
  );
};

export default Tan;

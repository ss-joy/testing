import Link from "next/link";
import React from "react";

const JsonItem = ({ data }: any) => {
  return (
    <div className="border-2 my-[16px] flex flex-col">
      <p className="border border-slate-900">title:{data.title}</p>
      <p className="border border-slate-900">body:{data.body}</p>
      <Link
        href={`json/${data.id}`}
        className="bg-blue-600 rounded-md p-2 text-white w-fit"
      >
        go to post id: {data.id}
      </Link>
    </div>
  );
};

export default JsonItem;

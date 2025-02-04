import Tan from "@/components/query/tan";
import { LoaderIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const index = () => {
  return (
    <>
      {" "}
      <Link href={"/"}>normy page</Link>
      <div>
        <Tan />
        <Tan />
        <Tan />
      </div>
    </>
  );
};

export default index;

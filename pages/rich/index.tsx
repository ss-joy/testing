import dynamic from "next/dynamic";
import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
const ReactQuillComp = dynamic(
  () => import("../../components/react-quill/ReactQuillComp"),
  {
    ssr: false,
  }
);

export default function index() {
  return (
    <div>
      <ReactQuillComp />
    </div>
  );
}

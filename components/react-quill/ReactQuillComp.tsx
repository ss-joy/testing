import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const toolbarOptions = [
  ["bold", "italic"],
  ["link", "image"],
];

const ReactQuillComp = () => {
  const [value, setValue] = useState("");
  console.log(value);
  return (
    <div>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        placeholder="Compose an epic..."
        // formats={[
        //   "header",
        //   "bold",
        //   "italic",
        //   "underline",
        //   "strike",
        //   "blockquote",
        //   "list",
        //   "bullet",
        //   "indent",
        //   "link",
        //   "image",
        // ]}
        // modules={{
        //   toolbar: [
        //     // [{ header: [1, 2, 3, false] }],
        //     ["bold", "italic", "underline", "strike", "blockquote"],
        //     [
        //       { list: "ordered" },
        //       { list: "bullet" },
        //       { indent: "-1" },
        //       { indent: "+1" },
        //     ],
        //     ["link", "image"],
        //     ["clean"],
        //   ],
        // }}
      />
      <div dangerouslySetInnerHTML={{ __html: value }} />
      {/* <div>{value}</div> */}
    </div>
  );
};

export default ReactQuillComp;

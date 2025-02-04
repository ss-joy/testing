import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import React from "react";

const SubmitButton = () => {
  const [editor] = useLexicalComposerContext();
  return (
    <button
      onClick={() => {
        console.log(editor.getEditorState());
      }}
    >
      SubmitButton
    </button>
  );
};

export default SubmitButton;

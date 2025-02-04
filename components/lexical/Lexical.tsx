import { $getRoot, $getSelection, EditorState, LexicalEditor } from "lexical";
import { useEffect } from "react";

import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import type { InitialConfigType } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { TreeView } from "@lexical/react/LexicalTreeView";
import TreeViewPlugin from "./TreeViewPlugin";
import ToolbarPlugin from "./ToolBarPlugin";
import { HeadingNode } from "@lexical/rich-text";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.

function onError(error: unknown) {
  console.error(error);
}

export default function Editor() {
  const initialConfig: InitialConfigType = {
    namespace: "MyEditor",
    theme: {
      paragraph: "text-teal-700",
    },
    onError,
    nodes: [HeadingNode],
  };
  function onChange(
    editorState: EditorState,
    editor: LexicalEditor,
    tags: Set<string>
  ) {
    console.log(editorState.toJSON());
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="useless relative w-[90%] flex flex-col gap-5 mx-auto m-2 p-2 border-2 border-red-700">
        <ToolbarPlugin />
        <OnChangePlugin onChange={onChange} />
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              placeholder={"Enter some text..."}
              className="relative bg-slate-400/20 size-full  border-2  mx-auto my-4 p-2 overflow-auto"
            />
          }
          placeholder={
            <div className="absolute top-2 left-2 opacity-50">
              Enter some text...
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <AutoFocusPlugin />
        <TreeViewPlugin />
      </div>
    </LexicalComposer>
  );
}

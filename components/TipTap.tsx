// src/Tiptap.tsx
import { EditorProvider, FloatingMenu, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Editor } from "@tiptap/core";
// import Document from "@tiptap/extension-document";
// import Paragraph from "@tiptap/extension-paragraph";
// import Text from "@tiptap/extension-text";
// define your extension array
const extensions = [StarterKit];

const content = "<p>Hello World!</p>";
// new Editor({
//   // bind Tiptap to `.element`
//   element: document.querySelector(".element"),
//   // register extensions
//   extensions: [Document, Paragraph, Text],
//   // set the initial content
//   content: "<p>Example Text</p>",
//   // place the cursor in the editor after initialization
//   autofocus: true,
//   // make the text editable (but that’s the default anyway)
//   editable: true,
//   // disable the loading of the default CSS (which is not much anyway)
//   injectCSS: false,
// });

new Editor({
  extensions: StarterKit.configure({
    heading: {
      levels: [1, 2, 3],
    },
  }),
});
const Tiptap = () => {
  return (
    <EditorProvider
      extensions={extensions}
      content={content}
      slotBefore={<h1>sei maam</h1>}
      slotAfter={<h1>yo mama</h1>}
    >
      {/* <FloatingMenu editor={null} className="bg-red-300 rounded-sm">
        This is the floating menu
      </FloatingMenu>
      <BubbleMenu editor={null} className="bg-red-300 rounded-sm">
        This is the bubble menu
      </BubbleMenu> */}
    </EditorProvider>
  );
};

export default Tiptap;

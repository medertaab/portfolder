import React, { useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { sanitizeUrl } from '../../../hooks/useSanitizeUrl'
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import CharacterCount from "@tiptap/extension-character-count";

export default function AboutMeForm(props) {
  const { watch, setValue } = props;
  
  const limit = 500;
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      CharacterCount.configure({
        limit,
      }),
    ],
    content: watch("description.text"),
    onUpdate({ editor }) {
      setValue("description.text", editor.getHTML(), { shouldDirty: true });
    },
    editorProps: {
      attributes: {
        class:
          "focus:outline-none [&_a]:text-bgAccent [&_a]:underline [&_a]:cursor-pointer [&_h3]:text-xl",
      },
    },
  });

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: sanitizeUrl(url) }).run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <>
      <div className="p-2 border-[1px] rounded border-gray-400 max-w-full min-h-[10rem] [&_button]:w-6 [&_button]:h-6 [&_button]:rounded [&_button]:duration-150 [&_button:hover]:bg-bgAccent a:underline a:text-bgAccent">
        <div className="flex gap-1 mb-3">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`${
              editor.isActive("bold") && "bg-bgAccent"
            } font-extrabold`}
            type="button"
          >
            B
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            type="button"
            className={`${
              editor.isActive("italic") && "bg-bgAccent"
            } italic font-serif`}
          >
            I
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            type="button"
            className={`${
              editor.isActive("heading", { level: 3 }) && "bg-bgAccent"
            }`}
          >
            H1
          </button>
          <span className="w-[1px] m-1 bg-gray-300"></span>
          <button
            onClick={setLink}
            className={editor.isActive("link") && "bg-bgAccent"}
            type="button"
          >
            <i className="fa-solid fa-link"></i>
          </button>
          <button
            onClick={() => editor.chain().focus().unsetLink().run()}
            className={`${editor.isActive("link") && "text-textPrimary"} ${
              !editor.isActive("link") && "text-gray-500"
            }`}
            type="button"
          >
            <i className="fa-solid fa-link-slash"></i>
          </button>
        </div>
        <EditorContent editor={editor} />
      </div>

      <span className="text-gray-400 float-right mt-4">
        {editor.storage.characterCount.characters()}/{limit}
      </span>
    </>
  );
}

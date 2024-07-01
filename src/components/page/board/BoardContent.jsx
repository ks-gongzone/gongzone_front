import React, { useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "@ckeditor/ckeditor5-build-classic/build/translations/ko";

export default function BoardContent({ onChange }) {
  const editorConfiguration = {
    toolbar: {
      items: [
        "heading",
        "|",
        "bold",
        "italic",
        "link",
        "|",
        "imageUpload",
        "blockQuote",
        "|",
        "undo",
        "redo",
      ],
    },
    language: "ko",
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    onChange(data);
  };

  return (
    <div>
      <h2>게시글 상세 내용</h2>
      <CKEditor
        editor={ClassicEditor}
        config={{
          editorConfiguration,
          placeholder: "게시글 상세 내용을 입력해주세요.",
        }}
        onChange={handleEditorChange}
      />
      <style jsx global>{`
        .ck-editor__editable {
          height: 250px !important;
        }
      `}</style>
    </div>
  );
}

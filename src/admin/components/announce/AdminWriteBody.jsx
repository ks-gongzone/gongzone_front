import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

/**
 * @작성일: 2024-07-03
 * @수정일: 2024-07-09
 * @내용: 공지사항 작성
 * @수정내용: 수정, 직상 폼 공유를 위해 컴포넌트 분리
 */
export default function AdminWriteBody({
  announceTitle,
  setAnnounceTitle,
  announceBody,
  setAnnounceBody,
  typeCode,
  setTypeCode,
}) {
  const editorConfiguration = {
    toolbar: {
      items: [
        "heading",
        "|",
        "bold",
        "italic",
        "link",
        "|",
        "imageUpload", // 추후 이미지 업로드 할 수 있어 추가
        "blockQuote",
        "|",
        "undo",
        "redo",
      ],
    },
    language: "ko",
  };

  // 작성 내용 핸들러 함수
  const handleEditorChange = (e, editor) => {
    const data = editor.getData();
    setAnnounceBody(data);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="w-full max-w-2xl bg-white shadow rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">제목</label>
          <input
            type="text"
            value={announceTitle}
            onChange={(e) => setAnnounceTitle(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">내용</label>
          <CKEditor
            editor={ClassicEditor}
            config={editorConfiguration}
            data={announceBody}
            onChange={handleEditorChange}
          />
          <style jsx global>{`
            .ck-editor__editable {
              height: 400px !important;
            }
          `}</style>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">유형</label>
          <select
            value={typeCode}
            onChange={(e) => setTypeCode(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="공지">공지</option>
            <option value="FAQ">FAQ</option>
            <option value="프로모션">프로모션</option>
          </select>
        </div>
      </div>
    </div>
  );
}

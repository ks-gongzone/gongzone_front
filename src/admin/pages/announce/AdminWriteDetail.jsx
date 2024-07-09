import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useNavigate } from "react-router-dom";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { AnnounceAPI } from "../../../utils/repository";
import AuthStore from "../../../utils/zustand/AuthStore";

/**
 * @작성일: 2024-07-03
 * @수정일: 2024-07-05
 * @내용: 공지사항 작성 [Create]
 * @수정내용: CKEditor 라이브러리로 작성 및 입력 필드명 수정
 */
export default function AdminWriteDetail() {
  const { userInfo } = AuthStore((state) => ({ userInfo: state.userInfo }));
  const memberNo = userInfo.memberNo;
  const navigete = useNavigate();

  const [announceTitle, setAnnounceTitle] = useState("");
  const [announceBody, setAnnounceBody] = useState("");
  const [typeCode, setTypeCode] = useState("공지");

  const adminAddr = "/_admin/main";

  // CKEditor 라이브러리 설정용
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
  
  const handleSubmit = () => {
    if (memberNo !== "M000001") {
      alert("관리자만 공지사항을 작성할 수 있습니다.");
      navigete("/");
      return;
    }
    AnnounceAPI.createAnnouncement({ announceTitle, announceBody, typeCode, memberNo })
      .then(response => {
        alert("공지사항이 성공적으로 작성되었습니다.");
        navigete(adminAddr);
      })
      .catch(error => {
        console.error("공지사항 작성 중 오류 발생[컴포넌트]", error);
        navigete(adminAddr);
      });
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="w-full max-w-2xl bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">공지사항 작성</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">제목</label>
          <input
            typeCode="text"
            value={announceTitle}
            onChange={(e) => setAnnounceTitle(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">내용</label>
          <CKEditor
            editor={ClassicEditor}
            config={{
              editorConfiguration,
              placeholder: "내용을 입력해주세요"
            }}
            data={announceBody}
            onChange={handleEditorChange}
            />
            <style jsx global>{`
              .ck-editor__editable {
                height:400px !important;
                }
              `}
            </style>
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
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            작성하기
          </button>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import AdminWriteBody from "../../components/announce/AdminWriteBody";
import CreateButton from "../../components/announce/AnnounceCreateButton";

/**
 * @작성일: 2024-07-03
 * @수정일: 2024-07-09
 * @내용: 공지사항 상세
 * @수정내용: 컴포넌트 분리하여 수정, 작성 같은 폼에서 작성
 */
export default function AdminWriteDetail() {
  const [announceTitle, setAnnounceTitle] = useState("");
  const [announceBody, setAnnounceBody] = useState("");
  const [typeCode, setTypeCode] = useState("공지");

  return (
    <div className="flex flex-col items-center p-4">
      <div className="w-full max-w-2xl bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">공지사항 작성</h2>
        <AdminWriteBody
          announceTitle={announceTitle}
          setAnnounceTitle={setAnnounceTitle}
          announceBody={announceBody}
          setAnnounceBody={setAnnounceBody}
          typeCode={typeCode}
          setTypeCode={setTypeCode}
        />
        <CreateButton
          announceTitle={announceTitle}
          announceBody={announceBody}
          typeCode={typeCode}
        />
      </div>
    </div>
  );
}

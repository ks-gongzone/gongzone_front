import React, { useEffect, useState } from "react";
import AdminWriteBody from "../../components/announce/AdminWriteBody";
import UpdateButton from "../../components/announce/AnnounceUpdateButton";
import { AnnounceAPI } from "../../../utils/repository";
import { useNavigate, useLocation } from "react-router-dom";
import AuthStore from "../../../utils/zustand/AuthStore";

/**
 * @내용: 수정 컴포넌트 분리
 */
export default function AdminUpdateDetail() {
  const [announceNo, setAnnounceNo] = useState("");
  const [announceTitle, setAnnounceTitle] = useState("");
  const [announceBody, setAnnounceBody] = useState("");
  const [typeCodeDes, setTypeCode] = useState("");
  const { userInfo } = AuthStore((state) => ({ userInfo: state.userInfo }));
  const memberNo = userInfo.memberNo;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 1. 작성글의 정보를 로드
    if (location.state) {
      const { announce, announceNo } = location.state;
      if (announce) {
        setAnnounceNo(announceNo);
        setAnnounceTitle(announce.announceTitle);
        setAnnounceBody(announce.announceBody);
        setTypeCode(announce.typeCodeDes);
      } else {
        new Error("공지사항 로드중 오류 발생[update]");
      }
    } else {
      new Error("location.state가 없습니다.");
    }
  }, [location.state]);

    const handleUpdate = () => {
    // 2. updateAnnouncement API를 사용해서 값을 변경
    AnnounceAPI.updateAnnouncement(announceNo, {
      announceTitle,
      announceBody,
      typeCodeDes,
      })
        .then(() => {
          alert("공지사항이 성공적으로 수정되었습니다.")
          navigate("/_admin/main")  
        })
        .catch(error => error);
    // 3. 해당로직의 유효성 검증
    }

  return (
    <div className="flex flex-col items-center p-4">
      <div className="w-full max-w-2xl bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">공지사항 수정</h2>
        <AdminWriteBody
          announceTitle={announceTitle}
          setAnnounceTitle={setAnnounceTitle}
          announceBody={announceBody}
          setAnnounceBody={setAnnounceBody}
          typeCode={typeCodeDes}
          setTypeCode={setTypeCode}
        />
        <UpdateButton 
          handleUpdate={handleUpdate}
          announceNo={announceNo}
          memberNo={memberNo} 
        />
      </div>
    </div>
  );
}

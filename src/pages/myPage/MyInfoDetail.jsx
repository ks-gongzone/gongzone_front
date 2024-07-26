import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LocationSelect from "../../components/page/myInfo/LocationSelect";
import ChangePassword from "../../components/page/myInfo/PasswordUpdate";
import AlarmSettings from "../../components/page/myInfo/AlarmSelect";
import SetNickname from "../../components/page/myInfo/NickName";
import { ChangeUserInfo, SaveUserData } from "../../utils/repository";
import Phone from "../../components/page/myInfo/Phone";
import DeleteButton from "../../components/page/myInfo/DeleteButton";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

/**
 * 내 정보 컴포넌트 집합
 * @date: 2024-06-10
 * @last: 2024-07-15
 * @수정내용: 마이페이지 페이징 처리
 */
export default function MyInfoDetail({ memberNo, onPreviousPage }) {
  const navigate = useNavigate();
  const [userData, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ChangeUserInfo(memberNo)
      .then((fetchUserData) => {
        setData(fetchUserData);
      })
      .catch((error) => {
        navigate("/");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [memberNo, navigate]);

  if (loading) {
    return (
      <div className="bg-gray-100 py-10 overflow-y-hidden">
        <div className="p-12 bg-white shadow-md rounded-lg w-[800px] mx-auto">
          <Skeleton height={30} width={50} />
          <Skeleton height={30} width="80%" className="mt-4" />
          <Skeleton height={20} width="60%" className="mt-2" />
          <Skeleton height={150} width="100%" className="mt-4" />
          <Skeleton height={30} width="100%" className="mt-4" />
          <Skeleton height={30} width="60%" className="mt-4" />
        </div>
      </div>
    );
  }

  const handleSave = () => {
    SaveUserData(memberNo, userData)
      .then(() => {
        alert("사용자 정보가 성공적으로 저장되었습니다.");
      })
      .catch((error) => {
        alert("사용자 정보를 저장하는데 실패했습니다.");
      });
  };

  return (
    <div className="bg-gray-100 py-10 overflow-y-hidden">
      <div className="p-12 bg-white shadow-md rounded-lg w-[90%] md:w-[800px] mx-auto">
        <button
          onClick={onPreviousPage}
          className="text-blue-500 text-2xl mb-4"
        >
          &lt;
        </button>
        <ChangePassword memberNo={memberNo} />
        <SetNickname memberNo={memberNo} />
        <div className="mb-6">
          <div className="text-gray-700 font-bold text-lg mb-2">선호지역</div>
          <LocationSelect
            memberNo={memberNo}
            initialLocation={userData.location}
            onLocationChange={(newDo, newSi, newGu) => {
            }}
          />
        </div>
        <div>
          <Phone memberNo={memberNo} />
        </div>
        <div className="mb-6 flex justify-end">
        </div>
        <AlarmSettings memberNo={memberNo} />
        <div className="flex justify-end mt-4">
          <DeleteButton />
        </div>
      </div>
    </div>
  );
}
import { useNavigate } from "react-router-dom";
import { UpdateAlertSetting } from "../../../utils/repository";

/**
 * 개별 토글 스위치 컴포넌트
 * @date: 2024-06-17
 * @last: 2024-07-01
 * @desc: 버튼 클릭시 변경값이 저장된 상태로 MyInfo페이지로 리다이렉트
 * @수정내용: 저장버튼이 없는 닉네임, 알람에 대한 데이터 병렬처리
 */
export default function SaveButton({ userData }) {
  const redirect = useNavigate();

  const handleSaveChanges = () => {
    const updateNickname = UpdateNickname(userData.memberNo, userData.nickname);
    const updateAlertSetting = UpdateAlertSetting(userData.memberNo, userData.alarmSettings);

    Promise.all([up])
      .then((response) => {
        console.log(response);
        redirect("/useInfo", { state: userData });
      })
      .catch((error) => {
        console.error("데이터가 없습니다.", error);
      });
  };

  return (
    <button
      onClick={handleSaveChanges}
      className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
    >
      변경사항 저장
    </button>
  );
}

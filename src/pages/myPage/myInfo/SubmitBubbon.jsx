// 이후 axious 사용 예정
import { useNavigate } from "react-router-dom";

/**
 * 개별 토글 스위치 컴포넌트
 * @date: 2024-06-17
 * @last: 2024-06-17
 * @desc: 버튼 클릭시 변경값이 저장된 상태로 MyInfo페이지로 리다이렉트
 */
export default function SaveButton({ userData }) {
  const redirect = useNavigate();
  const handleSaveChanges = () => {
    // 백엔드 미구현
    // 더미 데이터 처리
    Promise.resolve("데이터 처리 완료")
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

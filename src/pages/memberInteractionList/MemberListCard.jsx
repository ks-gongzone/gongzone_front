import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import FollowButton from "../../components/button/FollowButton";
import BlockButton from "../../components/button/BlockButton";
import AuthStore from "../../utils/zustand/AuthStore";
import { Note } from "../../utils/repository";

const MySwal = withReactContent(Swal);

/**
 * @작성일: 2024-07-11
 * @내용: 회원별 프로필 카드 
 */
export default function MemberListCard({ member }) {

  const { userInfo } = AuthStore((state) => ({ userInfo: state.userInfo }));
  const currentUserNo = userInfo.memberNo;

  const handleNote = async () => {
    const { value: noteBody } = await MySwal.fire({
      title: "쪽지 전송",
      input: "textarea",
      inputLabel: `to : ${member.memberName}`,
      inputPlaceholder: "내용을 입력하세요...",
      inputAttributes: {
        "aria-label": "내용을 입력하세요",
      },
      showCancelButton: true,
      confirmButtonText: "보내기",
      cancelButtonText: "취소",
    });

    if (noteBody) {
      const data = {
        memberNo: currentUserNo,
        memberTargetNo: member.memberNo,
        noteBody,
      };

      try {
        await Note.InsertNote(data);
        MySwal.fire("성공", "쪽지가 성공적으로 보내졌습니다.", "success");
      } catch (error) {
        MySwal.fire("실패", "쪽지 보내기 중 오류가 발생했습니다.", "error");
      }
    }
  };

  return (
    <div className="w-full h-70 relative text-left rounded-xl overflow-hidden shadow-lg bg-white border hover:border-red-200 p-6 flex flex-col justify-between">
      <div className="relative flex items-center justify-between">
        <div className="flex items-center">
          <div 
             className="w-24 h-24 rounded-full flex items-center justify-center bg-gray-400 text-white text-lg"
          >
            프로필
          </div>
          <div className="ml-4">
            <div className="font-bold text-lg flex items-center">
              {member.memberName}
              {currentUserNo !== member.memberNo && (
                <div className="ml-2">
                  <FollowButton
                    targetMemberNo={member.memberNo}
                    targetMemberName={member.memberName}
                    initialFollowing={member.isFollowing}
                  />
                </div>
              )}
            </div>
            <div className="text-gray-600">성별: {member.gender === 'M' ? '남성' : '여성'}</div>
              <div className="mt-2">
                {member.isPopular && (
                  <div className="text-blue-500">인기유저</div>
                )}
                {member.isWarning && (
                  <div className="text-red-500">블랙리스트유저</div>
                )}
              </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">작성글보기</button>
        {currentUserNo !== member.memberNo && (
          <div className="flex space-x-2">
            <button
              onClick={handleNote}
              className="bg-gray-200 text-gray-600 px-4 py-2 rounded flex items-center justify-center"
            >
              <span className="text-xl">✉️</span>
            </button>
            <BlockButton
              targetMemberNo={member.memberNo}
              targetMemberName={member.memberName}
              initialBlocked={member.isBlocked}
            />
          </div>
        )}
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import {AdminMemberAPI} from "../../../utils/repository";

export default function MemberList({ openModal }) {
  const [members, setMembers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AdminMemberAPI.MemberPunishList({});
        if (response.status === 200) {
          const item = response.data.map(member => ({
            memberNo: member.memberNo,
            memberName: member.memberName,
            memberEmail: member.memberEmail,
            details: [
              member.memberId,
              member.memberPhone,
              member.memberGender,
              member.memberAddress,
              member.memberBirthday,
              member.memberNick,
            ],
            memberStatus: member.memberStatus,
          }));
          setMembers(item);
        } else {
          setError('Failed to fetch members');
        }
      } catch (error) {
        setError('An error occurred while fetching the member data');
      }
    };

    fetchData();
  }, []);

  const [expandedRows, setExpandedRows] = useState([]);

  const toggleRow = (id) => {
    setExpandedRows(
      expandedRows.includes(id)
        ? expandedRows.filter((rowId) => rowId !== id)
        : [...expandedRows, id]
    );
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col items-center box-border p-4">
      <div className="w-full max-w-8xl">
        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <div className="grid grid-cols-6 gap-4 bg-gray-50 p-4 font-bold">
            <div className="font-medium text-gray-500">회원 고유번호</div>
            <div className="font-medium text-gray-500">회원 이름</div>
            <div className="font-medium text-gray-500">회원 이메일</div>
            <div className="font-medium text-gray-500">회원 상태</div>
            <div className="font-medium text-gray-500">세부 사항</div>
          </div>
          {members.map((member) => (
            <div key={member.memberNo}>
              <div className="grid grid-cols-6 gap-4 p-4 border-b hover:bg-gray-100 flex items-center">
                <div
                  className="w-[15em] text-center px-2 py-1 rounded text-sm">
                  {member.memberNo}
                </div>
                <div className="text-sm text-gray-500">{member.memberName}</div>
                <div className="text-sm text-gray-500">{member.memberEmail}</div>

                <div
                  className="text-sm text-gray-500 cursor-pointer"
                  onClick={() => toggleRow(member.memberNo)}
                >
                  클릭하여 상세 내용 보기
                </div>
                <div className="text-sm text-gray-500">{member.memberStatus}</div>
                <div className="text-sm text-gray-500">
                  <select className="text-sm text-gray-500">
                    <option value="처리 대기중">처리 대기중</option>
                    <option value="처리 완료">처리 완료</option>
                    <option value="보류">보류</option>
                  </select>
                  <button
                    type="button"
                    className="ml-4 p-2 bg-red-500 text-white rounded"
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(member);
                    }}
                  >
                    제재하기
                  </button>
                </div>
              </div>
              {expandedRows.includes(member.memberNo) && (
                <div className="col-span-6 bg-gray-100 px-4 py-8">
                  <p>아이디: {member.details[0]}</p>
                  <p>전화번호: {member.details[1]}</p>
                  <p>성별: {member.details[2]}</p>
                  <p>주소: {member.details[3]}</p>
                  <p>생일: {member.details[4]}</p>
                  <p>닉네임: {member.details[5]}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

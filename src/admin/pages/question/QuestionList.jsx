import { useState, useEffect } from "react";
import { AdminMemberAPI } from "../../../utils/repository";

function formatDate(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleString();
}


const handleSendData = async (member) => {
  delete member.memberQuestionDate;
  const modifiedMember = {
    ...member,
    statusCode: 'S010702'
  };
};

export default function QuestionList() {
  const [members, setMembers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AdminMemberAPI.QuestionList({});
        if (response.status === 200) {
          const item = response.data.map(member => ({
            memberQuestionNo: member.memberQuestionNo,
            memberNo: member.memberNo,
            typeCode: member.typeCode,
            memberQuestionBody: member.memberQuestionBody,
            memberQuestionDate: formatDate(member.memberQuestionDate),
            statusCode: member.statusCode,
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
          <div className="grid grid-cols-7 gap-4 bg-gray-50 p-4 font-bold">
            <div className="font-medium text-gray-500">문의 고유번호</div>
            <div className="font-medium text-gray-500">회원 고유번호</div>
            <div className="font-medium text-gray-500">문의 유형</div>
            <div className="font-medium text-gray-500">문의 내용</div>
            <div className="font-medium text-gray-500">문의 일시</div>
            <div className="font-medium text-gray-500">문의 상태</div>
          </div>
          {members.map((member) => (
            <div key={member.memberQuestionNo}
                 className="grid grid-cols-7 gap-4 p-4 border-b hover:bg-gray-100 flex items-center">
              <div className="w-[15em] px-2 py-1 rounded text-sm">
                {member.memberQuestionNo}
              </div>
              <div className="text-sm text-gray-500">{member.memberNo}</div>
              <div className="text-sm text-gray-500">{member.typeCode}</div>
              <div className="text-sm text-gray-500">{member.memberQuestionBody}</div>
              <div className="text-sm text-gray-500">{member.memberQuestionDate}</div>
              <div className="text-sm text-gray-500">{member.statusCode}</div>
              <div className="p-4">
                <button
                  className="ml-4 p-2 bg-red-500 text-white rounded"
                  onClick={() => handleSendData(member)}
                >
                  처리 완료
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

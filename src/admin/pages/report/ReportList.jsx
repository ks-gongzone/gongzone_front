import { useState, useEffect } from "react";
import { AdminMemberAPI } from "../../../utils/repository";
import AdminReportModal from "../../components/report/AdminReportModal";

function formatDate(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleString();
}

export default function ReportList({ openModal }) {
  const [members, setMembers] = useState([]);
  const [error, setError] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AdminMemberAPI.ReportList({});
        if (response.status === 200) {
          const item = response.data.map(member => ({
            memberReportNo: member.memberReportNo,
            memberNo: member.memberNo,
            memberTargetNo: member.memberTargetNo,
            typeCode: member.typeCode,
            details: [
              member.memberReportReason,
              formatDate(member.memberReportDate)
            ],
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

  const openModalHandler = (member) => {
    setSelectedReport(member);  // Set the selected member to be passed to the modal
  };

  const closeModalHandler = () => {
    setSelectedReport(null);  // Clear the selected report to close the modal
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col items-center box-border p-4">
      <div className="w-full max-w-8xl">
        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <div className="grid grid-cols-8 gap-4 bg-gray-50 p-4 font-bold">
            <div className="font-medium text-gray-500">신고 고유번호</div>
            <div className="font-medium text-gray-500">회원 고유번호</div>
            <div className="font-medium text-gray-500">신고 대상 고유번호</div>
            <div className="font-medium text-gray-500">신고 유형</div>
            <div className="font-medium text-gray-500">접수 상태</div>
            <div className="font-medium text-gray-500">세부 사항</div>
          </div>
          {members.map((member) => (
            <div key={member.memberReportNo}>
              <div className="grid grid-cols-8 gap-4 p-4 border-b hover:bg-gray-100 flex items-center">
                <div
                  className="w-[15em] px-2 py-1 rounded text-sm">
                  {member.memberReportNo}
                </div>
                <div className="text-sm text-gray-500">{member.memberNo}</div>
                <div className="text-sm text-gray-500">{member.memberTargetNo}</div>
                <div className="text-sm text-gray-500">{member.typeCode}</div>
                <div className="text-sm text-gray-500">{member.statusCode}</div>

                <div
                  className="text-sm text-gray-500 cursor-pointer"
                  onClick={() => toggleRow(member.memberReportNo)}
                >
                  클릭하여 상세 내용 보기
                </div>

                <div className="text-sm text-gray-500">
                  {/*<select className="text-sm text-gray-500">
                    <option value="처리 대기중">처리 대기중</option>
                    <option value="처리 완료">처리 완료</option>
                    <option value="보류">보류</option>
                  </select>*/}
                  <button
                    type="button"
                    className="ml-4 p-2 bg-red-500 text-white rounded"
                    onClick={(e) => {
                      e.stopPropagation();
                      openModalHandler(member);
                    }}
                  >
                    제재하기
                  </button>
                </div>
              </div>
              {expandedRows.includes(member.memberReportNo) && (
                <div className="col-span-6 bg-gray-100 px-4 py-8">
                  <p>신고 사유: {member.details[0]}</p>
                  <p>신고 일시: {member.details[1]}</p>

                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {selectedReport && (
        <AdminReportModal
          selectedReport={selectedReport}
          closeModal={closeModalHandler}
        />
      )}
    </div>
  );
}

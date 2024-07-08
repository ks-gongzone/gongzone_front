import { useState } from "react";

export default function MemberSleep({ openModal }) {
  const getBackgroundColor = (type) => {
    switch (type) {
      case "부적절한 콘텐츠":
        return "bg-red-200";
      case "사기 및 사기성 행위":
        return "bg-yellow-200";
      case "스팸 및 악성 행위":
        return "bg-orange-200";
      case "지적 재산권 침해":
        return "bg-blue-200";
      case "사생활 침해 및 개인정보 보호":
        return "bg-purple-200";
      case "사용자 행위 관련":
        return "bg-green-200";
      case "기타":
        return "bg-gray-200";
      default:
        return "bg-gray-200";
    }
  };

  const items = [
    {
      id: "1",
      reportingUser: "UserA",
      reportedUser: "UserB",
      type: "부적절한 콘텐츠",
      details: "마약 판매 진행했습니다.",
      date: "2023-07-01",
    },
    {
      id: "2",
      reportingUser: "UserC",
      reportedUser: "UserD",
      type: "사기 및 사기성 행위",
      details: "Fraudulent transaction reported",
      date: "2023-07-02",
    },
    {
      id: "3",
      reportingUser: "UserE",
      reportedUser: "UserF",
      type: "스팸 및 악성 행위",
      details: "Repeated spam messages",
      date: "2023-07-03",
    },
    {
      id: "4",
      reportingUser: "UserG",
      reportedUser: "UserH",
      type: "지적 재산권 침해",
      details: "Unauthorized use of copyrighted material",
      date: "2023-07-04",
    },
    {
      id: "5",
      reportingUser: "UserI",
      reportedUser: "UserJ",
      type: "사생활 침해 및 개인정보 보호",
      details: "Sharing private information without consent",
      date: "2023-07-05",
    },
    {
      id: "6",
      reportingUser: "UserK",
      reportedUser: "UserL",
      type: "사용자 행위 관련",
      details: "Harassment and bullying",
      date: "2023-07-06",
    },
    {
      id: "7",
      reportingUser: "UserM",
      reportedUser: "UserN",
      type: "기타",
      details: "Other inappropriate behavior",
      date: "2023-07-07",
    },
  ];

  const [expandedRows, setExpandedRows] = useState([]);

  const toggleRow = (id) => {
    setExpandedRows(
      expandedRows.includes(id)
        ? expandedRows.filter((rowId) => rowId !== id)
        : [...expandedRows, id]
    );
  };

  return (
    <div className="flex flex-col items-center box-border p-4">
      <div className="w-full max-w-8xl">
        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <div className="grid grid-cols-6 gap-4 bg-gray-50 p-4 font-bold">
            <div className="font-medium text-gray-500">신고 타입</div>
            <div className="font-medium text-gray-500">신고한 회원</div>
            <div className="font-medium text-gray-500">신고 당한 회원</div>
            <div className="font-medium text-gray-500">신고 사유 상세</div>
            <div className="font-medium text-gray-500">신고 일시</div>
            <div className="font-medium text-gray-500">신고 접수 상태</div>
          </div>
          {items.map((item) => (
            <div key={item.id}>
              <div className="grid grid-cols-6 gap-4 p-4 border-b hover:bg-gray-100 flex items-center">
                <div
                  className={`w-[15em] text-center px-2 py-1 rounded text-sm ${getBackgroundColor(
                    item.type
                  )}`}
                >
                  {item.type}
                </div>
                <div className="text-sm text-gray-500">
                  {item.reportingUser}
                </div>
                <div className="text-sm text-gray-500">{item.reportedUser}</div>
                <div
                  className="text-sm text-gray-500 cursor-pointer"
                  onClick={() => toggleRow(item.id)}
                >
                  클릭하여 상세 내용 보기
                </div>
                <div className="text-sm text-gray-500">{item.date}</div>
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
                      openModal(item);
                    }}
                  >
                    제재하기
                  </button>
                </div>
              </div>
              {expandedRows.includes(item.id) && (
                <div className="col-span-6 bg-gray-100 px-4 py-8">
                  {item.details}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const announcements = [
  {
    type: "공지",
    title: "알려진 이슈를 안내해 드립니다. (6/27 수정)",
    date: "2024.06.26",
    views: "9999+",
  },
  {
    type: "공지",
    title: "악성코드 감염 예방을 위한 보안 수칙 안내",
    date: "2020.02.26",
    views: "",
  },
  {
    type: "공지",
    title: "계정 보호를 위한 안내",
    date: "2018.11.05",
    views: "",
  },
  {
    type: "공지",
    title: "알려진 이슈를 안내해 드립니다.",
    date: "2024.06.26",
    views: "9999+",
  },
  {
    type: "FAQ",
    title: "자주 묻는 질문",
    date: "2024.06.25",
    views: "9999+",
  },
  {
    type: "FAQ",
    title: "자주 묻는 질문",
    date: "2024.06.19",
    views: "9999+",
  },
  {
    type: "프로모션",
    title: "신규가입 프로모션 안내",
    date: "2024.06.19",
    views: "9999+",
  },
];

export default function AnnounceItems() {
  return (
    <div className="flex flex-col items-center box-border p-4">
      <div className="w-full max-w-7xl">
        <div className="bg-white shadow rounded-lg">
          <ul>
            {announcements.map((item, index) => (
              <li
                key={index}
                className="flex justify-between p-4 border-b hover:bg-gray-100"
              >
                <div className="flex">
                  <span
                    className={`px-2 py-1 w-[80px] text-center rounded mr-2 ${
                      item.type === "공지"
                        ? "bg-blue-200"
                        : item.type === "FAQ"
                        ? "bg-yellow-200"
                        : "bg-green-200"
                    }`}
                  >
                    {item.type}
                  </span>
                  <span>{item.title}</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-4">{item.date}</span>
                  {item.views && <span>{item.views}</span>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

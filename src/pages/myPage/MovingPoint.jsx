import React, { useEffect, useState } from "react";
import MyInfo from "./myInfo/Main";

/**
 * 개별 토글 스위치 컴포넌트
 * @date: 2024-06-12
 * @last: 2024-06-17
 */
export default function MovingPoint() {
  const [activeTab, setActiveTab] = useState("myInfo");
  const [content, setContent] = useState(null);

  useEffect(() => {
    TapName(activeTab);
  }, [activeTab]);

  const TapName = async (tab) => {
    setActiveTab(tab);
    try {
      // 백엔드 미구현으로 더미 데이터 사용
      const dummyData = {
        myInfo: {
          name: "이름확인용",
          email: "email1@naver.com",
          phone: "010-1234-5678",
          location: { do: "", si: "", gu: "" },
        },
        myBulletin: { posts: ["게시글1", "게시글2"] },
        myParty: { parties: ["파티1", "파티2"] },
        myPoint: { points: 100 },
        myFollow: { follows: ["친구1", "친구2"] },
        blockUser: { blocked: ["차단1", "차단2"] },
      };

      const response = { data: dummyData[tab] };
      setContent(response.data);
    } catch (err) {
      console.log("fetching 에러발생", err);
      setContent({ error: `Error fetching data: ${err.message}` });
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "myInfo":
        return <MyInfo data={content} />;
      case "myBulletin":
        return <div>{JSON.stringify(content)}</div>;
      case "myParty":
        return <div>{JSON.stringify(content)}</div>;
      case "myPoint":
        return <div>{JSON.stringify(content)}</div>;
      case "myFollow":
        return <div>{JSON.stringify(content)}</div>;
      case "blockUser":
        return <div>{JSON.stringify(content)}</div>;
      default:
        return <div>클릭해주세요.</div>;
    }
  };

  return (
    <div className="flex">
      <div className="w-1/5 p-4 bg-gray-200 border-r">
        <div className="flex flex-col w-full h-full">
          <button
            className={`w-full p-4 text-left text-lg ${
              activeTab === "myInfo"
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            }`}
            onClick={() => TapName("myInfo")}
          >
            내정보
          </button>
          <button
            className={`w-full p-4 text-left text-lg ${
              activeTab === "myBulletin"
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            }`}
            onClick={() => TapName("myBulletin")}
          >
            작성글
          </button>
          <button
            className={`w-full p-4 text-left text-lg ${
              activeTab === "myParty"
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            }`}
            onClick={() => TapName("myParty")}
          >
            내파티
          </button>
          <button
            className={`w-full p-4 text-left text-lg ${
              activeTab === "myPoint"
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            }`}
            onClick={() => TapName("myPoint")}
          >
            포인트
          </button>
          <button
            className={`w-full p-4 text-left text-lg ${
              activeTab === "blockUser"
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            }`}
            onClick={() => TapName("blockUser")}
          >
            차단목록
          </button>
        </div>
      </div>

      <div className="flex-1 p-8">
        {content ? (
          content.error ? (
            <div className="text-red-500">{content.error}</div>
          ) : (
            renderContent()
          )
        ) : (
          <div>content 클릭해주세요</div>
        )}
      </div>
    </div>
  );
}

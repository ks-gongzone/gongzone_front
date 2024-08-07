import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthStore from "../../../utils/zustand/AuthStore";
import GZAPI from "../../../utils/api";

export default function BoardSearch({ onSearch, hidden }) {
  const [formData, setFormData] = useState({
    location: "*",
    category: "*",
    content: "",
    memberNo: "",
  });

  const memberNo = AuthStore((state) => state.userInfo.memberNo);

  useEffect(() => {
    const fetchData = async () => {
        const response = await GZAPI.post("/api/boards/list", {
          location: "*",
          category: "*",
          content: "",
          memberNo: memberNo,
        });

        onSearch(response.data.slice(0, 90));
    };

    fetchData();
  }, [memberNo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const clickSearch = async () => {
      const response = await GZAPI.post("/api/boards/list", formData);
      onSearch(response.data);
  };

  const cate = [
    { key: "c0", value: "*", label: "전체 카테고리" },
    { key: "c1", value: "CF0101", label: "채소" },
    { key: "c2", value: "CF0102", label: "과일" },
    { key: "c3", value: "CF0103", label: "수산/건어물" },
    { key: "c4", value: "CF0104", label: "정육/계란류" },
    { key: "c5", value: "CF0105", label: "우유/유제품" },
    { key: "c6", value: "CF0201", label: "쌀/잡곡" },
    { key: "c7", value: "CF0202", label: "견과류" },
    { key: "c8", value: "CF0301", label: "김치/반찬" },
    { key: "c9", value: "CF0302", label: "밀키트" },
    { key: "c10", value: "CF0401", label: "면류/통조림" },
    { key: "c11", value: "CF0402", label: "양념/오일" },
    { key: "c12", value: "CF0403", label: "간식/과자" },
    { key: "c13", value: "CF0404", label: "베이커리/잼" },
    { key: "c14", value: "CF0501", label: "생수/음료" },
    { key: "c15", value: "CF0502", label: "커피/차" },
    { key: "c16", value: "CF9901", label: "건강식품" },
  ];

  const local = [
    { key: "jj00", value: "*", label: "전체" },
    { key: "jj01", value: "진북동", label: "진북동" },
    { key: "jj02", value: "인후동", label: "인후동" },
    { key: "jj03", value: "덕진동", label: "덕진동" },
    { key: "jj04", value: "금암동", label: "금암동" },
    { key: "jj05", value: "팔복동", label: "팔복동" },
    { key: "jj06", value: "우아동", label: "우아동" },
    { key: "jj07", value: "호성동", label: "호성동" },
    { key: "jj08", value: "송천동", label: "송천동" },
    { key: "jj09", value: "조촌동", label: "조촌동" },
    { key: "jj10", value: "여의동", label: "여의동" },
    { key: "jj11", value: "혁신동", label: "혁신동" },
    { key: "jj12", value: "중앙동", label: "중앙동" },
    { key: "jj13", value: "풍남동", label: "풍남동" },
    { key: "jj14", value: "노송동", label: "노송동" },
    { key: "jj15", value: "완산동", label: "완산동" },
    { key: "jj16", value: "동서학동", label: "동서학동" },
    { key: "jj17", value: "서서학동", label: "서서학동" },
    { key: "jj18", value: "중화산동", label: "중화산동" },
    { key: "jj19", value: "서신동", label: "서신동" },
    { key: "jj20", value: "평화동", label: "평화동" },
    { key: "jj21", value: "삼천동", label: "삼천동" },
    { key: "jj22", value: "효자동", label: "효자동" },
  ];

  return (
    !hidden && (
      <div className="max-w-6xl flex flex-col md:flex-row items-center mx-auto mt-10 gap-2">
        <div className="flex flex-wrap gap-2">
          <select
            className="px-2 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
            name="location"
            value={formData.location}
            onChange={handleChange}
          >
            {local.map((item) => (
              <option key={item.key} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <select
            className="px-2 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            {cate.map((item) => (
              <option key={item.key} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <input
            type="text"
            className="w-full md:w-[30em] px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="검색어를 입력하세요."
            name="content"
            value={formData.content}
            onChange={handleChange}
          />
        </div>
        <button
          className="text-center bg-[#6ea2d4] text-white px-4 py-2 rounded-lg hover:bg-[#1d5091] focus:outline-none w-full md:w-auto"
          onClick={clickSearch}
        >
          검색
        </button>
      </div>
    )
  );
}

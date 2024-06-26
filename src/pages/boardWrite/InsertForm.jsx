import BoardContent from "../../components/page/board/BoardContent";
import React, { useState, useEffect } from "react";
import Calendar from "../../components/page/board/BoardCalendar";
import MapSearch from "../../components/page/board/MapSearch";
import BoardMap from "../../components/page/board/BoardMap";
import AuthStore from "../../utils/zustand/AuthStore";
import GZAPI from "../../utils/api";

export default function InsertForm() {
  const memberNo = AuthStore((state) => state.userInfo.memberNo);

  const [formData, setFormData] = useState({
    memberNo: "",
    title: "",
    category: "",
    URL: "",
    total: "",
    amount: "",
    image: null,
    content: "",
    endDate: "",
  });

  const [numError, setNumError] = useState("");
  const [canSubmit, setCanSubmit] = useState(true);
  const [dateError, setDateError] = useState("");

  useEffect(() => {
    if (memberNo) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        memberNo: memberNo,
      }));
    }
  }, [memberNo]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name === "total" || name === "amount") {
      validateAmount(
        name === "total" ? value : formData.total,
        name === "amount" ? value : formData.amount
      );
    }
  };

  const validateAmount = (total, amount) => {
    if (parseInt(amount) > parseInt(total)) {
      setNumError("구매 희망 수량은 전체 수량보다 많을 수 없습니다.");
      setCanSubmit(false);
    } else {
      setNumError("");
      setCanSubmit(true);
    }
  };

  const handleEndDateChange = (date) => {
    const selectedDate = new Date(date);
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      setDateError("마감일은 현재 날짜보다 이후여야 합니다.");
      setCanSubmit(false);
    } else {
      setDateError("");
      setCanSubmit(true);
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      endDate: date,
    }));
  };

  const handleContentChange = (content) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      content: content,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!canSubmit) {
      alert("입력된 데이터에 오류가 있습니다. 확인 후 다시 시도하세요.");
      return;
    }

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    // FormData 객체에 저장된 데이터를 콘솔에 출력
    for (const [key, value] of formDataToSend.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const response = await GZAPI.post("/api/boards/write", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status !== 200) {
        throw new Error("서버 응답이 올바르지 않습니다.");
      }

      // 성공 처리
      console.log("폼 데이터가 성공적으로 전송되었습니다.");
    } catch (error) {
      // 에러 처리
      console.error("폼 데이터 전송 중 오류가 발생했습니다.", error);
    }
  };

  const cate = [
    { key: "c0", value: "", label: "제품 카테고리 선택" },
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

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 space-y-4 w-[1000px] mx-auto mb-10 mt-14"
    >
      <div>
        <label className="block">게시글 제목</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder="제품명을 반드시 입력해주세요."
          required
        />
      </div>

      <div>
        <label className="block">카테고리</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        >
          {cate.map((item) => (
            <option key={item.key} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block">구매 URL</label>
        <input
          type="text"
          name="URL"
          value={formData.URL}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder="제품 URL을 입력해주세요."
          required
        />
      </div>

      <div className="flex space-x-4">
        <div className="w-1/2">
          <label className="block">전체 수량</label>
          <input
            type="number"
            name="total"
            value={formData.total}
            onChange={handleChange}
            onBlur={handleBlur}
            className="border p-2 w-full"
            placeholder="제품 전체 수량을 (숫자만) 입력해주세요."
            required
          />
        </div>

        <div className="w-1/2">
          <label className="block">구매 희망 수량</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            onBlur={handleBlur}
            className="border p-2 w-full"
            placeholder="희망하시는 구매 수량을 (숫자만) 입력해주세요."
            required
          />
          {numError && <p className="text-red-500">{numError}</p>}
        </div>
      </div>

      <div>
        <label className="block">제품 이미지</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          required
        />

        {/* 이미지 미리보기 */}
        {formData.image && (
          <img
            alt="메인사진"
            src={URL.createObjectURL(formData.image)}
            className="max-w-[100px] border border-gray-300 rounded"
          />
        )}
      </div>

      <div className="flex space-x-4">
        {/* 게시글 상세 내용 */}
        <div className="w-1/2">
          <BoardContent onChange={handleContentChange} />
        </div>
        {/* 지도 */}
        <div className="w-1/2">
          제품 수령 주소
          <MapSearch />
          <BoardMap />
        </div>
      </div>

      <div>
        <label className="block">게시글 마감일</label>
        <Calendar selected={formData.endDate} onChange={handleEndDateChange} />
        {dateError && <p className="text-red-500">{dateError}</p>}
      </div>

      <div>
        <button type="submit" className="bg-blue-500 text-white p-2">
          제출
        </button>
      </div>
    </form>
  );
}

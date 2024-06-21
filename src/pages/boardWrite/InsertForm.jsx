import BoardContent from "../../components/page/board/BoardContent";
import React, { useState } from "react";
import Calendar from "../../components/page/board/BoardCalendar";

export default function InsertForm() {
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    category: "",
    URL: "",
    total: "",
    amount: "",
    image: null,
    content: "",
    endDate: "",
  });

  const [error, setError] = useState("");

  const [canSubmit, setCanSubmit] = useState(true);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      const reader = new FileReader();
      reader.onload = function (event) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: event.target.result,
        }));
      };
      reader.readAsDataURL(e.target.files[0]);
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
      setError("구매 희망 수량은 전체 수량보다 많을 수 없습니다.");
      setCanSubmit(false);
    } else {
      setError("");
      setCanSubmit(true);
    }
  };

  const handleEndDateChange = (date) => {
    setFormData({
      ...formData,
      endDate: date,
    });
  };

  const handleContentChange = (content) => {
    setFormData({
      ...formData,
      content: content,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!canSubmit) {
      alert("구매 희망 수량이 전체 수량보다 많습니다. 올바른 값을 입력하세요.");
      return;
    }

    // 폼 데이터 처리 로직 추가
    console.log(formData);
  };

  const cate = [
    { key: "c0", value: "", label: "선택" },
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
          required
        />
      </div>

      <div>
        <label className="block">제품명</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full"
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
            required
          />
          {error && <p className="text-red-500">{error}</p>}
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
        <img
          alt="메인사진"
          src={formData.image}
          className="max-w-[100px] border border-gray-300 rounded"
        ></img>
      </div>

      <div className="flex space-x-4">
        <div className="w-1/2">
          <BoardContent onChange={handleContentChange} />
        </div>

        <div className="w-1/2"></div>
      </div>

      <div>
        <label className="block">게시글 마감일</label>
        <Calendar selected={formData.endDate} onChange={handleEndDateChange} />
      </div>

      <div>
        <button type="submit" className="bg-blue-500 text-white p-2">
          제출
        </button>
      </div>
    </form>
  );
}

import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "@ckeditor/ckeditor5-build-classic/build/translations/ko";
import Calendar from "../../components/page/board/BoardCalendar";
import BoardUpdateMap from "../../components/page/board/BoardUpdateMap";
import AuthStore from "../../utils/zustand/AuthStore";
import GZAPI from "../../utils/api";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateForm() {
  const memberNo = AuthStore((state) => state.userInfo.memberNo);
  const { boardNo } = useParams();
  
  const navigate = useNavigate();

  const editorConfiguration = {
    toolbar: {
      items: [
        "heading",
        "|",
        "bold",
        "italic",
        "link",
        "|",
        "imageUpload",
        "blockQuote",
        "|",
        "undo",
        "redo",
      ],
    },
    language: "ko",
  };

  const [formData, setFormData] = useState({
    memberNo: "",
    title: "",
    category: "",
    URL: "",
    price: "",
    total: "",
    amount: "",
    image: null,
    content: "",
    doCity: "",
    siGun: "",
    gu: "",
    dong: "",
    detailAddress: "",
    latitude: "",
    longitude: "",
    endDate: "",
  });

  const [numError, setNumError] = useState("");
  const [canSubmit, setCanSubmit] = useState(true);
  const [dateError, setDateError] = useState("");
  const [submitError, setSubmitError] = useState(""); // 제출 오류 메시지 상태
  const [submitSuccess, setSubmitSuccess] = useState(""); // 제출 성공 메시지 상태

  useEffect(() => {
    const fetchBoardData = async () => {
        const response = await GZAPI.post(`/api/boards/${boardNo}/info`);

        setFormData({
            memberNo: response.data[0].memberNo,
            title: response.data[0].boardTitle,
            category: response.data[0].category,
            URL: response.data[0].productUrl,
            price: response.data[0].totalPrice,
            total: response.data[0].remain + response.data[0].amount,
            amount: response.data[0].amount,
            content: response.data[0].boardBody,
            doCity: response.data[0].locationDo,
            siGun: response.data[0].locationSi,
            gu: response.data[0].locationGu,
            dong: response.data[0].locationDong,
            detailAddress: response.data[0].locationDetail,
            latitude: response.data[0].locationX,
            longitude: response.data[0].locationY,
            endDate: response.data[0].endDate,
          });
    };
    fetchBoardData();
  }, [boardNo]);

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

    if (type === "file" && files.length > 0) {
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
      setNumError("구매 희망 수량은 남은 수량보다 많을 수 없습니다.");
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

  const handleEditorChange = (e, editor) => {
    const data = editor.getData();
    setFormData((prevFormData) => ({
      ...prevFormData,
      content: data,
    }));
  };

  const handleLocationChange = (location) => {
    const parts = location.split(" ");
    const doCity = parts[0];
    const siGun = parts[1];
    const gu = parts[2];
    const dong = parts[3];
    const detailAddress = parts.slice(4).join(" ");

    setFormData((prevFormData) => ({
      ...prevFormData,
      doCity: doCity,
      siGun: siGun,
      gu: gu,
      dong: dong,
      detailAddress: detailAddress,
    }));
  };

  const handlePositionChange = (lat, lng) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      latitude: lat,
      longitude: lng,
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

    try {
      const response = await GZAPI.post(`/api/boards/update/${boardNo}`,formDataToSend,{
        headers: {
          "Content-Type": "multipart/form-data",

        },
        transformRequest: [
          function () {
            return formDataToSend;
          },
        ],
      });

      if (response.status === 200) {
        setSubmitSuccess("게시글이 성공적으로 수정되었습니다!");
        setSubmitError("");
        setTimeout(() => {
          navigate("/board/list"); // 성공 시 이동할 페이지 경로 설정
        }, 500); // 0.5초 후에 페이지 이동
      } else {
        setSubmitSuccess("");
        setSubmitError("게시글 등록에 실패했습니다.");
      }
    } catch (error) {
      // 에러 처리
      setSubmitSuccess("");
      setSubmitError("게시글 등록 중 오류가 발생했습니다. 나중에 다시 시도하세요.");
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
      encType="multipart/form-data"
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
          readOnly
        />
      </div>

      <div>
        <label className="block">제품 총 가격 (배송비 포함)</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder="제품 총 가격을 (숫자만) 입력해주세요."
          readOnly
        />
      </div>

      <div className="flex space-x-4">
        <div className="w-1/2">
          <label className="block">남은 수량</label>
          <input
            type="number"
            name="total"
            value={formData.total}
            onChange={handleChange}
            onBlur={handleBlur}
            className="border p-2 w-full"
            placeholder="제품 전체 수량을 (숫자만) 입력해주세요."
            readOnly
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
          id="fileInput"
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          style={{ display: 'none' }}
        />
      <button
        type="button"
        onClick={() => document.getElementById('fileInput').click()}
        className="bg-[#1d5091] text-white px-2 py-2 rounded-md hover:bg-[#6ea2d4]"
      >
        파일 선택
      </button>

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
        <div className="w-full">
            <div>
                <h2>게시글 상세 내용</h2>
                <CKEditor
                    editor={ClassicEditor}
                    config={editorConfiguration}                    
                    data={formData.content}
                    onChange={handleEditorChange}
                />
                <style jsx global>{`
                    .ck-editor__editable {
                    height: 250px !important;
                    }
                `}</style>
            </div>
        </div>
      </div>
      <div className="flex justify-between gap-10">
        {/* 지도 */}
        <div className="w-2/3">
          제품 수령 주소
          {/* <MapSearch /> */}
          <BoardUpdateMap
            onLocationChange={handleLocationChange}
            onPositionChange={handlePositionChange}
            locationX = {formData.latitude}
            locationY = {formData.longitude}
            detailAddr = {formData.detailAddress.split(' ').slice(1).join(' ')}
          />
        </div>
        <div className="w-1/3">
          <label>게시글 마감일</label>
          <Calendar
            selected={formData.endDate}
            onChange={handleEndDateChange}
          />
          {dateError && <p className="text-red-500">{dateError}</p>}
        </div>
      </div>

      <div className="flex justify-end">
        <button type="submit" className="bg-[#1d5091] text-white px-10 py-3 rounded-md hover:bg-[#6ea2d4]">
          수정
        </button>
      </div>

      {submitSuccess && <p className="text-green-500">{submitSuccess}</p>}
      {submitError && <p className="text-red-500">{submitError}</p>}
    </form>
  );
}

import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Calendar({ selected, onChange }) {
  const handleTimeChange = (date) => {
    // 날짜 객체에서 년, 월, 일을 추출
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    // 시간을 23시, 분을 59분, 초를 59초로 설정
    const hours = "23";
    const minutes = "59";
    const seconds = "59";

    // YYYY-MM-DD HH:mm:ss 형식의 문자열을 생성
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    // 부모 컴포넌트에서 제공한 onChange 함수를 호출하여 변환된 문자열을 전달
    onChange(formattedDate);
  };

  return <DatePicker selected={selected} onChange={handleTimeChange} inline />;
}

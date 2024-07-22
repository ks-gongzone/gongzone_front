import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { styled } from "styled-components";


const DatepickerWrapper = styled.div`
  .react-datepicker{
    width : 320px;
    height: 475px;
  }

  .react-datepicker__month-container {
    width: 100%;
    height: 100%;
  }

  .react-datepicker__header {
    width: 100%;
  }

  .react-datepicker__day {
    width: 2.3rem;
    height: 4.3rem;
    line-height: 4.3rem;
    font-size: 1.3rem;
  }

  .react-datepicker__day-name {
    width: 2.3rem;
    height: 3rem;
    line-height: 3rem;
    font-size: 1rem;
  }
`;

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

  return (
    <DatepickerWrapper>
      <DatePicker 
                selected={selected} 
                onChange={handleTimeChange} 
                inline 
                />
    </DatepickerWrapper>
  );
}

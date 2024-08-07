import React, { useEffect, useState } from "react";
import { GetPhone } from "../../../utils/repository";

export default function Phone({ memberNo }) {
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    GetPhone(memberNo)
      .then((data) => {
        setPhoneNumber(data.phone);
      });
  }, [memberNo]);

  return (
    <div className="mb-6 w-full">
      <div className="text-gray-700 font-bold text-lg mb-2">휴대폰</div>
      <input
        className="w-full p-2 border border-gray-300 rounded mt-2"
        placeholder="휴대폰 번호를 입력해 주세요."
        value={phoneNumber}
        readOnly
      />
    </div>
  );
}
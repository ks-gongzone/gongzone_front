import { useEffect, useState } from "react";
import { parseCSV, transformLocationData } from "../../../utils/LocationApi";
import { GetLocationData, SaveAddress } from "../../../utils/repository";

/**
 * csvData 파싱로직
 * @date: 2024-06-28
 * @last: 2024-06-28
 */
const loadData = (
  memberNo,
  setLocationData,
  setSelectedDo,
  setSelectedSi,
  setSelectedGu,
  setIsLoading
) => {
  parseCSV()
    .then((csvData) => {
      const transformedData = transformLocationData(csvData);
      setLocationData(transformedData);
    })
    .catch((error) => {
      console.error("CSV 파일을 읽을 수 없음", error);
    });

  GetLocationData(memberNo)
    .then((response) => {
      const address = response.memberAddress;
      if (address) {
        const [initalDo, initalSi, initalGu] = address.split(" ");
        setSelectedDo(initalDo);
        setSelectedSi(initalSi);
        setSelectedGu(initalGu);
      } else {
        console.log("주소가 정의되지 않았습니다.");
      }
    })
    .catch((error) => {
      console.error("데이터를 가져오기 실패", error);
    })
    .finally(() => {
      setIsLoading(false);
    });
};

/**
 * 선호 지역 설정
 * @date: 2024-06-10
 * @last: 2024-06-28
 * @수정내용: 코드 분리 csv파싱 후 주소 로드 (2024-06-28)
 */
export default function LocationSelect({ onLocationChange, memberNo }) {
  const [locationData, setLocationData] = useState({});
  const [selectedDo, setSelectedDo] = useState("");
  const [selectedSi, setSelectedSi] = useState("");
  const [selectedGu, setSelectedGu] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData(  
      memberNo,
      setLocationData,
      setSelectedDo,
      setSelectedSi,
      setSelectedGu,
      setIsLoading
    );
  }, [memberNo]);

  const handleDoChange = (e) => {
    const newDo = e.target.value;
    setSelectedDo(newDo);
    setSelectedSi("");
    setSelectedGu("");
    if (onLocationChange) onLocationChange(newDo, "", "");
  };

  const handleSiChange = (e) => {
    const newSi = e.target.value;
    setSelectedSi(newSi);
    setSelectedGu("");
    if (onLocationChange) onLocationChange(selectedDo, newSi, "");
  };

  const handleGuChange = (e) => {
    const newGu = e.target.value;
    setSelectedGu(newGu);
    if (onLocationChange) onLocationChange(selectedDo, selectedSi, newGu);
  };

  const handleSubmit = () => {
    const fullAddress = `${selectedDo} ${selectedSi} ${selectedGu}`;
    console.log("저장할 주소: ", fullAddress);
    SaveAddress(memberNo, fullAddress)
      .then(() => {
        alert("주소가 저장되었습니다.");
      })
      .catch((error) => {
        console.error("주소 저장 중 오류 발생", error);
      });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const doList = Object.keys(locationData);
  const siList = selectedDo ? Object.keys(locationData[selectedDo] || {}) : [];
  const guList =
    selectedDo && selectedSi
      ? locationData[selectedDo]?.[selectedSi] || []
      : [];

  return (
    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row md:space-x-2">
        <div className="flex-1">
          <select
            value={selectedDo}
            onChange={handleDoChange}
            className="w-full p-2 border border-gray-300 rounded mt-2"
          >
            <option value="">시/도 선택</option>
            {doList.map((doName) => (
              <option key={doName} value={doName}>
                {doName}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <select
            value={selectedSi}
            onChange={handleSiChange}
            className="w-full p-2 border border-gray-300 rounded mt-2"
          >
            <option value="">시/군/구 선택</option>
            {siList.map((siName) => (
              <option key={siName} value={siName}>
                {siName}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <select
            value={selectedGu}
            onChange={handleGuChange}
            className="w-full p-2 border border-gray-300 rounded mt-2"
          >
            <option value="">읍/면/동 선택</option>
            {guList.map((guName) => (
              <option key={guName} value={guName}>
                {guName}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-2 md:mt-4 self-end">
        <button
          onClick={handleSubmit}
          className="p-2 bg-blue-500 text-white rounded font-bold"
        >
          선호지역 저장
        </button>
      </div>
    </div>
  );
}

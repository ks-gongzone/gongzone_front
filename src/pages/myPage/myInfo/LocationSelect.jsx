import { useEffect, useState } from "react";

export default function LocationSelect({ onLocationChange }) {
  // 전체 주소 담을 현재 객체와 업데이트 될 객체
  const [location, setLocation] = useState({});
  // 로딩 상태 추가
  const [isLoading, setIsLoading] = useState(true);
  // 시/도 상태
  const [selectedDo, setSelectedDo] = useState("");
  // 시/군/구 상태
  const [selectedSi, setSelectedSi] = useState("");
  // 읍/면/동
  const [selectedGu, setSelectedGu] = useState("");

  useEffect(() => {
    // 백엔드에서 지역에 대한 데이터를 가져오게한다.
    // 비동기 처리를 위해 Async 사용, await사용 하여 백엔드 aip 호출
    const bringRegion = async () => {
      try {
        const response = await fetch(""); // 백엔드에서 보내는 주소
        const data = await response.json();
        setLocation(data);
        setIsLoading(false); // 데이터 로드 완료 상태
      } catch (error) {
        console.error("잘못된 값 입니다.", error);
        setIsLoading(false); // 에러 발생 시에도 로딩 상태 종료
      }
    };
    bringRegion();
  }, []);

  // 도에 대한 값이 변경 되는 이벤트 발생 시
  const handleDoChange = (e) => {
    setSelectedDo(e.target.value);
    setSelectedSi("");
    setSelectedGu("");
    if (onLocationChange) onLocationChange(e.target.value, "", "");
  };

  // 시에 대한 값이 변경 되는 이벤트 발생 시
  const handleSiChange = (e) => {
    setSelectedSi(e.target.value);
    setSelectedGu("");
    if (onLocationChange) onLocationChange(selectedDo, e.target.value, "");
  };

  // 구에 대한 값이 변경 되는 이벤트 발생 시
  const handleGuChange = (e) => {
    setSelectedGu(e.target.value);
    if (onLocationChange)
      onLocationChange(selectedDo, selectedSi, e.target.value);
  };

  if (isLoading) {
    return <div>Loading...</div>; // 로딩중 표기 내용
  }

  return (
    <div className="flex flex-col md:flex-row md:space-x-2">
      <div className="flex-1">
        <select
          value={selectedDo}
          onChange={handleDoChange}
          className="w-full p-2 border border-gray-300 rounded mt-2"
        >
          <option value="">시/도 선택</option>
          {Object.keys(location).map((doName) => (
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
          {Object.keys(location[selectedDo] || {}).map((siName) => (
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
          {(location[selectedDo]?.[selectedSi] || []).map((guName) => (
            <option key={guName} value={guName}>
              {guName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

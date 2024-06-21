import { useEffect, useState } from "react";
import { GetLocationData } from "../../../utils/repository";

/**
 * 선호 지역 설정
 * @date: 2024-06-10
 * @last: 2024-06-17
 */
export default function LocationSelect({
  onLocationChange,
  initailLocation = { do: "", si: "", gu: "" },
  locationData = {},
}) {
  const [location, setLocation] = useState(locationData);
  const [isLoading, setIsLoading] = useState(
    !locationData || Object.keys(locationData).length === 0
  );
  const [selectedDo, setSelectedDo] = useState(initailLocation.do);
  const [selectedSi, setSelectedSi] = useState(initailLocation.si);
  const [selectedGu, setSelectedGu] = useState(initailLocation.gu);

  useEffect(() => {
    if (isLoading) {
      GetLocationData()
        .then((data) => {
          setLocation(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("잘못된 값 입니다.", error);
          setIsLoading(false);
        });
    }
  }, [isLoading]);

  useEffect(() => {
    setSelectedDo(initailLocation.do);
    setSelectedSi(initailLocation.si);
    setSelectedGu(initailLocation.gu);
  }, [initailLocation]);

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

  if (isLoading) {
    return <div>Loading...</div>;
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

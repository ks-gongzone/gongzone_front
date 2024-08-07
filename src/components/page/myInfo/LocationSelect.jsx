import { useEffect, useState } from "react";
import { parseCSV, transformLocationData } from "../../../utils/LocationApi";
import { GetLocationData, SaveAddress } from "../../../utils/repository";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

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
    .catch((error) => {});

  GetLocationData(memberNo)
    .then((response) => {
      const address = response.memberAddress;
      if (address) {
        const [initialDo, initialSi, initialGu] = address.split(" ");
        setSelectedDo(initialDo);
        setSelectedSi(initialSi);
        setSelectedGu(initialGu);
      }
    })
    .catch((error) => {})
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
    SaveAddress(memberNo, fullAddress)
      .then(() => {
        alert("주소가 저장되었습니다.");
      })
      .catch((error) => {
        alert("주소 저장 중 오류가 발생했습니다.");
      });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col w-full">
        <div className="flex flex-col md:flex-row md:space-x-2 mb-2 md:mb-4">
          <Skeleton height={40} className="w-full" />
          <Skeleton height={40} className="w-full" />
          <Skeleton height={40} className="w-full" />
        </div>
        <Skeleton height={40} className="self-end mt-2 md:mt-4 w-24" />
      </div>
    );
  }

  const doList = Object.keys(locationData);
  const siList = selectedDo ? Object.keys(locationData[selectedDo] || {}) : [];
  const guList =
    selectedDo && selectedSi
      ? locationData[selectedDo]?.[selectedSi] || []
      : [];

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col md:flex-row md:space-x-2 mb-2 md:mb-4">
        <div className="w-full">
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
        <div className="w-full">
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
        <div className="w-full">
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
      <div className="self-end mt-2 md:mt-4">
        <button
          onClick={handleSubmit}
          className="p-2 bg-[#1d5091] text-white rounded font-bold"
        >
          선호지역 저장
        </button>
      </div>
    </div>
  );
}

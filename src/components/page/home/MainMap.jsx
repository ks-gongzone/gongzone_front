import { useState, useEffect } from "react";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import { Location } from "../../../utils/repository";
import AuthStore from "../../../utils/zustand/AuthStore";
import { useNavigate } from "react-router-dom";

export default function MainMap() {
  const memberNo = AuthStore((state) => state.userInfo.memberNo);
  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
    locations: [], // 받아온 위치 데이터 저장
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          setState((prev) => ({
            ...prev,
            center: {
              lat: latitude,
              lng: longitude,
            },
            isLoading: false,
          }));

          try {
            const locationData = await Location.LocationSearch(
              latitude,
              longitude
            );
            if (Array.isArray(locationData)) {
              setState((prev) => ({
                ...prev,
                locations: locationData,
              }));
            } else {
              console.error("Fetched data is not an array:", locationData);
              setState((prev) => ({
                ...prev,
                locations: [],
              }));
            }
          } catch (error) {
            console.error("Error fetching locations:", error);
            setState((prev) => ({
              ...prev,
              locations: [],
            }));
          }
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
    } else {
      setState((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할 수 없어요..",
        isLoading: false,
      }));
    }
  }, []);

  return (
    <div>
      <div className="w-[1000px] mx-auto mb-6 text-lg font-bold text-[#526688] mt-14">
        내 주변 모임
      </div>
      <div className="mx-auto rounded-md bg-gray-400">
        <Map
          center={state.center}
          style={{ width: "1000px", height: "600px" }}
          level={4}
        >
          {!state.isLoading && (
            <>
              {Array.isArray(state.locations) &&
                state.locations.map((location, index) => (
                  <LocationMarker
                    key={index}
                    location={location}
                    memberNo={memberNo}
                  />
                ))}
              <MapMarker
                position={state.center}
                image={{
                  src: "https://img.icons8.com/?size=100&id=qUb0xmzXSn62&format=png",
                  size: {
                    width: 48,
                    height: 52,
                  },
                  options: {
                    offset: {
                      x: 24,
                      y: 52,
                    },
                  },
                }}
              />
              <CustomOverlayMap position={state.center} yAnchor={2.2}>
                <div className="bg-white shadow-md rounded-lg p-3 text-center text-black font-semibold">
                  {state.errMsg ? (
                    <span className="text-red-500">{state.errMsg}</span>
                  ) : (
                    <span>현재 여기에 계신 것 같아요!</span>
                  )}
                </div>
              </CustomOverlayMap>
            </>
          )}
        </Map>
      </div>
    </div>
  );
}

function LocationMarker({ location, memberNo }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const markerPosition = {
    lat: parseFloat(location.latitude),
    lng: parseFloat(location.longitude),
  };

  const handleParty = () => {
    navigate(`/party/detail/${memberNo}/${location.partyNo}`);
  };

  return (
    <>
      <MapMarker
        position={markerPosition}
        image={{
          src: "https://img.icons8.com/?size=100&id=5U32J17gItTw&format=png",
          size: {
            width: 48,
            height: 52,
          },
          options: {
            offset: {
              x: 24,
              y: 52,
            },
          },
        }}
        onClick={() => setIsOpen(true)}
      />
      {isOpen && (
        <CustomOverlayMap position={markerPosition} yAnchor={1.2}>
          <div className="wrap w-[20em] bg-white rounded-lg shadow-lg p-4 flex justify-between">
            <div className="w-full">
              <div className="flex justify-between items-center border-b-2 pb-2">
                <div className="text-lg font-bold">{location.boardTitle}</div>
                <button
                  type="button"
                  className="close text-red-500"
                  onClick={() => setIsOpen(false)}
                  title="닫기"
                >
                  ❌
                </button>
              </div>
              <div className="pt-2 pl-4">{location.address}</div>

              <div className="w-full justify-center mt-2 flex">
                <div className="img flex-none">
                  <img
                    src="//t1.daumcdn.net/thumb/C84x76/?fname=http://t1.daumcdn.net/cfile/2170353A51B82DE005"
                    width="90"
                    height="70"
                    alt={location.boardTitle}
                    className="rounded"
                  />
                </div>
                <div className="ml-5">
                  <div className="font-semibold">
                    개당 가격 : {location.price}원
                  </div>
                  <div className="font-semibold">
                    남은 수량: {location.remainAmount}개
                  </div>
                </div>
              </div>
              <button
                onClick={handleParty}
                className="w-full mt-5 bg-[#6ea2d4] text-white py-1 rounded hover:bg-[#1d5091]"
              >
                구경하기
              </button>
            </div>
          </div>
        </CustomOverlayMap>
      )}
    </>
  );
}

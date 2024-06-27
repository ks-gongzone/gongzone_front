import React, { useState, useEffect } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import DaumPostcode from "react-daum-postcode";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export default function BoardMap() {
  const [map, setMap] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [address, setAddress] = useState("");
  const [showPostcode, setShowPostcode] = useState(false);
  const [currentPosition, setCurrentPosition] = useState({
    lat: 33.5563,
    lng: 126.79581,
  });

  useEffect(() => {
    if (window.kakao && window.kakao.maps && !window.kakao.maps.services) {
      window.kakao.maps.load(() => {
        console.log("Kakao Maps services loaded");
      });
    }

    // 현재 위치 가져오기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (err) => {
          console.error(err);
        }
      );
    }
  }, []);

  const handlePostcodeComplete = (data) => {
    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(data.address, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const position = {
          lat: parseFloat(result[0].y),
          lng: parseFloat(result[0].x),
        };
        setMarkerPosition(position);
        setAddress(data.address);
        console.log(`위도: ${position.lat}, 경도: ${position.lng}`);
        map.panTo(new window.kakao.maps.LatLng(position.lat, position.lng));
        setShowPostcode(false);
      }
    });
  };

  const handleMapClick = (_target, mouseEvent) => {
    const latlng = mouseEvent.latLng;
    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.coord2Address(
      latlng.getLng(),
      latlng.getLat(),
      (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const addr = result[0].road_address
            ? result[0].road_address.address_name
            : result[0].address.address_name;
          setMarkerPosition({ lat: latlng.getLat(), lng: latlng.getLng() });
          setAddress(addr);
        }
      }
    );
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentPosition(currentPos);
          map.panTo(
            new window.kakao.maps.LatLng(currentPos.lat, currentPos.lng)
          );
        },
        (err) => {
          console.error(err);
        }
      );
    }
  };

  return (
    <div className="flex flex-col items-center relative">
      {showPostcode && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50"
          onClick={() => setShowPostcode(false)}
        >
          <div
            className="bg-white p-4 rounded-lg"
            onClick={(e) => e.stopPropagation()} // Prevent closing on inner div click
          >
            <DaumPostcode onComplete={handlePostcodeComplete} />
          </div>
        </div>
      )}
      <div className="relative w-full pb-3 z-40">
        <input
          id="addr"
          readOnly
          value={address}
          className="mt-2 p-2 border rounded w-full"
          onFocus={() => setShowPostcode(true)}
        />
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 absolute right-3 top-5" />
        <input
          id="detailAddr"
          className="mt-2 p-2 border rounded w-full"
          value={"" || ""}
          onChange={""}
          placeholder="상세주소를 입력하세요"
        />
      </div>
      <div
        className="w-full z-10 mx-auto rounded-xl bg-gray-400 overflow-hidden"
        style={{ height: "360px" }}
      >
        <Map
          center={currentPosition}
          style={{ width: "100%", height: "100%" }}
          onCreate={setMap}
          onClick={handleMapClick}
        >
          {markerPosition && (
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
            />
          )}
        </Map>
      </div>
    </div>
  );
}
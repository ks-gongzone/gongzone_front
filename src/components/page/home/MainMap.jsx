import React, { useEffect, useRef, useState } from "react";

export default function MainMap() {
  const mapContainer = useRef(null);
  const [location, setLocation] = useState({ lat: 33.450701, lng: 126.570667 }); // 초기 위치 설정
  const [map, setMap] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=846c7a714354f9ab075e6d046569fb84&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      console.log("Kakao Maps script loaded successfully.");
      window.kakao.maps.load(() => {
        console.log("Kakao Maps API loaded successfully.");
        const options = {
          center: new window.kakao.maps.LatLng(location.lat, location.lng),
          level: 3,
        };
        const mapInstance = new window.kakao.maps.Map(
          mapContainer.current,
          options
        );
        setMap(mapInstance);
        console.log("Map initialized:", mapInstance);
      });
    };

    script.onerror = () => {
      console.error("Failed to load Kakao Maps script.");
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      console.log("Attempting to get current location...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Current position: ", position);
          console.log(
            `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}, Accuracy: ${position.coords.accuracy}`
          );
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location: ", error);
        },
        {
          enableHighAccuracy: true, // 높은 정확도로 위치를 받아옵니다.
          timeout: 5000, // 5초 이내에 위치를 받아오지 못하면 에러를 반환합니다.
          maximumAge: 0, // 캐시된 위치 정보를 사용하지 않습니다.
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (map) {
      console.log("Updating map center with location:", location);
      const moveLatLon = new window.kakao.maps.LatLng(
        location.lat,
        location.lng
      );
      map.setCenter(moveLatLon);
      console.log("Map center updated:", moveLatLon);
    }
  }, [location, map]);

  return (
    <div>
      <div className="w-[1000px] mx-auto mb-6 text-lg font-bold text-[#526688] mt-14">
        내 주변 모임
      </div>
      <div
        ref={mapContainer}
        className="w-[1000px] h-[600px] mx-auto rounded-md bg-gray-400"
      ></div>
    </div>
  );
}

import { useState } from "react";

export default function Profile({ memberNo }) {
  const [profileImage, setProfileImage] = useState(null);

  const handleImageChange = (e) => {
    setProfileImage(URL.createObjectURL(e.target.files[0]));
  };

  // 더미 데이터
  const dummyData = {
    name: "홍길동",
    location: "서울",
  };

  return (
    <div className="w-full flex items-center justify-between">
      <div className="mb-6">
        <div className="text-gray-700 font-bold text-xl mb-4">프로필</div>
        <div className="w-[10em] h-[10em] mb-4 rounded-full bg-gray-400 flex items-center justify-center text-white text-2xl">
          {profileImage ? (
            <img
              src={profileImage}
              alt="프로필 미리보기"
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span>프로필</span>
          )}
        </div>
      </div>
      <div className="ml-12 w-[10em] gap-12 flex flex-col flex-shrink-0">
        <div className="text-gray-700 font-bold text-xl mb-2 ">
          {dummyData.name}
        </div>
        <div className="text-gray-500">지역 : {dummyData.location}</div>
      </div>
    </div>
  );
}

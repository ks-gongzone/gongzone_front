import React, { useState } from "react";

export default function ProfilePictureUpload({ memberNo }) {
  const [profileImage, setProfileImage] = useState(null);

  const handleImageChange = (e) => {
    setProfileImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="mb-6">
      <div className="text-gray-700 font-bold text-xl mb-4">프로필 사진</div>
      <div className="w-full h-64 mb-4 rounded-full bg-gray-400 flex items-center justify-center text-white text-2xl">
        {profileImage ? (
          <img src={profileImage} alt="프로필 미리보기" className="w-full h-full rounded-full object-cover" />
        ) : (
          <span>프로필</span>
        )}
      </div>
      <input type="file" onChange={handleImageChange} />
    </div>
  );
}

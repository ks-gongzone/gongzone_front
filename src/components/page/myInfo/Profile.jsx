import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import GZAPI from "../../../utils/api";

const baseURL = "https://gongzone.duckdns.org";

export default function Profile({ memberNo }) {
  const [profileImage, setProfileImage] = useState(null);
  const [profileData, setProfileData] = useState({
    memberName: "",
    gender: "",
    follower: 0,
    following: 0,
    boardCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 백엔드에서 프로필 데이터를 가져옵니다.
    getProfile(memberNo)
      .then((data) => {
        console.log("Fetched Profile Data from Backend:", data); // 콘솔 로그 추가
        setProfileData({
          memberName: data.memberName,
          gender: data.gender,
          follower: data.follower,
          following: data.following,
          boardCount: data.boardCount,
        });
        if (data.files && data.files.length > 0) {
          setProfileImage(`${baseURL}${data.files[0].filePath}`);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch profile data:", error);
        setLoading(false);
      });
  }, [memberNo]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        await addProfilePicture(file);
        setProfileImage(URL.createObjectURL(file));
        alert("Profile picture uploaded successfully!");
      } catch (error) {
        console.error("Failed to upload profile picture:", error);
        alert("Failed to upload profile picture.");
      }
    }
  };

  const handleImageClick = () => {
    document.getElementById("fileInput").click();
  };

  // API 함수들
  const addProfilePicture = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    return GZAPI.post("/api/members/addProfilePicture", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error adding profile picture:", error);
        throw error;
      });
  };

  const getProfile = async (memberNo) => {
    return GZAPI.get(`/api/members/getProfile/${memberNo}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching profile:", error);
        throw error;
      });
  };

  if (loading) {
    return <Skeleton />;
  }

  return (
    <div className="w-full flex items-center justify-between">
      <div className="mb-6">
        <div className="text-gray-700 font-bold text-xl mb-4">프로필</div>
        <div
          className="w-[10em] h-[10em] mb-4 rounded-full bg-gray-400 flex items-center justify-center text-white text-2xl cursor-pointer"
          onClick={handleImageClick}
        >
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
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
      </div>
      <div className="ml-12 w-[10em] gap-12 flex flex-col flex-shrink-0">
        <div className="text-gray-700 font-bold text-xl mb-2 ">
          {profileData.memberName}
        </div>
        <div className="text-gray-500">성별 : {profileData.gender}</div>
        <div className="text-gray-500">
          팔로잉 : {profileData.following} / 팔로워 : {profileData.follower}
        </div>
        <div className="text-gray-500">작성 글 수 : {profileData.boardCount}</div>
      </div>
    </div>
  );
}

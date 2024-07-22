import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import GZAPI from "../../../utils/api";
import PictureModal from "./PictureModal";
import { CameraIcon } from "@heroicons/react/24/outline";

// const baseURL = 'https://gongzone.duckdns.org';
const baseURL = "http://localhost:8088";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (memberNo) {
      console.log("회원번호", memberNo);
      getProfile(memberNo)
        .then((data) => {
          console.log("받은 데이터", data);
          const profile = data.profile;
          setProfileData({
            memberName: profile.memberName,
            gender: profile.gender,
            follower: profile.follower,
            following: profile.following,
            boardCount: profile.boardCount,
          });
          if (data.file) {
            console.log(
              "프로필 이미지 경로:",
              `${baseURL}${data.file.filePath}`
            );
            setProfileImage(`${baseURL}${data.file.filePath}`);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("프로필 등록 실패:", error);
          setLoading(false);
        });
    } else {
      console.error("memberNo가 전달되지 않았습니다.");
      setLoading(false);
    }
  }, [memberNo]);

  const handleImageSave = (imagePath) => {
    console.log("이미지 저장 경로:", imagePath);
    setProfileImage(`${baseURL}${imagePath}`);
  };

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const getProfile = async (memberNo) => {
    console.log("프로필 조회 요청:", memberNo);
    return GZAPI.get(`/api/members/getProfile/${memberNo}`)
      .then((response) => {
        console.log("프로필 조회 응답:", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("프로필 조회 실패:", error);
        throw error;
      });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center mt-12">
        <Skeleton circle={true} height={150} width={150} />
        <Skeleton height={30} width={200} className="mt-4" />
        <Skeleton height={20} width={300} className="mt-2" />
        <Skeleton height={20} width={300} className="mt-2" />
        <Skeleton height={20} width={300} className="mt-2" />
      </div>
    );
  }

  const genderLabel =
    profileData.gender === "M"
      ? "남성"
      : profileData.gender === "F"
      ? "여성"
      : profileData.gender;

  return (
    <div className="w-full flex flex-col items-center justify-between">
      <div className="mb-12 border-gray-400 rounded-lg">
        <div
          className="w-[8em] h-[8em] mb-2 rounded-full bg-gray-400 flex items-center justify-center text-white text-2xl cursor-pointer relative"
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
          <div className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-white border border-gray-400 flex items-center justify-center">
            <CameraIcon className="w-7 h-7 text-gray-600" />
          </div>
        </div>
        <div className="text-gray-700 font-bold text-xl text-center mb-2">
          {profileData.memberName}
        </div>
      </div>
      <div className="w-[20em] flex flex-col flex-shrink-0 gap-5">
        <div className="flex justify-between">
          <div className="text-gray-500 font-bold">성별</div>
          <div className="block text-xl font-bold">{genderLabel}</div>
        </div>
        <div className="flex justify-between mt-1">
          <div className="text-gray-500 font-bold">작성 글 수</div>
          <div className="block text-xl font-bold">
            {profileData.boardCount} 개
          </div>
        </div>
        <div className="flex justify-between mt-1">
          <div className="text-gray-500 font-bold">팔로잉</div>
          <div className="block text-xl font-bold">{profileData.following}</div>
        </div>
        <div className="flex justify-between mt-1">
          <div className="text-gray-500 font-bold">팔로워</div>
          <div className="block text-xl font-bold">{profileData.follower}</div>
        </div>
      </div>
      <PictureModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onImageSave={handleImageSave}
        profileImage={profileImage}
        memberNo={memberNo}
      />
    </div>
  );
}

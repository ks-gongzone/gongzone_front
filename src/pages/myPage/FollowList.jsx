import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import AuthStore from "../../utils/zustand/AuthStore";
import { MemberListAPI, ProfileAPI } from "../../utils/repository";
import MemberListCard from "../../pages/memberInteractionList/MemberListCard";
import sample1 from "../../assets/images/sample1.PNG";

const baseURL = 'https://gongzone.duckdns.org';

export default function FollowList({ memberNo }) {
  const [followList, setFollowList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [size] = useState(9);
  const [totalMembers, setTotalMembers] = useState(0);
  const [loading, setLoading] = useState(true);
  const { userInfo } = AuthStore();
  const currentUserNo = userInfo?.memberNo;

  const fetchFollowList = async (page, size) => {
    try {
      const [data, profilesData] = await Promise.all([
        MemberListAPI.getFollowList(memberNo, page, size),
        ProfileAPI.getAllProfiles()
      ]);

      const profiles = profilesData || [];

      const profilesMap = profiles.reduce((acc, profile) => {
        acc[profile.memberNo] = profile.files.length > 0 ? `${baseURL}${profile.files[0].filePath}` : sample1;
        return acc;
      }, {});

      const processedData = data.followList.map((member) => ({
        ...member,
        isPopular: member.popular,
        isWarning: member.warning,
        isFollowing: member.following,
        isBlocked: member.blocked,
        profileImage: profilesMap[member.memberNo] || sample1 
      }));

      setFollowList(processedData);
      setCurrentPage(data.currentPage);
      setTotalMembers(data.totalCount);
      setLoading(false); // 로딩 완료
    } catch (error) {
      console.error("[팔로우 목록] 유저 데이터 로드 중 오류", error);
      setLoading(false); // 로딩 실패 시에도 완료로 설정
    }
  };

  useEffect(() => {
    fetchFollowList(currentPage, size);
  }, [memberNo, currentPage, size]);

  const renderMemberCards = (members) => {
    return members.map((member) => (
      <div key={member.memberNo}>
        <MemberListCard
          currentUserNo={currentUserNo}
          member={member}
          note={true}
          like={true}
          profileImage={member.profileImage} 
        />
      </div>
    ));
  };

  const renderSkeletonCards = (count) => {
    return Array(count).fill(0).map((_, index) => (
      <div key={index} className="bg-white rounded-lg shadow-md p-4 min-h-[350px]">
        <Skeleton height={200} width={300} />
        <Skeleton height={20} width="80%" className="mt-4" />
        <Skeleton height={20} width="60%" className="mt-2" />
        <Skeleton height={30} width="40%" className="mt-4" />
      </div>
    ));
  };

  const totalPages = Math.ceil(totalMembers / size);

  return (
    <div className="w-full mx-auto mb-10 mt-14 px-4 sm:px-6 lg:px-8">
      <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-4"
      >
        {loading ? renderSkeletonCards(size) : renderMemberCards(followList)}
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1 || loading}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          이전
        </button>
        <span>
          페이지 {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages || loading}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          다음
        </button>
      </div>
    </div>
  );
}

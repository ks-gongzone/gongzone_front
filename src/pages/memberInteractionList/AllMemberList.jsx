import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import AuthStore from "../../utils/zustand/AuthStore";
import { MemberListAPI, ProfileAPI } from "../../utils/repository";
import MemberListCard from "./MemberListCard";
import { useNavigate } from "react-router-dom";
import sample1 from "../../assets/images/sample1.PNG";

const baseURL = 'https://gongzone.duckdns.org';

export default function AllMemberList({
  searchQuery,
  memberList,
  currentPage,
  totalMembers,
  setSearchQuery,
  setMemberList,
  setCurrentPage,
  setTotalMembers,
}) {
  const { userInfo } = AuthStore();
  const currentUserNo = userInfo?.memberNo;
  const [size] = useState(9);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (!currentUserNo) {
      navigate("/home");
    }
  }, [currentUserNo, navigate]);

  useEffect(() => {
    const fetchData = async (page, initialLoad = false) => {
      console.log(
        "[fetchData] - page:",
        page,
        " size:",
        size,
        " query:",
        searchQuery
      );

      try {
        const [membersData, profilesData] = await Promise.all([
          MemberListAPI.getMemberList(page, size, searchQuery),
          ProfileAPI.getAllProfiles()
        ]);

        const profiles = profilesData || [];

        if (!membersData.memberList || membersData.memberList.length === 0) {
          if (initialLoad) {
            setMemberList([]);
            setTotalMembers(0);
            setCurrentPage(1);
            alert("검색 결과가 없습니다.");
            navigate("/member/list");
          }
          setHasMore(false);
        } else {
          const profilesMap = profiles.reduce((acc, profile) => {
            acc[profile.memberNo] = profile.files.length > 0 ? `${baseURL}${profile.files[0].filePath}` : sample1;
            return acc;
          }, {});

          const filteredData = membersData.memberList.filter(member => member.memberNo !== 'M000001' || currentUserNo === 'M000001');

          const processedData = filteredData.map((member) => ({
            ...member,
            isPopular: member.popular,
            isWarning: member.warning,
            isFollowing: member.following,
            isBlocked: member.blocked,
            profileImage: profilesMap[member.memberNo] || sample1 
          }));

          setMemberList(prev => initialLoad ? processedData : [...prev, ...processedData]);
          setTotalMembers(membersData.totalCount);
          setHasMore(filteredData.length === size);
          if (initialLoad) {
            setCurrentPage(membersData.currentPage);
            navigate(`/member/list?query=${searchQuery}&page=${page}`);
          }
        }
      } catch (error) {
        console.error("[페이지] 유저 데이터 로드 중 오류", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData(currentPage, true);
  }, [
    currentPage,
    searchQuery,
    setMemberList,
    setCurrentPage,
    setTotalMembers,
    size,
    navigate,
    currentUserNo,
  ]);

  const loadMore = () => {
    if (hasMore) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const renderMemberCards = (members) => {
    return members.map((member) => (
      <div key={member.memberNo}>
        <MemberListCard
          currentUserNo={currentUserNo}
          member={member}
          note={true}
          like={true}
          profileImage={member.profileImage} // profileImage prop으로 전달
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
      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-4"
      >
        {loading && currentPage === 1 ? renderSkeletonCards(size) : renderMemberCards(memberList)}
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1 || loading}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          이전
        </button>
        <span>
          페이지 {currentPage} / {totalPages}
        </span>
        <button
          onClick={loadMore}
          disabled={currentPage === totalPages || loading || !hasMore}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          다음
        </button>
      </div>
    </div>
  );
}

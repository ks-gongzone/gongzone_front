import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (!currentUserNo) {
      navigate("/home");
    }
  }, [currentUserNo, navigate]);

  useEffect(() => {
    const changeMembersList = async () => {
      console.log(
        "[changeMembersList] - page:",
        currentPage,
        " size:",
        size,
        " query:",
        searchQuery
      );

      try {
        const [membersData, profilesData] = await Promise.all([
          MemberListAPI.getMemberList(currentPage, size, searchQuery),
          ProfileAPI.getAllProfiles()
        ]);

        const profiles = profilesData || [];

        if (!membersData.memberList || membersData.memberList.length === 0) {
          setMemberList([]);
          setTotalMembers(0);
          setCurrentPage(1);
          alert("검색 결과가 없습니다.");
          navigate("/member/list");
        } else {
          const profilesMap = profiles.reduce((acc, profile) => {
            acc[profile.memberNo] = profile.files.length > 0 ? `${baseURL}${profile.files[0].filePath}` : sample1;
            return acc;
          }, {});

          const processedData = membersData.memberList.map((member) => ({
            ...member,
            isPopular: member.popular,
            isWarning: member.warning,
            isFollowing: member.following,
            isBlocked: member.blocked,
            profileImage: profilesMap[member.memberNo] || sample1 
          }));

          setMemberList(processedData);
          setCurrentPage(membersData.currentPage);
          setTotalMembers(membersData.totalCount);
          navigate(`/member/list?query=${searchQuery}&page=${currentPage}`);
        }
      } catch (error) {
        console.error("[페이지] 유저 데이터 로드 중 오류", error);
      }
    };

    changeMembersList();
  }, [
    currentPage,
    searchQuery,
    setMemberList,
    setCurrentPage,
    setTotalMembers,
    size,
    navigate,
  ]);

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
        {renderMemberCards(memberList)}
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          이전
        </button>
        <span>
          페이지 {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          다음
        </button>
      </div>
    </div>
  );
}

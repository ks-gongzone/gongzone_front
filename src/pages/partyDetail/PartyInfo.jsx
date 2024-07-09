import InfoCard from "../../components/page/party/InfoCard";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Party } from "../../utils/repository";
import PartyParticipant from "./PartyParticipant";
import PartyRequest from "./PartyRequest";
import "./PartyAnimation.css"; // 애니메이션 스타일 정의
import RequestModal from "../../components/page/party/RequestModal";

export default function PartyDetail() {
  const { id: memberNo } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const baseURL = "http://localhost:8088";
  const [partyNo, setPartyNo] = useState(state?.partyNo || null);
  const [data, setData] = useState([]);
  const [detail, setDetail] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetch = async () => {
    try {
      const detailData = await Party.PartyAccept(memberNo);
      const responseData = Array.isArray(detailData.data)
        ? detailData.data
        : [detailData.data];
      setData(responseData);

      const partyDetail =
        responseData.find((party) => party.partyNo === partyNo) ||
        responseData[0];
      setDetail(partyDetail);
      if (!partyNo) {
        setPartyNo(partyDetail.partyNo);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetch();
  }, [partyNo, memberNo]);

  useEffect(() => {
    if (!partyNo) {
      navigate(`/party/${memberNo}`);
    }
  }, [partyNo, navigate, memberNo]);

  const formatDate = (datetime) => {
    const date = new Date(datetime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}년 ${month}월 ${day}일`;
  };

  const handleAccept = async (memberNo, partyNo) => {
    try {
      await Party.HandleMember(memberNo, partyNo, "S060202");
      await fetch();
    } catch (error) {
      console.error("Accept error:", error);
    }
  };

  const handleRefuse = async (memberNo, partyNo) => {
    try {
      await Party.HandleMember(memberNo, partyNo, "S060203");
      await fetch();
    } catch (error) {
      console.error("Refuse error:", error);
    }
  };

  const handleKick = async (memberNo, partyNo) => {
    try {
      await Party.HandleMember(memberNo, partyNo, "S060205");
      await fetch();
    } catch (error) {
      console.error("Kick error:", error);
    }
  };

  const handleLeave = async (memberNo, partyNo) => {
    try {
      await Party.HandleMember(memberNo, partyNo, "S060204");
      await fetch();
    } catch (error) {
      console.error("Leave error:", error);
    }
  };

  if (!detail) {
    return <div>Loading...</div>;
  }

  const participants = detail.participants || [];
  const requestMembers = (detail.requestMember || []).filter(
    (member) => member.requestStatus === "S060201"
  );

  const isMember =
    participants.some((participant) => participant.memberNo === memberNo) ||
    requestMembers.some((requestMember) => requestMember.memberNo === memberNo);

  const handleRequestJoin = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-[65em] mx-auto mb-10 mt-14">
      <div className="w-full mb-6 text-lg font-bold text-[#526688]">
        파티 정보
      </div>

      <InfoCard
        key={detail.partyNo}
        title={detail.partyCateCode}
        desc={detail.boardBody}
        link={detail.productUrl}
        price={
          Math.ceil(
            Number(detail.partyPrice) / Number(detail.partyAmount) / 10
          ) * 10
        }
        address={detail.address}
        period={formatDate(detail.endDate)}
        targetAmt={detail.partyAmount}
        remainAmt={detail.remainAmount}
        img={`${baseURL}${detail.img}`} // 이미지 부분 테이블과 백단 추가 수정 필요
      >
        <div className="text-sm px-3 pb-3">
          <div className="flex justify-between mb-3 text-[#888888]"></div>
          <hr className="w-full" />
        </div>
      </InfoCard>

      {!isMember && (
        <button
          onClick={handleRequestJoin}
          className="w-full h-10 mt-4 rounded-md bg-blue-500 text-white font-bold"
        >
          파티 신청하기
        </button>
      )}

      <PartyParticipant
        participants={participants}
        partyLeader={detail.partyLeader}
        onKick={handleKick}
        onLeave={handleKick}
        currentUser={memberNo}
      />
      <PartyRequest
        requestMembers={requestMembers}
        onAccept={handleAccept}
        onRefuse={handleRefuse}
        onLeave={handleLeave}
        currentUser={memberNo}
      />

      <RequestModal
        isOpen={isModalOpen}
        onClose={closeModal}
        memberNo={memberNo}
        partyNo={partyNo}
      />
    </div>
  );
}

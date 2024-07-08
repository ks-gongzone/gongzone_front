import InfoCard from "../../components/page/party/InfoCard";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Party } from "../../utils/repository";
import PartyParticipant from "./PartyParticipant";
import PartyRequest from "./PartyRequest";
import "./PartyAnimation.css"; // 애니메이션 스타일 정의

export default function PartyDetail() {
  const { id: memberNo } = useParams();
  const { state } = useLocation();
  const [partyNo, setPartyNo] = useState(state?.partyNo || null);
  const [data, setData] = useState(state?.data || []);
  const [detail, setDetail] = useState(null);
  const navigate = useNavigate();
  const baseURL = "http://localhost:8088";

  const fetch = async () => {
    const detailData = await Party.PartyAccept(memberNo);
    const responseData = Array.isArray(detailData.data)
      ? detailData.data
      : [detailData.data];
    setData(responseData);
    if (!partyNo && responseData.length > 0) {
      setPartyNo(responseData[0].partyNo);
    }
    const partyDetail = responseData.find((party) => party.partyNo === partyNo);
    setDetail(partyDetail);
  };

  useEffect(() => {
    if (!data.length) {
      fetch();
    } else {
      const partyDetail = data.find((party) => party.partyNo === partyNo);
      setDetail(partyDetail);
    }
  }, [partyNo, data]);

  useEffect(() => {
    if (!partyNo) {
      navigate(`/party/${memberNo}`);
    }
  }, [partyNo, navigate, memberNo]);

  console.log("Detail:", detail);

  const formatDate = (datetime) => {
    const date = new Date(datetime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}년 ${month}월 ${day}일`;
  };

  if (!detail) {
    return <div>Loading...</div>;
  }

  const handleAccept = async (memberNo, partyNo) => {
    try {
      await Party.HandleMember(memberNo, partyNo, "S060202");
      await fetch();
    } catch (error) {
      console.error("Accept error:", error);
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

  const participants = detail.participants || [];
  const requestMembers = (detail.requestMember || []).filter(
    (member) => member.requestStatus === "S060201"
  );

  console.log("Request Members:", requestMembers);

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
        price={Number(detail.partyPrice) / Number(detail.partyAmount)}
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

      <PartyParticipant
        participants={participants}
        partyLeader={detail.partyLeader}
        onKick={handleKick}
      />
      <PartyRequest requestMembers={requestMembers} onAccept={handleAccept} />
    </div>
  );
}

import sample1 from "../../assets/images/sample1.PNG";
import sample2 from "../../assets/images/sample2.PNG";
import sample3 from "../../assets/images/sample3.PNG";
import PartyListCard from "../../components/page/party/PartyListCard";
import { Party } from "../../utils/repository";
import { useEffect, useState } from "react";
import AuthStore from "../../utils/zustand/AuthStore";
import { useNavigate, useParams } from "react-router-dom";

export default function PartyList() {
  const { id } = useParams(); // URL 파라미터에서 ID 가져오기
  const [data, setData] = useState([]);
  const memberNo = AuthStore((state) => state.userInfo.memberNo);
  const navigate = useNavigate();
  const baseURL = "http://localhost:8088";

  const fetch = async () => {
    const detailData = await Party.PartyAccept(id);
    const responseData = Array.isArray(detailData.data)
      ? detailData.data
      : [detailData.data]; // 배열로 변환
    setData(responseData);
    console.log("Fetched data:", responseData);
  };

  useEffect(() => {
    if (id) {
      fetch();
    }
  }, [id]);

  const handleCardClick = (partyNo) => {
    navigate(`/party/detail/${memberNo}/${partyNo}`, {
      state: { partyNo, data },
    });
  };

  // 중복 제거를 위한 Set
  const processedParties = new Set();

  const waitingForPurchaseParties = data.filter((e) => {
    const isWaiting = e.status === "S060104";
    if (isWaiting) processedParties.add(e.partyNo);
    return isWaiting;
  });

  const completedParties = data.filter((e) => {
    const isCompleted = e.status === "S060108";
    if (isCompleted) processedParties.add(e.partyNo);
    return isCompleted;
  });

  const closedParties = data.filter((e) => {
    const isClosed = !processedParties.has(e.partyNo) && e.status === "S060103";
    if (isClosed) processedParties.add(e.partyNo);
    return isClosed;
  });

  const registeredParties = data.filter((e) => {
    const isRegistered =
      !processedParties.has(e.partyNo) && e.partyLeader === memberNo;
    if (isRegistered) processedParties.add(e.partyNo);
    return isRegistered;
  });

  const recruitingParties = data.filter((e) => {
    const isRecruiting =
      !processedParties.has(e.partyNo) && e.status === "S060101";
    if (isRecruiting) processedParties.add(e.partyNo);
    return isRecruiting;
  });

  const requestedParties = data.filter((e) => {
    const isRequested =
      !processedParties.has(e.partyNo) &&
      e.requestMember.some((r) => r.memberNo === memberNo);
    if (isRequested) processedParties.add(e.partyNo);
    return isRequested;
  });

  const renderPartyCards = (parties) => {
    return parties.map((e) => (
      <div key={e.partyNo} onClick={() => handleCardClick(e.partyNo)}>
        <PartyListCard
          img={`${baseURL}${e.img}`}
          desc={e.boardBody}
          title={e.boardTitle}
          id={e.partyNo}
          memberNo={memberNo}
          note={e.partyCateCode}
          like={e.like}
          amount={e.partyAmount}
          status={e.status}
        >
          <div className="text-sm px-3 pb-3">
            <div className="flex justify-between mb-3 text-[#888888]"></div>
          </div>
        </PartyListCard>
      </div>
    ));
  };

  return (
    <div className="w-[65em] mx-auto mb-10 mt-14">
      {waitingForPurchaseParties.length > 0 && (
        <>
          <div className="w-full mb-6 text-lg font-bold text-[#526688] mt-10">
            제품 구매 대기중인 파티
          </div>
          <div className="grid grid-cols-3 gap-4">
            {renderPartyCards(waitingForPurchaseParties)}
          </div>
        </>
      )}

      {closedParties.length > 0 && (
        <>
          <div className="w-full mb-6 text-lg font-bold text-[#526688] mt-10">
            모집 완료된 파티
          </div>
          <div className="grid grid-cols-3 gap-4">
            {renderPartyCards(closedParties)}
          </div>
        </>
      )}

      {requestedParties.length > 0 && (
        <>
          <div className="w-full mb-6 text-lg font-bold text-[#526688] mt-10">
            참여 신청한 파티
          </div>
          <div className="grid grid-cols-3 gap-4">
            {renderPartyCards(requestedParties)}
          </div>
        </>
      )}

      {registeredParties.length > 0 && (
        <>
          <div className="w-full mb-6 text-lg font-bold text-[#526688] mt-10">
            내가 등록한 파티
          </div>
          <div className="grid grid-cols-3 gap-4">
            {renderPartyCards(registeredParties)}
          </div>
        </>
      )}

      {recruitingParties.length > 0 && (
        <>
          <div className="w-full mb-6 text-lg font-bold text-[#526688] mt-10">
            참여 중인 파티
          </div>
          <div className="grid grid-cols-3 gap-4">
            {renderPartyCards(recruitingParties)}
          </div>
        </>
      )}

      {completedParties.length > 0 && (
        <>
          <div className="w-full mb-6 text-lg font-bold text-[#526688] mt-10">
            종료된 파티
          </div>
          <div className="grid grid-cols-3 gap-4">
            {renderPartyCards(completedParties)}
          </div>
        </>
      )}
    </div>
  );
}

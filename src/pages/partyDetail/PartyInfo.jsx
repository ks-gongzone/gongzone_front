import InfoCard from "../../components/page/party/InfoCard";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Party } from "../../utils/repository";
import PartyParticipant from "./PartyParticipant";
import PartyRequest from "./PartyRequest";
import "./PartyAnimation.css";
import RequestModal from "../../components/page/party/RequestModal";
import PartyReply from "../../components/page/party/PartyReply";
import ConfirmModal from "../../components/page/party/ConfirmModal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import AuthStore from "../../utils/zustand/AuthStore";

const MySwal = withReactContent(Swal);

export default function PartyDetail() {
  const { id: memberNo, no: partyNoParam } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const baseURL = "http://localhost:8088";
  const [partyNo, setPartyNo] = useState(
    partyNoParam || location.state?.partyNo
  );
  const [data, setData] = useState(location.state?.data || []);
  const [detail, setDetail] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const loginMember = AuthStore((state) => state.userInfo.memberNo);

  const connectNo = AuthStore((state) => state.userInfo.memberNo);

  console.log(partyNo);

  const fetch = async () => {
    try {
      const detailData = await Party.PartyDetail(partyNo);
      const responseData = detailData.data
        ? detailData.data
        : [detailData.data];
      setData(responseData);

      setDetail(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, [partyNo]);

  useEffect(() => {
    if (detail && loginMember !== memberNo) {
      MySwal.fire({
        title: "접근 불가",
        text: "다른 사용자의 파티 상세 페이지에 접근할 수 없습니다.",
        icon: "error",
      }).then(() => {
        navigate("/"); // 접근 불가 시 홈 페이지로 리다이렉트
      });
    }
  }, [detail, loginMember, memberNo, navigate]);

  console.log(data);
  console.log(detail);

  const formatDate = (datetime) => {
    const date = new Date(datetime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}년 ${month}월 ${day}일`;
  };

  const stripHtmlTags = (str) => {
    return str.replace(/<\/?[^>]+(>|$)/g, "");
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

  const handlePurchase = async (memberNo, partyNo) => {
    try {
      const response = await Party.PurchaseInfo(memberNo, partyNo);
      const { purchaseNo, purchasePrice, memberPoint } = response.data;
      console.log("🚀 ~ handlePurchase ~  response.data:", response.data);

      await MySwal.fire({
        title: "포인트 결제하기",
        html: `
          <div style="text-align: left;">
            <p><strong>결제 예정 포인트:</strong> ${purchasePrice}</p>
            <p><strong>보유 포인트:</strong> ${memberPoint}</p>
          </div>
        `,
        showCancelButton: true,
        confirmButtonText: "결제하기",
        cancelButtonText: "취소",
        showDenyButton: true,
        denyButtonText: "충전하기",
        preConfirm: () => {
          if (purchasePrice > memberPoint) {
            Swal.showValidationMessage(
              "보유 포인트가 결제 예정 포인트보다 적습니다. 포인트를 충전하세요."
            );
            return false;
          }
          return { purchaseNo, purchasePrice, memberPoint };
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await Party.ConfirmPurchase(memberNo, purchaseNo);
            MySwal.fire(
              "결제 완료",
              "결제가 성공적으로 완료되었습니다.",
              "success"
            );
            fetch();
          } catch (error) {
            MySwal.fire("오류", "결제 중 오류가 발생했습니다.", "error");
            console.error("Error during purchase:", error);
          }
        } else if (result.isDenied) {
          window.location.href = "/myPage/point";
        }
      });
    } catch (error) {
      MySwal.fire("오류", "결제 요청 중 오류가 발생했습니다.", "error");
      console.error("Error during purchase:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!detail) {
    return <div>Party not found</div>; // detail 값이 없을 때 표시합니다.
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

  const closeModal = async () => {
    setIsModalOpen(false);
    await fetch();
  };

  const handleConfirm = () => {
    setIsConfirmModalOpen(true);
  };

  const handleComplete = async (partyNo) => {
    setIsConfirmModalOpen(false);
    await Party.CompleteParty(partyNo);
    await fetch();
  };

  console.log("🚀 ~ PartyDetail ~ detail.remainAmount:", detail.remainAmount);

  return (
    <div className="w-[65em] mx-auto mb-10 mt-14">
      <div className="w-full mb-6 text-lg font-bold text-[#526688]">
        파티 정보
      </div>

      <InfoCard
        key={detail.partyNo}
        title={detail.partyCateCode}
        desc={stripHtmlTags(detail.boardBody)}
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
        memberTargetNo={detail.requestMember.memberNo}
        writeNo={detail.partyLeader}
        connectNo={connectNo}
        boardNo={detail.boardNo}

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

      {memberNo === detail.partyLeader ? (
        <>
          {detail.status === "S060103" ? (
            <button
              className="w-full h-10 mt-4 rounded-md bg-blue-500 text-white font-bold"
              disabled
            >
              파티원 포인트 결제 대기
            </button>
          ) : (
            Number(detail.remainAmount) === 0 && (
              <button
                onClick={handleConfirm}
                className="w-full h-10 mt-4 rounded-md bg-gray-400 text-white font-bold"
              >
                모집 완료하기
              </button>
            )
          )}
        </>
      ) : (
        detail.status === "S060103" && (
          <button
            className="w-full h-10 mt-4 rounded-md bg-green-500 text-white font-bold"
            onClick={() => handlePurchase(memberNo, partyNo)}
          >
            내꺼 결제하기
          </button>
        )
      )}

      <PartyParticipant
        participants={participants}
        partyLeader={detail.partyLeader}
        onKick={handleKick}
        onLeave={handleKick}
        currentUser={memberNo}
        status={detail.status}
      />

      {Number(detail.remainAmount) !== 0 && (
        <PartyRequest
          requestMembers={requestMembers}
          onAccept={handleAccept}
          onRefuse={handleRefuse}
          onLeave={handleLeave}
          partyLeader={detail.partyLeader}
          currentUser={memberNo}
        />
      )}

      <RequestModal
        isOpen={isModalOpen}
        onClose={closeModal}
        memberNo={memberNo}
        partyNo={partyNo}
        remainAmount={detail.remainAmount}
      />

      <ConfirmModal
        isConfirmModalOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleComplete}
        partyNo={partyNo}
      />
      <PartyReply 
        boardNo={detail.boardNo} 
        boardReply={detail.boardReply}
      />
    </div>
  );
}

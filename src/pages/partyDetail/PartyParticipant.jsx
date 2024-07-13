import { HeartIcon } from "@heroicons/react/20/solid";
import PartyCard from "../../components/page/party/PartyCard";
import sample1 from "../../assets/images/sample1.PNG";
import { CSSTransition, TransitionGroup } from "react-transition-group";

export default function PartyParticipant({
  participants,
  partyLeader,
  onKick,
  onLeave,
  currentUser,
  status,
}) {
  if (!participants || participants.length === 0) {
    return <div className="w-full text-center py-4">참가자가 없습니다.</div>;
  }

  const sortedParticipants = [...participants].sort((a, b) => {
    if (a.memberNo === partyLeader) return -1;
    if (b.memberNo === partyLeader) return 1;
    return 0;
  });

  return (
    <div className="w-[65em] mx-auto mb-10 mt-14">
      <div className="w-full mb-6 text-lg font-bold text-[#526688]">
        파티 참가자
      </div>
      <TransitionGroup className="grid grid-cols-3 gap-4">
        {sortedParticipants.map((participant) => (
          <CSSTransition
            key={participant.memberNo}
            timeout={500}
            classNames="fade"
          >
            <PartyCard
              img={sample1}
              desc={participant.memberNick}
              id={participant.memberEmail}
              note={true}
              like={true}
              amount={participant.memberAmount}
              memberTargetNo={participant.memberNo}
            >
              <div className="text-sm px-3 pb-3">
                <div className="flex justify-between mb-3 text-[#888888]"></div>
                <hr className="w-full" />
                {participant.memberNo === partyLeader ? (
                  <div className="flex text-xs pt-2">
                    <button
                      type="button"
                      className="w-full mx-1 h-6 rounded-md bg-blue-300 text-xs font-bold text-[white]"
                    >
                      파티장
                    </button>
                  </div>
                ) : (
                  <div className="flex text-xs pt-2">
                    {status === "S060103" ? (
                      <div className="w-full mx-1 h-6 rounded-md bg-red-200 text-xs font-bold text-[white] text-center flex items-center justify-center">
                        결제 대기 중
                      </div>
                    ) : status === "S060104" ? (
                      <div className="w-full mx-1 h-6 rounded-md bg-yellow-200 text-xs font-bold text-[white] text-center flex items-center justify-center">
                        구매 대기중
                      </div>
                    ) : status === "S060105" ? (
                      <div className="w-full mx-1 h-6 rounded-md bg-green-300 text-xs font-bold text-[white] text-center flex items-center justify-center">
                        배송 대기중
                      </div>
                    ) : status === "S060106" ? (
                      <div className="w-full mx-1 h-6 rounded-md bg-green-300 text-xs font-bold text-[white] text-center flex items-center justify-center">
                        수취 대기중
                      </div>
                    ) : status === "S060107" || status === "S060108" ? (
                      <div className="w-full mx-1 h-6 rounded-md bg-green-300 text-xs font-bold text-[white] text-center flex items-center justify-center">
                        제품 수령 완료
                      </div>
                    ) : participant.memberNo === currentUser ? (
                      <button
                        type="button"
                        className="w-full mx-1 h-6 rounded-md bg-red-300 hover:bg-red-500 text-xs font-bold text-[white]"
                        onClick={() =>
                          onLeave(participant.memberNo, participant.partyNo)
                        }
                      >
                        파티 탈퇴하기
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="w-full mx-1 h-6 rounded-md bg-blue-300 hover:bg-blue-500 text-xs font-bold text-[white]"
                        onClick={() =>
                          onKick(participant.memberNo, participant.partyNo)
                        }
                      >
                        강퇴하기
                      </button>
                    )}
                  </div>
                )}
              </div>
            </PartyCard>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
}

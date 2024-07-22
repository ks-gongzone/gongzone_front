import { HeartIcon } from "@heroicons/react/20/solid";
import PartyCard from "../../components/page/party/PartyCard";
import sample1 from "../../assets/images/sample1.PNG";
import { CSSTransition, TransitionGroup } from "react-transition-group";

export default function PartyRequest({
  requestMembers,
  onAccept,
  onRefuse,
  onLeave,
  partyLeader,
  currentUser,
}) {
  console.log("Request members in PartyRequest:", requestMembers);

  if (!requestMembers || requestMembers.length === 0) {
    return <div className="w-full text-center py-4">요청 멤버가 없습니다.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto mb-10 mt-14 px-4 sm:px-6 lg:px-8">
      <div className="w-full mb-6 text-lg font-bold text-[#526688]">
        요청 멤버
      </div>
      <TransitionGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {requestMembers.map((requestMember, index) => (
          <CSSTransition
            key={requestMember.memberNo}
            timeout={500}
            classNames="fade"
          >
            <PartyCard
              img={sample1}
              desc={requestMember.memberNick}
              id={requestMember.memberEmail}
              note={true}
              like={true}
              amount={requestMember.memberAmount}
              memberTargetNo={requestMember.memberNo}
            >
              <div className="text-sm px-3 pb-3">
                <div className="flex justify-between mb-3 text-[#888888]"></div>
                <hr className="w-full" />
                <div className="flex text-xs pt-2">
                  {currentUser === partyLeader ? (
                    <>
                      <button
                        type="button"
                        className="w-full mx-1 h-6 rounded-md bg-[#6ea2d4] hover:bg-blue-500 text-xs font-bold text-[white]"
                        onClick={() =>
                          onAccept(
                            requestMember.memberNo,
                            requestMember.partyNo
                          )
                        }
                      >
                        수락
                      </button>
                      <button
                        type="button"
                        className="w-full mx-1 h-6 rounded-md bg-[#f97173] hover:bg-red-500 text-xs font-bold text-[white]"
                        onClick={() =>
                          onRefuse(
                            requestMember.memberNo,
                            requestMember.partyNo
                          )
                        }
                      >
                        거절
                      </button>
                    </>
                  ) : requestMember.memberNo === currentUser ? (
                    <button
                      type="button"
                      className="w-full mx-1 h-6 rounded-md bg-[#f97173] hover:bg-red-500 text-xs font-bold text-[white]"
                      onClick={() =>
                        onLeave(requestMember.memberNo, requestMember.partyNo)
                      }
                    >
                      신청 취소하기
                    </button>
                  ) : (
                    <div className="w-full mx-1 h-6 rounded-md bg-gray-300 text-xs font-bold text-[black] text-center flex items-center justify-center">
                      파티 신청자
                    </div>
                  )}
                </div>
              </div>
            </PartyCard>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
}

import { HeartIcon } from "@heroicons/react/20/solid";
import PartyCard from "../../components/page/party/PartyCard";
import sample1 from "../../assets/images/sample1.PNG";

export default function PartyRequest({ requestMembers }) {
  if (!requestMembers || requestMembers.length === 0) {
    return <div className="w-full text-center py-4">요청 멤버가 없습니다.</div>;
  }

  return (
    <div className="w-[65em] mx-auto mb-10 mt-14">
      <div className="w-full mb-6 text-lg font-bold text-[#526688]">
        요청 멤버
      </div>
      <div className="grid grid-cols-3 gap-4">
        {requestMembers.map((requestMember, index) => (
          <PartyCard
            key={index}
            img={sample1} // Use a sample image or a participant-specific image if available
            desc={requestMember.memberNick}
            id={requestMember.memberEmail}
            note={true}
            like={true}
            amount={requestMember.memberAmount}
          >
            <div className="text-sm px-3 pb-3">
              <div className="flex justify-between mb-3 text-[#888888]"></div>
              <hr className="w-full" />
              <div className="flex text-xs pt-2">
                <button
                  type="button"
                  className="w-full mx-1 h-6 rounded-md bg-blue-300 hover:bg-blue-500 text-xs font-bold text-[white]"
                >
                  수락
                </button>
                <button
                  type="button"
                  className="w-full mx-1 h-6 rounded-md bg-red-300 hover:bg-red-500 text-xs font-bold text-[white]"
                >
                  거절
                </button>
              </div>
            </div>
          </PartyCard>
        ))}
      </div>
    </div>
  );
}

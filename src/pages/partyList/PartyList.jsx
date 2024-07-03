import { HeartIcon } from "@heroicons/react/20/solid";
import sample1 from "../../assets/images/sample1.PNG";
import sample2 from "../../assets/images/sample2.PNG";
import sample3 from "../../assets/images/sample3.PNG";
import PartyListCard from "../../components/page/party/PartyListCard";
import { Party } from "../../utils/repository";
import { useEffect, useState } from "react";
import AuthStore from "../../utils/zustand/AuthStore";

export default function PartyList() {
  const [data, setData] = useState([]);
  const memberNo = AuthStore((state) => state.userInfo.memberNo);

  const fetch = async () => {
    const detailData = await Party.PartyAccept(memberNo);
    const responseData = Array.isArray(detailData.data)
      ? detailData.data
      : [detailData.data]; // 배열로 변환
    setData(responseData);
    console.log("Fetched data:", responseData);
  };

  useEffect(() => {
    if (memberNo) {
      fetch();
    }
  }, [memberNo]);

  return (
    <div className="w-[65em] mx-auto mb-10 mt-14">
      <div className="w-full mb-6 text-lg font-bold text-[#526688]">
        내가 등록한 파티
      </div>
      <div className="grid grid-cols-3 gap-4">
        {data.length > 0 ? (
          data.map((e) => (
            <div key={e.partyNo}>
              <PartyListCard
                img={sample1}
                desc={e.boardBody}
                title={e.boardTitle}
                id={e.partyNo}
                memberNo={memberNo}
                note={e.partyCateCode}
                like={e.like}
                amount={e.partyAmount}
              >
                <div className="text-sm px-3 pb-3">
                  <div className="flex justify-between mb-3 text-[#888888]"></div>
                </div>
              </PartyListCard>
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}

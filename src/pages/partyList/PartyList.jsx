import { HeartIcon } from "@heroicons/react/20/solid";
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

  return (
    <div className="w-[65em] mx-auto mb-10 mt-14">
      <div className="w-full mb-6 text-lg font-bold text-[#526688]">
        내가 등록한 파티
      </div>
      <div className="grid grid-cols-3 gap-4">
        {data.length > 0 ? (
          data.map((e) => (
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

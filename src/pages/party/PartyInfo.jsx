import InfoCard from "../../components/party/InfoCard";
import sample4 from "../../assets/images/sample4.PNG";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Party } from "../../utils/repository";

export default function PartyInfo() {
  const { id } = useParams();
  const [detail, setDetail] = useState();

  const fetch = async () => {
    const detailData = await Party.PartyAccept(id);
    setDetail(detailData.data);
  };

  useEffect(() => {
    fetch();
  }, [id]);

  console.log(detail);

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

  return (
    <div className="w-[65em] mx-auto mb-10 mt-14">
      <div className="w-full mb-6 text-lg font-bold text-[#526688]">
        파티 정보
      </div>

      <InfoCard
        key={detail.partyId}
        title={detail.partyCateCode}
        desc={detail.boardBody}
        link={detail.productUrl}
        price={Number(detail.partyPrice) / Number(detail.partyAmount)}
        address={detail.address}
        period={formatDate(detail.endDate)}
        targetAmt={detail.partyAmount}
        remainAmt={detail.remainAmount}
        img={detail.thumbnail}
      >
        <div className="text-sm px-3 pb-3">
          <div className="flex justify-between mb-3 text-[#888888]"></div>
          <hr className="w-full" />
        </div>
      </InfoCard>
    </div>
  );
}

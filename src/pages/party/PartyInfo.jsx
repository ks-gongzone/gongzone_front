import InfoCard from "../../components/page/party/InfoCard";
import sample4 from "../../assets/images/sample4.PNG";

export default function PartyInfo() {
  const Infoitems = [
    {
      id: "1",
      title: "아내의쉐프 메밀소바 (냉동), 680g, 40개",
      desc: "아내의쉐프 메밀소바 40개 공동 구매 하실분 구합니다.",
      link: "https://www.coupang.com/vp/products/7395556271?itemId=19130038380&vendorItemId=86249690245&sourceType=CATEGORY&categoryId=502382&isAddedCart=",
      remainAmt: "20",
      targetAmt: "40",
      address: "전주시 완산구 효자동",
      price: "4,200",
      period: "2024-06-30",
      img: sample4,
      note: true,
      like: true,
    },
  ];
  return (
    <div className="w-[65em] mx-auto mb-10 mt-14">
      <div className="w-full mb-6 text-lg font-bold text-[#526688]">
        파티 정보
      </div>
      {Infoitems.map((e) => {
        return (
          <InfoCard
            key={e.id}
            title={e.title}
            img={e.img}
            desc={e.desc}
            address={e.address}
            period={e.period}
            price={e.price}
            remainAmt={e.remainAmt}
            targetAmt={e.targetAmt}
            link={e.link}
          >
            <div className="text-sm px-3 pb-3">
              <div className="flex justify-between mb-3 text-[#888888]"></div>
              <hr className="w-full" />
            </div>
          </InfoCard>
        );
      })}
    </div>
  );
}

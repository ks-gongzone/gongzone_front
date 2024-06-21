import { HeartIcon } from "@heroicons/react/20/solid";
import sample1 from "../../assets/images/sample1.PNG";
import sample2 from "../../assets/images/sample2.PNG";
import sample3 from "../../assets/images/sample3.PNG";
import PartyListCard from "../../components/page/party/PartyListCard";

export default function MyParty() {
  const listitems = [
    {
      id: "고자이마스",
      title: "냉동 메밀소바 40개 공동구매",
      desc: "아내의쉐프 메밀소바 (냉동), 680g, 40개",
      img: sample1,
      amount: "8",
      like: true,
    },
    {
      id: "홍길동맨",
      title: "냉동 메밀소바 40개 공동구매",
      desc: "아내의쉐프 메밀소바 (냉동), 680g, 40개",
      img: sample2,
      amount: "4",
      like: true,
    },
    {
      id: "한옥마을요정",
      title: "냉동 메밀소바 40개 공동구매",
      desc: "아내의쉐프 메밀소바 (냉동), 680g, 40개",
      img: sample3,
      amount: "5",
      like: true,
    },
  ];
  return (
    <div className="w-[65em] mx-auto mb-10 mt-14">
      <div className="w-full mb-6 text-lg font-bold text-[#526688]">
        내가 등록한 파티
      </div>
      <div className="grid grid-cols-3 gap-4">
        {listitems.map((e) => {
          return (
            <PartyListCard
              key={e.id}
              img={e.img}
              desc={e.desc}
              title={e.title}
              note={e.note}
              like={e.like}
              amount={e.amount}
            >
              <div className="text-sm px-3 pb-3">
                <div className="flex justify-between mb-3 text-[#888888]"></div>
              </div>
            </PartyListCard>
          );
        })}
      </div>
    </div>
  );
}

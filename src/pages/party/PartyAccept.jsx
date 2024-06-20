import { HeartIcon } from "@heroicons/react/20/solid";
import PartyCard from "../../components/page/party/PartyCard";
import sample1 from "../../assets/images/sample1.PNG";
import sample2 from "../../assets/images/sample2.PNG";
import sample3 from "../../assets/images/sample3.PNG";

export default function PartyAccept() {
  const listitems = [
    {
      id: "고자이마스",
      desc: "전주 고라니 입니다.",
      img: sample1,
      amount: "8",
      note: true,
      like: true,
    },
    {
      id: "홍길동맨",
      desc: "오늘 뭐하세요.",
      img: sample2,
      amount: "4",
      note: true,
      like: true,
    },
    {
      id: "한옥마을요정",
      desc: "카레가 맛있어요",
      img: sample3,
      amount: "5",
      note: true,
      like: true,
    },
  ];
  return (
    <div className="w-[65em] mx-auto mb-10 mt-14">
      <div className="w-full mb-6 text-lg font-bold text-[#526688]">
        파티 신청자
      </div>
      <div className="grid grid-cols-3 gap-4">
        {listitems.map((e) => {
          return (
            <PartyCard
              key={e.id}
              img={e.img}
              desc={e.desc}
              id={e.id}
              note={e.note}
              like={e.like}
              amount={e.amount}
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
          );
        })}
      </div>
    </div>
  );
}

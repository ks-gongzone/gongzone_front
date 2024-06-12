import { HeartIcon } from "@heroicons/react/20/solid";
import MainCard from "../../components/home/MainCard";

export default function MainCardSection() {
  const listitems = [
    {
      title: "라이너블",
      desc: "안녕하세요. 여기는 서비스의 설명란입니다. 원하시는 내용이 표기 되는 공간입니다.",
      img: "",
    },
    {
      title: "차곡차곡",
      desc: "안녕하세요. 여기는 서비스의 설명란입니다. 원하시는 내용이 표기 되는 공간입니다.",
      img: "",
    },
    {
      title: "단백집",
      desc: "안녕하세요. 여기는 서비스의 설명란입니다. 원하시는 내용이 표기 되는 공간입니다.",
      img: "",
    },
    {
      title: "라이너블1",
      desc: "안녕하세요. 여기는 서비스의 설명란입니다. 원하시는 내용이 표기 되는 공간입니다.",
      img: "",
    },
    {
      title: "차곡차곡1",
      desc: "안녕하세요. 여기는 서비스의 설명란입니다. 원하시는 내용이 표기 되는 공간입니다.",
      img: "",
    },
    {
      title: "단백집1",
      desc: "안녕하세요. 여기는 서비스의 설명란입니다. 원하시는 내용이 표기 되는 공간입니다.",
      img: "",
    },
    {
      title: "단백집1",
      desc: "안녕하세요. 여기는 서비스의 설명란입니다. 원하시는 내용이 표기 되는 공간입니다.",
      img: "",
    },
    {
      title: "단백집1",
      desc: "안녕하세요. 여기는 서비스의 설명란입니다. 원하시는 내용이 표기 되는 공간입니다.",
      img: "",
    },
  ];
  return (
    <div className="w-[1000px] mx-auto mb-10 mt-14">
      <div className="w-full mb-6 text-lg font-bold text-[#526688]">
        새로운 모임
      </div>
      <div className="grid grid-cols-4 gap-4">
        {listitems.map((e) => {
          return (
            <MainCard key={e.title}>
              <div className="text-sm p-3">
                <div className="text-[#c9c9c9] mb-2">{e.title}</div>
                <div className="mb-4">[효자동] 비타민 5통</div>
                <div className="flex justify-between mb-6 text-[#888888]">
                  <div className="flex gap-2 ">
                    <HeartIcon className="w-4 text-[#c9c9c9]" />
                    <div>0</div>
                  </div>
                  <div>76(1)</div>
                </div>
                <hr className="w-full" />
                <div className="text-xs pt-2">
                  모집완료 <span className="text-[#ef7d7a]">0/2</span>
                </div>
              </div>
            </MainCard>
          );
        })}
      </div>
    </div>
  );
}

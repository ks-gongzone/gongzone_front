import { HeartIcon } from "@heroicons/react/20/solid";
import MainCard from "../../components/home/MainCard";

export default function BoardCardSection() {
    const boardList = [
        {
            id: 1,
            title: '비타민 5통 같이 공구하실분',
            cate: '식품 - 기타 - 건강식품',
            img: ''
        },
        {
            id: 2,
            title: '신라면 2박스 같이 구매하실분',
            cate: '식품 - 가공식품 - 면류/통조림',
            img: ''
        },
        {
            id: 3,
            title: '제로콜라 36개 같이 구매하실분',
            cate: '식품 - 음료 - 생수/음료',
            img: ''
        },
        {
            id: 4,
            title: '진라면 1박스 같이 구매하실분',
            cate: '식품 - 가공식품 - 면류/통조림',
            img: ''
        },
        {
            id: 5,
            title: '삼다수 1.5L 30개 같이 구매하실분',
            cate: '식품 - 음료 - 생수/음료',
            img: ''
        },
        {
            id: 6,
            title: '홍삼캔디 10봉지 같이 구매하실분',
            cate: '식품 - 가공식품 - 간식/과자',
            img: ''
        },
        {
            id: 7,
            title: '하리보 젤리 3박스 같이 구매하실분',
            cate: '식품 - 가공식품 - 간식/과자',
            img: ''
        },
        {
            id: 8,
            title: '불닭 2상자 같이 구매하실분',
            cate: '식품 - 가공식품 - 면류/통조림',
            img: ''
        }

    ];
    return (
        <div className="w-[1000px] mx-auto mb-10 mt-14">
            <div className="w-full mb-6 text-lg font-bold text-[#526688]">
            모집중인 파티
            </div>
            <div className="grid grid-cols-4 gap-4">
            {boardList.map((e) => {
                return (
                <MainCard key={e.id}>
                    <div className="text-sm p-3">
                    <div className="text-[#c9c9c9] mb-2">{e.cate}</div>
                    <div className="mb-4">{e.title}</div>
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
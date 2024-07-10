import { HeartIcon } from "@heroicons/react/20/solid";
import BoardListCard from "../../components/page/board/BoardListCard";
import { useEffect, useState } from "react";
import AuthStore from "../../utils/zustand/AuthStore";

const cate = [
  { key: "CF0101", value: "식품-신선식품-채소" },
  { key: "CF0102", value: "식품-신선식품-과일" },
  { key: "CF0103", value: "식품-신선식품-수산/건어물" },
  { key: "CF0104", value: "식품-신선식품-정육/계란류" },
  { key: "CF0105", value: "식품-신선식품-우유/유제품" },
  { key: "CF0201", value: "식품-곡물류-쌀/잡곡" },
  { key: "CF0202", value: "식품-곡물류-견과류" },
  { key: "CF0301", value: "식품-반찬류-김치/반찬" },
  { key: "CF0302", value: "식품-반찬류-밀키트" },
  { key: "CF0401", value: "식품-가공식품-면류/통조림" },
  { key: "CF0402", value: "식품-가공식품-양념/오일" },
  { key: "CF0403", value: "식품-가공식품-간식/과자" },
  { key: "CF0404", value: "식품-가공식품-베이커리/잼" },
  { key: "CF0501", value: "식품-음료-생수/음료" },
  { key: "CF0502", value: "식품-음료-커피/차" },
  { key: "CF9901", value: "식품-기타-건강식품" },
];

const baseURL = "http://localhost:8088";

function getCategoryaValue(category) {
  const value = cate.find((item) => item.key === category);
  return value.value;
}

export default function BoardCardSection({ data }) {
  const memberNo = AuthStore((state) => state.userInfo.memberNo);

  useEffect(() => {}, []);

  return (
    <div className="w-[65em] mx-auto mb-10 mt-14">
      <div className="w-full mb-6 text-lg font-bold text-[#526688]">
        모집중인 파티
      </div>
      <div className="grid grid-cols-3 gap-4">
        {data.length > 0 ? (
          data.map((e, index) => (
            <div key={e.boardNo}>
              <BoardListCard
                img={`${baseURL}${data[index].files[0].filePath}`}
                cate={getCategoryaValue(e.category)}
                title={e.boardTitle}
                id={e.partyNo}
                memberNo={memberNo}
                partyNo={e.partyNo}
                note={e.partyCateCode}
                like={e.like}
                amount={e.remain}
              >
                <div className="text-sm px-3 pb-3">
                  <div className="flex justify-between mb-3 text-[#888888]"></div>
                </div>
              </BoardListCard>
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}

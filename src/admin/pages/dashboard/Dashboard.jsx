import { useState, useEffect } from "react";
import { ResponsiveLine } from "@nivo/line";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveBullet } from "@nivo/bullet";
import {
  AdminMemberAPI,
  Board,
  MemberListAPI,
} from "../../../utils/repository";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { subMonths } from "date-fns";

export default function Dashboard() {
  const [memberData, setMemberData] = useState([]);
  const [postData, setPostData] = useState([]);
  const [reportData, setReportData] = useState({ today: 0, total: 0 });
  const [partyData, setPartyData] = useState([]);
  const [startDate, setStartDate] = useState(subMonths(new Date(), 1));
  const [endDate, setEndDate] = useState(new Date());

  const fetchMemberData = async () => {
    const result = await MemberListAPI.getStaticMember();
    if (Array.isArray(result.data)) {
      const filteredData = result.data.filter((item) => {
        const date = new Date(item.loginInTimeDateFormat);
        return date >= startDate && date <= endDate;
      });

      const totalData = filteredData.map((item) => ({
        x: item.loginInTimeDateFormat,
        y: item.total,
      }));

      const directData = filteredData.map((item) => ({
        x: item.loginInTimeDateFormat,
        y: item.direct,
      }));

      const socialData = filteredData.map((item) => ({
        x: item.loginInTimeDateFormat,
        y: item.social,
      }));

      setMemberData([
        { id: "total", data: totalData },
        { id: "direct", data: directData },
        { id: "social", data: socialData },
      ]);
    }
  };

  const fetchReportData = async () => {
    const result = await AdminMemberAPI.UncheckedReport();
    if (Array.isArray(result.data)) {
      const today = new Date().toISOString().split("T")[0];
      const todayReport =
        result.data.find((item) => item.reportDate === today)?.total || 0;
      const totalReport =
        result.data.find((item) => item.reportDate === "totalAll")?.total || 0;

      setReportData({ today: todayReport, total: totalReport });
    }
  };

  const fetchBoardData = async () => {
    const result = await Board.GetBoardAdmin();
    if (
      result &&
      result.data.boardProgressList &&
      result.data.boardWriteMemberList
    ) {
      setPartyData(result.data.boardProgressList);
      const postData = result.data.boardWriteMemberList.map((item) => ({
        user: item.memberNo,
        posts: item.boardWrite,
      }));
      postData.sort((a, b) => b.posts - a.posts);
      setPostData(postData);
    }
  };

  useEffect(() => {
    fetchMemberData();
    fetchReportData();
    fetchBoardData();
  }, [startDate, endDate]);

  const statusMap = {
    S060102: 0, // 모집완료
    S060103: 20, // 파티원 결제대기
    S060104: 40, // 파티장 결제대기
    S060105: 50, // 쇼핑몰 배송중
    S060106: 70, // 수취 대기중
    S060107: 100, // 정산 대기중
  };

  const bulletData = partyData.map((party) => ({
    id: party.partyNo,
    ranges: [0, 100],
    measures: [statusMap[party.partyStatus] || 0],
    markers: [],
    title: party.partyNo,
  }));

  const barData = postData.map((item, index) => ({
    ...item,
    color: index,
  }));

  return (
    <div className="flex flex-col items-center box-border p-4">
      <div className="w-full max-w-8xl bg-white shadow rounded-lg p-12">
        <section className="mb-8 p-4 bg-gray-50 rounded-lg flex justify-between">
          <div className="w-[40%] h-[20em]">
            <div className="text-xl font-bold mb-4 border-b-2 pb-1">
              신고 통계
            </div>
            <div className="flex justify-between items-center h-full">
              <div className="flex flex-col items-center w-full">
                <div className="mb-5 text-sm font-bold">
                  확인하지 않은 신고내역
                </div>
                <button
                  className="p-4 border-2 border-gray-300 text-black rounded-md shadow-md w-[12em] h-20 flex flex-col justify-center items-center relative"
                  onClick={() => alert("미확인 신고 확인")}
                >
                  <div className="text-xl">{reportData.today}</div>
                </button>
              </div>
              <div className="flex flex-col items-center w-full">
                <div className="mb-5 text-sm font-bold">금일 신고된 내역</div>
                <button
                  className="p-4 border-2 border-gray-300 text-black rounded-md shadow-md w-[12em] h-20 flex flex-col justify-center items-center relative"
                  onClick={() => alert("전체 미확인 신고 확인")}
                >
                  <div className="text-xl">전체 {reportData.total}</div>
                </button>
              </div>
            </div>
          </div>
          <div className="w-[55%] h-64">
            <div className="text-xl font-bold mb-4 border-b-2 pb-1">
              게시글 작성 갯수 상위 5명
            </div>
            <ResponsiveBar
              data={barData}
              keys={["posts"]}
              indexBy="user"
              layout="horizontal"
              margin={{ top: 50, right: 130, bottom: 50, left: 80 }}
              padding={0.3}
              valueScale={{ type: "linear" }}
              indexScale={{ type: "band", round: true }}
              colors={{ scheme: "set3" }}
              colorBy="indexValue"
              borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "게시글 수",
                legendPosition: "middle",
                legendOffset: 32,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "사용자 번호",
                legendPosition: "middle",
                legendOffset: -70,
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
            />
          </div>
        </section>

        <section className="mb-8 p-4 bg-gray-50 rounded-lg">
          <div className="text-xl font-bold mb-4 border-b-2 pb-1">
            일별 접속 통계
          </div>
          <div className="w-full mb-4 flex">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              dateFormat="yyyy/MM/dd"
              endDate={endDate}
              className="p-2 border-2 border-gray-300 text-black rounded-md shadow-m text-center mr-5"
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              dateFormat="yyyy/MM/dd"
              endDate={endDate}
              className="p-2 border-2 border-gray-300 text-black rounded-md shadow-m text-center"
            />
          </div>
          <div className="w-full h-64">
            <ResponsiveLine
              data={memberData}
              margin={{ top: 10, right: 110, bottom: 50, left: 60 }}
              xScale={{ type: "point" }}
              yScale={{
                type: "linear",
                min: "auto",
                max: "auto",
                stacked: false,
                reverse: false,
              }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                orient: "bottom",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "date",
                legendOffset: 36,
                legendPosition: "middle",
              }}
              axisLeft={{
                orient: "left",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "총 로그인",
                legendOffset: -40,
                legendPosition: "middle",
              }}
              pointSize={10}
              pointColor={{ theme: "background" }}
              pointBorderWidth={2}
              pointBorderColor={{ from: "serieColor" }}
              pointLabelYOffset={-12}
              useMesh={true}
              tooltip={({ point }) => (
                <div
                  style={{
                    background: "white",
                    padding: "9px 12px",
                    border: "1px solid #ccc",
                  }}
                >
                  <strong>{point.data.xFormatted}</strong>
                  <br />
                  {point.serieId === "total" && (
                    <span>총 로그인: {point.data.yFormatted}</span>
                  )}
                  {point.serieId === "direct" && (
                    <span>직접 로그인: {point.data.yFormatted}</span>
                  )}
                  {point.serieId === "social" && (
                    <span>소셜 로그인: {point.data.yFormatted}</span>
                  )}
                </div>
              )}
            />
          </div>
        </section>

        <section className="p-4 bg-gray-50 rounded-lg">
          <div className="text-xl font-bold mb-4 border-b-2 pb-1">
            파티 관리
          </div>
          <div className="ml-20 flex space-x-40">
            <div>모집완료</div>
            <div>파티원 결제대기</div>
            <div>파티장 결제대기</div>
            <div>쇼핑몰 배송중</div>
            <div>수취 대기중</div>
            <div>정산 대기중</div>
          </div>

          <div className="w-full h-[30em]">
            <ResponsiveBullet
              data={bulletData}
              margin={{ top: 50, right: 50, bottom: 50, left: 100 }}
              titleAlign="start"
              titleOffsetX={-100}
              spacing={60}
              rangeColors="white"
              measureColors="seq:yellow_green_blue"
              measureSize={1}
              axisBottom={{
                tickValues: [1, 2, 3, 4, 5, 6],
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "파티 상태",
                legendPosition: "middle",
                legendOffset: 32,
                format: (value) =>
                  [
                    "모집완료",
                    "파티원 결제대기",
                    "파티장 결제대기",
                    "쇼핑몰 배송중",
                    "수취 대기중",
                    "정산 대기중",
                  ][value / 10 - 1],
              }}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

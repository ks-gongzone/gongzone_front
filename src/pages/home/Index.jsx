import MainSlider from "../../components/page/home/MainSlider";
import MainMap from "../../components/page/home/MainMap";
import SubSlider from "../../components/page/home/SubSlider";
import MyParty from "../myPage/MyParty";
import MainCardSection from "./MainCardSection";

export default function Home() {
  return (
    <div className="flex flex-col items-center box-border">
      <MainSlider />
      <MainMap />
      <SubSlider />
      <MainCardSection />
      <MyParty />
    </div>
  );
}

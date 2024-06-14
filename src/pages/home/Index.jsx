import MainSlider from "../../components/home/MainSlider";
import MainMap from "../../components/page/home/MainMap";
import SubSlider from "../../components/page/home/SubSlider";
import PartyCardSection from "../party/PartyAccept";
import MainCardSection from "./MainCardSection";

export default function Home() {
  return (
    <div className="flex flex-col items-center box-border">
      <MainSlider />
      <MainMap />
      <SubSlider />
      <MainCardSection />
      <PartyCardSection />
    </div>
  );
}

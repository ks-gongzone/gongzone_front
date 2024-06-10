import MainSlider from "../../components/home/MainSlider";
import MainCardSection from "./MainCardSection";

export default function Home() {
  return (
    <div className="flex flex-col items-center box-border">
      <MainSlider />
      <MainCardSection />
    </div>
  );
}

import SubSlider from "../../components/board/SubSlider";
import BoardCardSection from "./BoardCardSection";
import BoardSearch from "../../components/board/BoardSearch";

export default function BoardList() {
  return (
    <div className="flex flex-col items-center box-border">
      <BoardSearch />
      <SubSlider />
      <BoardCardSection />
    </div>
  );
}

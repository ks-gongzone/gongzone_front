import MainSlider from "../../components/page/home/MainSlider";
import MainMap from "../../components/page/home/MainMap";
import SubSlider from "../../components/page/home/SubSlider";
import BoardCardSection from "../boardList/BoardCardSection";
import { useState } from "react";
import BoardSearch from "../../components/page/board/BoardSearch";

export default function Home() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (data) => {
    setSearchResults(data);
  };

  return (
    <div className="flex flex-col items-center box-border">
      <MainSlider />
      <MainMap />
      <SubSlider />
      <BoardSearch onSearch={handleSearch} hidden={true} />
      <BoardCardSection data={searchResults} />
    </div>
  );
}

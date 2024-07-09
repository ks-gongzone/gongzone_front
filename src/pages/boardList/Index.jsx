import { useState } from "react";
import SubSlider from "../../components/page/board/SubSlider";
import BoardCardSection from "./BoardCardSection";
import BoardSearch from "../../components/page/board/BoardSearch";

export default function BoardList() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (data) => {
    setSearchResults(data);
  };

  return (
    <div className="flex flex-col items-center box-border">
      <BoardSearch onSearch={handleSearch} />
      <SubSlider />
      <BoardCardSection data={searchResults} />
    </div>
  );
}

import SearchBar from "../home/SearchBar";

export default function AnnounceWrapper() {
  return (
    <div className="flex w-[1150px] justify-between pt-12 pb-5">
      <div className="text-[2vw]">공지사항</div>
      <SearchBar />
    </div>
  );
}

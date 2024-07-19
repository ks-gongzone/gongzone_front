import SearchBar from "../home/SearchBar";

export default function AnnounceWrapper() {
  return (
    <div className="w-[65em] mx-auto mb-10 mt-14">
      <div className="flex justify-between items-center">
        <div className="mb-6 text-2xl font-bold text-[#526688] mt-10">공지사항</div>
        <SearchBar />
      </div>
    </div>
  );
}

import AnnounceMenu from "../../components/page/announce/AnnounceMenu";
import AnnounceWrapper from "../../components/page/announce/AnnounceWrapper";

export default function Announce() {
  return (
    <div className="flex flex-col items-center box-border p-4">
      <AnnounceWrapper />
      <AnnounceMenu />
    </div>
  );
}

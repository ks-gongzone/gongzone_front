import { useEffect } from "react";
import AnnounceMenu from "../../components/page/announce/AnnounceMenu";
import AnnounceDetailWrapper from "../../components/page/announceDetail/AnnounceDetailWrapper";
import AnnounceFooter from "../../components/page/announceDetail/AnnounceFooter";
import AnnounceDetailBody from "./AnnounceDetailBody";

export default function AnnounceDetail() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col items-center box-border p-4">
      <AnnounceDetailWrapper />
      <AnnounceDetailBody />
      <AnnounceFooter />
      <AnnounceMenu />
    </div>
  );
}
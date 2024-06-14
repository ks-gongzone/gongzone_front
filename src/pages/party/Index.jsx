import PartyAccept from "./PartyAccept";
import PartyAccepted from "./PartyAccepted";

export default function Party() {
  return (
    <div className="flex flex-col items-center box-border">
      <PartyAccept />
      <PartyAccepted />
    </div>
  );
}

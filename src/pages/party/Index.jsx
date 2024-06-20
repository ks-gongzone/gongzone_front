import PartyAccept from "./PartyAccept";
import PartyAccepted from "./PartyAccepted";
import PartyInfo from "./PartyInfo";

export default function Party() {
  return (
    <div className="flex flex-col items-center box-border">
      <PartyInfo />
      <PartyAccept />
      <PartyAccepted />
    </div>
  );
}

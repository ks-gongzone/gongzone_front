import { Link } from "react-router-dom";

export default function LayoutHeader() {
  return (
    <div className="flex items-center">
      <div className="w-full flex items-center">
        <Link to="/">LOGO</Link>
      </div>
    </div>
  );
}

import Sidebar from "./Sidebar";

export default function LayoutAdminDefault({ children }) {
  return (
    <div>
      <Sidebar/>
      <div className="w-full flex justify-center">
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
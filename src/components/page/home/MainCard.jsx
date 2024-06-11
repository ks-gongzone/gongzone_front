import { HeartIcon } from "@heroicons/react/20/solid";

export default function MainCard({ children, img, title, desc, like = false }) {
  return (
    <div className="border rounded-lg hover:border-[#ea6560] transition-colors overflow-hidden">
      {like && (
        <div className="w-full">
          <HeartIcon className="w-6 ml-auto text-[#e7e7e7]" />
        </div>
      )}
      <div className="w-full h-32 bg-slate-400">
        <img className="w-full h-full" src={img} alt="" />
      </div>
      <div>{children}</div>
    </div>
  );
}

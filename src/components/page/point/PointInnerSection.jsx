export default function PointInnerSection({ title, children }) {
  return (
    <div className="flex flex-col justify-between space-y-4
                    w-full min-h-60
                    box-border rounded-2xl p-8
                    bg-gray-200">
      <div className="text-left">
        <h3 className="text-2xl">{ title }</h3>
      </div>
      { children }
    </div>
  );
}

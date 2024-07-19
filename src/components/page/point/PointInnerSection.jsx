export default function PointInnerSection({ title, description, children }) {
  return (
    <div
      className="flex flex-col justify-between space-y-4
                 w-full min-h-60
                 box-border rounded-2xl p-8
                 border-2 border-gray-300 shadow-lg"
    >
      <div className="relative text-left">
        <h3 className="text-2xl">{title}</h3>
        <div className="absolute top-2 right-0">{description}</div>
      </div>
      {children}
    </div>
  );
}

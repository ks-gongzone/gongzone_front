import { Link } from "react-router-dom";

export default function AnnounceItems({ items }) {
  return (
    <div className="flex flex-col items-center box-border p-4">
      <div className="w-full max-w-6xl">
        <div className="bg-white shadow rounded-lg">
          <ul>
            {items.map((item, index) => (
              <li
                key={index}
                className="flex justify-between p-4 border-b hover:bg-gray-100"
              >
                <div className="flex items-center">
                  <div
                    className={`w-[5em] text-center px-2 py-1 rounded mr-2 ${
                      item.type === "공지"
                        ? "bg-blue-200"
                        : item.type === "점검"
                        ? "bg-yellow-200"
                        : "bg-green-200"
                    }`}
                  >
                    {item.type}
                  </div>
                  <Link to="/announce/detail">{item.title}</Link>
                </div>
                <div className="flex items-center">
                  <span className="mr-4">{item.date}</span>
                  {item.views && <span>{item.views}</span>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

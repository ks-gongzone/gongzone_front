import { useState } from "react";

export default function BasicTapMenu({ tabItems, activeTab, onTabClick }) {
  const [hoveredTab, setHoveredTab] = useState(null);

  return (
    <div className="w-[65em] mx-auto">
      <div className="flex pb-10 border-black border-t-2">
        {tabItems.map((tab, index) => (
          <div key={tab.id} className="w-full flex items-center bg-gray-100">
            <button
              type="button"
              className={`py-2 px-4 w-full h-[3.5em] border-black text-center ${
                activeTab === tab.id
                  ? "border-gray-100 border-b font-semibold text-black border-b-0 bg-white"
                  : "border-gray-100 hover:border-b text-[#ababab] hover:text-black hover:font-semibold bg-gray-100 hover:bg-white hover:border-b-0"
              }`}
              onClick={() => onTabClick(tab.id)}
              onMouseEnter={() => setHoveredTab(tab.id)}
              onMouseLeave={() => setHoveredTab(null)}
            >
              {tab.label}
            </button>
            {index < tabItems.length - 1 && (
              <div
                className={`h-6 w-[1px] bg-gray-300 ${
                  activeTab === tab.id ||
                  activeTab === tabItems[index + 1].id ||
                  hoveredTab === tab.id ||
                  hoveredTab === tabItems[index + 1].id
                    ? "hidden"
                    : ""
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

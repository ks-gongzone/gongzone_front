export default function BasicTapMenu({ tabItems, activeTab, onTabClick }) {
  return (
    <div>
      <div className="w-[1200px] flex pb-10 border-black border-t-2">
        {tabItems.map((tab) => (
          <div key={tab.id} className="w-full">
            <button
              type="button"
              className={`py-2 px-4 w-full h-[3.5em] border-black text-center ${
                activeTab === tab.id
                  ? "border-gray-100 border-b font-semibold text-black border-b-0 bg-white"
                  : "border-gray-100 hover:border-b text-[#ababab] hover:text-black hover:font-semibold bg-gray-100 hover:bg-white hover:border-b-0"
              }`}
              onClick={() => onTabClick(tab.id)}
            >
              {tab.label}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

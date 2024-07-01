import { useState } from "react";
import { ArrowUpCircleIcon, BellAlertIcon } from "@heroicons/react/24/outline";

export default function ScrollButton() {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("messages");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleAlert = () => {
    setIsAlertOpen(!isAlertOpen);
  };

  const messages = [
    { id: "1", title: "메시지 제목 1", author: "작성자 1" },
    { id: "2", title: "메시지 제목 2", author: "작성자 2" },
    { id: "3", title: "메시지 제목 3", author: "작성자 3" },
  ];

  const notifications = [
    { id: "1", title: "알림 제목 1", author: "작성자 A" },
    { id: "2", title: "알림 제목 2", author: "작성자 B" },
    { id: "3", title: "알림 제목 3", author: "작성자 C" },
  ];

  return (
    <div>
      <div className="fixed bottom-10 right-10 flex flex-col gap-2">
        <button
          type="button"
          onClick={scrollToTop}
          className="w-12 h-12 rounded-full bg-blue-400 flex justify-center items-center"
        >
          <ArrowUpCircleIcon className="text-white w-8 h-8" />
        </button>
        <button
          type="button"
          onClick={toggleAlert}
          className="w-12 h-12 rounded-full flex justify-center items-center bg-black"
        >
          <BellAlertIcon className="text-white w-8 h-8" />
        </button>
      </div>

      <div
        className={`fixed right-0 bottom-0 h-[50em] border-gray-300 border-t border-l w-1/3 bg-white shadow-lg p-4 z-50 transform transition-transform duration-300 ease-in-out ${
          isAlertOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={toggleAlert}
          className="flex w-full justify-start text-lg pb-5"
        >
          ❌
        </button>
        <div className="flex border-b">
          <button
            className={`p-2 flex-1 ${
              activeTab === "messages"
                ? "border-b-2 border-blue-400 font-bold"
                : ""
            }`}
            onClick={() => setActiveTab("messages")}
          >
            받은 쪽지
          </button>
          <button
            className={`p-2 flex-1 ${
              activeTab === "notifications"
                ? "border-b-2 border-blue-400 font-bold"
                : ""
            }`}
            onClick={() => setActiveTab("notifications")}
          >
            모임 알림
          </button>
        </div>
        <div className="p-4">
          {activeTab === "messages" ? (
            <ul>
              {messages.map((message) => (
                <li key={message.id} className="mb-2">
                  <button className="w-full text-left p-2 rounded-md hover:bg-gray-100">
                    <div className="font-medium">{message.title}</div>
                    <div className="text-sm text-gray-500">
                      {message.author}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <ul>
              {notifications.map((notification) => (
                <li key={notification.id} className="mb-2">
                  <button className="w-full text-left p-2 rounded-md hover:bg-gray-100">
                    <div className="font-medium">{notification.title}</div>
                    <div className="text-sm text-gray-500">
                      {notification.author}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

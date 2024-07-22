import { useState, useEffect } from "react";
import {
  ArrowUpCircleIcon,
  BellAlertIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { Alert, Note } from "../../utils/repository";
import AuthStore from "../../utils/zustand/AuthStore";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function ScrollButton() {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("messages");
  const [messages, setMessages] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [hasUnread, setHasUnread] = useState(false);

  const memberNo = AuthStore((state) => state.userInfo.memberNo);

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (isAlertOpen) {
      if (activeTab === "messages") {
        fetchMessages();
      } else if (activeTab === "alerts") {
        fetchAlerts();
      }
    }
  }, [isAlertOpen, activeTab]);

  useEffect(() => {
    checkUnreadStatus();
  }, [messages, alerts]);

  const fetchInitialData = async () => {
    await Promise.all([fetchMessages(), fetchAlerts()]);
    checkUnreadStatus();
  };

  const fetchMessages = async () => {
    const response = await Note.NoteList({ memberNo });
    if (Array.isArray(response)) {
      updateMessages(response);
    } else if (response && Array.isArray(response.data)) {
      updateMessages(response.data);
    } else {
      setMessages([]);
    }
  };

  const fetchAlerts = async () => {
    const result = await Alert.AlertList(memberNo);
    if (Array.isArray(result.data)) {
      updateAlerts(result.data);
    } else {
      setAlerts([]);
    }
  };

  const updateMessages = (fetchedMessages) => {
    setMessages((prevMessages) =>
      fetchedMessages.map((message) => {
        const existingMessage = prevMessages.find(
          (m) => memberNo === messages.memberTargetNo
        );
        if (existingMessage) {
          return {
            ...message,
            statusCode: existingMessage.statusCode,
          };
        }
        return message;
      })
    );
  };

  const updateAlerts = (fetchedAlerts) => {
    setAlerts((prevAlerts) =>
      fetchedAlerts.map((alert) => {
        const existingAlert = prevAlerts.find(
          (n) => n.alertNo === alert.alertNo
        );
        if (existingAlert) {
          return {
            ...alert,
            statusCode: existingAlert.statusCode,
          };
        }
        return alert;
      })
    );
  };

  const handleReadMessage = async (noteNo) => {
    await Note.UpdateReadTimeNote(noteNo);
    setMessages((prevMessages) =>
      prevMessages.map((message) =>
        message.noteNo === noteNo
          ? { ...message, statusCode: "S010302" }
          : message
      )
    );
  };

  const handleReadAlert = async (alertNo) => {
    await Alert.AlertRead(alertNo);
    setAlerts((prevAlerts) =>
      prevAlerts.map((alert) =>
        alert.alertNo === alertNo ? { ...alert, statusCode: "S010402" } : alert
      )
    );
  };

  const handleDeleteMessage = async (noteNo) => {
    await Note.UpdateDeleteNote(noteNo);
    setMessages((prevMessages) =>
      prevMessages.map((message) =>
        message.noteNo === noteNo
          ? { ...message, statusCode: "S010303" }
          : message
      )
    );
  };

  const handleDeleteAlert = async (alertNo) => {
    await Alert.AlertDelete(alertNo);
    setAlerts((prevAlerts) =>
      prevAlerts.map((alert) =>
        alert.alertNo === alertNo ? { ...alert, statusCode: "S010403" } : alert
      )
    );
  };

  const handleReplyMessage = async (message) => {
    const { value: noteBody } = await MySwal.fire({
      title: `${message.memberId}에게 답장`,
      input: "textarea",
      inputLabel: "내용을 입력하세요",
      inputPlaceholder: "내용을 입력하세요...",
      inputAttributes: {
        "aria-label": "내용을 입력하세요",
      },
      showCancelButton: true,
      confirmButtonText: "보내기",
      cancelButtonText: "취소",
    });

    if (noteBody) {
      const data = {
        memberNo,
        memberTargetNo: message.memberNo,
        noteBody,
      };

      try {
        await Note.InsertNote(data);
        MySwal.fire("성공", "쪽지가 성공적으로 보내졌습니다.", "success");
      } catch (error) {
        MySwal.fire("실패", "쪽지 보내기 중 오류가 발생했습니다.", "error");
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleAlert = () => {
    setIsAlertOpen(!isAlertOpen);
  };

  const checkUnreadStatus = () => {
    const hasUnreadMessages = messages.some(
      (message) => message.statusCode === "S010301"
    );
    const hasUnreadAlerts = alerts.some(
      (alert) => alert.statusCode === "S010401"
    );
    setHasUnread(hasUnreadMessages || hasUnreadAlerts);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      return date.toLocaleString();
    }
    return dateString;
  };

  return (
    <div className="z-50">
      <div className="fixed bottom-10 right-10 flex flex-col gap-2 z-50">
        <button
          type="button"
          onClick={scrollToTop}
          className="relative w-12 h-12 rounded-full bg-blue-400 flex justify-center items-center"
        >
          <ArrowUpCircleIcon className="text-white w-8 h-8" />
        </button>
        <button
          type="button"
          onClick={toggleAlert}
          className="relative w-12 h-12 rounded-full flex justify-center items-center bg-black"
        >
          <BellAlertIcon className="text-white w-8 h-8" />
          {hasUnread && (
            <span className="absolute top-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-red-500"></span>
          )}
        </button>
      </div>

      <div
        className={`fixed right-0 bottom-0 h-[30em] border-gray-300 border-t border-l w-[30em] bg-white shadow-lg p-4 transform transition-transform duration-300 ease-in-out ${
          isAlertOpen ? "translate-x-0" : "translate-x-full"
        } z-50`}
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
              activeTab === "alerts"
                ? "border-b-2 border-blue-400 font-bold"
                : ""
            }`}
            onClick={() => setActiveTab("alerts")}
          >
            모임 알림
          </button>
        </div>
        <div className="p-4">
          {activeTab === "messages" ? (
            <ul>
              {messages.length === 0 ? (
                <li className="text-center text-gray-500">
                  받은 쪽지가 없습니다.
                </li>
              ) : (
                messages
                  .filter((message) => message.statusCode !== "S010303")
                  .map((message) => (
                    <li
                      key={message.noteNo}
                      className="mb-2 flex justify-between"
                    >
                      <button
                        className={`w-full text-left p-2 rounded-md hover:bg-gray-100 ${
                          message.statusCode === "S010302"
                            ? "text-gray-400"
                            : ""
                        }`}
                        onClick={() => handleReadMessage(message.noteNo)}
                      >
                        <div className="font-medium">{message.memberId}</div>
                        <div className="text-sm text-gray-500">
                          {message.noteBody}
                        </div>
                      </button>
                      <button
                        className="text-blue-500 ml-2"
                        onClick={() => handleReplyMessage(message)}
                      >
                        <PencilSquareIcon className="h-5 w-5" />
                      </button>
                      <button
                        className="text-red-500 ml-2"
                        onClick={() => handleDeleteMessage(message.noteNo)}
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </li>
                  ))
              )}
            </ul>
          ) : (
            <ul>
              {alerts.length === 0 ? (
                <li className="text-center text-gray-500">
                  받은 알림이 없습니다.
                </li>
              ) : (
                alerts
                  .filter((alert) => alert.statusCode !== "S010403")
                  .map((alert) => (
                    <li
                      key={alert.alertNo}
                      className="mb-2 flex justify-between"
                    >
                      <button
                        className={`w-full text-left p-2 rounded-md hover:bg-gray-100 ${
                          alert.statusCode === "S010402" ? "text-gray-400" : ""
                        }`}
                        onClick={() => handleReadAlert(alert.alertNo)}
                      >
                        <div className="font-medium">{alert.alertDetail}</div>
                        <div className="text-sm text-gray-500">
                          {formatDate(alert.alertUpTime)}
                        </div>
                      </button>
                      <button
                        className="text-red-500 ml-2"
                        onClick={() => handleDeleteAlert(alert.alertNo)}
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </li>
                  ))
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

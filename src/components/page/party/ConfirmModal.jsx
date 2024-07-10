import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useState, useEffect } from "react";

const MySwal = withReactContent(Swal);

export default function ConfirmModal({
  isConfirmModalOpen,
  onClose,
  onConfirm,
  partyNo,
}) {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (isConfirmModalOpen) {
      MySwal.fire({
        title: (
          <div>
            <div className="text-ms font-semi-bold mb-1 pt-5 text-center">
              모집 완료 상태로 변경 후 파티를 해제하실 경우
            </div>
            <div className="text-lg text-red-500 font-bold text-center pb-2">
              추후 이용에 불이익이 발생할 수 있습니다.
            </div>
            <div className="flex items-center justify-center mb-4">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                className="mr-2"
              />
              <label>동의합니다</label>
            </div>
          </div>
        ),
        showCancelButton: true,
        confirmButtonText: "확인",
        cancelButtonText: "취소",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        preConfirm: () => {
          if (!isChecked) {
            MySwal.showValidationMessage("동의하셔야 합니다.");
            return false;
          }
          onConfirm(partyNo);
          return true;
        },
        didClose: () => {
          onClose();
        },
      });
    }
  }, [isConfirmModalOpen, isChecked]);

  return null;
}

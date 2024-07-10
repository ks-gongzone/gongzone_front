import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Party } from "../../../utils/repository";

const MySwal = withReactContent(Swal);

export default function RequestModal({
  isOpen,
  onClose,
  memberNo,
  partyNo,
  remainAmount,
}) {
  const [requestAmount, setRequestAmount] = useState(1);

  useEffect(() => {
    if (isOpen) {
      const handleInputChange = (event) => {
        let value = event.target.value;
        if (value === "") {
          setRequestAmount("");
        } else {
          value = Math.max(1, Math.min(remainAmount, Number(value)));
          setRequestAmount(value);
        }
      };

      MySwal.fire({
        title: "구매하실 수량을 입력해주세요",
        html: `
          <input
            type="number"
            id="requestAmount"
            class="swal2-input"
            placeholder="신청 수량"
            value="${requestAmount}"
            min="1"
            max="${remainAmount}"
          />
        `,
        showCancelButton: true,
        confirmButtonText: "신청",
        cancelButtonText: "취소",
        preConfirm: () => {
          const value = parseInt(
            document.getElementById("requestAmount").value,
            10
          );
          if (value < 1 || value > remainAmount || isNaN(value)) {
            Swal.showValidationMessage(
              `수량은 최대수량인 ${remainAmount} 보다 적어야 합니다.`
            );
            return false;
          }
          return value;
        },
        didOpen: () => {
          const input = Swal.getPopup().querySelector("#requestAmount");
          input.addEventListener("input", handleInputChange);
        },
        didClose: onClose,
      }).then((result) => {
        if (result.isConfirmed) {
          handleSubmit(result.value);
        }
      });
    }
  }, [isOpen, remainAmount]);

  const handleSubmit = async (amount) => {
    try {
      await Party.RequestJoin(memberNo, partyNo, "S060201", amount);
      onClose();
    } catch (error) {
      console.error("Request join error:", error);
    }
  };

  return null;
}

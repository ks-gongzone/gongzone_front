import { useEffect, useState } from "react";
import { UpdatePassword } from "../../../utils/repository";
import { GetMemberInfo } from "../../../utils/repository";

/**
 * 개별 토글 스위치 컴포넌트
 * @date: 2024-06-12
 * @last: 2024-06-17
 * @desc: 커스텀 훅 [소문자use 사용해서 구현]
 */
export function useDataSet(initialValue = "") {
  const [value, setValue] = useState(initialValue);
  const memberInput = (newValue) => {
    setValue(newValue);
  };
  return { value, memberInput };
}

/**
 * 비밀번호 일치 유효성 검증 컴포넌트
 * @date: 2024-06-12
 * @last: 2024-07-18
 * @desc: 비밀번호 수정 시 8~16자 제한 특수 문자 포함 비밀번호
 * @마지막수정내용: id, pw가 없는 유저에 대한 유효성 검증 추가
 */
export default function ChangePassword({ memberNo }) {
  const { value: password, memberInput: changeInputPassword } = useDataSet("");
  const { value: confirmPassword, memberInput: changeConfirmPassword } =
    useDataSet("");
  // 소셜 로그인 사용자 비밀번호 수정 여부
  const [isSocialLogin, setIsSocialLogin] = useState(true);
  const [memberInfo, setMemberInfo] = useState(null);

  // 수정 가능 여부
  const [validationMessage, setValidationMessage] = useState("");

  useEffect(() => {
    GetMemberInfo(memberNo)
      .then((member) => {
        setMemberInfo(member);
        if (!member.memberId || !member.memberPw) {
          setIsSocialLogin(false);
          console.log("소셜로그인 사용자는 비밀번호 수정 불가");
        }
      })
      .catch((error) => {
        console.error("에러 발생: ", error);
        alert("정보를 가져오는데 실패했습니다.");
      });
  }, [memberNo]);

  const isMatched = password && confirmPassword && password === confirmPassword;
  const matchMessage = password && confirmPassword;

  // 비밀번호 유효성 검사 (숫자, 특수 문자 포함 8~16글자)
  const isAblePassword = (password) => {
    const filtering =  /^(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
    return filtering.test(password);
  }

  const handleChangePassword = () => {
    if (!isMatched) {
      setValidationMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    if(!isAblePassword(password)) {
      setValidationMessage("비밀번호는 8자 이상 16자 이하의 숫자와 특수 문자를 포함해야 합니다.");
      return;
    }

    const payload = { newPassword: password };
    UpdatePassword(memberNo, payload)
      .then((response) => {
        console.log(response);
        setValidationMessage("비밀번호 성공적으로 변경되었습니다.");
      })
      .catch((error) => {
        console.error("비밀번호 변경 에러입니다.", error);
        setValidationMessage("기존 비밀번호와 일치합니다.");
      });
  };

  return (
    <div>
      <div className="mb-6">
        <div className="text-blue-500 font-bold text-lg mb-2">
          비밀번호 수정
        </div>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            changeInputPassword(e.target.value);
            setValidationMessage("");
          }}
          className="w-full p-2 border border-gray-300 rounded mt-2"
          placeholder="비밀번호를 입력해 주세요."
          disabled={!isSocialLogin}
        />
        {!isAblePassword(password) && password.length > 0 && (
          <div className="text-red-500 text-sm mt-1">
            비밀번호는 8자 이상 16자 이하의 숫자와 특수 문자를 포함해야 합니다.
          </div>
        )}
      </div>
      <div className="mb-6">
        <div className="text-blue-500 font-bold text-lg mb-2">
          비밀번호 수정 확인
        </div>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => changeConfirmPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mt-2"
          placeholder="비밀번호를 다시 입력해 주세요."
          disabled={!isSocialLogin}
        />
        {matchMessage && (
          <div className={`mt-2 text-lg font-bold ${isMatched ? "text-blue-500" : "text-red-500"}`}>
            {isMatched ? "비밀번호가 일치합니다." : "비밀번호가 불일치합니다."}
          </div>
        )}
      </div>
      {validationMessage && (
        <div className="text-red-500 text-sm mt-1">
          {validationMessage}
        </div>
      )}
      <div className="flex justify-end">
        <button
          onClick={handleChangePassword}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4 mb-4"
          disabled={!isSocialLogin}
        >
          비밀번호 변경
        </button>
      </div>
    </div>
  );
}
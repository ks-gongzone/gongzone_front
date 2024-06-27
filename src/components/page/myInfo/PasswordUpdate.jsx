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
 * @last: 2024-06-21
 * @desc: 현재 비밀번호와 수정 비밀번호가 같은지, 수정 비밀번호 확인시 동일한지 검증
 * @마지막수정내용: id, pw가 없는 유저에 대한 유효성 검증 추가
 */
export default function ChangePassword({ memberNo }) {
  const { value: password, memberInput: changeInputPassword } = useDataSet("");
  const { value: confirmPassword, memberInput: changeConfirmPassword } =
    useDataSet("");
  // 소셜 로그인 사용자 비밀번호 수정 여부
  const [isSocialLogin, setIsSocialLogin] = useState(true);
  // 세션이 없는 값은 0, 세션이 있는 값은 1
  const [sessionStatus, setSessionStatus] = useState("0");
  const [memberInfo, setMemberInfo] = useState(null);

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

  const handleChangePassword = () => {
    if (!isMatched) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const payload = { newPassword: password };
    UpdatePassword(memberNo, payload)
      .then((response) => {
        alert(response);
      })
      .catch((error) => {
        console.error("비밀번호 변경 에러입니다.", error);
        alert("해당 유저가 존재하지 않습니다.");
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
          onChange={(e) => changeInputPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mt-2"
          placeholder="비밀번호를 입력해 주세요."
          disabled={!isSocialLogin}
        />
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
      </div>
      {matchMessage && (
        <div
          className={`mt-2 text-lg font-bold ${
            isMatched ? "text-blue-500" : "text-red-500"
          }`}
        >
          {isMatched ? "비밀번호가 일치합니다." : "비밀번호가 불일치합니다."}
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

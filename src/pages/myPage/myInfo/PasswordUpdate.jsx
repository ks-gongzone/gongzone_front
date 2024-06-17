import { useState } from "react";

/**
 * 개별 토글 스위치 컴포넌트
 * @date: 2024-06-12
 * @last: 2024-06-17
 * @desc: 커스텀 훅 [소문자use 사용해서 구현]
 */
export function useDataSet() {
  const [value, setValue] = useState("");
  const memberInput = (newValue) => {
    setValue(newValue);
  };
  return { value, memberInput };
}

export default function Password() {
  const { value: password, memberInput: changeInputPassword } = useDataSet();
  const { value: confirmPassword, memberInput: changeConfirmPassword } =
    useDataSet();
  const isMatched = password && confirmPassword && password === confirmPassword;
  const matchMessage = password && confirmPassword;

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
        />
      </div>
      {matchMessage && (
        <div
          className={`mt-2 text-lg font-bold ${
            isMatched ? "text-green-500" : "text-red-500"
          }`}
        >
          {isMatched ? "비밀번호가 일치합니다." : "비밀번호가 불일치합니다."}
        </div>
      )}
    </div>
  );
}

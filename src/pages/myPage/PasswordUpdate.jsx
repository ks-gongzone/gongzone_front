import { useState } from "react";

// 사용자 입력값 관리하는 커스텀 훅 [소문자use 사용해서 구현]
export function useDataSet() {
  // useState 훅 사용 후 value라는 상태 변수 정의 초기값은 빈 문자열
  const [value, setValue] = useState("");

  // 입력값이 변경될 때 호출되는 함수
  const memberInput = (e) => {
    setValue(e.target.value);
  };
  // 상태 변수와 입력 처리 함수를 반환
  return { value, memberInput };
}

export default function Password() {
  // 패스워드 입력 값
  const { value: password, memberInput: changeInputPassword } = useDataSet();
  // 패스워드 입력 값 확인
  const { value: confirmPassword, memberInput: changeConfirmPassword } =
    useDataSet();
  // 패스워드와 확인 값 일치 여부 확인 조건
  const isMatched = password && confirmPassword && password === confirmPassword;
  // 패스워드와 확인 값이 모두 입되었는지 여부 확인
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
          onChange={changeInputPassword}
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
          onChange={changeConfirmPassword}
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
          {matchMessage ? "비밀번호가 일치합니다." : "비밀번호가 불일치합니다."}
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';
import { Auth } from "../../utils/repository";

export default function Register() {
  const [memberId, setMemberId] = useState('');
  const [memberPw, setMemberPw] = useState('');
  const [memberName, setMemberName] = useState('');
  const [memberEmail, setMemberEmail] = useState('');
  const [memberPhone, setMemberPhone] = useState('');
  const [memberGender, setMemberGender] = useState('');
  const [memberAddress, setMemberAddress] = useState('');
  const [memberBirthday, setMemberBirthday] = useState('');
  const [memberNick, setMemberNick] = useState('');

  const statusRegister = async (e) => {
    e.preventDefault();
    const memberInfo = {
      memberId,
      memberPw,
      memberName,
      memberEmail,
      memberPhone,
      memberGender,
      memberAddress,
      memberBirthday,
      memberNick
    };
    console.log(memberInfo);
    try {
      const response = await Auth.Register(memberInfo);
        console.log('Response:', response);
      } catch (error) {
      console.error('Error:', error);
      }
    };

    return (
      <div>
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center">회원가입</h2>
          <form onSubmit={statusRegister} className="space-y-4">
            <div>
              <label htmlFor="memberId" className="block text-sm font-medium text-gray-700">아이디</label>
              <input
                type="text"
                id="memberId"
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="memberPw" className="block text-sm font-medium text-gray-700">비밀번호</label>
              <input
                type="password"
                id="memberPw"
                value={memberPw}
                onChange={(e) => setMemberPw(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="memberName" className="block text-sm font-medium text-gray-700">이름</label>
              <input
                type="text"
                id="memberName"
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="memberEmail" className="block text-sm font-medium text-gray-700">이메일</label>
              <input
                type="email"
                id="memberEmail"
                value={memberEmail}
                onChange={(e) => setMemberEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="memberPhone" className="block text-sm font-medium text-gray-700">전화번호</label>
              <input
                type="tel"
                id="memberPhone"
                value={memberPhone}
                onChange={(e) => setMemberPhone(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="memberGender" className="block text-sm font-medium text-gray-700">성별</label>
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="M"
                    checked={memberGender === 'M'}
                    onChange={(e) => setMemberGender(e.target.value)}
                    className="form-radio text-blue-600"
                    required
                  />
                  <span className="ml-2">남자</span>
                </label>
                <label className="inline-flex items-center ml-6">
                  <input
                    type="radio"
                    name="gender"
                    value="F"
                    checked={memberGender === 'F'}
                    onChange={(e) => setMemberGender(e.target.value)}
                    className="form-radio text-blue-600"
                    required
                  />
                  <span className="ml-2">여자</span>
                </label>
              </div>
            </div>
            <div>
              <label htmlFor="memberAddress" className="block text-sm font-medium text-gray-700">주소</label>
              <input
                type="text"
                id="memberAddress"
                value={memberAddress}
                onChange={(e) => setMemberAddress(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="memberBirthday" className="block text-sm font-medium text-gray-700">생년월일</label>
              <input
                type="date"
                id="memberBirthday"
                value={memberBirthday}
                onChange={(e) => setMemberBirthday(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="memberNick" className="block text-sm font-medium text-gray-700">별명</label>
              <input
                type="text"
                id="memberNick"
                value={memberNick}
                onChange={(e) => setMemberNick(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">회원가입</button>
          </form>
        </div>
      </div>
    )
}
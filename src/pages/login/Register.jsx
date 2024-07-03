import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MemberAPI } from "../../utils/repository";

export default function Register() {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const isSocialLogin = queryParams.has('email') && queryParams.has('name');

  const [formValues, setFormValues] = useState({
    memberId: isSocialLogin ? generateRandomId() : '',
    memberPw: '',
    memberName: isSocialLogin ? queryParams.get('name') : '',
    memberEmail: isSocialLogin ? queryParams.get('email') : '',
    memberPhone: '',
    memberGender: '',
    memberAddress: '',
    memberBirthday: '',
    memberNick: ''
  });

  const [errors, setErrors] = useState({
    memberId: '',
    memberPw: '',
    memberName: '',
    memberEmail: '',
    memberPhone: '',
    memberAddress: '',
    memberBirthday: '',
    memberNick: ''
  });

  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  function generateRandomId() {
    return Math.random().toString(18).substr(2, 9);
  }

  const checkField = async (name, value) => {
    let errorMsg;
    console.log(`검증 중: ${name} = ${value}`);

    if (name === 'memberEmail') {
      errorMsg = checkMemberEmail(value);
      if (!errorMsg) {
        errorMsg = await checkMemberEmailApi(value);
      }
    } else if (name === 'memberPw') {
      errorMsg = checkMemberPw(value);
    } else if (name === 'memberName') {
      errorMsg = checkMemberName(value);
    } else if (name === 'memberPhone') {
      errorMsg = checkPhoneNumber(value);
    } else if (name === 'memberGender') {
      errorMsg = checkMemberGender(value);
    } if (name === 'memberId') {
      errorMsg = checkMemberId(value);
      if (!errorMsg) {
        errorMsg = await checkMemberIdApi(value);
      }
    }

    console.log(`검증 결과: ${name} = ${errorMsg}`);

    setErrors(prevErrors => ({ ...prevErrors, [name]: errorMsg }));
    return errorMsg;
  };

  const onBlur = async (e) => {
    const { name, value } = e.target;
    console.log(`검증 중: ${name} = ${value}`);
    await checkField(name, value);
    console.log(`검증 결과: ${name} = ${errors[name]}`);
  };

  const handleCheck = (e) => {
    const { name, value } = e.target;
    setFormValues(prevValues => ({ ...prevValues, [name]: value }));
  };

  const handleCheckGender = (e) => {
    const { name, value } = e.target;
    setFormValues(prevValues => ({ ...prevValues, [name]: value }));
  };

  const statusRegister = async (e) => {
    e.preventDefault();
    console.log("statusRegister 실행")
    setMessage('');

    const requiredFields = isSocialLogin ? ['memberPhone', 'memberGender'] : ['memberId', 'memberPw', 'memberName', 'memberPhone'];
    console.log("필수 입력 필드:", requiredFields);
    console.log("폼 값:", formValues);

    const validationPromises = requiredFields.map(name => checkField(name, formValues[name]));
    await Promise.all(validationPromises);
    const requestMember = requiredFields.every(name => errors[name] === '');
    console.log("검증 결과:", requestMember);

    if (requestMember) {
      try {
        const response = await MemberAPI.Register(formValues);
        console.log("회원가입 응답:", response);
        console.log("회원가입 응답:", response.data.success);
        if (response.data.success) {
          setMessage('회원가입에 성공했습니다.');
          setIsModalOpen(true);
        } else {
          setMessage('회원가입 실패: 입력하신 정보를 다시 확인해 주세요.');
        }
      } catch (error) {
        setMessage('회원가입 실패: 서버 오류가 발생했습니다 다시 시도해 주세요.');
      }
    } else {
      setMessage('입력한 정보를 확인해주시고 다시 눌러주세요.');
    }
  };

  // 검증 함수들
  const checkMemberId = (memberId) => {
    const pattern = /^[a-zA-Z0-9]{6,20}$/;
    if (!pattern.test(memberId)) {
      return '아이디는 영어, 숫자만 포함해야 하며, 6자 이상 20자 이하여야 합니다.';
    }
    return '';
  };

  const checkMemberIdApi = async (memberId) => {
    const checkMemberId = await MemberAPI.CheckId({memberId});
    if (!checkMemberId) {
      return '사용할 수 없는 아이디입니다. 다른 아이디를 입력해 주세요.';
    }
    return '';
  };

  const checkMemberPw = (memberPw) => {
    const pwPattern = /^[a-zA-Z0-9!@#$%^&*()_+=-]{8,16}$/;
    if (!pwPattern.test(memberPw)) {
      return '8~16자의 영문 대/소문자,숫자,특수문자를 사용해 주세요';
    }
    return '';
  };

  const checkMemberName = (memberName) => {
    const pwPattern = /^[가-힣]{2,}$/;
    if (!pwPattern.test(memberName)) {
      return '한글을 사용해 주세요.';
    }
    return '';
  };

  const checkMemberEmail = (memberEmail) => {
    const pattern = /^[a-zA-Z0-9._%+-]{6,20}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!pattern.test(memberEmail)) {
      return '이메일 형식이 올바르지 않습니다. 예: example@domain.com';
    }
    return '';
  };

  const checkMemberEmailApi = async (memberEmail) => {
    const checkMemberEmail = await MemberAPI.CheckEmail({memberEmail});
    if (!checkMemberEmail) {
      return '사용할 수 없는 이메일입니다. 다른 이메일을 입력해 주세요.';
    }
    return '';
  };

  const checkMemberGender = (memberGender) => {
    if (memberGender !== 'M' && memberGender !== 'F') {
      return '성별을 선택해 주세요.';
    }
    return '';
  };

  const checkPhoneNumber = (memberPhone) => {
    const phonePattern = /^\d{3}-\d{3,4}-\d{4}$/;
    if (!phonePattern.test(memberPhone)) {
      return '전화번호 형식이 올바르지 않습니다.';
    }
    return '';
  };

  const formatPhoneNumber = (phoneNumber) => {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    let formatted = cleaned;

    if (cleaned.length > 3 && cleaned.length <= 6) {
      formatted = cleaned.replace(/(\d{4})(\d+)/, '$1-$2');
    } else if (cleaned.length > 6) {
      formatted = cleaned.replace(/(\d{3})(\d{4})(\d+)/, '$1-$2-$3');
    }
    return formatted;
  };

  const handlePhoneChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = formatPhoneNumber(value);
    setFormValues(prevValues => ({ ...prevValues, [name]: formattedValue }));
    const error = checkPhoneNumber(formattedValue);
    setErrors(prevErrors => ({ ...prevErrors, memberPhone: error }));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate('/');
  };

  return (
    <div>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">회원가입</h2>
        <form onSubmit={statusRegister} className="space-y-4">
          {!isSocialLogin && (
            <>
              <div>
                <label htmlFor="memberId" className="block text-sm font-medium text-gray-700">아이디</label>
                <input
                  type="text"
                  id="memberId"
                  name="memberId"
                  value={formValues.memberId}
                  onChange={handleCheck}
                  onBlur={onBlur}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                {errors.memberId && <p style={{ color: 'red' }}>{errors.memberId}</p>}
              </div>
              <div>
                <label htmlFor="memberPw" className="block text-sm font-medium text-gray-700">비밀번호</label>
                <input
                  type="password"
                  id="memberPw"
                  name="memberPw"
                  value={formValues.memberPw}
                  onChange={handleCheck}
                  onBlur={onBlur}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                {errors.memberPw && <p style={{ color: 'red' }}>{errors.memberPw}</p>}
              </div>
            </>
          )}
          <div>
            <label htmlFor="memberName" className="block text-sm font-medium text-gray-700">이름</label>
            <input
              type="text"
              id="memberName"
              name="memberName"
              value={formValues.memberName}
              onChange={handleCheck}
              onBlur={onBlur}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
            {errors.memberName && <p style={{ color: 'red' }}>{errors.memberName}</p>}
          </div>
          <div>
            <label htmlFor="memberEmail" className="block text-sm font-medium text-gray-700">이메일</label>
            <input
              type="email"
              id="memberEmail"
              name="memberEmail"
              value={formValues.memberEmail}
              onChange={handleCheck}
              onBlur={onBlur}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          {errors.memberEmail && <p style={{ color: 'red' }}>{errors.memberEmail}</p>}
          <div>
            <label htmlFor="memberPhone" className="block text-sm font-medium text-gray-700">전화번호</label>
            <input
              type="tel"
              id="memberPhone"
              name="memberPhone"
              value={formValues.memberPhone}
              onChange={handlePhoneChange}
              onBlur={onBlur}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
            {errors.memberPhone && <p style={{ color: 'red' }}>{errors.memberPhone}</p>}
          </div>
          <div>
            <label htmlFor="memberGender" className="block text-sm font-medium text-gray-700">성별</label>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="memberGender"
                  value="M"
                  checked={formValues.memberGender === 'M'}
                  onChange={handleCheckGender}
                  className="form-radio text-blue-600"
                  required
                />
                <span className="ml-2">남자</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  name="memberGender"
                  value="F"
                  checked={formValues.memberGender === 'F'}
                  onChange={handleCheckGender}
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
              name="memberAddress"
              value={formValues.memberAddress}
              onChange={handleCheck}
              onBlur={onBlur}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="memberBirthday" className="block text-sm font-medium text-gray-700">생년월일</label>
            <input
              type="date"
              id="memberBirthday"
              name="memberBirthday"
              value={formValues.memberBirthday}
              onChange={handleCheck}
              onBlur={onBlur}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="memberNick" className="block text-sm font-medium text-gray-700">별명</label>
            <input
              type="text"
              id="memberNick"
              name="memberNick"
              value={formValues.memberNick}
              onChange={handleCheck}
              onBlur={onBlur}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">회원가입</button>
        </form>
        {message && <p>{message}</p>}
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

function Modal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4">회원가입 성공</h2>
        <p className="mb-4">회원가입이 완료되었습니다.</p>
        <button onClick={onClose} className="w-full bg-blue-500 text-white py-2 rounded-lg">확인</button>
      </div>
    </div>
  );
}
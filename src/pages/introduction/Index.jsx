import { useState, useEffect } from "react";
import serviceProcess from "../../assets/images/serviceProcess.png";
import "../../index.css";
import { Link, useNavigate } from "react-router-dom";
import ERD from "../../assets/images/GongzoneERD.png";
import AuthStore from "../../utils/zustand/AuthStore";

export default function Intro() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const sections = document.querySelectorAll(".snap-section");
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(parseInt(entry.target.dataset.index, 10));
        }
      });
    }, observerOptions);

    sections.forEach((section, index) => {
      section.dataset.index = index;
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  const handleMainPage = () => {
    navigate("/home");
  };

  const handleAdminPage = () => {
    navigate("/_admin");
  };

  const handleUserLogin = async () => {
    const loginRequest = { loginId: "user2", loginPw: "password2" };
    const response = await AuthStore.getState().statusLogin(loginRequest);

    if (response && !response.error) {
      navigate("/home");
    }
  };

  const handleAdminLogin = async () => {
    const loginRequest = { loginId: "admin", loginPw: "admin" };
    const response = await AuthStore.getState().statusLogin(loginRequest);

    if (response && !response.error) {
      navigate("/_admin/main");
    }
  };

  return (
    <div className="relative snap-y snap-mandatory h-screen overflow-y-scroll text-white font-GGothicssi40g">
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 flex flex-col items-center gap-2">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className={`w-3 h-3 mr-5 rounded-full ${
              activeSection === index ? "bg-white" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
      <section className="snap-section snap-start bg-[#5cb8ff] min-h-screen flex flex-col items-center justify-center px-4 md:px-8 lg:px-16">
        <div className="font-bold text-[5vw] md:text-[3vw] lg:text-[1.2vw] mt-12">
          1인 가구 공동구매 플랫폼
        </div>
        <Link
          to="/home"
          className="font-bold text-[8vw] md:text-[6vw] lg:text-[4vw]"
        >
          GONGZONE
        </Link>
        <div className="text-[3vw] md:text-[2vw] lg:text-[1vw] font-GGothicssi20g mb-4">
          로고 클릭 시 메인페이지로 이동합니다.
        </div>
        <div className="text-gray-700 h-auto w-full lg:w-[104em] p-6 rounded-md text-left bg-blue-100 bg-opacity-70 mb-4">
          <div className="flex flex-col lg:flex-row gap-12 justify-center">
            <div className="text-ms">
              <div>
                <strong>Language:</strong> Java, JavaScript, TailwindCSS
              </div>
              <div>
                <strong>DB:</strong> MySQL
              </div>
              <div>
                <strong>서버:</strong> Apache - 9.0.1
              </div>
            </div>
            <div className="text-ms">
              <div>
                <strong>WAS:</strong> Tomcat - 9.0.1
              </div>
              <div>
                <strong>협업툴:</strong> GitHub, JIRA, Google 공유드라이브,
                ERDCloud
              </div>
              <div>
                <strong>프레임워크:</strong> React, Spring Boot, MyBatis,
                TailwindCSS
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            {
              name: "고 윤 영",
              intro: `프론트엔드
              - react-dom-route를 활용한 React 폴더트리 및 아키텍처 설계
              - 홈페이지 전반 레이아웃 구성 및 재사용할 수 있는 basic 컴포넌트 작성
              - Axios 및 Zustand를 활용한 Rest API 통신환경 구축
              
              위치 기반 기능
              - 카카오 지도 API를 활용하여 사용자 반경 1km에 있는 파티 조회 기능 구현
              - 게시글 작성 시 주소 입력 및 클릭 이벤트로 해당 위치의 주소를 자동으로 입력하는 기능 구현
              
              파티 관리 기능
              - 게시글 작성에 따른 공동구매 희망자 파티 생성
              - 스프링부트를 활용하여 파티 신청 및 수락, 거절, 강퇴 등 파티 진행 프로세스 기능 구현`,
            },
            {
              name: "오 민 호",
              intro: `JWT토큰 방식을 활용한 로그인 및 회원가입 구현
              - 세션을 사용하지 않고 JWT 토큰을 활용하여 사용자 인증을 처리
              - 토큰 발급 및 클레임 설정
              - 리프레시 토큰 사용
              - 소셜 로그인 통합(소셜 로그인 성공 시, 사용자 정보를 기반으로 JWT 토큰을 발급)
              - 보안강화
              - 로그인 로그
              
              파티기능
              - 파티 정보 조회 및 관련된 정보 조회 기능
              - 파티 수락 거절 강퇴 구현
              
              관리자 기능
              - 회원 탈퇴, 휴면, 제재 관리 기능
              - 문의 내역 관리 기능
              
              알림기능
              - SSE 방식을 활용한 실시간 알림 기능 구현
              - webflux 방식으로 쪽지 기능 구현`,
            },
            { name: "이 희 상", intro: "팀원 이희상의 소개" },
            { name: "전 우 석", intro: "팀원 전우석의 소개" },
            { name: "한 동 환", intro: "팀원 한동환의 소개" },
          ].map((member, index) => (
            <div
              key={index}
              className="bg-blue-100 bg-opacity-70 text-black h-[32em] w-[16em] md:w-[18em] lg:w-[20em] p-4 rounded-md shadow-md flex flex-col items-center"
            >
              <div className="font-bold text-xl mb-2">{member.name}</div>
              <div className="text-[1vw] md:text-[0.8vw] lg:text-[0.7vw] text-gray-600 whitespace-pre-line">
                {member.intro}
              </div>
            </div>
          ))}
        </div>

        <div className="animate-bounce mt-auto mb-4">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </section>
      <section className="snap-section snap-start bg-[#282828] min-h-screen flex flex-col items-center justify-center">
        <div className="animate-bounce mb-auto mt-4 transform">
          <svg
            className="w-6 h-6 rotate-180"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        <div className="font-bold text-[3vw] mb-12">서비스 프로세스</div>
        <div className="rounded-md max-w-screen mx-auto mb-auto flex justify-center flex-col">
          <div className="text-2xl font-bold mb-12 text-center">
            각 단계별 유저 참여 프로세스
          </div>
          <div className="text-2xl whitespace-nowrap">
            <img alt="logo" src={serviceProcess} className="w-[65em]" />
          </div>
        </div>
        <div className="border-t w-[80%] my-8 border-gray-500" />
        <div className="text-2xl mb-8 text-center">
          각 버튼을 통해 서비스 이용이 가능합니다.
        </div>
        <div className="flex flex-row lg:flex-row gap-4 mb-8">
          <button
            type="button"
            className="rounded-md bg-white opacity-80 hover:opacity-100 w-full lg:w-[7em] h-[3em] text-black"
            onClick={handleMainPage}
          >
            메인화면
          </button>
          <button
            type="button"
            className="rounded-md bg-white opacity-80 hover:opacity-100 w-full lg:w-[7em] h-[3em] text-black"
            onClick={handleUserLogin}
          >
            유저로그인
          </button>
          <button
            type="button"
            className="rounded-md bg-white opacity-80 hover:opacity-100 w-full lg:w-[7em] h-[3em] text-black"
            onClick={handleAdminPage}
          >
            관리자페이지
          </button>
          <button
            type="button"
            className="rounded-md bg-white opacity-80 hover:opacity-100 w-full lg:w-[7em] h-[3em] text-black"
            onClick={handleAdminLogin}
          >
            관리자로그인
          </button>
        </div>
        <div className="animate-bounce mt-auto mb-4">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </section>
      <section className="snap-section snap-start bg-[#282828] min-h-screen flex flex-col items-center justify-center">
        <div className="animate-bounce mb-auto mt-4 transform">
          <svg
            className="w-6 h-6 rotate-180"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        <div className="font-bold text-[3vw] mt-auto">ERD</div>
        <div className="text-[1vw] font-GGothicssi20g">
          ERD 이미지 클릭 시 ERD 클라우드로 이동됩니다.
        </div>
        <Link
          to="https://www.erdcloud.com/d/E99deotjvtDYETQFj"
          className="text-2xl whitespace-nowrap"
        >
          <img alt="logo" src={ERD} className="h-[30em] mb-12" />
        </Link>
      </section>
    </div>
  );
}

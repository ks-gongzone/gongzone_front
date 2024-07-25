import { useState, useEffect } from "react";
import serviceProcess from "../../assets/images/serviceProcess.png";
import "../../index.css";
import { Link, useNavigate } from "react-router-dom";
import ERD from "../../assets/images/GongzoneERD.png";
import AuthStore from "../../utils/zustand/AuthStore";
import logo from "../../assets/logo/GONGZONE_logo_white.png";

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
    window.open("/home", "_blank");
  };

  const handleAdminPage = () => {
    window.open("/_admin", "_blank");
  };

  const handleUserLogin = async () => {
    const loginRequest = { loginId: "user2", loginPw: "user2" };
    const response = await AuthStore.getState().statusLogin(loginRequest);

    if (response && !response.error) {
      window.open("/home", "_blank");
    }
  };

  const handleAdminLogin = async () => {
    const loginRequest = { loginId: "admin", loginPw: "admin" };
    const response = await AuthStore.getState().statusLogin(loginRequest);

    if (response && !response.error) {
      window.open("/_admin/main", "_blank");
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
      <section className="snap-section snap-start bg-[#6ea2d4] min-h-screen flex flex-col items-center justify-center px-4 md:px-8 lg:px-16">
        <div className="font-bold text-[5vw] md:text-[3vw] lg:text-[1.2vw] mt-2">
          1인 가구 공동구매 플랫폼
        </div>
        <Link
          to="/home"
          className="font-bold text-[8vw] md:text-[6vw] lg:text-[4vw]"
        >
          <img alt="logo" src={logo} className="w-[5em]" />
        </Link>
        <div className="text-[3vw] md:text-[2vw] lg:text-[1vw] font-GGothicssi20g">
          로고 클릭 시 메인페이지로 이동합니다.
        </div>
        <div className="text-gray-700 h-auto w-full p-6 rounded-md text-left bg-blue-100 bg-opacity-70 mb-5 mt-3 shadow-xl">
          <div className="flex flex-col lg:flex-row gap-12 justify-center">
            <div className="text-ms">
              <div>
                <strong>Language:</strong> Java, JavaScript, HTML, CSS
              </div>
              <div>
                <strong>DB:</strong> MySQL
              </div>
            </div>
            <div className="text-ms">
              <div>
                <strong>서버:</strong> Nginx
              </div>
              <div>
                <strong>WAS:</strong> Tomcat - 10.1
              </div>
            </div>
            <div className="text-ms">
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
        <div className="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {[
            {
              name: "고 윤 영",
              intro: `기획, 설계
              - PM 경험을 활용하여 회의 진행 주도
              - PPT 형태 기획 발표 자료 작성
              프론트엔드
              - react-dom-route를 활용한 React 폴더트리 및 아키텍처 설계
              - 홈페이지 전반 레이아웃 구성 및 재사용할 수 있는 basic 컴포넌트 작성
              - Axios 및 Zustand를 활용한 Rest API 통신환경 구축
              위치 기반 기능
              - 카카오 지도 API를 활용하여 사용자 반경 1km에 있는 파티 조회 기능 구현
              - 게시글 작성 시 주소 입력 및 클릭 이벤트로 해당 위치의 주소를 자동으로 입력하는 기능 구현
              파티 관리 기능
              - 게시글 작성에 따른 공동구매 희망자 파티 생성
              - 스프링부트를 활용하여 파티 신청 및 수락, 거절, 강퇴 등 파티 진행 프로세스 기능 구현
              관리자 페이지 기능
              - 비정상 유저를 파악을 위한 게시글 작성 횟수가 많은 회원 조회 기능 구현
              - 파티 별 현재 프로세스 진행 현황 조회 기능 구현
              - 현재 처리되지 않은 고객 컴플레인 조회 기능 구현
              - 로그인 로그 조회 기능 구현`,
            },
            {
              name: "오 민 호",
              intro: `회원 기능
              JWT토큰 방식을 활용한 로그인 및 회원가입 구현
              - 세션을 사용하지 않고 토큰을 활용하여 사용자 인증을 처리
              - 스프링 시큐리티를 활용하여, 토큰을 소지하지 않은 사용자에 대한 접근을 제한
              - 인증이 필요한 엔드포인트에 대해 시큐리티 설정을 통해 보호
              - 주스탠드를 사용하여 경량화 및 상태 관리
              리프레시 토큰 사용
              - 소셜 로그인 통합 
              - 카카오, 네이버, 구글 소셜 로그인 API를 연동하여, 사용자가 소셜 계정으로 로그인 및 회원가입 할 수 있도록 구현
              - 소셜 로그인 성공 시, 소셜 사용자 정보를 기반으로 토큰을 발급
              로그인 로그
              파티 기능
              - 파티 정보 조회 및 관련된 정보 조회 기능
              - 파티 수락 거절 강퇴 구현
              쪽지 및 알람 기능
              - webflux 방식으로 쪽지 기능 구현
              - SSE 방식을 활용한 실시간 알림 기능 구현
              관리자 기능
              - 회원 탈퇴, 휴면, 제재 관리 기능, 문의 내역 관리 기능
              에러 처리 시스템 구현, ERD 작성`,
            },
            {
              name: "이 희 상",
              intro: `게시글 작성 기능 구현
              - 프로젝트 메인 프로세스의 시작
              - 이미지 미리보기 및 업로드 기능 구현
              - 카카오 지도 API와 DAUM 주소 API를 활용하여 지도 기능 구현
                ㄴ 검색한 지번 주소를 도로명 주소로 자동 변환
                ㄴ 검색한 주소 카카오 지도와 연동하여 지도에 표시
                ㄴ 지도 클릭 시 해당 위치의 주소를 도로명 주소로 표시
              - CKEditor 라이브러리를 활용하여 본문 내용 작성 기능 구현
              - React-Datepicker 라이브러리를 활용하여 달력 클릭 시 날짜 입력 기능 구현
              게시글 관리 기능 구현
              - 조건에 맞는 게시글 검색 기능 구현
              - 게시글 수정 및 삭제 기능 구현
              - 사용자 게시글 찜 기능 구현
              - 게시글 조회 수 기능 구현
              게시글 댓글 기능 구현
              - 사용자 댓글 실시간 반영
              - 댓글 수정 및 삭제 기능 구현
              관리자 기능
              - 게시글 작성 횟수 Top 5 회원 조회 기능 구현
              - 파티 별 진행 현황 조회 기능 구현`,
            },
            {
              name: "전 우 석",
              intro: `포인트 기능
              - PG사 연동 API를 통한 전자 결제/인출 프로세스 구현
              - 결제 프로세스 중 발생할 수 있는 위/변조 위험 검증
              - Spring WebFlux 활용하여 서버 측 비동기 통신 구현
              - 외부 서버 JSON 데이터 파싱 및 클라이언트 제공 로직 개발
              파티 결제 및 정산 기능
              - 포인트 기반 파티 결제 시스템 개발 및 트랜잭션 관리
              - 프로세스 자동화를 통해 사용자 편의성 및 시스템 효율성 확보
              프론트엔드 구현
              - Zustand와 React Context API를 활용한 상태 관리 최적화
              - Custom Hook을 이용한 상태 관리 효율성 확보
              - Router를 이용한 공통 레이아웃 관리 및 렌더링 성능 최적화
              - Tailwind CSS를 이용한 반응형 웹 구현
              아키텍처 설계
              - Spring MVC 아키텍처 구조 설계
              - MyBatis 영속성 계층 설계
              - RESTful 아키텍처를 적용한 API 엔드포인트 설계
              배포 환경 구축
              - Jenkins 활용하여 CI/CD 파이프라인 구축
              - Linux(CentOS) 기반 지속적 통합/배포 환경 구성
              - SSL 인증서 발급 및 HTTPS 프로토콜 적용`,
            },
            {
              name: "한 동 환",
              intro: `전체 회원 프로필 카드 구현
              - 회원별 상태 구분기능 구현(인기유저, 공존의난동꾼, 일반유저)
              - 회원리스트 페이지네이션 처리(이전 페이지 다음페이지 버튼 클릭하여 이동)
              - 회원 이름 검색 후 조건에 맞는 데이터 노출 기능
              마이페이지에서 특정 회원 정보 수정 및 탈퇴
              - 프로필 사진 등록시 React-easy-crop 라이브러리를 이용한 사진 편집 후 파일파싱
              (blob으로 반환 된 데이터 확장자 및 파일 이름 파싱 로직 구현)
              - React-csv 라이브러리를 이용한 국토교통부 법정동 주소명 csv 파일 로드 후 db에 맞게 데이터 가공처리 (read, update)
              - 알람 수신 동의 데이터 변경 시 변경 날짜 로그 기록
              공지사항 타입별 작성 기능 (FAQ, 공지, 프로모션)
              - CKEditor라이브를 이용한 본문 작성 기능 구현
              - 전체 공지사항 타입별 노출 및 10개의 데이터씩 페이지네이션 처리(1~n 번 페이지 클릭 시 해당 페이지 이동)
              - 공지사항 클릭시 조회수 증가 counting 및 최 상단으로 이동`,
            },
          ].map((member, index) => (
            <div
              key={index}
              className="bg-blue-100 bg-opacity-70 text-black p-4 rounded-md shadow-md flex flex-col items-center shadow-xl"
            >
              <div className="font-bold text-[18px] mb-2">{member.name}</div>
              <div className="text-[13px] text-gray-600 whitespace-pre-line">
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
      <section className="snap-section snap-start bg-[#6ea2d4] min-h-screen flex flex-col items-center justify-center">
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
            <img alt="process" src={serviceProcess} className="w-[65em]" />
          </div>
        </div>
        <div className="border-t border-white w-[80%] my-8 border-gray-500" />
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

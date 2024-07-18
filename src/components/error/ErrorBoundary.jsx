import React from 'react';
import {useNavigate} from "react-router-dom";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }

    return this.props.children;
  }
}

function ErrorFallback() {
  const navigate = useNavigate();

  const handleNavigateAndReload = () => {
    navigate('/home');
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <div>
      <h1>에러 페이지</h1>
      <p>버튼을 누르시면 돌아갑니다</p>
      <button className="w-50 bg-[#f97173] text-white py-2 rounded-lg flex items-center justify-center" onClick={handleNavigateAndReload}>돌아가기</button>
    </div>
  );
}

export default ErrorBoundary;


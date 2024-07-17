function ErrorPage() {
  return (
    <div>
      <h1>페이지를 찾을 수 없습니다</h1>
      <p>죄송합니다. 찾고 있는 페이지가 존재하지 않습니다.</p>
      <button className="w-50 bg-[#f97173] text-white py-2 rounded-lg flex items-center justify-center" onClick={() => window.history.back()}>돌아가기</button>
    </div>
  );
}

export default ErrorPage;

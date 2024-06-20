import { useEffect } from "react";
import { Auth } from "../../utils/repository";
import { useLocation ,useNavigate } from "react-router-dom";

export default function NaverLogin({ provider }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(location.search);
    const code = urlSearchParams.get('code');
    const state = urlSearchParams.get('state');

    if (code && state) {
      Auth[provider](code, state)
        .then(response => {
          if (response.data.isNewMember) {
            navigate('/signup', { socialMember: response.data.socialMember });
          } else {
            const { token } = response.data;
            window.localStorage.setItem('accessToken', token);
            navigate('/');
          }
        })
        .catch(error => {
          console.error(`${provider} 로그인 실패:`, error);
        });
    }
  }, [location, provider, navigate]);

  return (
    <div>
      {provider} 로그인 처리 중...
    </div>
  );

}
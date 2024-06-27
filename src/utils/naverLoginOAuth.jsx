/*

export const loadNaverScript = () => {
  return new Promise((resolve, reject) => {
    if (document.getElementById('naver-sdk')) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.id = 'naver-sdk';
    script.src = 'https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js';
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};
*/
export const naverClientId = 'YOUR_NAVER_CLIENT_ID';
export const naverRedirectURL = 'YOUR_NAVER_REDIRECT_URL';
export const naverSecret = 'YOUR_NAVER_SECRET';
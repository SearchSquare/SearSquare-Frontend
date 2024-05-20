import { localAxios } from '@/util/http-common.js';

const local = localAxios();

function loginWithNaverApi(naverToken, success, fail) {
  local
    .post(`/members/oauth/naver`, {
      accessToken: naverToken,
    })
    .then(success)
    .catch(fail);
}

export { loginWithNaverApi };

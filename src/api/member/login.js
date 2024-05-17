import { localAxios } from '@/util/http-common.js';

const local = localAxios();

function oauthNaver(accessToken) {
  const response = local.post(`/members/oauth/naver`, {
    accessToken: accessToken,
  });
  return response;
}

export { oauthNaver };

import { localAxios } from '@/util/http-common.js';

const local = localAxios();

function getSido() {
  const response = local.get(`/house/address/sido`);
  return response;
}

export { getSido };

import { localAxios } from '@/util/http-common.js';

const local = localAxios();

function getSido() {
  const response = local.get(`/house/address/sido`);
  return response;
}

function getGugun(dongCode) {
  const response = local.get(`/house/address/gugun`, {
    params: { 'dong-code': dongCode },
  });
  return response;
}

function getDong(dongCode) {
  const response = local.get(`/house/address/dong`, {
    params: { 'dong-code': dongCode },
  });
  return response;
}

export { getSido, getGugun, getDong };

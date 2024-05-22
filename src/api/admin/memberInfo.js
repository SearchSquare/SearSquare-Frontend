import { localAxios } from '@/util/http-common.js';

const local = localAxios();

function getMemberCount() {
  const response = local.get(`/admin/rate/members`);
  return response;
}

function getMemberGender() {
  const response = local.get(`/admin/rate/gender`);
  return response;
}

function getMemberAge() {
  const response = local.get(`/admin/rate/age`);
  return response;
}

export { getMemberCount, getMemberGender, getMemberAge };

import { localAxios } from '@/util/http-common.js';

const local = localAxios();

async function getMemberCount() {
  try {
    local.defaults.headers['authorization'] = sessionStorage.getItem('accessToken');
    const response = await local.get(`/admin/rate/members`);
    return response;
  } catch (error) {
    console.error(error);
  }
}

async function getMemberGender() {
  try {
    local.defaults.headers['authorization'] = sessionStorage.getItem('accessToken');
    const response = await local.get(`/admin/rate/gender`);
    return response;
  } catch (error) {
    console.error(error);
  }
}

async function getMemberAge() {
  try {
    local.defaults.headers['authorization'] = sessionStorage.getItem('accessToken');
    const response = await local.get(`/admin/rate/age`);
    return response;
  } catch (error) {
    console.error(error);
  }
}

export { getMemberCount, getMemberGender, getMemberAge };

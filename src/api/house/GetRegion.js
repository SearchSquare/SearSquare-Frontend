import { localAxios } from '@/util/http-common.js';

const local = localAxios();

async function getSido() {
  console.log('token = ', sessionStorage.getItem('accessToken'));
  try {
    local.defaults.headers['authorization'] = sessionStorage.getItem('accessToken');
    const response = await local.get(`/house/address/sido`);
    return response;
  } catch (error) {
    console.error(error);
  }
}

async function getGugun(dongCode) {
  try {
    local.defaults.headers['authorization'] = sessionStorage.getItem('accessToken');
    const response = await local.get(`/house/address/gugun`, {
      params: { 'dong-code': dongCode },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}

async function getDong(dongCode) {
  try {
    local.defaults.headers['authorization'] = sessionStorage.getItem('accessToken');
    const response = await local.get(`/house/address/dong`, {
      params: { 'dong-code': dongCode },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}

async function getFirstAptInfo(dongCode) {
  try {
    local.defaults.headers['authorization'] = sessionStorage.getItem('accessToken');
    const response = await local.get(`/house/`, {
      params: { 'dong-code': dongCode, size: 10 },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}

async function getReloadAptInfo(dongCode, lastAptId) {
  try {
    local.defaults.headers['authorization'] = sessionStorage.getItem('accessToken');
    const response = await local.get(`/house/`, {
      params: { 'dong-code': dongCode, size: 10, 'last-house-id': lastAptId },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}

export { getSido, getGugun, getDong, getFirstAptInfo, getReloadAptInfo };

import { localAxios } from '@/util/http-common.js';

const local = localAxios();

async function getServiceKey() {
  try {
    local.defaults.headers['authorization'] = sessionStorage.getItem('accessToken');
    const response = await local.get(`/api/key`);
    return response;
  } catch (error) {
    console.error(error);
  }
}

async function getAroundPrice(serviceKey, lat, lng, dongCode, radius) {
  try {
    local.defaults.headers['authorization'] = sessionStorage.getItem('accessToken');
    const response = await local.get(`/api/house/around/price`, {
      params: {
        'service-key': serviceKey,
        lat: lat,
        lng: lng,
        'dong-code': dongCode,
        radius: radius,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}

export { getServiceKey, getAroundPrice };

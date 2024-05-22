import { localAxios } from '@/util/http-common.js';

const local = localAxios();

async function getAroundPriceListApi(cond) {
  try {
    local.defaults.headers['authorization'] = sessionStorage.getItem('accessToken');
    const { houseId, lat, lng, dongCode, radius } = cond;
    const response = await local.get(`/house/price/${houseId}`, {
      params: {
        'house-id': houseId,
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

export { getAroundPriceListApi };

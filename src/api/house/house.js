import { localAxios } from '@/util/http-common.js';

const local = localAxios();

function getAroundPriceListApi(cond) {
  const { houseId, lat, lng, dongCode, radius } = cond;
  const response = local.get(`/house/price/${houseId}`, {
    params: {
      'house-id': houseId,
      lat: lat,
      lng: lng,
      'dong-code': dongCode,
      radius: radius,
    },
  });
  return response;
}

export { getAroundPriceListApi };

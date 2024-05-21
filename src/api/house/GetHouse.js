import { localAxios } from '@/util/http-common.js';

const local = localAxios();

function getFirstHouseDeal(houseId) {
  const response = local.get(`/house/deal/${houseId}`, {
    params: { size: 5 },
  });
  return response;
}

function getSecondHouseDeal(houseId, lastdealId) {
  const response = local.get(`/house/deal/${houseId}`, {
    params: { size: 5, 'last-deal-id': lastdealId },
  });
  return response;
}

export { getFirstHouseDeal, getSecondHouseDeal };

import { localAxios } from '@/util/http-common.js';

const local = localAxios();

async function getFirstHouseDeal(houseId) {
  try {
    local.defaults.headers['authorization'] = sessionStorage.getItem('accessToken');
    const response = await local.get(`/house/deal/${houseId}`, {
      params: { size: 5 },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}

async function getSecondHouseDeal(houseId, lastDealId) {
  try {
    local.defaults.headers['authorization'] = sessionStorage.getItem('accessToken');
    const response = await local.get(`/house/deal/${houseId}`, {
      params: { size: 5, 'last-deal-id': lastDealId },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}

export { getFirstHouseDeal, getSecondHouseDeal };

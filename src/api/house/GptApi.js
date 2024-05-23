import { localAxios } from '@/util/http-common.js';

const local = localAxios();

async function getGpt(message) {
  try {
    local.defaults.headers['Authorization'] = import.meta.env.VITE_GPT_API_KEY;
    const response = await local.post(
      `https://api.openai.com/v1/chat/completions`,
      {
        model: import.meta.env.VITE_GPT_MODEL,
        messages: message,
      }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}

export { getGpt };

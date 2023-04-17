import { async } from 'regenerator-runtime';

import { TIMEOUT_SECOND } from '../config.js';

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SECOND)]);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(`${data.message} (${res.status}) 💥💥💥`);
    }
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

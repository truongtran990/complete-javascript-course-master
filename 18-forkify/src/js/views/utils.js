import { async } from "regenerator-runtime";

import { TIMEOUT_SECOND } from "../config.js";

export const AJAX = async function (url, payloadData = undefined) {
  try {
    const fetchPro = payloadData
      ? fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payloadData),
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SECOND)]);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(`${data.message} (${res.status}) 💥💥💥`);
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SECOND)]);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(`${data.message} (${res.status}) 💥💥💥`);
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const sendJSON = async function (url, payloadData) {
  try {
    const fetchPro = fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payloadData),
    });

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SECOND)]);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(`${data.message} (${res.status}) 💥💥💥`);
    }
    return data;
  } catch (error) {
    throw error;
  }
};

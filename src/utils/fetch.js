const axios = require("axios");
const { stringify } = require("querystring");

const BASE_URL = "https://c.y.qq.com/";

const defaultHeaders = {
  referer: "https://y.qq.com/portal"
};

const defaultParams = {
  format: "json",
  inCharset: "utf8",
  outCharset: "utf-8",
  platform: "yqq"
};

const fetch = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: defaultHeaders
});

const get = async (url, { params = {}, headers = {} }) => {
  let res = await fetch(`${url}`, {
    headers: {
      ...defaultHeaders,
      ...headers
    },
    params: {
      ...defaultParams,
      ...params
    }
  });
  return res.data;
};

module.exports = { get };

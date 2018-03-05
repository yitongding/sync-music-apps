const axios = require("axios");
const { stringify } = require("querystring");
const cookieUtils = require("cookie");

const BASE_URL = "https://c.y.qq.com/";

const defaultHeaders = {
  referer: "https://y.qq.com/portal"
};

const defaultParams = {
  format: "json",
  inCharset: "utf8",
  outCharset: "utf-8"
};

const getDefaultParams = {
  ...defaultParams,
  platform: "yqq"
};

const fetch = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: defaultHeaders
});

// found in qq music source code
const getACSRFToken = cookie => {
  const value = cookie.p_skey || cookie.skey || cookie.p_lskey || cookie.lskey;
  if (!value) {
    return '';
  }
  for (var n = 5381, o = 0, t = value.length; t > o; ++o)
    n += (n << 5) + value.charCodeAt(o);
  return 2147483647 & n;
};

const stringifyCookie = cookie =>
  Object.entries(cookie)
    .map(pair => cookieUtils.serialize(...pair))
    .join("; ");

const get = async (url, { params = {}, headers = {}, cookie = {} }) => {
  const csrfToken = getACSRFToken(cookie);
  const res = await fetch(url, {
    headers: {
      ...defaultHeaders,
      ...headers,
      cookie: stringifyCookie(cookie)
    },
    params: {
      ...getDefaultParams,
      ...params,
      g_tk: csrfToken
    }
  });
  return res.data;
};

const formDefaultParams = {
  ...defaultParams,
  platform: "yqq.post"
};

// https://github.com/axios/axios/issues/1006#issuecomment-320165427
const post = async (url, { params = {}, headers = {}, cookie = {} }) => {
  const csrfToken = getACSRFToken(cookie);
  const data = stringify({ ...formDefaultParams, ...params, g_tk: csrfToken });
  const res = await fetch.post(url, data, {
    headers: {
      ...defaultHeaders,
      ...headers,
      cookie: stringifyCookie(cookie)
    }
  });
  return res.data;
};

module.exports = { get, post };

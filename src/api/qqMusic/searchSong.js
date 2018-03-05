const get = require("lodash/get");
const debug = require("debug")("api:qqMusic:searchSong");
const fetch = require("../../utils/fetch");

const searchSong = async (key, page = 0, limit = 20) => {
  const params = {
    p: page,
    n: limit,
    w: key,
    aggr: 1,
    lossless: 1,
    cr: 1
  };
  const rawRes = await fetch.get("soso/fcgi-bin/search_cp", {
    params
  });
  debug("response", rawRes);
  return get(rawRes, "data.song.list", null);
};

module.exports = searchSong;

const get = require("lodash/get");
const debug = require("debug")("api:qqMusic:searchSong");
const fetch = require("../../utils/fetch");

const getSongInfo = async (songmid, ) => {
  const params = { songmid };
  const rawRes = await fetch.get("v8/fcg-bin/fcg_play_single_song.fcg", {
    params
  });
  debug("response", rawRes);
  return get(rawRes, "data[0]", null);
};

module.exports = getSongInfo;

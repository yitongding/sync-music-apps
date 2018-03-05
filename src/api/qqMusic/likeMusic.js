const get = require("lodash/get");
const debug = require("debug")("api:qqMusic:likeMusic");
const fetch = require("../../utils/fetch");

const likeMusic = async (cookie, { songmid, songtype }) => {
  const params = {
    midlist: songmid,
    typelist: songtype || 13,
    dirid: 201, // dir for 'I liked'
    formsender: 4, // !
    utf8: 1
  };

  const headers = {
    origin: "https://y.qq.com"
  };

  debug("params:", params);
  debug("headers:", headers);

  const response = await fetch.post(
    "splcloud/fcgi-bin/fcg_music_add2songdir.fcg",
    { params, headers, cookie }
  );

  debug("response:", response);

  return get(response, "code", null) === 0;
};
module.exports = likeMusic;

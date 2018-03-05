const fetch = require("../../utils/fetch");
const get = require("lodash/get");

const getUserLikedMusicListId = async userId => {
  const params = {
    cid: 205360838, // hardcoded, version number?
    reqfrom: 1,
    reqtype: 0,
    userid: userId
  };
  const response = await fetch.get(
    "rsc/fcgi-bin/fcg_get_profile_homepage.fcg",
    { params }
  );
  return get(response, "data.mymusic[0].id", null);
};
module.exports = getUserLikedMusicListId;

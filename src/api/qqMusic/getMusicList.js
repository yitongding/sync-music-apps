const fetch = require("../../utils/fetch");
const get = require("lodash/get");

const getMusicList = async listId => {
  const params = {
    disstid: listId,
    json: 1,
    onlysong: 1,
    type: 1,
    utf8: 1
  };
  const response = await fetch.get(
    "qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg",
    { params }
  );
  return get(response, "songlist", null);
};
module.exports = getMusicList;

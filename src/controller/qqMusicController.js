const debug = require("debug")("controller:qqMusic");
const _get = require("lodash/get");
const Song = require("../models/Song");
const User = require("../models/User");

const {
  getMusicList,
  getSongInfo,
  getUserLikedMusicListId,
  likeMusic,
  login,
  searchSong
} = require("../api/qqMusic");

const get = async qqNumber => {
  const listId = await getUserLikedMusicListId(qqNumber);
  const likedSongs = await getMusicList(listId);

  const songs = likedSongs.map(song => {
    const name = song.songorig || song.songname;
    const singer = _get(song, "singer[0].name");
    return new Song(name, singer);
  });
  debug("songs", songs);
  return songs;
};
module.exports.get = get;

const like = async (user = new User(), song = new Song()) => {
  if (!user.hasLoggedIn) {
    user.cookie = await login(user);
  }
  const songPartInfo = await searchSong(song.searchKey);
  const songId = _get(songPartInfo, "[0].songmid");
  const songAllInfo = await getSongInfo(songId);
  const songType = songAllInfo.songtype;
  return await likeMusic(user, { songId, songType });
};
module.exports.like = like;

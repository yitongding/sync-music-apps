const {
  getMusicList,
  getUserLikedMusicListId,
  likeMusic,
  login
} = require("../../src/api/qqMusic");
const User = require("../../src/models/User");

const config = require("config");
const IS_CI = config.get("test.isCi");
const USERNAME = config.get("test.qq.username");
const PASSWORD = config.get("test.qq.password");
jest.setTimeout(30000);

let user = new User(USERNAME, PASSWORD);
describe("QQ Music Api", () => {
  test("login works", async () => {
    if (IS_CI) {
      return;
    }
    const cookie = await login(user);
    expect(cookie).toHaveProperty("pt4_token");
  });

  test("likeMusic works", async () => {
    if (IS_CI) {
      return;
    }
    const rcode = await likeMusic(user, { songId: "00210iUr2jg9fl" });
    expect(rcode).toBe(true);
  });

  test("getUserLikedMusicListId works", async () => {
    const listId = await getUserLikedMusicListId(USERNAME);
    // https://github.com/facebook/jest/issues/4907
    // expect(NaN).toBe(NaN);
    expect(parseInt(listId)).not.toBe(NaN);
  });

  test("getMusicList works", async () => {
    const listId = await getUserLikedMusicListId(USERNAME);
    const list = await getMusicList(listId);
    expect(list).toBeInstanceOf(Array);
  });
});

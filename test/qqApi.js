const config = require("config");
const {
  getMusicList,
  getUserLikedMusicListId,
  likeMusic,
  login
} = require("../src/api/qqMusic");
const USERNAME = config.get("test.qq.username");
const PASSWORD = config.get("test.qq.password");
jest.setTimeout(30000);

let cookie;

describe("QQ Music Api", () => {
  test.skip("login works", async () => {
    cookie = await login(USERNAME, PASSWORD);
    expect(cookie).toContain("pt4_token");
  });

  test("likeMusic works", async () => {
    const rcode = await likeMusic(cookie, { songmid: "00210iUr2jg9fl" });
    expect(rcode).toBe(true);
  });

  test.skip("getUserLikedMusicListId works", async () => {
    const listId = await getUserLikedMusicListId(USERNAME);
    // https://github.com/facebook/jest/issues/4907
    // expect(NaN).toBe(NaN);
    expect(parseInt(listId)).not.toBe(NaN);
  });

  test.skip("getMusicList works", async () => {
    const listId = await getUserLikedMusicListId(USERNAME);
    const list = await getMusicList(listId);
    expect(list).toBeInstanceOf(Array);
  });
});

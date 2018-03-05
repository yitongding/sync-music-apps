const controller = require("../../src/controller/qqMusicController");
const Song = require("../../src/models/Song");
const User = require("../../src/models/User");

const config = require("config");
const IS_CI = config.get("test.isCi");
const USERNAME = config.get("test.qq.username");
const PASSWORD = config.get("test.qq.password");
jest.setTimeout(30000);

// Keep cookie, save login time
const user = new User(USERNAME, PASSWORD);

describe("QQ Music controller", () => {
  test("get works", async () => {
    const songs = await controller.get(USERNAME);
    expect(songs.length).not.toEqual(0);
    expect(songs[0]).toBeInstanceOf(Song);
  });

  test("like works", async () => {
    if (IS_CI) {
      return;
    }
    const rcode = await controller.like(user, new Song("绅士", "薛之谦"));
    expect(rcode).toBe(true);
  });
});

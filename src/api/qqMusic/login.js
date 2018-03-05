// QQ Music login encryption code is 4500 lines long
// No interest to read for now
// Use puppeteer as a tmp solution

/* global document */

const puppeteer = require("puppeteer");
const cookieUtils = require("cookie");
const queryString = require("querystring");

const User = require("../../models/User");

const loginUrl = () => {
  const baseUrl = "https://xui.ptlogin2.qq.com/cgi-bin/xlogin?";
  const query = {
    appid: "1006102",
    daid: "384",
    low_login: "1",
    pt_no_auth: "1",
    // This page renders fast
    s_url: "https://y.qq.com/vip/daren_recruit/apply.html",
    style: "40"
  };
  const queryStr = queryString.stringify(query);
  return baseUrl + queryStr;
};

const login = async ({ username, password } = new User()) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(loginUrl());

  const switchPasswordLoginBtn = "#switcher_plogin";
  const loginQrImg = ".qrImg";
  await page.waitFor(loginQrImg);
  await page.waitFor(switchPasswordLoginBtn, { visible: true });
  await page.click(switchPasswordLoginBtn);

  const usernameInput = "#loginform #u";
  const passwordInput = "#loginform #p";
  const loginBrn = "#loginform .login_button";
  await page.waitFor(usernameInput);
  await page.waitFor(passwordInput);
  await page.waitFor(loginBrn);
  await page.type(usernameInput, username, { delay: 100 }); // Types slower, like a user
  await page.type(passwordInput, password, { delay: 100 });
  await page.click(loginBrn, { delay: 100 });

  const userLoggedInName = ".top_login__link.js_nickname";
  await page.waitFor(userLoggedInName);

  const cookie = await page.evaluate(() => {
    return document.cookie;
  });

  await browser.close();
  return cookieUtils.parse(cookie);
};

module.exports = login;

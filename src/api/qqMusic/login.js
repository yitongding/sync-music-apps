// QQ Music login encryption code is 4500 lines long
// No interest to read for now
// Use puppeteer as a tmp solution

/* global document */

const puppeteer = require('puppeteer');
const cookieUtils = require("cookie");

const login = async (username, password) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://y.qq.com', {waitUntil:'networkidle2'}); // no need to wait all contents are loaded

  const loginStartBtn = '.top_login__link.js_login';
  await page.click(loginStartBtn);

  // puppeteer have bug interacting with iframe
  // see https://github.com/GoogleChrome/puppeteer/issues/618
  const loginIframe = 'frame_tips';
  await page.waitFor('#' + loginIframe);
  const frame = await page.frames().find(f => f.name() === loginIframe);

  const switchPasswordLoginBtn = '#switcher_plogin';
  const loginQrImg = '.qrImg';
  await frame.waitFor(loginQrImg);
  await frame.waitFor(switchPasswordLoginBtn, {visible: true});
  await frame.click(switchPasswordLoginBtn);

  const usernameInput = '#loginform #u';
  const passwordInput = '#loginform #p';
  const loginBrn = '#loginform .login_button';
  await frame.waitFor(usernameInput);
  await frame.waitFor(passwordInput);
  await frame.waitFor(loginBrn);
  await frame.type(usernameInput, username, {delay: 100}); // Types slower, like a user
  await frame.type(passwordInput, password, {delay: 100});
  await frame.click(loginBrn, {delay: 100});

  const userLoggedInImg = '.top_login__cover.js_user_img';
  await page.waitFor(userLoggedInImg);

  const cookie = await page.evaluate(() => {
    return document.cookie;
  });

  await browser.close();
  return cookieUtils.parse(cookie);
}

module.exports = login;

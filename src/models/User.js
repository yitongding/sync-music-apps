class User {
  constructor(username, password) {
    this.username = username.toString();
    this.password = password.toString();
    this._cookie = null;
  }

  set cookie(cookie) {
    this._cookie = cookie;
  }

  get cookie() {
    if (!this._cookie) {
      throw new Error("User have no cookie!");
    }
    return this._cookie;
  }

  get hasLoggedIn() {
    return Boolean(this._cookie);
  }
}

module.exports = User;

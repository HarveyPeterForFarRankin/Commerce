//simple class to set localstroage, in prod the details would be stored in memory and not in web storage

class Auth {
  constructor() {}

  setUserDeetails(user, token) {
    this.setToken(token);
    this.setUser(user);
  }
  setToken(token) {
    localStorage.setItem('token', JSON.stringify(token));
  }
  setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }
  getItem(name) {
    return JSON.parse(localStorage.getItem(name));
  }
}

export default Auth;

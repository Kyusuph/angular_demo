export class AuthService {
  loggedIn = false;

  getLoginState() {
    const promise = new Promise<boolean>((resolve, reject) => {
      setTimeout(() => {
        resolve(this.loggedIn);
      }, 1000);
    });
    return promise;
  }
  login() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
  }
}

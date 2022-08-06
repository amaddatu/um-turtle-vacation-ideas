import decode from 'jwt-decode';

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token) {
    const decoded = decode(token);
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('id_token');
      return true;
    }
    return false;
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  login(appState, setAppState, idToken, formData, navigate) {
    setAppState({
      ...appState,
      user: {...formData.login.user},
      logged_in: true
    });
    localStorage.setItem('id_token', idToken);
    navigate("/", {replace: true})
    // window.location.assign('/');
  }

  logout(appState, setAppState) {
    setAppState({
      ...appState,
      user: null,
      logged_in: false
    });
    localStorage.removeItem('id_token');
    window.location.reload();
  }
}

export default new AuthService();

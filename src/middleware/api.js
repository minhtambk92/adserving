function getCookie(name) {
  const value = '; ' + document.cookie;
  const parts = value.split('; ' + name + '=');
  if (parts.length === 2) return parts.pop().split(';').shift();
}
export function middlewareLogin() {
  if (getCookie('ssid') === undefined || getCookie('ssid') === null) {
    const isAuthenticated = false;
    return isAuthenticated;
  } else {
    const isAuthenticated = true;
    return isAuthenticated;
  }
};

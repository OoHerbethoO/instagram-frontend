import JSCookies from 'js-cookie'

const Cookies = {
  setToken: (token: string) => {
    JSCookies.set('token', token)
  },
  getToken: () => {
    return JSCookies.get('token')
  },
  removeToken: () => {
    JSCookies.remove('token')
  },
}

export default Cookies

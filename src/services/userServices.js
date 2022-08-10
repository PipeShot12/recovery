const loginUrl = process.env.REACT_APP_URL_LOGIN
const registerUrl = process.env.REACT_APP_URL_REGISTER
const loginService = async (userData) => {
  const req = await window.fetch(loginUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
  return req
}
const registerService = async (userData) => {
  const req = await window.fetch(registerUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
  return req
}
export { loginService, registerService }
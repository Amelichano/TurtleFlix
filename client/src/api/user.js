import { serverInstance } from './instance'

const postSignUp = async (loginId, password, username) => {
  const response = await serverInstance.post(`/signUp`, {
    loginId,
    password,
    username,
  })
  return response.data
}

const postLogIn = async (loginId, password) => {
  const response = await serverInstance.post(`/login`, {
    loginId,
    password,
  })
  return response.data
}

export { postSignUp, postLogIn }

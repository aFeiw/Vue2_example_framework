import Common from '@/assets/js/common'

const TokenKey = 'token'

export function getToken() {
  return Common.getStorage(TokenKey)
}

export function setToken(token) {
  return Common.setStorage(TokenKey, token)
}

export function removeToken() {
  return Common.delStorage(TokenKey)
}

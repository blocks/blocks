import nookies from 'nookies'

export const getToken = (ctx = {}) => nookies.get(ctx).token

export const setToken = (token, ctx = {}) => {
  nookies.set(ctx, 'token', token, {
    maxAge: 1 * 60 * 60 * 24, // 1 day
    path: '/'
  })
}

export const clearToken = (ctx = {}) => {
  nookies.destroy(ctx, 'token')
}

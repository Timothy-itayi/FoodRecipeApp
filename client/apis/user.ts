import request from 'superagent'

const rootUrl = '/api/v1/users'

export function getUser(): Promise<string[]> {
  return request.get(rootUrl).then((res) => {
    return res.body.users
  })
}

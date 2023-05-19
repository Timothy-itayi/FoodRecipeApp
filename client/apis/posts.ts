import request from 'superagent'

const rootUrl = '/api/v1/posts'

export function getPost(): Promise<string[]> {
  return request.get(rootUrl).then((res) => {
    return res.body.posts
  })
}

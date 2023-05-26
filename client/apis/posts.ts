import request from 'superagent'

const rootUrl = '/api/v1/posts'

export function getAllPosts(): Promise<any[]> {
  return request.get(rootUrl).then((res) => {
    return res.body.posts
  })
}

export function getPost(id: number): Promise<any> {
  return request.get(`${rootUrl}/${id}`).then((res) => {
    return res.body.post
  })
}

export function addNewPost(newPost: any): Promise<number> {
  return request
    .post(rootUrl)
    .send(newPost)
    .then((res) => {
      return res.body.postId
    })
}

export function updatePost(id: number, updatedPost: any): Promise<void> {
  return request
    .put(`${rootUrl}/${id}`)
    .send(updatedPost)
    .then(() => {})
}

export function deletePost(id: number): Promise<void> {
  return request.delete(`${rootUrl}/${id}`).then(() => {})
}

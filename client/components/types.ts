export interface Post {
  id: number
  title: string
  description: string
  user_id: number | null
  image_url: string | null
}

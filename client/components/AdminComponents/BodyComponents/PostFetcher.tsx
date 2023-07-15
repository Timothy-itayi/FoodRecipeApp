import React, { useEffect, useState } from 'react'
import { getAllPosts } from '../../../apis/posts'

interface PostFetcherProps {
  setPostsData: (posts: any[]) => void
}

const PostFetcher: React.FC<PostFetcherProps> = ({ setPostsData }) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      console.log('Fetching data...')
      try {
        const posts = await getAllPosts()
        console.log('Fetched Data:', posts) // Check the fetched data

        setPostsData(posts) // Update the postsData state with fetched posts
        setLoading(false)
      } catch (error) {
        setError('Error fetching data')
        setLoading(false)
        console.error(error)
      }
    }

    fetchData()
  }, [setPostsData])

  console.log('loading:', loading)
  console.log('error:', error)

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
        <p>Loading posts...</p>
      </div>
    )
  }

  if (error) {
    return <p>{error}</p>
  }

  return null
}

export default PostFetcher

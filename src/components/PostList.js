import React, { useEffect, useState } from 'react'
import Post from './Post'

const PostList = () => {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    const getPosts = async ()=>{
      try {
        const response = await fetch('http://localhost:8000/post');
      const answer = await response.json();
      console.log(answer);
      setPosts(answer);
      } catch (error) {
        console.log(error);
      }
    }
    getPosts();
  }, [])
  

  return (
    <div className="list max-w-5xl mx-auto mb-5">
        {
          posts.length > 0 && posts.map((item)=>{
            return <Post key={item._id} post={item}/>
          })
        }
    </div>
  )
}

export default PostList
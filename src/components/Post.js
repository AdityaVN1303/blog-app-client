import React from 'react'
import {format} from 'date-fns'
import {Link} from 'react-router-dom'

const Post = ({post}) => {
  return (
    <div className="blogpost">
        {
          post && <>
          <Link className='grid grid-cols-1 lg:grid-cols-3 mb-5 space-y-2 lg:space-x-5 px-5' to={`/post/${post?._id}`}>
          <img src={`http://localhost:8000/${post?.cover}`} alt="banner" className='col-span-1 rounded-md h-52 object-cover' />
        <div className="info col-span-2 space-y-3">
          <h1 className='font-bold text-2xl'>{post?.title}</h1>
          <div className="details flex space-x-3 font-semibold text-sm">
            <p>{post?.author?.username}</p>
            <p>{format(new Date(post?.createdAt) , 'MMM d, yyyy HH:mm')}</p>
          </div>
          <p className=''>
            {post?.description.slice(0 ,350)}
            </p>
        </div>
          </Link>
          </>
        }
    </div>
  )
}

export default Post
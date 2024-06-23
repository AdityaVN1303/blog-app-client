import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom';
import {format} from 'date-fns'

const PostDetail = () => {

  const [data, setData] = useState({});

  const {id} = useParams();

  console.log(document.cookie.match('token'));

  useEffect(() => {
    const getPostDetails = async ()=>{
      try {
        const response = await fetch("http://localhost:8000/post/" + id);
        const answer = await response.json();
        console.log(answer);
        setData(answer);
      } catch (error) {
        console.log(error);
      }
    }
    getPostDetails();
  }, [])
  

  return (
    <div className="post-content max-w-3xl mx-auto px-5 my-5 space-y-3">
      {
        data && <>
        <h1 className='font-bold text-5xl mb-5'>{data?.title}</h1>
        <img src={`http://localhost:8000/${data?.cover}`} alt="post-cover" />
        <div className="info flex justify-between items-center my-2">
          <p className='bg-blue-500 text-white px-1'>{data?.author?.username}</p>
         {
          data?.createdAt && <p className='bg-blue-500 text-white px-1'>{format(new Date(data?.createdAt) , 'MMM d, yyyy HH:mm')}</p>
         }
        </div>
        <hr />
        <p className='text-sm'>{data?.description}</p>
        <hr />
        <div dangerouslySetInnerHTML={{__html : data?.essay}}/>
       
        </>
      }
    </div>
  )
}

export default PostDetail
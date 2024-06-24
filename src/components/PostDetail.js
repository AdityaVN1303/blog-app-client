import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom';
import {format} from 'date-fns'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import { toast } from 'react-toastify';

const PostDetail = () => {

  const [data, setData] = useState({});
  const [authorId, setAuthorId] = useState("");

  const userId = useSelector((store)=>store.auth.userId);

  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getPostDetails = async ()=>{
      try {
        const response = await fetch("http://localhost:8000/post/" + id);
        const answer = await response.json();
        console.log(answer);
        setData(answer);
        setAuthorId(answer.author._id);
      } catch (error) {
        console.log(error);
      }
    }
    getPostDetails();
  }, [])

  const deletePost = async ()=>{
    try {
      const response = await fetch("http://localhost:8000/post/"+id , {
        method : 'DELETE', 
        credentials : 'include'
      }
      )
      const answer = await response.json();
      console.log(answer);
      if (answer?.error) {
        toast(error);
      }
      if (answer.title) {
        toast("Post Deleted Successfully !");
        navigate('/');
      }

    } catch (error) {
      console.log(error);
    }
  }
  

  return (
    <div className="post-content max-w-3xl mx-auto px-5 my-5 space-y-3">
      {
        data && <>
        {
          authorId === userId &&
          <div className='flex items-center space-x-5'>
            <button className='font-bold bg-blue-600 text-white p-3 px-10 text-xl w-full'><Link to={`/create/${data?._id}`}>✏️Edit Post</Link></button>
            <button onClick={deletePost} className='font-bold text-xl p-3 bg-red-800'>🗑️</button>
          </div>
        
        }
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
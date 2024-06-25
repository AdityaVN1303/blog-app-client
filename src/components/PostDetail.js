import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom';
import {format} from 'date-fns'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import { MdDelete } from 'react-icons/md';
import { FaHeart, FaRegEdit, FaRegHeart } from "react-icons/fa";
import DialogBox from './DialogBox';
import { toast } from 'react-toastify';

const PostDetail = () => {

  const [data, setData] = useState({});
  const [authorId, setAuthorId] = useState("");
  const [dialog, setDialog] = useState(false);
  const [likeStatus, setLikeStatus] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const userId = useSelector((store)=>store.auth.userId);

  const {id} = useParams();

  useEffect(() => {
    const getPostDetails = async ()=>{
      window.scrollTo(0 , 0);
      try {
        const response = await fetch("http://localhost:8000/post/" + id);
        const answer = await response.json();
        console.log(answer?.viewCount);
        setData(answer);
        setLikeCount(answer?.likes?.length);
        setAuthorId(answer.author._id);

        console.log(answer.likes);
        for (let i=0; i<answer.likes.length; i++) {
          if (answer.likes[i].toString() === userId) {
            setLikeStatus(true);
            return;
          }
        }
        setLikeStatus(false);

      } catch (error) {
        console.log(error);
      }
    }
    getPostDetails();
  }, [])
  
  

  const handleCancel = ()=>{
    setDialog(false);
  }

  const handleLikes = async ()=>{
    if (!likeStatus) {
      try {
        // const data = JSON.stringify({userId , id});
        console.log(userId);
        const response = await fetch(`http://localhost:8000/like/${id}` , {
          method : 'PUT',
          headers : {'Content-Type' : 'application/json'},
          credentials : 'include'
        })
        const answer = await response.json();
        setLikeCount(answer.likes.length);
        setLikeStatus(true);
        toast("You Liked the Post !");
        console.log(answer);
  
      } catch (error) {
        console.log(error);
      }
    }
    else{
      try {
        console.log(userId);
        const response = await fetch(`http://localhost:8000/unlike/${id}` , {
          method : 'PUT',
          headers : {'Content-Type' : 'application/json'},
          credentials : 'include'
        })
        const answer = await response.json();
        setLikeCount(answer.likes.length);
        setLikeStatus(false);
        toast("You Unliked the Post !");
        console.log(answer);
  
      } catch (error) {
        console.log(error);
      }
    }
  }
  

  return (
    <div className="post-content max-w-3xl mx-auto px-5 my-5 space-y-3">
      {dialog && <DialogBox handleCancel={handleCancel} id={id}/>}
      {
        data && <>
        {
          authorId === userId &&
          <div className='flex items-center '>
           <Link className='w-full block' to={`/create/${data?._id}`}> <button className='font-bold bg-blue-600 text-white p-3 px-10 text-xl w-full flex space-x-1 items-center justify-center'><FaRegEdit/><p>Edit Post</p></button></Link>
            <button onClick={()=>{setDialog(true)}} className='font-bold text-2xl p-[14px] text-white bg-red-800'><MdDelete/></button>
          </div>
        
        }
        <h1 className='font-bold text-5xl mb-5'>{data?.title}</h1>
        <img src={`http://localhost:8000/${data?.cover}`} alt="post-cover" />
        <div className="info flex justify-start space-x-3 items-center my-2">
          <p className='bg-blue-500 text-white px-1'>{data?.author?.username}</p>
          <p className='bg-blue-500 text-white px-1'>{data?.tag}</p>
         {
          data?.createdAt && <p className='bg-blue-500 text-white px-1'>{format(new Date(data?.createdAt) , 'MMM d, yyyy HH:mm')}</p>
         }
        {
          userId && <button className='flex items-center space-x-1' onClick={handleLikes}>
          {
            !likeStatus ? <FaRegHeart /> :
            <FaHeart />
          }
          <span>{likeCount}</span>
          </button>
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
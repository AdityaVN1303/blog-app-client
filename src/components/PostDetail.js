import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom';
import {format} from 'date-fns'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import { MdDelete } from 'react-icons/md';
import { FaHeart, FaRegEdit, FaRegHeart } from "react-icons/fa";
import DialogBox from './DialogBox';
import { toast } from 'react-toastify';
import Spinner from './Spinner';

const PostDetail = () => {

  const [data, setData] = useState({});
  const [authorId, setAuthorId] = useState("");
  const [dialog, setDialog] = useState(false);
  const [likeStatus, setLikeStatus] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [commentCount, setCommentCount] = useState(0);

  const userId = useSelector((store)=>store.auth.userId);
  const user = useSelector((store)=>store.auth.user);

  const {id} = useParams();

  useEffect(() => {
    const getPostDetails = async ()=>{
      window.scrollTo(0 , 0);
      try {
        const response = await fetch("https://blog-app-server-red.vercel.app/post/" + id);
        const answer = await response.json();
        console.log(answer?.viewCount);
        setData(answer);
        setLikeCount(answer?.likes?.length);
        setAuthorId(answer.author._id);
        setCommentList(answer.comments);
        setCommentCount(answer.comments.length);

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
  }, [id , userId])
  
  

  const handleCancel = ()=>{
    setDialog(false);
  }

  const handleLikes = async ()=>{
    if (!likeStatus) {
      try {
        // const data = JSON.stringify({userId , id});
        console.log(userId);
        const response = await fetch(`https://blog-app-server-red.vercel.app/like/${id}` , {
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
        const response = await fetch(`https://blog-app-server-red.vercel.app/unlike/${id}` , {
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

  const sendComment = async ()=>{
   if (comment) {
    // console.log(comment);
    try {

      const response = await fetch(`https://blog-app-server-red.vercel.app/comment/${id}` , {
        method : 'PUT',
        body : JSON.stringify({
          comment,
          username : user.username , 
          userImage : user.image ,
          author : authorId
        }),
        headers : {'Content-Type' : 'application/json'},
        credentials : 'include'
      })
      const answer = await response.json();
      // console.log(answer);
      if (answer?._id) {
        setCommentCount(answer.comments.length);
        toast("Commented Successfully !");
        setComment("");
        setCommentList(answer.comments);
      }

    } catch (error) {
      console.log(error);
    }
   }
  }

  

  return (
    <div className="post-content max-w-3xl mx-auto px-5 my-5 space-y-3">
      {dialog && <DialogBox handleCancel={handleCancel} id={id}/>}
      {
        data?.cover ? <>
        {
          authorId === userId &&
          <div className='flex items-center '>
           <Link className='w-full block' to={`/create/${data?._id}`}> <button className='font-bold bg-blue-600 text-white p-3 px-10 text-xl w-full flex space-x-1 items-center justify-center'><FaRegEdit/><p>Edit Post</p></button></Link>
            <button onClick={()=>{setDialog(true)}} className='font-bold text-2xl p-[14px] text-white bg-red-800'><MdDelete/></button>
          </div>
        
        }
        <h1 className='font-bold text-5xl mb-5'>{data?.title}</h1>
        <img src={`https://blog-app-server-red.vercel.app/${data?.cover}`} alt="post-cover" />
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
        <div className="comment-section">
        { userId &&
          <div className="commentSend my-5 flex items-center justify-center w-full">
          <input value={comment} onChange={(e)=>{setComment(e.target.value)}} type="text" className='p-2 border border-slate-400 bg-transparent w-3/4' />
          <p onClick={sendComment}  className='font-semibold cursor-pointer bg-blue-500 text-white p-2'>Comment</p>
        </div>}
        { commentList.length > 0 ? <div className="comment-list my-5">
          <h1 className='font-bold text-xl mb-5'>Comments ({commentCount})</h1>
          <div className="list space-y-5">
            {
              commentList && commentList.map((item)=>{
                return <div key={item?._id} className="single-comment space-y-1">
            <div className='flex justify-start space-x-10 items-center'>
              <div className="userinfo flex space-x-2 items-center">
                <img src={`https://blog-app-server-red.vercel.app/${item?.userImage}`} className='w-6 h-6 rounded-full object-cover' alt="commnet-banner" />
                <p className="name text-sm">{item?.username}</p>
                {
                  item?.isAdmin && <p className='font-bold text-sm text-yellow-300'>(Admin)</p>
                }
              </div>
              <div className="comment font-semibold text-lg">
                {item?.text}
              </div>
            </div>
              <hr />
            </div>
              })
            }
            
          </div>
        </div> : <h1 className='text-center font-bold text-3xl'>No Comments</h1>
        }
        </div>
       
        </> : <Spinner/>
      }
    </div>
  )
}

export default PostDetail
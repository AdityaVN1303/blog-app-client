import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom';
import {format} from 'date-fns'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import { MdDelete } from 'react-icons/md';
import { FaRegEdit } from "react-icons/fa";
import DialogBox from './DialogBox';

const PostDetail = () => {

  const [data, setData] = useState({});
  const [authorId, setAuthorId] = useState("");
  const [dialog, setDialog] = useState(false);

  const userId = useSelector((store)=>store.auth.userId);

  const {id} = useParams();

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

  const handleCancel = ()=>{
    setDialog(false);
  }
  

  return (
    <div className="post-content max-w-3xl mx-auto px-5 my-5 space-y-3">
      {dialog && <DialogBox handleCancel={handleCancel}/>}
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
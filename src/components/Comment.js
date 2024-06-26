import React, { useState , useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { MdDelete } from 'react-icons/md';
import {toast} from 'react-toastify'

const Comment = () => {
    
    const [data, setData] = useState({})
    const {id} = useParams();

    const handleDelete = async (userId)=>{
        try {
            const response = await fetch(`http://localhost:8000/comment?userId=${userId}&postId=${id}` , {
              method : 'DELETE',
              headers : {'Content-Type' : 'application/json'},
              credentials : 'include'
            })
            const answer = await response.json();
            console.log(answer);
            toast("Comment Deleted !");
            setData(answer);
      
          } catch (error) {
            console.log(error);
          }
    }

    useEffect(() => {
        const getPostDetails = async ()=>{
          try {
            const response = await fetch("http://localhost:8000/post/" + id);
            const answer = await response.json();
            setData(answer);
    
          } catch (error) {
            console.log(error);
          }
        }
        getPostDetails();
      }, [])

  return (
    <div className="comment max-w-5xl mx-auto px-5">
        {
            data && <>
            <h1 className='font-bold text-3xl my-5'>
            {data?.title}
        </h1>
        <div className="comments my-16">
            <p className='text-2xl font-bold'>({data?.comments?.length}) Comments</p>
            <div className="list my-5">
                {
                    data?.comments?.map((item)=>{
                        return <div key={item?._id} className="single-comment space-y-7">
                        <div className='flex justify-between items-center my-2'>
                          <div className='flex justify-start space-x-10 items-center my-2'>
                          <div className="userinfo flex space-x-2 items-center">
                            <img src={`http://localhost:8000/${item?.userImage}`} className='w-10 h-10 rounded-full object-cover' alt="commnet-banner" />
                            <p className="name text-lg">{item?.username}</p>
                          </div>
                          <div className="comment font-semibold text-lg">
                            {item?.text}
                          </div>
                          </div>
                          <div onClick={()=>{handleDelete(item?._id)}} className="delete text-2xl cursor-pointer hover:bg-blue-600 p-2">
                            <MdDelete/>
                          </div>
                        </div>
                          <hr />
                        </div>
                    })
                }
            </div>
        </div>
            </>
        }
    </div>
  )
}

export default Comment
import React, { useEffect, useState } from 'react'
import { FaRegEdit , FaHeart } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useSelector } from 'react-redux'
import { useNavigate , Link } from 'react-router-dom';
import DialogBox from './DialogBox';
import { IoEye } from "react-icons/io5";


const Dashboard = () => {

    const [postList, setPostList] = useState([]);
    const [dialog, setDialog] = useState(false);

    const isLoggedIn = useSelector((store)=>store.auth.isLoggedin);
    const user = useSelector((store)=>store.auth.user);
    const userId = useSelector((store)=>store.auth.userId);

    const navigate = useNavigate();

    useEffect(() => {
        if(!isLoggedIn){
          navigate('/');
        }
      }, [isLoggedIn , navigate])

      useEffect(() => {
        const getMyPosts = async ()=>{
            try {
                const response = await fetch("http://localhost:8000/myposts/"+userId , {
                    credentials : 'include'
                })
                const answer = await response.json();
                console.log(answer);
                setPostList(answer);
            } catch (error) {
                console.log(error);
            }
        }
        getMyPosts();
      }, [userId])

      const handleCancel = ()=>{
        setDialog(false);
      }
      

  return (
    <div className="dashboard max-w-5xl mx-auto my-10 px-5">
        {
            user && <div className="info flex justify-center space-x-10 items-center">
            <img src={user?.image ?  `http://localhost:8000/${user?.image}` : "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="user-img" className='w-20 h-20 object-cover rounded-full' />
            <div className="user-info">
                <h1 className='font-bold text-xl'>{user?.username}</h1>
                <h2 className='font-semibold text-lg'>{user?.email}</h2>
                <button className='bg-blue-500 text-white px-1 mt-2 '><Link className='flex space-x-1 items-center' to={`/user/${userId}`}><FaRegEdit className='cursor-pointer'/><span>Edit Profile</span></Link></button>
            </div>
        </div>
        }
        <div className="my-blogs mt-10 space-y-10">
            <h1 className='font-bold text-3xl mb-10'>My Blogs</h1>
            {
                postList.length > 0 && postList.map((item)=>{
                    return <div key={item?._id} className="post space-y-5">
                    {dialog && <DialogBox handleCancel={handleCancel} id={item?._id}/>}
                    <div className="inner flex justify-between items-center">
                    <div className="post-info flex items-center space-x-3">
                        <img src={`http://localhost:8000/${item?.cover}`} className='w-10 h-10 rounded-full object-cover' alt="post-img" />
                    <h1 className='font-bold text-2xl'>{item?.title}</h1>
                    </div>
                    <div className="edit flex space-x-5 items-center text-2xl">
                    <div className="views flex items-center space-x-5">
                    <div className='flex items-center space-x-1'>
                    <FaHeart/>
                    <p>{item?.likes?.length}</p>
                    </div>
                    <div className='flex items-center space-x-1'>
                    <IoEye/>
                    <p>{item?.viewCount}</p>
                    </div>
                    </div>
                    <Link to={`/create/${item?._id}`}><FaRegEdit className='cursor-pointer'/></Link>
                    <MdDelete onClick={()=>{setDialog(true)}} className='cursor-pointer'/>
                    </div>
                    </div>
                    <hr />
                </div>
                })
            }
           
        </div>
    </div>
  )
}

export default Dashboard
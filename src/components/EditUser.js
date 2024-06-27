import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {toast} from 'react-toastify'
import { FaImage } from "react-icons/fa6";

const EditUser = () => {
  const [username, setUsername] = useState("");
  const [files, setFiles] = useState();

  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    const getEditData = async ()=>{
        console.log()
        try {
            const response = await fetch("https://blog-app-server-red.vercel.app/user/" + id , {
                credentials : 'include'
            });
            const answer = await response.json();
            console.log(answer);
            if (answer) {
                setUsername(answer.username);
                setFiles(answer.image);
            }
        } catch (error) {
            console.log(error);
        }
    }
    getEditData()
  }, [id])

  const handleRegister = async ()=>{
    try {
      const data = new FormData();
      data.append('username' , username);
      if (files) {
        data.append('file' , files);
      }

      const response = await fetch("https://blog-app-server-red.vercel.app/register/"+id , {
        method : 'PUT',
        body : data
      })
      const answer = await response.json();
      console.log(answer);
      if (answer?.error) {
        toast(answer.error);
      }
      if (answer?.acknowledged) {
        toast("User Updated Successfully");
        navigate("/");
        
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="register px-5 h-screen w-screen bg-slate-900 text-white flex justify-center items-center">
      <div className="card p-5 rounded-md flex flex-col space-y-5 bg-blue-900">
      <div className="flex justify-between items-center space-x-2">
      <FaImage className='text-3xl'/>
      <input type="file"  onChange={(e)=>setFiles(e.target.files[0])} className='bg-transparent ' />
      </div>
          <input onChange={(e)=>{setUsername(e.target.value)}} value={username} placeholder='Name' type="text" className='p-2 rounded-md text-black' />
          <button onClick={handleRegister} className='px-5 rounded-md py-2 bg-purple-950 hover:bg-purple-400 text-white text-lg'>Update Info</button>
      </div>
    </div>
  )
}

export default EditUser
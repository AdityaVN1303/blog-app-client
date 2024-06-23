import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async ()=>{
    try {
      const response = await fetch("http://localhost:8000/register" , {
        method : 'POST',
        body : JSON.stringify({username , email , password}),
        headers : {'Content-Type' : 'application/json'}
      })
      const answer = await response.json();
      console.log(answer);
      if (answer?.error) {
        toast(answer.error);
      }
      if (answer?.username) {
        toast("User Created Successfully");
        navigate("/auth/login");
        
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="register h-screen w-screen bg-slate-900 text-white flex justify-center items-center">
      <div className="card p-5 rounded-md flex flex-col space-y-5 bg-blue-900">
          <input onChange={(e)=>{setUsername(e.target.value)}} placeholder='Name' type="text" className='p-2 rounded-md text-black' />
          <input onChange={(e)=>{setEmail(e.target.value)}} placeholder='Email' type="text" className='p-2 rounded-md text-black' />
          <input onChange={(e)=>{setPassword(e.target.value)}} placeholder='Password' type="text" className='p-2 rounded-md text-black' />
          <button onClick={handleRegister} className='px-5 rounded-md py-2 bg-purple-950 hover:bg-purple-400 text-white text-lg'>Sign Up</button>
          <p className='text-sm font-semibold text-center'>Already Registered? login <Link to="/auth/login" className='font-bold text-yellow-400 cursor-pointer'>here</Link></p>
      </div>
    </div>
  )
}

export default Register
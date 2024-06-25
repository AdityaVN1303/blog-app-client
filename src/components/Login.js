import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import { setIsLoggedIn , setUserId } from '../utils/authSlice';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async ()=>{
   try {
    const response = await fetch("http://localhost:8000/login" , {
      method : 'POST',
      body : JSON.stringify({email , password}),
      headers : {'Content-Type' : 'application/json'},
      credentials : 'include'
    })
    const answer = await response.json();
    console.log(answer);
    if (answer?.error) {
      toast(answer.error);
    }
    if (answer.loggedIn) {
      toast("Logged In Successfully");
      dispatch(setUserId(answer.id));
      dispatch(setIsLoggedIn(true));
      navigate('/');
    }
   } catch (error) {
    console.log(error);
   }
  }

  return (
    <div className="login h-screen w-screen bg-slate-900 text-white flex justify-center items-center">
      <div className="card p-5 rounded-md flex flex-col space-y-5 bg-blue-900">
          <input onChange={(e)=>{setEmail(e.target.value)}} placeholder='Email' type="text" className='p-2 rounded-md text-black' />
          <input onChange={(e)=>{setPassword(e.target.value)}} placeholder='Password' type="text" className='p-2 rounded-md text-black' />
          <button onClick={handleLogin} className='px-5 rounded-md py-2 bg-purple-950 hover:bg-purple-400 text-white text-lg'>Sign In</button>
          <p className='text-sm font-semibold text-center'>New User? Register <Link to="/auth/register" className='font-bold text-yellow-400 cursor-pointer'>here</Link></p>
      </div>
    </div>
  )
}

export default Login
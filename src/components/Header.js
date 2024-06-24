import React, { useEffect, useState } from 'react'
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import {Link, useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoggedIn, setUserId } from '../utils/authSlice';
import DropDown from './DropDown';

const Header = ({clicked , mode}) => {

  const [iamge , setImage] = useState("");
  const userId = useSelector((store)=>store.auth.userId);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const isUserLoggedIn = async ()=>{
     try {
      const response = await fetch('http://localhost:8000/profile' , {
        credentials : 'include'
      })

      const answer = await response.json();
      // console.log(answer);
      setImage(answer.image);

     } catch (error) {
      console.log(error);
     }
    }
    isUserLoggedIn();
  }, [])

  const logout = async ()=>{
   try {
    const response = await fetch("http://localhost:8000/logout" , {
      method : 'POST',
      credentials : 'include'
    })
    const answer = await response.json();
    if (answer?.message) {
      toast(answer.message);
      dispatch(setUserId(""));
      dispatch(setIsLoggedIn(false));
      navigate('/auth/login');
    }
   } catch (error) {
    console.log(error);
   }
    
  }
  

  return (
    <div className="header flex flex-col z-50 lg:flex-row space-y-2 justify-between items-center px-10 py-2 bg-blue-700 text-white fixed left-0 right-0 top-0">
        <h1 className='font-bold text-3xl'><Link to="/">MyBlog</Link></h1>
        <div className="user-entry space-x-3 text-lg flex">
        <div className="mode rounded-full bg-blue-400 p-1" onClick={clicked}>
          {
            mode === 'dark' ?
            <CiLight className="text-4xl"/> : <MdDarkMode className="text-4xl"/>
          }
        </div>
        {
          userId ?
          <>
          <DropDown logout={logout}/>
          </> : <button className='hover:bg-blue-300 px-1'><Link to="/auth/login">Sign in</Link></button>


        }
        </div>
    </div>
  )
}

export default Header
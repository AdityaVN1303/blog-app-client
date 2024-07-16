import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

const DropDown = ({logout , image}) => {

    const [drop, setDrop] = useState(false);

    const location = useLocation();

    useEffect(() => {
      setDrop(false);
    }, [location])
    

  return (
    <div className='rounded-full relative'>
        <img src={image ? image : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} alt="user-img" className='w-12 h-12 object-cover rounded-full cursor-pointer' onClick={()=>{setDrop(!drop)}} />
            <div className={`${drop ? "inline-flex" : "hidden"} w-32 absolute left-[-40px] top-[56px] flex flex-col text-center space-y-2 bg-blue-500 text-white`}>
                <button><Link to="/dashboard">Dashboard</Link></button>
                <hr/>
                <button><Link to="/create">Create New Post</Link></button>
                <hr />
                <button onClick={logout}>Log Out</button>
            </div>
    </div>
  )
}

export default DropDown
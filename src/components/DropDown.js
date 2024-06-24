import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const DropDown = ({logout}) => {

    const [drop, setDrop] = useState(false);

  return (
    <div className='rounded-full relative'>
        <img src="https://npr.brightspotcdn.com/dims3/default/strip/false/crop/2667x2000+147+0/resize/800/quality/85/format/jpeg/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2Fde%2F6a%2Fe6e489f1449f83e6873acb288754%2Fap24162696519774.jpg" alt="user-img" className='w-12 h-12 object-cover rounded-full cursor-pointer' onClick={()=>{setDrop(!drop)}} />
            <div className={`${drop ? "inline-flex" : "hidden"} w-32 absolute left-[-40px] top-[56px] flex flex-col text-center space-y-2 bg-blue-500 text-white`}>
                <button>Dashboard</button>
                <hr/>
                <button><Link to="/create">Create New Post</Link></button>
                <hr />
                <button onClick={logout}>Log Out</button>
            </div>
    </div>
  )
}

export default DropDown
import React, { useEffect, useState } from 'react'
import Post from './Post'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const PostList = () => {

  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const getPosts = async ()=>{
      try {
        const response = await fetch('http://localhost:8000/post');
      const answer = await response.json();
      console.log(answer);
      setPosts(answer);
      setFilteredPosts(answer);
      } catch (error) {
        console.log(error);
      }
    }
    getPosts();
  }, [])

  const handleSearch = (search)=>{
    console.log(posts[0]);
    if (search) {
      const filteredValues = posts.filter((item)=>item.title.toLowerCase().includes(search))
    setFilteredPosts(filteredValues);
    }
    else{
      setFilteredPosts(posts);
    }
  }

  const options = [
    'All', 'psychology', 'food', 'edcation' , 'programming' , 'gaming'
  ];
  const defaultOption = options[0];

  const _onSelect = (option)=>{
    if (option.value === 'All' ) {
      setFilteredPosts(posts);

    }
    else{
      const filteredValues = posts.filter((item)=>item.tag === option.value);
      setFilteredPosts(filteredValues);
    }
    console.log(option.value);
  }
  

  return (
    <div className="list max-w-5xl mx-auto mb-3">
      <div className="filter space-x-2 flex items-center">
      <input onChange={(e)=>{handleSearch(e.target.value)}} type="text" placeholder='Search Post' className='w-full p-2 rounded-md bg-transparent border border-slate-400 text-blue-500 my-5' />
      <Dropdown options={options} value={defaultOption} onChange={_onSelect} placeholder="Select an option" />

      </div>
        {
          filteredPosts.length > 0 ? filteredPosts.map((item)=>{
            return <Post key={item._id} post={item}/>
          }) : <h1 className='text-center font-bold text-2xl'>No Posts Available</h1>
        }
    </div>
  )
}

export default PostList
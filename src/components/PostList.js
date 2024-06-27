import React, { useEffect, useState } from 'react'
import Post from './Post'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { Carousel} from 'flowbite-react';
import { Link } from 'react-router-dom';
import ShimmerHome from './ShimmerHome';

const PostList = () => {

  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isTagActive, setIsTagActive] = useState(false);

  useEffect(() => {
    const getPosts = async ()=>{
      try {
        const response = await fetch('https://blog-app-server-red.vercel.app/post');
      const answer = await response.json();
      console.log(answer);
      setPosts(answer);
      setFilteredPosts(answer);

      function compareByViewCount(a, b) {
        return b.viewCount - a.viewCount;
      }

      const sortedData = [...answer]?.sort(compareByViewCount);
      console.log(sortedData);
      setPopularPosts(sortedData?.slice(0, 3));


      } catch (error) {
        console.log(error);
      }
    }
    getPosts();
  }, [])

  const handleSearch = (search)=>{
    setIsSearchActive(true);
    console.log(posts[0]);
    if (search) {
      const filteredValues = posts.filter((item)=>item.title.toLowerCase().includes(search))
    setFilteredPosts(filteredValues);
    }
    else{
      setIsSearchActive(false);
      setFilteredPosts(posts);
    }
  }

  const options = [
    'All', 'psychology', 'food', 'education' , 'programming' , 'gaming'
  ];
  const defaultOption = options[0];

  const _onSelect = (option)=>{
    if (option.value === 'All' ) {
      setFilteredPosts(posts);
      setIsTagActive(false);

    }
    else{
      const filteredValues = posts.filter((item)=>item.tag === option.value);
      setFilteredPosts(filteredValues);
      setIsTagActive(true);
    }
  }
  

  return (
    <div className="list max-w-5xl mx-auto mb-3 px-5">
      <div className="filter space-x-2 flex items-center">
      <input onChange={(e)=>{handleSearch(e.target.value)}} type="text" placeholder='Search Post' className='w-full p-2 rounded-md bg-transparent border border-slate-400 text-blue-500 my-5' />
      <Dropdown options={options} value={defaultOption} onChange={_onSelect} placeholder="Select an option" />
      </div>

      {(!isSearchActive && !isTagActive) && <div className="popular">
        <h1 className='font-bold text-3xl mt-5 text-white bg-gradient-to-r from-slate-400 to-indigo-600 rounded-md w-full p-2'>Popular Posts</h1>
        <div className=' h-[28rem] mb-10'>
        {popularPosts.length !== 0 ?
        <Carousel slideInterval={2000} className='h-full' indicators={false}>
          { popularPosts.map((item)=>{
              return <Link key={item?._id} className='flex flex-col items-center space-y-5 relative rounded-md' to={`/post/${item?._id}`}>
                  <h1 className='font-bold text-3xl absolute top-10 text-white p-1 bg-blue-400 shadow-2xl'>{item?.title}</h1>
                  <img src={`https://blog-app-server-red.vercel.app/${item?.cover}`} className='w-full rounded-md object-cover h-[26rem]'  alt="..." />
                </Link>
          
            })
          }
        </Carousel> : <ShimmerHome/>
        }
        </div>
      </div>
     }
      <h1 className='font-bold text-3xl mb-5 text-white bg-gradient-to-r from-slate-400 to-indigo-600 rounded-md w-full p-2'>Latest Posts</h1>
        {
          filteredPosts.length > 0 ? filteredPosts.map((item)=>{
            return <Post key={item._id} post={item}/>
          }) : posts.length !== 0 ? <h1 className='text-center font-bold text-2xl'>No Posts Available</h1> : <ShimmerHome/>
        }
    </div>
  )
}

export default PostList
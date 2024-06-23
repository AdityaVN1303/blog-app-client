import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'


const CreatePost = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [essay, setEssay] = useState("");
  const [files, setFiles] = useState();

  const navigate = useNavigate();

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

  const handleClick = async ()=>{
    try {
      if (!title || !description || !essay || !files) {
        toast("Please Fill all the Details !");
        return; 
      }
      const data = new FormData();
      data.append('title' , title);
      data.append('description' , description);
      data.append('file' , files);
      data.append('essay' , essay);
      // console.log(files);

      const response = await fetch("http://localhost:8000/post" , {
        method : 'POST',
        body : data, 
        credentials : 'include'
      })
      const answer = await response.json();
      console.log(answer);

      if (answer?.title) {
        toast("Post Created Successfully !");
        navigate('/');
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="create max-w-5xl mx-auto text-center flex flex-col justify-center items-center mt-5 mb-56 space-y-5">
      <h1 className='font-bold text-2xl'>Create New Post</h1>
       <input type="text" onChange={(e)=>{setTitle(e.target.value)}} placeholder='title' className='w-full p-2 bg-transparent border border-slate-400' />
       <input type="text" onChange={(e)=>{setDescription(e.target.value)}} placeholder='description' className='w-full p-2 bg-transparent border border-slate-400' />
       <input type="file" onChange={(e)=>setFiles(e.target.files[0])} className='w-full p-2 bg-transparent border border-slate-400' />
       <ReactQuill theme='snow' className='w-full' onChange={data=>setEssay(data)} value={essay} modules={modules} formats={formats}/>
        <button onClick={handleClick} className='bg-green-800 text-white p-4 w-full text-xl'>Create Post</button>

    </div>
  )
}

export default CreatePost
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import PostList from './components/PostList'
import PostDetail from './components/PostDetail'
import Login from './components/Login'
import Register from './components/Register'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreatePost from './components/CreatePost';


// search
// tags
// protecting routes using stores
// myblogs section 
// edit and delete posts option
// edit userinfo option 
// View Count 
// Popluar posts by view Count
// Latest Posts 



const router = createBrowserRouter([
  {
    path : "/",
    element : <App/>, 
    children : [
      {
        path : "/",
    element : <PostList/>
      } , 
      {
        path : "/post/:id",
    element : <PostDetail/>
      },
      {
        path : "/create",
    element : <CreatePost/>
      },
    ]
  } , 
  {
    path : "/auth/login",
    element : <Login/>
  } , 
  {
    path : "/auth/register",
    element : <Register/>
  } , 

])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
    <ToastContainer/>
  </React.StrictMode>
);
reportWebVitals();

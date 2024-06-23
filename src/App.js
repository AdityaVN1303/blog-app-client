import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";


function App() {

  const [mode, setMode] = useState('dark');

  const handleClick = ()=>{
    if (mode === 'dark') {
      setMode('light');
    }
    else{
      setMode('dark');
    }
  }

  return (
    <div className={`App font-abc duration-300 ${mode === 'dark' ? "text-white bg-black" : "text-black bg-white"}`} >
      <Header clicked={handleClick} mode={mode}/>
      <div className="body pt-28">
        <Outlet/>
      </div>
      <Footer/>
    </div>
  );
}

export default App;

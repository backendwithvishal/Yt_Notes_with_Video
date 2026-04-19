import React from 'react'
import { useNoteStore } from '../store/useNotes'
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const {url, setUrl} = useNoteStore();
  const navigate = useNavigate();
  
  const handleClick = (e) => {
    e.preventDefault();
    if(!url) return alert("Please enter a YouTube URL");
    console.log(url);
    navigate('/edunotes');
  };

  return (
    <div className='mt-30'>
      <h1 className='font-bold text-3xl text-center'>Welcome to YT Education Notes</h1>
      <div className='text-center mt-20'>
        <form >
        <input type="text" placeholder='paste the youtube video link here to go'
                className='border-2 w-100 h-10 p-2 '
                onChange={(e)=> setUrl(e.target.value)}
                />
        <button onClick={handleClick} className='border-black  border  cursor-pointer px-4 p-1 m-2 hover:bg-green-200 rounded-2xl'>Go</button>
        </form>
      </div>
    </div>
  )
}

export default Home

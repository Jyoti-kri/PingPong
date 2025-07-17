import React, { useRef,useEffect } from 'react'
import dp from '../assets/dp.png'; // default profile picture
import { useSelector } from 'react-redux';
function Sendermsg({image,message}) {

  const scroll = useRef(null); // to scroll to the bottom of the message area
   useEffect(() => {
       scroll.current?.scrollIntoView({ behavior: 'smooth' });
    },[message,image]); 
  

    const handleImgScroll=()=>{
    scroll.current?.scrollIntoView({ behavior: 'smooth' });
  }

  const {userData} = useSelector((state) => state.user); // to get the user data from redux store

  return (
    <div className='flex items-start gap-[20px]'  >

      <div  ref={scroll}
            className='w-fit max-w-[500px] bg-orange-300 px-[20px] shadow-gray-400shadow-lg py-[10px] text-white text-[19px] my-[2px] rounded-tr-none rounded-2xl relative right-1 ml-auto gap-[10px] flex flex-col'
      >
        {image && <img src={dp} alt=''  className='w-[150px] rounded-lg' onLoad={handleImgScroll}/>} 
        {message &&  <span >{message}</span>}
      </div>

       <div className='w-[40px] h-[40px] rounded-full overflow-hidden flex items-center justify-center bg-white top-0 right-[-50px] shadow-gray-500 shadow-lg cursor-pointer'
       >
            <img src={userData.image || dp} alt="" className='h-[100%]' />
        </div>
        
    </div>
  )
}

export default Sendermsg

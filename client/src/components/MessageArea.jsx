import React, { useEffect, useRef, useState } from 'react'
import { IoMdArrowBack } from "react-icons/io";
import dp from '../assets/dp.png'; // import a default profile picture
import { useSelector,useDispatch } from 'react-redux'; // to get the selected user from redux store
import { setSelectedUser } from '../redux/userSlice';
import { RiEmojiStickerLine } from "react-icons/ri";
import { FaImages } from "react-icons/fa6";
import { RiSendPlane2Fill } from "react-icons/ri";
import EmojiPicker from 'emoji-picker-react';
import {serverURL} from '../main'
import axios from 'axios';
import { setMessages } from '../redux/msgSlice';
import Sendermsg from './Sendermsg';
import Receivermsg from './Receivermsg';



function MessageArea() {
  //const {selectedUser} = useSelector((state) => state.user); // to get the selected user from redux store
  const dispatch = useDispatch();
  const [input,setInput]=useState(""); 
  const[frontImg,setFrontImg]=useState(""); 
  const[backImg,setBackImg]=useState("");
  const image=useRef();
  const {messages}=useSelector((state) => state.message); // to get the messages from redux store

  const handleSendMsg=async(e)=>{
    e.preventDefault()
    if(input.length==0  && backImg==null){
      return null;
    }
    try{
      const formData=new FormData();
      formData.append("message",input);
      if(backImg){
        formData.append("backImg",backImg);
      }
      const response=await axios.post(`${serverURL}/api/message/send/${selectedUser._id}`,
        formData,{withCredentials:true} // to parse the cookie
       
      )

      //console.log("Message sent:", response.data);
      dispatch(setMessages([...messages,response.data.newMessage])) // add the new message to the messages array in redux store
      setInput("");
      setFrontImg(null);
      setBackImg(null);

    } catch(error){
      console.error("Error sending message:", error);
    }
  }

  const onEmojiClick = (emojiData) => {
     setInput(prev => prev + emojiData.emoji);
     setEmoji(false); 
  }
  
  const {selectedUser,userData,socket} = useSelector((state) => state.user); // to get the selected user from redux store
  const [emoji,setEmoji]=useState(false); 
  // to manage the emoji state

  const handleImg = (e) => {
    const file = e.target.files[0]; 
    setBackImg(file); 
    setFrontImg(URL.createObjectURL(file)); // to show the image preview

  }

  useEffect(() => {
    socket.on("newMessage", (mess) =>{
      dispatch(setMessages([...messages,mess]))

    } )
    return()=>socket.off("newMessage"); // cleanup the socket listener
  },[messages,setMessages])


  return (
    <div className={`lg:w-[70%] relative ${selectedUser?"flex" : "hidden "} lg:flex w-full h-full bg-slate-200 border-1-2 border-gray-300`}>
     {selectedUser && 
     <div className='w-full h-[100vh] flex flex-col'>
      <div 
            className='w-full h-[100px] bg-orange-300 rounded-b-[30px] shadow-gray-400 shadow-lg flex  items-center gap-[20px] px-[20px]'>
               <div className='cursor-pointer ' onClick={()=>dispatch(setSelectedUser(null))}>
                          <IoMdArrowBack
                           className='w-[40px] h-[40px] text-white cursor-pointer '
                           />
                      </div>
                      <div className='w-[50px] h-[50px] rounded-full overflow-hidden flex items-center justify-center  shadow-gray-500 shadow-lg cursor-pointer'>
                                              <img src={ selectedUser?.image || dp} alt="" className='h-[100%]' />
                              </div>
                      <h1 className='text-white text-[20px] font-semibold'>{selectedUser?.name || "user"}</h1>
            </div>

            <div className='w-full h-[70%] flex flex-col py-[30px] px-[20px] gap-[20px] overflow-auto '>
              {emoji && <div 
                          className='absolute bottom-[120px] left-[20px]'>
                          <EmojiPicker width={250} height={350} className='shadow-lg' 
                          onEmojiClick={onEmojiClick}
                          />
                        </div>}

              {/* Display messages */}
                  {messages?.map((msg) =>(
                    msg.sender===userData._id 
                    ? <Sendermsg  key={msg._id} image={msg.image} message={msg.message} />
                    :<Receivermsg  key={msg._id} image={msg.image} message={msg.message}/>
                  ))}
              
              
              
            </div>
      </div>
     }
     {!selectedUser && 
      <div className='w-full h-full flex flex-col items-center justify-center '>
        <h1 className='text-gray-700 text-[40px] font-semibold'>Welcome to PingPong</h1>
          <span className='text-gray-500 text-[30px] font-semibold'>Select a user to chat</span>
      </div>
     }
     {selectedUser && 
      <div className='w-full lg:w-[70%] h-[100px] fixed bottom-[20px] flex items-center justify-center  shadow-gray-400 shadow-lg '>


       {frontImg && (
        <img
          src={frontImg}
          alt="preview"
          className='w-[80px] absolute bottom-[150px] right-[20px] rounded-lg shadow-gray-400 shadow lg'
        />
      )}


       <form 
        className='w-[95%] lg:w-[70%] bg-orange-400 h-[60px] rounded-full shadow-gray-400 shadow-lg flex items-center gap-[20px] px-[25px]'
        onSubmit={handleSendMsg}>
 
       

        <div onClick={()=>setEmoji(prev=>!prev)} className='cursor-pointer'>
          <RiEmojiStickerLine className='w-[25px] h-[25px] text-white cursor-pointer' />
        </div>

        <input type='file' accept='image/*' ref={image} hidden onChange={handleImg}/>

        <input
         type="text"
         placeholder='Type a message...'
         className='w-full h-full outline-none border-0 px-[10px]  placeholder-white bg-transparent text-white text-[19px]'
         onChange={(e)=>setInput(e.target.value)}
         value={input}
         />
         <div  className='cursor-pointer'onClick={()=>image.current.click()}>
          <FaImages className='w-[25px] h-[25px] text-white cursor-pointer'  />
         </div>
         {input.length>0 && backImg!=null &&
         (<button >
          <RiSendPlane2Fill className='w-[25px] h-[25px] text-white cursor-pointer'  />
         </button> )}
         

       </form>
     </div>}
      

    

    </div>
  )
}


export default MessageArea

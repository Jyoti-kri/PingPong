import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IoSearch } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import dp from '../assets/dp.png';
import { BiLogOutCircle } from "react-icons/bi";
import axios from 'axios';
import { setUserData, setOtherUsers, setSelectedUser, setSearchData } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { serverURL } from '../main';

function SideBar() {

  const {userData,otherUsers,selectedUser,onlineUsers,searchData} = useSelector((state) => state.user); // to get the user data from redux store

  const[search,setSearch]=useState(false)
  const [input,setInput]=useState("")


  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  

  const handleLogOut=async()=>{
    try{
      const response=await axios.get(`${serverURL}/api/auth/logout`,{
        withCredentials:true
      });
      dispatch(setUserData(null)); // Clear user data in Redux store
      dispatch(setOtherUsers(null)); // Clear other users in Redux store
      const naviagte=useNavigate();
      naviagte('/login'); // Redirect to login page
    } catch(error){
      console.error("Logout failed:", error);
    }
  }

  


  const handleSearch=async()=>{
    try{
      const response=await axios.get(`${serverURL}/api/user/search?query=${input}`,{
        withCredentials:true
      })
      dispatch(setSearchData(response.data));
     console.log((response))
      
    } catch(error){
      console.error("Search failed:", error);
    }
  }

  useEffect(()=>{
    if(input){
      handleSearch()
    }
    
  },[input])



  return (
    <div className={`lg:w-[30%] w-full h-full overflow-hidden bg-slate-300 lg:block relative ${!selectedUser?"block" : "hidden "}`}> 

      <div
         className='w-[60px] h-[60px] rounded-full overflow-hidden flex items-center justify-center  shadow-gray-500 shadow-lg fixed bottom-[20px] left-[10px] bg-orange-300 cursor-pointer '
         onClick={handleLogOut}>
            <BiLogOutCircle  className='w-[25px] h-[25px] cursor-pointer'/>          
      </div>
    
      {input.length>0 &&
        <div className='flex items-center pt-[20px] w-full h-[300px] overflow-y-auto flex-col gap-[10px] absolute top-[300px]  bg-white z-[150]'>
                {searchData?.map((user)=>{

                  <div key={user._id}
                       className='w-[95%] h-[60px] flex  items-center bg-white  rounded-full gap-[20px] cursor-pointer hover:bg-orange-300'
                       onClick={()=>dispatch(setSelectedUser(user))}    //  set the selected user for chat
           
                  >
           
                    <div className='flex relative rounded-full  shadow-gray-500 shadow-lg mt-[10px] '>    
                      <div
                        key={user._id} // 🗝️ unique key from database (_id)
                        className='w-[60px] h-[60px] rounded-full overflow-hidden flex items-center justify-center'
                      >
                          <img src={user.image || dp} alt="" className='h-[100%]' />
          
                      </div>
                        {onlineUsers?.includes(user._id) &&

                          <span className='w-[12px] h-[12px] rounded-full bg-green-800 absolute bottom-[6px] right-[-1px]  shadow-gray-500 shadow-md'></span>}
                    </div>

                    <h1>{user.name || user.userName}</h1>
        
                  </div>

                })}
        </div>
      }
      


      <div 
        className='w-full h-[300px] bg-orange-200 rounded-b-[30%] shadow-gray-400 shadow-lg flex flex-col  justify-center  px-[20px]'>
        <h1 className='text-white font-bold text-[25px]'>PingPong</h1>
        <div className='w-full  flex  justify-between items-center '>
        <h1 className='text-gray-700 font-semibold text-[25px]'>Hii, {userData.name || "user"}</h1>
        <div className='w-[60px] h-[60px] rounded-full overflow-hidden flex items-center justify-center bg-white  shadow-gray-500 shadow-lg cursor-pointer'
             onClick={()=>navigate("/profile")}>
              <img src={userData.image || dp} alt="" className='h-[100%]' />
        </div>

      </div>


      <div className='w-full flex items-center gap-[10px] overflow-y-auto py-[15px]'>

        {!search && <div
         className='w-[60px] h-[60px] rounded-full overflow-hidden flex items-center justify-center bg-white shadow-gray-500 shadow-lg  '
         onClick={() => setSearch(true)}>
              <IoSearch  className='w-[25px] h-[25px] cursor-pointer'/>          
        </div>}

        {search && 

          <form 
            className='w-full h-[60px] flex items-center justify-between bg-white shadow-gray-500 shadow-lg rounded-full gap-[10px] overflow-hidden px-[20px] mt-[10px] relative' >  
            <IoSearch  className='w-[25px] h-[25px]'/>  
            
            <input 
              type="text" 
              placeholder='search users..' 
              className='w-full p-[10px] h-full text-[17px] border-0 outline-none' 
              onChange={(e)=>setInput.target.value}
              value={input}
            />

            <RxCross2 className='w-[25px] h-[25px] cursor-pointer' 
                      onClick={()=>setSearch(false)}/>

              
          </form>}


        {!search && 
          otherUsers?.map((user) => (


            onlineUsers?.includes(user._id) &&

              <div className=' flex relative rounded-full  shadow-gray-500 shadow-lg justify-center items-center mt-[10px] cursor-pointer'
                   onClick={()=>dispatch(setSelectedUser(user))}>    
                <div
                  key={user._id} // 🗝️ unique key from database (_id)
                  className='w-[60px] h-[60px] rounded-full overflow-hidden flex items-center justify-center'
                >
                  <img src={user.image || dp} alt="" className='h-[100%]' />
          
                </div>
                 <span className='w-[12px] h-[12px] rounded-full bg-green-800 absolute bottom-[6px] right-[-1px]  shadow-gray-500 shadow-md'></span>
              </div>
        ))}


          
      </div>
    </div>


      <div className='w-full h-[60%] flex flex-col overflow-auto justify-center  items-center gap-[20px]  mt-[20px] '>

        {otherUsers?.map((user) => (
          <div key={user._id}
               className='w-[95%] h-[60px] flex  items-center bg-white  shadow-gray-500 shadow-lg  rounded-full gap-[20px] cursor-pointer hover:bg-orange-300'
               onClick={()=>dispatch(setSelectedUser(user))} // 🗝️ set the selected user for chat
          >
           
            <div className='flex relative rounded-full  shadow-gray-500 shadow-lg mt-[10px] '>    
              <div
                key={user._id} // 🗝️ unique key from database (_id)
                className='w-[60px] h-[60px] rounded-full overflow-hidden flex items-center justify-center'
              >

                <img src={user.image || dp} alt="" className='h-[100%]' />
          
              </div>

              {onlineUsers?.includes(user._id) &&

                <span className='w-[12px] h-[12px] rounded-full bg-green-800 absolute bottom-[6px] right-[-1px]  shadow-gray-500 shadow-md'></span>}
            </div>
              <h1>{user.name || user.userName}</h1>
        
          </div>
         
        ))}
      </div>
      
      
    </div>
  )
}

export default SideBar

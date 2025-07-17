import React, { useEffect } from 'react'
import axios from 'axios';
import dp from '../assets/dp.png' 
import { IoCameraOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useRef } from 'react';

import {setUserData} from '../redux/userSlice'; 
import { serverURL } from '../main';


function Profile() {
    const {userData} = useSelector(state => state.user) 
    const navigate = useNavigate(); 
    const [name, setName]=useState(userData.name || "");
    const [frontImage,setFrontImage]=useState(userData?.image ? userData.image : dp)  
    const [backImage,setbackImage]=useState(null)

    const dispatch = useDispatch(); 
    const image=useRef();
    const [saving, setSaving] = useState(false); 

    const handleImg=(e)=>{
        const file = e.target.files[0]; 
        if (file) {
            setbackImage(file)
            setFrontImage(URL.createObjectURL(file)); 
        }
    }

    useEffect(() => {
  if (userData?.image) {
    setFrontImage(userData.image); // set image from server if available
  }
}, [userData]);

    const handleProfile= async(e)=>{
        setSaving(true); 
        e.preventDefault(); 
        try{
            const formData = new FormData(); 
            formData.append("name", name); 
            if(backImage){ 
                formData.append("image", backImage); 
            }

            const response = await axios.put(`${serverURL}/api/user/profile`, formData,
                 {withCredentials: true});
                 setSaving(false);
                 dispatch(setUserData(response.data)); 
                 navigate("/");
        } catch(error){
            console.log(error)
            setSaving(false); 
        }

    }


  return (
    <div className='w-full h-[100vh] bg-slate-300 flex flex-col items-center justify-center gap-[20px] '>
        <div className='fixed top-[20px] left-[20px] '>
            <IoMdArrowBack
             className='w-[50px] h-[50px] text-gray-600 cursor-pointer '
             onClick={()=> navigate("/")}
            />
        </div>

        <div 
         className='w-[200px] h-[200px] bg-white rounded-full border-4 border-orange-400 shadow-gray-400 shadow-lg relative '
         onClick={()=>image.current.click()}
         >

          <div className='w-full h-full flex items-center justify-center '>
              <img src={frontImage || dp} alt="profile" className='w-full h-full rounded-full object-cover' />

          </div>
            <div className='absolute bottom-4 text-gray-700 right-4 w-[35px] h-[35px] bg-orange-300 rounded-full flex items-center justify-center cursor-pointer'>
             <IoCameraOutline  className=' text-gray-700 w-[25px] h-[25px]'/>
            </div>

        </div>


        <form 
         className='w-[95%] max-w-[500px] h-[300px] flex flex-col gap-[20px] items-center justify-center '
         onSubmit={handleProfile}
        >
            <input
              type="file"
              accept='image/*'
              ref={image}
              hidden
              onChange={handleImg}
            />

            <input 
             type="text"
             placeholder='Enter your name'
             className='w-[90%] h-[50px] outline-none border-2 border-orange-300 px-[20px] py-[10px] bg-[white]
                        rounded-lg hadow-gray-400 shadow-lg text-gray-800 text-[19px]'
             onChange={(e)=>setName(e.target.value)}
             value={name}
            />

            <input
             type="text"
             readOnly
             className='w-[90%] h-[50px] outline-none border-2 border-orange-300 px-[20px] py-[10px] bg-[white]
                        rounded-lg hadow-gray-400 shadow-lg text-gray-400 text-[19px]'
             value={userData ? userData.userName : "Username not found"}
            />

            <input
             type="email"
             readOnly 
             className='w-[90%] h-[50px] outline-none border-2 border-orange-300 px-[20px] py-[10px] bg-[white]
                        rounded-lg hadow-gray-400 shadow-lg text-gray-400 text-[19px]'
             value={userData ? userData.email : "Email not found"}
            />

            <button
              className='px-[20px] py-[10px] bg-orange-300 rounded-2xl shadow-gray-400 shadow-lg text-[20px] w-[200px] 
                         mt-[20px] font-semibold hover:shadow-inner'
              disabled={saving} >
               {saving ? "Saving..": "Save Profile"}</button>
        </form>
    </div>
  )
}

export default Profile

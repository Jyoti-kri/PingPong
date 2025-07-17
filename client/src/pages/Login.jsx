import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { serverURL } from '../main';
import { useDispatch,useSelector } from 'react-redux';
import { setSelectedUser, setUserData } from '../redux/userSlice'; 

function Login() {
  const navigate=useNavigate();
    const [show, setShow]=useState(false)

    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("")
     const[loading,setLoading]=useState(false)
    const[error,setError]=useState(false)
    const dispatch=useDispatch();
    



    const handleLogin= async(e)=>{
        e.preventDefault();   
        setLoading(true)
        try{
            const response= await axios.post(`${serverURL}/api/auth/login`,{
                email,password
            },{withCredentials:true}) 
            dispatch(setUserData(response.data)) 
            dispatch(setSelectedUser(null))
            navigate("/")
            setEmail("")
            setPassword("")
            setLoading(false)
            setError("")
        } catch(error){
            console.log(error)
            setLoading(false)
            setError(error.response.data.message)
        }
    }



  return (
    <div className='w-full h-[100vh] bg-slate-300 flex items-center justify-center '>
        <div className='w-full max-w-[500px] h-[600px] bg-white rounded-lg shadow-gray-400 shadow-lg flex flex-col gap-[30px]'>
            <div className='w-full h-[200px] bg-orange-200 rounded-b-[30%] shadow-gray-400 shadow-lg flex items-center justify-center'>
                <h1 className='text-gray-800 font-bold text-[30px]'>Login to <span className='text-gray-950'>PingPong</span></h1>
            </div>
            
            <form
             className='w-full flex flex-col gap-[20px] items-center'
             onSubmit={handleLogin}
            >

                
                <input
                 type="email"
                 placeholder='email'
                 className='w-[90%] h-[50px] outline-none border-2 border-orange-300 px-[20px] py-[10px] bg-[white]
                 rounded-lg hadow-gray-400 shadow-lg text-gray-800 text-[19px]'
                 onChange={(e)=>setEmail(e.target.value)}
                 value={email}
                />

                <div className='w-[90%] h-[50px] border-2  border-orange-300 overflow-hidden rounded-lg  shadow-gray-400 shadow-lg relative'>
                <input
                 type={`${show ? "text":"password"}`}
                 placeholder='password'
                 className='w-[90%] h-[50px] outline-none  px-[20px] py-[10px] bg-[white]
                 text-gray-800 text-[19px]'
                 onChange={(e)=>setPassword(e.target.value)}
                 value={password}
                />
                 <span className='absolute top-[10px] right-[10px] text-orange-800 text-[19px] font-semibold cursor-pointer'
                  onClick={()=> setShow(prev=>!prev)}>{`${show? "hidden": "show"}`}</span>

                </div>

                {error && <p className='text-red-500'>{error}</p>}

                <button className='px-[20px] py-[10px] bg-orange-300 rounded-2xl shadow-gray-400 shadow-lg text-[20px] w-[200px] 
                        mt-[20px] font-semibold hover:shadow-inner'
                        disabled={loading}
                        >
                    {loading ? "Loading...":"Login "}
                </button>
                <p className=''>Want to Create a new Account ? <span className='text-blue-400 text-[bold] cursor-pointer' onClick={()=>navigate("/signup")}>Sign Up</span></p>

                     
            </form>

        </div>
      
    </div>
  )
}

export default Login

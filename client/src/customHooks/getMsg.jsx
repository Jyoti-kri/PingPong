import axios from "axios";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { serverURL } from "../main";
//import { setOtherUsers } from "../redux/userSlice";
import { useEffect } from "react";
import { setMessages } from "../redux/msgSlice";

const getMsg = () => {
    const dispatch = useDispatch();
    const {userData,selectedUser}=useSelector(state=>state.user)
    useEffect(()=>{
         if (!selectedUser?._id) return;
        const fetchMsg=async()=>{
            try{
                const response=await axios.get(`${serverURL}/api/message/get/${selectedUser._id}`,{withCredentials:true})
                dispatch(setMessages(response.data)) // store the user data in redux store
            } catch(error){
                console.log("Error fetching current user:", error);
            }
        }
        fetchMsg();
    },[selectedUser,userData])
}

export default getMsg;
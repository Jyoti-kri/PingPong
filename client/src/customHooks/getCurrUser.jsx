import axios from "axios";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { serverURL } from "../main";
import { setUserData } from "../redux/userSlice";
import { useEffect } from "react";

const getCurrUser = () => {
    const dispatch = useDispatch();
    const {userData}=useSelector(state=>state.user)
    useEffect(()=>{
        const fetchUser=async()=>{
            try{
                const response=await axios.get(`${serverURL}/api/user/curruser`,{withCredentials:true})
                dispatch(setUserData(response.data)) // store the user data in redux store
            } catch(error){
                console.log("Error fetching current user:", error);
            }
        }
        fetchUser();
    },[])
}

export default getCurrUser;
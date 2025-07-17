import axios from "axios";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { serverURL } from "../main";
import { setOtherUsers } from "../redux/userSlice";
import { useEffect } from "react";

const getOtherUsers = () => {
    const dispatch = useDispatch();
    const {userData}=useSelector(state=>state.user)
    useEffect(()=>{
        const fetchUser=async()=>{
            try{
                const response=await axios.get(`${serverURL}/api/user/otheruser`,{withCredentials:true})
                dispatch(setOtherUsers(response.data)) // store the user data in redux store
            } catch(error){
                console.log("Error fetching current user:", error);
            }
        }
        fetchUser();
    },[userData])
}

export default getOtherUsers;
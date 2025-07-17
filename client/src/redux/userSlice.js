import { createSlice } from '@reduxjs/toolkit';

const userSlice=createSlice({
    name:"user",
    initialState:{
        userData:null,
        otherUsers:null,
        selectedUser:null, // This will hold the user that is selected for chat
        socket:null,
        onlineUsers:null, // This will hold the online users
        searchData:null
       
    },
    reducers:
    {
       setUserData:(state,action)=>{
            state.userData=action.payload;
       },
         // This reducer is used to set the other users data
       setOtherUsers:(state,action)=>{
            state.otherUsers=action.payload;
       },
       setSelectedUser:(state,action)=>{
            state.selectedUser=action.payload;
       },
       setSocket:(state,action)=>{
            state.socket=action.payload;
       },
       setOnlineUsers:(state,action)=>{
            state.onlineUsers=action.payload;
       },

        setSearchData:(state,action)=>{
            state.searchData=action.payload;
       },
    }
})

export const {setUserData,setOtherUsers,setSelectedUser,setOnlineUsers,setSocket,setSearchData}=userSlice.actions;
export default userSlice.reducer;
   
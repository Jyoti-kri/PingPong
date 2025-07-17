import { createSlice } from '@reduxjs/toolkit';

const msgSlice=createSlice({
    name:"user",
    initialState:{
        
        messages:[], // This will hold the user that is selected for chat
       
    },
    reducers:
    {
       setMessages:(state,action)=>{
            state.messages=action.payload;
       },
         // This reducer is used to set the other users data
     
    }
})

export const {setMessages}=msgSlice.actions;
export default msgSlice.reducer;
import React from 'react'
import SideBar from '../components/SideBar'
import MessageArea from '../components/MessageArea'
import { useSelector } from 'react-redux'
import getMsg from '../customHooks/getMsg';

function Home() {

  const {selectedUser} = useSelector((state) => state.user); 
  getMsg();
  return (
    <div className='w-full h-[100vh] flex overflow-hidden' >
     <SideBar />
     <MessageArea/>
    </div>
  )
}

export default Home

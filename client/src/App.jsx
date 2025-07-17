import React, { useEffect } from 'react';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import { Navigate, Route, Routes } from 'react-router-dom';
import getCurrUser from './customHooks/getCurrUser';
import { useDispatch, useSelector } from 'react-redux';
import Home from './pages/Home';
import Profile from './pages/Profile';
import getOtherUsers from './customHooks/getOtherUsers';
import { io } from 'socket.io-client';
import { serverURL } from './main';
import { setOnlineUsers, setSocket } from './redux/userSlice';

function App() {
  // Load user and other users
  getCurrUser();  
  getOtherUsers();

  const { userData,socket,onlineUsers } = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userData?._id) return;

    // Connect socket
    const socketio = io(`${serverURL}`, {
      query: {
        userId: userData._id,
      },
    });

    // Store socket in Redux
    dispatch(setSocket(socketio));

    // Handle online users update
    socketio.on("getOnlineUsers", (users) => {
      dispatch(setOnlineUsers(users));
    });

    // Optional: Cleanup socket on component unmount
    return () => socketio.close();
  }, [userData]);

  return (
    <Routes>
      <Route path="/login" element={!userData ? <Login /> : <Navigate to="/" />} />
      <Route path="/signup" element={!userData ? <SignUp /> : <Navigate to="/profile" />} />
      <Route path="/" element={userData ? <Home /> : <Navigate to="/login" />} />
      <Route path="/profile" element={userData ? <Profile /> : <Navigate to="/signup" />} />
    </Routes>
  );
}

export default App;




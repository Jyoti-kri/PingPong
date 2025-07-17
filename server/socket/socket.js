const http= require('http');
const express = require('express');
const app = express();
const socketIo = require('socket.io');
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "https://pingpong-masz.onrender.com",                               
        
    }
});

const userSocketMap = new Map(); // To keep track of user sockets   

io.on('connection', (socket) => {

    const userId = socket.handshake.query.userId;

   if (userId) {
    userSocketMap.set(userId, socket.id); 
    console.log(`User connected: ${userId} (${socket.id})`);
  }

 io.emit("getOnlineUsers", Array.from(userSocketMap.keys())); // Emit online users to all clients

   

     socket.on('disconnect', () => {
    if (userId) {
      userSocketMap.delete(userId); // properly remove from Map
      console.log(` User disconnected: ${userId}`);
      io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));
    }
  });
})


const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId]; // Retrieve the socket ID for the receiver
}


module.exports = {app, server ,io, getReceiverSocketId};








// methods: ["GET", "POST"],
        // credentials: true

         //console.log('New client connected',socket.id);

    //io.emit('hello', 'Welcome to the server!');

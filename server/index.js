require('dotenv').config();
const express=require('express');
const connectDb = require('./config/db');
const authRouter = require('./routes/auth.routes');
const userRouter = require('./routes/user.routes');
const cookieParser = require('cookie-parser');

//const  app=express();


const cors=require("cors");
const messageRouter = require('./routes/message.routes');
const { app, server } = require('./socket/socket');

//used by socket.io to connect with the server
app.use(cors({
    origin:"https://pingpong-masz.onrender.com",
    credentials:true
}))

app.use(express.json());   // this is used to get the req.body 
app.use(cookieParser())
app.use("/api/auth",authRouter);
app.use("/api/user",userRouter)

app.use("/api/message",messageRouter)



const PORT=5000

app.get("/",(req,res)=>{
    res.send("hello");
})

server.listen(PORT,()=>{
    connectDb();
    console.log(`server is  running at port :${PORT}`)
})



/*
//const port=process.env.PORT || 5000
app.listen(port,()=>{
    console.log("server is  running")
}) */

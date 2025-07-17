const express=require('express');
const isAuth = require('../middlewares/isAuth');
const upload = require('../middlewares/multer');
const {sendMessage} = require('../controllers/message.controller');
const { getMessages } = require('../controllers/message.controller');



const messageRouter=express.Router();

messageRouter.post("/send/:receiver",isAuth,upload.single("image"),sendMessage);
messageRouter.get("/get/:receiver",isAuth,getMessages);


module.exports=messageRouter;
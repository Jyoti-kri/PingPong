const express=require('express');
const {getCurrentuser,editProfile, getOtherusers,search} = require('../controllers/user.controllers');
const isAuth = require('../middlewares/isAuth');
const upload = require('../middlewares/multer');

const userRouter=express.Router();


userRouter.get("/curruser",isAuth, getCurrentuser);

userRouter.put("/profile",isAuth,upload.single("image") ,editProfile);

userRouter.get("/otheruser",isAuth, getOtherusers);

userRouter.get("/search",isAuth, search);

module.exports=userRouter;
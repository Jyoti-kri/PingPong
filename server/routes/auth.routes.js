const express=require('express');
const {SignUp,login,logOut}=require("../controllers/auth.controllers")

const authRouter=express.Router();

authRouter.post("/signup",SignUp);
authRouter.post("/login",login);
authRouter.get("/logout",logOut);

module.exports=authRouter;
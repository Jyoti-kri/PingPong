const genToken=require("../config/token")

const User=require("../models/user.model")
const bcrypt=require('bcrypt')
const SignUp=async(req,res)=>{
   try{
    const {userName,email,password}=req.body;

    const checKUserName= await User.findOne({userName});
    if(checKUserName){
        return res.status(400).json({message:"username already exist"})
    }
    
    const checKEmail= await User.findOne({email});
    if(checKEmail){
        return res.status(400).json({message:"email already exist"})
    }
    if(password.length<6){
        return res.status(400).json({message:"password must be at least 6 characters"})
    }
    const hashPassword=await bcrypt.hash(password,10)
    
    const user=await User.create({
        userName,email,password:hashPassword
    })

    const token= await genToken(user._id)  //_id of mongodb id  to verigy the user 

    res.cookie("token",token,{
        httpOnly:true,
        maxAge:30*24*60*1000,
        //sameSite:"None", // not none
          sameSite:"None", // this is used to prevent the cross site request forgery
        secure:true    //now used http ..when we do true it runs on https
    })
    return res.status(201).json(user);
   } catch(error){
      console.error("Signup error:", error); // log in terminal
      res.status(500).json({ message: "Internal server error" });
   }
}


const login=async(req,res)=>{
   try{
    const {email,password}=req.body;
    
    const user= await User.findOne({email});
    if(!user){
        return res.status(400).json({message:"user doesn't exist"})
    }


    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
         return res.status(400).json({message:"incorrect password"})
    }
    

    const token= await genToken(user._id)  //_id of mongodb id

    res.cookie("token",token,{
        httpOnly:true,
        maxAge:30*24*60*1000,
        //sameSite:"None",
        sameSite:"None", // this is used to prevent the cross site request forgery
        secure:true   //now used http ..when we do true it runs on https
    })
    return res.status(201).json(user);
   } catch(error){
      return res.status(500).json({message:`login error ${error}`})
   }
}

const logOut=async (req,res)=>{
    try{
        res.clearCookie("token");
        return res.status(200).json({message:"log out successfully"})
    } catch(error){
        return res.status(500).json({message:`logOut error ${error}`})
    }
}

module.exports={SignUp,login,logOut};

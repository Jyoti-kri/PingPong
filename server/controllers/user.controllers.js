const uploadOnCloudinary = require("../config/cloudinary")
const User =require("../models/user.model")

const getCurrentuser=async (req,res)=>{
    try{
        const userId=req.userId
        const user=await User.findById(userId).select("-password")
        if(!user){
            return res.status(400).json({message : "user not found"})
        }
        return res.status(200).json(user)
    } catch(error){
         return res.status(500).json({message :`current user error ${error}`})
    }
}

const editProfile=async(req,res)=>{
    try{
        const {name}=req.body;
        let image;
        if(req.file){
            image= await uploadOnCloudinary(req.file.path)
        }

        const user=await User.findByIdAndUpdate(req.userId,{
            name,
            image
        },{new:true,runValidators:true}).select("-password")

        if(!user){
            return res.status(400).json({message:"user not found"})
        }

        return res.status(200).json(user)
    }catch(error){
         return res.status(500).json({message :`profile error ${error}`})
    }
}


const getOtherusers=async (req,res)=>{
    try{
      const users=await User.find({_id:{$ne:req.userId}}).select("-password")
        if(!users){
            return res.status(400).json({message : "user not found"})
        }
        return res.status(200).json(users)
    }
 catch(error){
    return res.status(500).json({message :`current other user error ${error}`}) 
}  
}


const search=async(req,res)=>{
    try{

        const {query}=req.query;
        if(!query){
            return res.status(400).json({message:"query is requires"})
        }

        const users=await User.find({
            $or:[
                {name:{$regex:query,$options:"i"}},
                {userName:{$regex:query,$options:"i"}}
            ]
        })
        return res.status(200).json(users)
    }catch(error){
            return res.status(500).json({message :`search user error ${error}`}) 
    }
}
module.exports={getCurrentuser,editProfile,getOtherusers,search}
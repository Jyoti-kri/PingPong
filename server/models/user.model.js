const mongoose=require('mongoose');
//timestamp to find when usee created
const userSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    userName:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        default:" "
    }
},{timestamps:true});

const User=mongoose.model("User",userSchema);
module.exports=User;

const jwt=require('jsonwebtoken');
const genToken=async(userId)=>{
    try{
        const token=await jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"30d"}) ;
        return  token;   // sign=assign then write secret and then expire the token
    } catch(error){
        console.log("gen token error")
    }
}

module.exports=genToken;
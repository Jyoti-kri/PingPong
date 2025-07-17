const mongoose=require('mongoose')

const connectDb=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("db connected");
    } catch(error){
       console.log("db faileed",error);
    }
}
module.exports =connectDb;
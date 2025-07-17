const mongoose=require('mongoose');

const convoSchema=new mongoose.Schema({
    participants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
        //required:true
    }],
    messages:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Message'
    
    }]
},{timestamps:true});

// The 'participants' field is an array of ObjectIds that reference the User model.
// The 'messages' field is an array of strings that will hold the messages exchanged in the
const Convo=mongoose.model("Convo",convoSchema);
module.exports=Convo;
const uploadOnCloudinary = require("../config/cloudinary");
const Convo = require("../models/convo.model");
const Message = require("../models/message.model");
const { getReceiverSocketId } = require("../socket/socket");

const sendMessage = async (req,res) => {
   
     try{

        const sender = req.userId; 
        const {receiver} = req.params; 
        const {message} = req.body; 
        let image;
        if(req.file){
            const uploaded = await uploadOnCloudinary(req.file.path); 
            image = uploaded?.secure_url;
        } 
         let convo=await Convo.findOne({
            participants: {
                $all: [sender, receiver]
            }
         })
           
        const newMessage=await Message.create({
            sender,
            receiver,
            message,
            image
        })
        if(!convo){
            await Convo.create({
                participants: [sender, receiver],
                messages: [newMessage._id]
            })
        }else{
                convo.messages.push(newMessage._id); // add the new message to the convo
                await convo.save(); // save the convo
            }


        // Emit the new message to the receiver's socket
        const receiverSocketId = getReceiverSocketId(receiver);

        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage); // Emit the new message to the receiver's socket
        }
    
        return res.status(201).json({message:"Message sent successfully",newMessage}); // send success response
    }catch(error){
        console.log(error);
        return res.status(500).json({message:`send message error: ${error}`}); // send error response
    }

}

const getMessages = async (req, res) => {
    try {
       
        const sender=req.userId;
        const {receiver} = req.params;
        // Find the conversation between the sender and receiver
        const convo = await Convo.findOne({
            participants: { $all: [sender, receiver] }
        }).populate('messages'); // Populate messages in the conversation

        if (!convo) {
            return res.status(404).json({ message: "Conversation not found" });
        }

        return res.status(200).json(convo?.messages); // Return the messages in the conversation
    } catch (error) {
        console.error(error);
       return res.status(500).json({message:`get message error: ${error}`});
    }
}
module.exports={sendMessage,getMessages};
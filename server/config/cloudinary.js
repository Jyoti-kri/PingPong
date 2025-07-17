const cloudinary = require('cloudinary').v2;
const fs=require('fs');


const uploadOnCloudinary = async (filePath) => {
     cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.API_KEY, 
        api_secret: process.env.API_SECRET // Click 'View API Keys' above to copy your API secret
    });

    try{

        const uploadResult = await cloudinary.uploader.upload(filePath)
        fs.unlinkSync(filePath); // Delete the file from local storage after upload
      return uploadResult.secure_url; // Return the secure URL of the uploaded image


    } catch(error){
        fs.unlinkSync(filePath)
        console.log(error)
    }
}

module.exports=uploadOnCloudinary;   // multer middle ware to request .file in public folder

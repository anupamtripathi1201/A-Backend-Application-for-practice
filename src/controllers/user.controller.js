import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import { APIResponse } from "../utils/APIResponse.js";

const registerUser = asyncHandler( async (req,res)=>{
   //we need to take input from the frontend

   const { fullName , username , email , password} = req.body;

   //we need to validate all 4 informations as all are required

   if(
    [fullName,username,email,password].some((field)=>field?.trim()=="" )
   ){
    throw new ApiError(400,"All fields are mandatory");
   }

   //now we need to check if the user exists or not
   const userExisted = User.findOne({
    $or : [{ username },{ email }]
   })

   if(userExisted){
    throw new ApiError(409,"Username or email already exists!");
   }

   //now we have to check for the avatar and cover images which will be stored on local servers using multer and from there we can upload it on cloudnary or any third party application.....

   //now we have to store these information in our database...
  const user = await  User.create({
    fullName,
    username,
    email,
    password :  password.toLowerCase()
   });

   //now we need to remove the password and refreshToken field

   const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
   )
   if(!createdUser){
    throw new ApiError(500,"Something went wrong while creating the profile!");
   }


   //now we need to send these data to user!!!!!

   return res.status(200).json(
    new APIResponse(200,createdUser,"User Successfully Created!")
   );




});


export {registerUser};
import mongoose  from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";


const userSchema =new  mongoose.Schema({

    username : {
        type : String,
        required : true,
        lowercase : true,
        unique : true,
        index : true
    },

    email : {
        type : String,
        required : true,
        lowercase : true,
        unique : true,
        
    },

    fullName : {
        type : String,
        required : true,
        index : true
    },

    avatar : {
        type : String,
        required : true

    },

    coverImage : {
        type : String,

    },

    watchHistory : [
        {
            
            type : mongoose.Schema.Types.ObjectId,
            ref : "Video"

        }


    ]
,
password : {
    type : String,
    required : true
    
},

refreshToken : {
    type : String
}





},{
    timestamps : true
    
})


userSchema.pre("save",async function (next){
    if(this.isModified("password")){
        this.password = bcrypt.hash(this.password,10);
        next();
    }
    return next();
})

userSchema.methods.comaprePasswords = async function(password){
    return await bcrypt.compare(password,this.password);
}


userSchema.methods.generateAccessToken = function(){
    return jsonwebtoken.sign({
        _id : this._id,
        email : this.email
    },process.env.ACCESS_TOKEN_SECRET,{
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    })


}

userSchema.methods.generateRefreshToken = function(){
    return jsonwebtoken.sign({
        _id : this._id
    },process.env.REFRESH_TOKEN_SECRET,{
        expiresIn : process.env.REFRESH_TOKEN_EXPIRY
    })



}
export const User = mongoose.model("User",userSchema);
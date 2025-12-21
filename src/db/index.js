import dotenv from 'dotenv'

dotenv.config()

import mongoose  from "mongoose";
import { DBNAME } from "../constants.js";


const connectDB =async ()=>{
   try {
    const connection = await mongoose.connect(`${process.env.MONGODB_URI}/${DBNAME}`);
    console.log(`MONGO DB connected at ${connection.connection.host}`);

    
   } catch (error) {
    console.log(error);
    process.exit(1);
    
   }
    

}

export default connectDB;
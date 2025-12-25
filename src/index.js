import dotenv from 'dotenv'

dotenv.config()

import express from "express";
import connectDB from "./db/index.js";
import { app }  from './app.js';



connectDB()
.then(()=>{
app.listen(process.env.PORT,()=>{
    console.log.apply(`app is live at ${process.env.PORT}`)
});


})
.catch((err)=>{
    console.log(err);

});

// const app = express();

// (async ()=>{

//     try {

//        await  mongoose.connect(`${process.env.MONGODB_URI}/${DBNAME}`);
//         app.on("error",(error)=>{
//             console.log("error: ",error);
//             throw error;
//         });

//         app.listen(process.env.PORT,()=>{
//             console.log(`App is live on ${process.env.PORT}`);
//         });

        
//     } catch (error) {
//         console.log(error);
//         throw error;
//     }


// })()
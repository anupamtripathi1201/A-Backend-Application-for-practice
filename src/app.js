import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import dotenv from "dotenv";
dotenv.config();


const app = express();

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}));

app.use(express.json({
    limit : "20kb"
}));

app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(cookieParser());


//importing routes

import userrouter from "./routes/user.routes.js";



app.use('api/v1/user',userrouter)
//when this hits the control us passed to the user router 
//uptill this point our url/uri/urn could be https://localhost:3000/api/v1/user.......(now it can go whatever it want to but now the control is given to the user.router.js file)

export { app };
import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()
const mongoURL = process.env.MONGODBCONNECTIONSTRING 
const ConnectDB = async()=>{
    try {
       const connection  = await mongoose.connect(mongoURL)
       console.log("Mongo-DB Connected Successfully"); 
    } catch (error) {
       console.log(error);
    }
}

export default ConnectDB;
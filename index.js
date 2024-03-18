import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import ConnectDB from './Database/COnfig.js'
import UserRouter from './Routers/User.Router.js'


dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
const port = process.env.PORT

ConnectDB();

app.use('/api/user',UserRouter) //Base Api 

app.listen(port,()=>{
    console.log("App is Listening in this Port-",port);
})


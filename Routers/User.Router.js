import express from 'express'
import { ListAllUsers, LoginUser, RegisterUser, forgotPassword, resetPassword } from '../Controllers/User.Controller.js'

const UserRouter = express.Router()

UserRouter.get('/allusers',ListAllUsers)
UserRouter.post('/register',RegisterUser)
UserRouter.post('/login',LoginUser)
UserRouter.post('/forgotpassword',forgotPassword)
UserRouter.put('/resetpassword',resetPassword)
export default UserRouter;

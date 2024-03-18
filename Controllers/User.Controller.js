import bcrypt from 'bcrypt'
import User from '../Models/User.Schema.js';
import { generateRandomString } from '../Utils/RandomString.js';
import { sendMail } from '../Utils/SendMail.js';
import dotenv from 'dotenv'

dotenv.config()

export const RegisterUser = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const hashPassword = await bcrypt.hash(password, 10)
        
        const user = await User.findOne({ username });
        // if the user exists, return an error
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const newUser = new User({ username, email, password: hashPassword })
        await newUser.save()
        res.status(200).json({ message: "Register Successfull", data: newUser })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Register Failed" })
    }
}

export const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const findUser = await User.findOne({ email })

        if (!findUser) {
            return res.status(401).json({ message: "User Not Found" })
        }
        const passwordMatch = await bcrypt.compare(password, findUser.password)
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid Password" })
        }
        res.status(200).json({ message: "Login Successfull" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Login Failed" })
    }
}

export const ListAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find();

        res.status(200).json({
            message: "All Users Fetched Successfully",
            data: allUsers
        })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const forgotPassword = async (req, res) => {
    try {
        // Check the user exits in DB
        let userExists = await User.findOne({ email: req.body.email });
        if (userExists && req.body.email !== "") {
            const tokenString = generateRandomString(20)
            const mailId = req.body.email

            // Reset Link
            // const BaseUrl = 'http://localhost:3000/resetpassword'
            // const  resetLink = BaseUrl
            const resetLink = `${process.env.Reset_Link}?token=${tokenString}&email=${mailId}`
            const message = `
            <p>Hello ${userExists.username},</p>
                <p>You have requested to reset your password. Click the button below to reset it:</p>
                <a href="${resetLink}">
                  <button style="padding: 10px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">
                    Reset Your Password
                  </button>
                </a>
            `;
            sendMail(req.body.email,message)

            // Update the DB with Random string
            await User.updateOne(
                {email:req.body.email},
                {randomString:tokenString}
            );
            
            // status Send
            res.status(201).send({
                message:"Reset Link Sended to your Mail-Id"
            });
        }else{
            res.status(400).send({message:`User ${req.body.email} does not exits`})
        }
    } catch (error) {
        res.status(500).send({
            message :"Internal Server Error",
            error:error.message
        })
    }
};




export const resetPassword = async (req, res) => {
  try {
    let user = await User.find({ email: req.body.email });
    if (user) {
        
      const password = req.body.password;
      const confirmPassword = req.body.confirmPassword;
      const equalPassword = password === confirmPassword;
      const hashedPassword = await bcrypt.hash(password, 10);
      if (equalPassword && password !== "" && confirmPassword !== "") {
        await User.updateOne(
          { email: req.body.email },
          { password: hashedPassword }
        );
        await User.updateOne(
          { email: req.body.email },
          { $unset: { randomString: 1 } }
        );
        res.status(200).json({message:"Updated successfully"});
      } else {
        res.status(400).json({message:"Password and confirm password doesnt match"});
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
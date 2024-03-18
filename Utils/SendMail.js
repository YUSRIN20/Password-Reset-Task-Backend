import dotenv from 'dotenv'
import nodemailer from 'nodemailer'


dotenv.config()

export const sendMail = async(mailReceiver,message) =>{
    try {
        let transport = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.EmailId,
                pass:process.env.EmailAppCode,
            },
        });
        
        // Email Content
        const mailOptions = {
            from:process.env.EmailId,
            to:mailReceiver,
            subject:"Password Reset",
            html:message
        }
        
        // Send mail
        const info = await transport.sendMail(mailOptions)
        console.log("Email sent:" + info.response)
    } catch (error) {
        console.log("Error sending Email:",error);
    }
}
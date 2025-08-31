import CustomerModel from "../models/customerModel.js";
import bcryptjs from "bcryptjs";
import sendEmail from "../config/sendEmail.js";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import generatedAccessToken from "../utils/generateAccessToken.js";
import genertedRefreshToken from "../utils/generateRefreshToken.js";
export async function registerUserController(request, response) {
    try {
        const { name, email, phone, role, preferred_language, password } = request.body;

        if (!name || !email || !password || !phone || !role || !preferred_language) {
            return response.status(400).json({
                message: "Please provide name, email, phone, password, role, and preferred language",
                error: true,
                success: false
            });
        }

        const user = await CustomerModel.findOne({ email });

        if (user) {
            return response.json({
                message: "Email is already registered",
                error: true,
                success: false
            });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);

        const payload = { name, email, phone, role, preferred_language, password: hashPassword };
        const newUser = new CustomerModel(payload);
        const savedUser = await newUser.save();

        // send verify email
        const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${savedUser._id}`;

       const verifyEmail= await sendEmail({
            sendTo: email,
            subject: "Verify email from PharmaPlus",
            html: verifyEmailTemplate({ name, url: VerifyEmailUrl })
        });

        return response.json({
            message: "User registered successfully",
            error: false,
            success: true,
            data: savedUser
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}


export async function verifyEmailController(request,response){
    try {
        const { code } = request.body

        const user = await CustomerModel.findOne({ _id : code})

        if(!user){
            return response.status(400).json({
                message : "Invalid code",
                error : true,
                success : false
            })
        }

        const updateUser = await CustomerModel.updateOne({ _id : code },{
            verify_email : true
        })

        return response.json({
            message : "Verify email done",
            success : true,
            error : false
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : true
        })
    }
}


//login controller
export async function loginController(request,response){
    try {
        const { email , password } = request.body


        if(!email || !password){
            return response.status(400).json({
                message : "provide email, password",
                error : true,
                success : false
            })
        }

        const user = await CustomerModel.findOne({ email })

        if(!user){
            return response.status(400).json({
                message : "User not register",
                error : true,
                success : false
            })
        }

        if(user.status !== "active"){
            return response.status(400).json({
                message : "Contact to Admin",
                error : true,
                success : false
            })
        }

        const checkPassword = await bcryptjs.compare(password,user.password)

        if(!checkPassword){
            return response.status(400).json({
                message : "Check your password",
                error : true,
                success : false
            })
        }

        const accesstoken = await generatedAccessToken(user._id)
        const refreshToken = await genertedRefreshToken(user._id)




        const updateUser = await CustomerModel.findByIdAndUpdate(user?._id,{
            last_login_date : new Date(),
            refresh_token: refreshToken,
        })

        

        const cookiesOption = {
            httpOnly : true,
            secure : true,
            sameSite : "None"
        }
        response.cookie('accessToken',accesstoken,cookiesOption)
        response.cookie('refreshToken',refreshToken,cookiesOption)

        return response.json({
            message : "Login successfully",
            error : false,
            success : true,
            data : {
                accesstoken,
                refreshToken
            }
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}
//logout controller
export async function logoutController(request,response){
    try {
        const userid = request.userId //middleware

        const cookiesOption = {
            httpOnly : true,
            secure : true,
            sameSite : "None"
        }

        response.clearCookie("accessToken",cookiesOption)
        response.clearCookie("refreshToken",cookiesOption)

        const removeRefreshToken = await CustomerModel.findByIdAndUpdate(userid,{
            refresh_token : ""
        })

        return response.json({
            message : "Logout successfully",
            error : false,
            success : true
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

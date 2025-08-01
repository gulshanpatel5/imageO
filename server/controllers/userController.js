import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";
import userModel from "../models/userModel.js";
import transactionModel from "../models/transactionModel.js";
import razorpay from 'razorpay'

//create token
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
}

//login user
const loginUser = async (req,res) => {
    
    try{
        const {email, password} = req.body;
        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success:false,message: "User does not exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(isMatch){
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
            res.json({success:true,token,user:{name:user.name}});
        }else{
            return res.json({success:false,message: "Invalid credentials"})
        }

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//register user
const registerUser = async (req,res) => {
    
    try{
        const {name, email, password} = req.body;
        //check if user already exists
        if(!name || !email || !password){
            return res.json({success:false,message:"Please fill all fields"})
        }
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"})
        }
        if(!validator.isStrongPassword(password)){  
            return res.json({success:false,message:"Please enter a strong password"})
        }
        






        const salt = await bcrypt.genSalt(10); // the more no. round the more time it will take
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword,
        }
       const newUser = new userModel(userData);
       const user = await newUser.save();
       const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
       res.json({success:true,token,user:{name:user.name}});


    } catch(error){
        console.log(error);
        res.json({success:false,message:error.message});
    }
}

const userCredits = async (req, res) => {
    // this should be passed in the under the try
    try {
        const {userId} = req.body;
        const user = await userModel.findById(userId);
        res.json({ success: true, credits: user.creditBalance, user:{name:user.name} });
       
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching user credits" });
    }   

}
const razorpayInstance = new razorpay ({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
}) ;

const paymentRazorpay = async (req, res) => {
    try {

        const { userId, planId } = req.body
        const userData = await userModel.findById(userId)

        if (!userData || !planId) {
            return res.json({ success: false, message: 'Missing Details' })
        }

        // creating options for razorpay payment
        let credits, plan, amount, date

        switch (planId) {
            case 'Basic':
                plan = 'Basic'
                credits = 25
                amount = 10
                break;
            case 'Advanced':
                plan = 'Advanced'
                credits = 70
                amount = 30
                break;
            case 'Premier':
                plan = 'Premier'
                credits = 150
                amount = 50
                break;
        
            default:
                return res.json({success: false, message: 'plan not found'});
        }

        date = Date.now();

        const transactionData ={
            userId, plan, amount, credits, date
        }

        const newTransaction = await transactionModel.create(transactionData)

        const options = {
            amount:amount * 100,
            currency: process.env.CURRENCY,
            receipt: newTransaction._id,
        }

        await razorpayInstance.orders.create(options, (error, order)=>{
            if (error) {
                console.log(error);
                return res.json({success:false, message:error})
            }
            res.json({success: true, order})
        })


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to verify payment of razorpay
const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

        if (orderInfo.status === 'paid') {
            const transactionData = await transactionModel.findById(orderInfo.receipt)
            if (transactionData.payment) {
                return res.json({success: false, message: 'Payment Failed'})
            }

            const userData = await userModel.findById(transactionData.userId)

            const creditBalance = userData.creditBalance + transactionData.credits
            await userModel.findByIdAndUpdate(userData._id, {creditBalance})
            await transactionModel.findByIdAndUpdate(transactionData._id, {payment:true})
            res.json({ success: true, message: "Credits Added" })
        }
        else {
            res.json({ success: false, message: 'Payment Failed' })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}



export {loginUser, registerUser, userCredits, verifyRazorpay, paymentRazorpay};
// Exporting the functions to be used in the routes
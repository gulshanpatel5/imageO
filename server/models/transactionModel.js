import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    plan: { type: String, required: true, default: true},  
    amount: { type: Number, required: true },
    credits: { type: Number, required: true },
    payment: { type: Boolean,  default: false }, 
    date: { type: Number }
    })
const transactionModel = mongoose.models.transaction || mongoose.model('transaction', transactionSchema);
export default transactionModel; 
// Exporting the user model to be used in other parts of the application
// This model will be used to interact with the 'users' collection in the MongoDB database 

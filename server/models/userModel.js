import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true ,default: true},  
    password: { type: String, required: true },
    creditBalance: { type: Number, default: 5 } // default credit balance for new users,
    })
const userModel = mongoose.model.user || mongoose.model('User', userSchema);
export default userModel; 
// Exporting the user model to be used in other parts of the application
// This model will be used to interact with the 'users' collection in the MongoDB database 

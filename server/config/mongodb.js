// server/config/mongodb.js
// This file is responsible for connecting to the MongoDB database.
import mongoose from "mongoose";

export const  connectDB = async () =>{

    await mongoose.connect('').then(()=>console.log("DB Connected"));
   
}
export default connectDB;


// add your mongoDB connection string above.
// Do not use '@' symbol in your databse user's password else it will show an error.

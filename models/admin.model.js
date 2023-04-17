import mongoose from "mongoose";

 const adminSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        trim : true
    },
    password : {
        type : String,
        require : true
    }
})

export const  Admin = mongoose.model("admin",adminSchema);
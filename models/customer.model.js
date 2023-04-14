import db from "./dbConfig.js"
import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    email:{
        type:String,
       required:true
    },
    password:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"active"
    }
})

export const Customer = mongoose.model("customer",CustomerSchema);
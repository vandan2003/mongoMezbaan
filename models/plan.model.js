import db from "./dbConfig.js";
import mongoose from "mongoose";

const PlanSchema  = new mongoose.Schema({
    planName:{
        type:String,
        required:true,
    },
    duration:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
})

export const Plan = mongoose.model("plan",PlanSchema);
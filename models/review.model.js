import db from "./dbConfig.js";
import mongoose from "mongoose";

const ReviewSchema  = new mongoose.Schema({
    customerId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    restaurantId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    review:{
        type:String,
        required:true
    },
    date:{

        type:String,

        required:true
    },
    time:{
        type:String,
        required:true
    }
})

export const Review = mongoose.model("review",ReviewSchema);
import db from "./dbConfig.js";
import mongoose from "mongoose";

const RatingSchema  = new mongoose.Schema({
    customerId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    restaurantId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    rating:{
        type:Number,
        required:true
    }
})

export const Rating = mongoose.model("rating",RatingSchema);
import db from "./dbConfig.js";
import mongoose from "mongoose";

const VisitSchema = new mongoose.Schema({
    restaurantId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"restaurant"
    },
    customerId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"customer"
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

export const Visit = mongoose.model("visit",VisitSchema);
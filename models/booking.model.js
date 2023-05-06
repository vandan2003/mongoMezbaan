import db from "./dbConfig.js";
import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    customerId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    restaurantId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        default:"Pending"
    },
    extraInfo:{
        type:String,
        allowNull:true
    },
    bookingAmount:{
        type:Number,
        required:true
    },
    totalGuests:{
        type:Number,
        required:true
    }
})


export const Booking  = mongoose.model("booking",BookingSchema);


import db from "./dbConfig.js";
import mongoose from "mongoose";

const FavouriteSchema = new mongoose.Schema({
    customerId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"customer"
    },
    restaurantId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"restaurant"
    }
})

export const Favourite = mongoose.model("favourite",FavouriteSchema);
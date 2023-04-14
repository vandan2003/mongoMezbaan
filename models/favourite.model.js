import db from "./dbConfig.js";
import mongoose from "mongoose";

const FavouriteSchema = new mongoose.Schema({
    customerId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    restaurantId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
})

export const Favourite = mongoose.model("favourite",FavouriteSchema);
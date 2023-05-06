import mongoose from "mongoose";

const ColonySchema = new mongoose.Schema({
    name:{
        type:String
    },
    latitude:{
        type:String
    },
    longitude:{
        type:String
    }
})

export const Colony = mongoose.model("colony",ColonySchema);
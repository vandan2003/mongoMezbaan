import { request, response } from "express";
import { validationResult } from "express-validator";
import { Restaurant } from "../models/restaurant.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { Rating } from "../models/rating.model.js";

export const signuppage = (request, response) => {
    response.render("addRestaurant.ejs");
}

export const signUp = async (request, response) => {
    let errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(403).json({ status: false, errors });
    request.body.images = [];
    request.body.menus = [];
    request.files.map((img) => {
        if (img.fieldname == 'images') {
            request.body.images.push(img.filename);
        }
        else {
            request.body.menus.push(img.filename);
        }
    })

    request.body.password = await bcrypt.hash(request.body.password, await bcrypt.genSalt(10));
    Restaurant.create(request.body)
        .then(res => {
            return response.status(200).json({ status: true, res, msg: "SignUp Success" });
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ status: false, err, msg: 'Something Went Wrong' })
        });
}

export const signIn = async (request, response) => {
    try {
        var rest = await Restaurant.findOne({ email: request.body.email });
        if (!rest)
            return response.status(400).json({ status: false, error: "Not Restaurant Found" });

        var status = await bcrypt.compare(request.body.password, rest.password);
        if (status) {
            let payload = { subject: rest.email };
            let token = jwt.sign(payload, 'fdfxvcvnreorevvvcrerer');
            return response.status(200).json({ status: true, token, result: "Sign In Success" })
        }
        return response.status(400).json({ status: false, error: "Wrong Password" });
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal Server Error" });
    }
}

export const list = (request, response) => {
    Restaurant.find()
        .then(res => {
            if (!res.length)
                return response.status(404).json({ status: false, err: "NOt available" });
            return response.status(200).json({ status: true, res })
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ status: false, err: "Internal Server Error" })
        })
}

export const block = async (request, response) => {
    Restaurant.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(request.params.id) }, { status: "BLOCKED" })
        .then(res => {
            console.log(res);
            return response.status(200).json({ status: true, res });
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ status: false, err });
        })
}

export const deny = async (request, response) => {
    Restaurant.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(request.params.id) }, { status: "DENY" })
        .then(res => {
            return response.status(200).json({ status: true, res });
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ status: false, err });
        })
}

export const active = async (request, response) => {
    Restaurant.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(request.params.id) }, { status: "ACTIVE" })
        .then(res => {
            return response.status(200).json({ status: true, res });
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ status: false, err });
        })
}

export const searchRest = (request, response) => {
    Restaurant.find({
        $or: [
            { 'name': { $regex: '.*' + request.body.key + '.*' } },
            { 'description': { $regex: '.*' + request.body.key + '.*' } },
            { 'address': { $regex: '.*' + request.body.key + '.*' } }
        ]
    })
        .then(res => {
            return response.status(200).json({ status: true, res });
        })
        .catch(err => {
            console.log(err);
            return response.staus(500).json({ status: false, err: "Internal Server Error" })
        })
}

export const rate = async (request, response) => {
    try {
        var rating = await Rating.create(request.body);

        var allratings = await Rating.find({ restaurantId: request.body.restaurantId });
        let sum = 0;
        allratings.map((rate) => {
            sum += rate.rating;
        })
        return response.status(200).json({ status: true, res: await Restaurant.updateOne({ _id: request.body.restaurantId }, { rating: ((sum / allratings.length) / 20).toFixed(1) }) });
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ status: false, err });
    }
}

export const profile = (request, response) => {
    Restaurant.findOne({ _id: request.params.id })
        .then(res => {
            return response.status(200).json({ status: true, res });
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ status: false, err });
        })
}

export const removeImage = async (request, response) => {
    try {
        let restaurant = await Restaurant.findById({ _id: request.body.restaurantId })

        if (!restaurant)
            return response.status(404).json({ status: false, error: "Restaurant not Found" })
        let index = restaurant.images.findIndex((img) => img == request.params.img)
        restaurant.images.splice(index, 1);
        let result = await restaurant.save();
        return response.status(200).json({ status: true, result });
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ status: false, error: "Internal Server Error" })
    }
}

export const removeMenu = async (request, response) => {
    try {
        let restaurant = await Restaurant.findById({ _id: request.body.restaurantId })

        if (!restaurant)
            return response.status(404).json({ status: false, error: "Restaurant not Found" })
        let index = restaurant.menus.findIndex((img) => img == request.params.img)
        restaurant.menus.splice(index, 1);
        let result = await restaurant.save();
        return response.status(200).json({ status: true, result });
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ status: false, error: "Internal Server Error" })
    }
}

export const removeFacility = async (request, response) => {
    try {
        let restaurant = await Restaurant.findById({ _id: request.body.restaurantId })

        if (!restaurant)
            return response.status(404).json({ status: false, error: "Restaurant not Found" })
        let index = restaurant.facilities.findIndex((fac) => fac == request.params.fac)
        restaurant.facilities.splice(index, 1);
        let result = await restaurant.save();
        return response.status(200).json({ status: true, result });
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ status: false, error: "Internal Server Error" })
    }
}

export const removeCuisine = async (request, response) => {
    try {
        let restaurant = await Restaurant.findById({ _id: request.body.restaurantId })

        if (!restaurant)
            return response.status(404).json({ status: false, error: "Restaurant not Found" })
        let index = restaurant.cuisines.findIndex((cuisine) => cuisine == request.params.cuisine)
        restaurant.cuisines.splice(index, 1);
        let result = await restaurant.save();
        return response.status(200).json({ status: true, result });
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ status: false, error: "Internal Server Error" })
    }
}

export const changePassword = async (request, response) => {
    try {
        var restaurant = await Restaurant.findById({ _id: request.body.restaurantId });

        if (!restaurant)
            return response.status(404).json({ status: false, res: "Restaurant not found" });
        restaurant.password = await bcrypt.hash(request.body.newPassword, await bcrypt.genSalt(10));
        let result = await restaurant.save();
        return response.status(200).json({ status: true, res: "Password Changed Successfully", result })
    } catch (err) {
        console.log(err);
        return response.status(500).json({ status: false, error: "Internal Server Error" });
    }
}

export const addImage = async (request, response) => {
    try {
        let restaurant = await Restaurant.findById({ _id: request.body.restaurantId });
        if (!restaurant)
            return response.status(404).json({ status: true, err: "No Restaurant Found" });
        request.files.map(async (img) => {
            await restaurant.images.push(img.filename);
        })
        await restaurant.save();
        return response.status(200).json({ status: true, result: "Image added successfully" });
    } catch (err) {
        console.log(err);
        return response.status(500).json({ status: false, error: "Internal Server Error" })
    }
}


export const addMenu = async (request, response) => {
    try {
        let restaurant = await Restaurant.findById({ _id: request.body.restaurantId });
        if (!restaurant)
            return response.status(404).json({ status: true, err: "No Restaurant Found" });
        request.files.map(async (img) => {
            await restaurant.menus.push(img.filename);
        })
        await restaurant.save();
        return response.status(200).json({ status: true, result: "Menu added successfully" });
    } catch (err) {
        console.log(err);
        return response.status(500).json({ status: false, error: "Internal Server Error" })
    }
}

export const addFacilities = async (request, response) => {
    try {
        let restaurant = await Restaurant.findById({ _id: request.body.restaurantId });
        console.log(request.body.facilities);
        request.body.facilities.map(async (fac) => {
            await restaurant.facilities.push(fac);
        })
        await restaurant.save();
        return response.status(200).json({ status: true, result: "Facilities added successfully" });
    } catch (err) {
        console.log(err);
        return response.status(500).json({ status: false, error: "Internal Server Error" })
    }
}

export const addCuisines = async (request, response) => {
    try {
        let restaurant = await Restaurant.findById({ _id: request.body.restaurantId });
        request.body.cuisines.map(async (fac) => {
            await restaurant.cuisines.push(fac);
        })
        await restaurant.save();
        return response.status(200).json({ status: true, result: "Cuisines added successfully" });
    } catch (err) {
        console.log(err);
        return response.status(500).json({ status: false, error: "Internal Server Error" })
    }
}

export const pendingList = (request, response) => {
    Restaurant.find({status : "pending"} )
        .then(res => {
            if (!res.length)
                return response.status(404).json({ status: false, err: "NOt available" });
            return response.status(200).json({ status: true, res })
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ status: false, err: "Internal Server Error" })
        })
}

export const restCount = async(request,response,next)=>{
    try{
        var query = Restaurant.find({});
        let record= await query.count(); 
        if(record) 
        return response.status(200).json({record:record, msg : "Number of Restaurent" , status: true });
 
    }catch(err){
        console.log(err);
        return  response.status(500).json({error : "Internal server error",status: false});
    } 
}

export const activeList = (request, response) => {
    Restaurant.find({status : "active"} )
        .then(res => {
            if (!res.length)
                return response.status(404).json({ status: false, err: "NOt available" });
            return response.status(200).json({ status: true, res })
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ status: false, err: "Internal Server Error" })
        })
}
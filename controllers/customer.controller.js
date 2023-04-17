import { Customer } from "../models/customer.model.js";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import { Favourite } from "../models/favourite.model.js";
import  jwt from "jsonwebtoken";

export const signup =async (request,response)=>{
    try{
        const errors=validationResult(request);
        if(!errors.isEmpty())
            return response.status(400).json({error: "Bad request",errors,status: false});
       let saltKey = await bcrypt.genSalt(10);
        request.body.password = await bcrypt.hash(request.body.password, saltKey);
        let customer = await Customer.create(request.body);
        return response.status(200).json({Result: customer,msg : "user is successfully register",status : true})
    }catch(err){
        console.log(err);
        return response.status(500).json({error : "Internal server error"});
    }
}

export const signin = async (request,response)=>{
    try{
        let customer = await Customer.findOne({email : request.body.email});
        if(!customer)
            return  response.status(401).json({error: "Unauthorise Request",status: false});
        let status =await bcrypt.compare(request.body.password,customer.password) ;
        customer = customer?.toObject();
        delete customer?.password;
        let payload = {subject: customer.email};
        let token = jwt.sign(payload,'fdfxvcvnreorevvvcrerer');   
        return status ? response.status(200).json({msg : "Signin success",token,Result : customer,status:true}) : response.status(401).json({error: "Unauthorise Request",status: false});
        
    }
    catch(err){
        console.log(err);
        return  response.status(500).json({error : "Internal server error",status: false});
    }
}

export const fetch = async (request,response)=>{
    try{
        let customer = await Customer.findById(request.params.custId);
        customer = customer?.toObject();
        delete customer?.password;
        return customer ? response.status(200).json({Result : customer,status:true}) : response.status(401).json({error: "Unauthorise Request",status: false});
    }
    catch(err){
        console.log(err);
        return  response.status(500).json({error : "Internal server error",status: false});
    }
}

export const update = async (request,response)=>{
    try{
        let result = await Customer.updateOne({
            _id : {$eq : request.body.customerId}
        },{
            $set : {name:request.body.name,email:request.body.email}
        }
        );
        return result.modifiedCount ? response.status(200).json({Result : result,status:true}) : response.status(401).json({error: "Unauthorise Request",status: false});
    }
    catch(err){
        console.log(err);
        return  response.status(500).json({error : "Internal server error",status: false});
    }
}

export const block = async (request,response)=>{
    try{
        let result = await Customer.updateOne({
            _id :  request.params.custId
        },{
            $set : {status:"block"}
        }
        );
        return result.modifiedCount ? response.status(200).json({Result : result,status:true}) : response.status(401).json({error: "Unauthorise Request",status: false});
    }
    catch(err){
        console.log(err);
        return  response.status(500).json({error : "Internal server error",status: false});
    }
}

export const updatePassword = async (request,response)=>{
    try{
        let customer = await Customer.findById(request.body.custId);
        let flag;
        customer ? (flag = ! await bcrypt.compare(request.body.password,customer.password) && response.status(401).json({error: "Unauthorise Request 1",status: false}) ) :  response.status(401).json({error: "Unauthorise Request 1",status: false});
        if(!flag){
        let saltKey = await bcrypt.genSalt(10);
        request.body.newPassword = await bcrypt.hash(request.body.newPassword, saltKey);
         let result = await Customer.updateOne({
            _id :  request.body.custId
        },{
            $set : {password:request.body.newPassword}
        }
        );
        return result.modifiedCount ? response.status(200).json({Result : result,status:true}) : response.status(401).json({error: "Unauthorise Request 2",status: false});
    }
    }
    catch(err){
        console.log(err);
        return  response.status(500).json({error : "Internal server error",status: false});
    }
}

export const addToFavourite = async (request,response,next)=>{
    try{
        let record= await Favourite.findOne(
            {
                restaurantId:request.params.resId,
                customerId:request.params.cusId
            });
    if(record)
            return response.status(200).json({ message: "alredy added",status: true });
        let favourite =await Favourite.create({restaurantId :request.params.resId , customerId:request.params.cusId});
        return response.status(200).json({ favourite : favourite , status: true });
    }
    catch(err){
        console.log(err);
        return  response.status(500).json({error : "Internal server error",status: false});
    }
}


export const removeFavourite = async (request,response,next)=>{
    try{
        let record= await Favourite.deleteOne({
                restaurantId:request.params.resId,
                customerId:request.params.cusId
        });
        if(record)
        return response.status(200).json({ msg : "favourite is removed" , status: true });
        return response.status(200).json({ msg : "favourite is not removed" , status: false });
    }
    catch(err){
        console.log(err);
        return  response.status(500).json({error : "Internal server error",status: false});
    }
}

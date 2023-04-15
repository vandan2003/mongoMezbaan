import { validationResult } from "express-validator";
import { Restaurant } from "../models/restaurant.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { Rating } from "../models/rating.model.js";

export const signuppage = (request,response)=>{
    response.render("addRestaurant.ejs");
}
export const signUp = async(request,response)=>{
    let errors = validationResult(request);
    if(!errors.isEmpty())
        return response.status(403).json({status:false,errors});
    request.body.images = [];
    request.body.menus = [];
    request.files.map((img)=>{
        if(img.fieldname == 'images'){
            request.body.images.push(img.filename);
        }
        else{
            request.body.menus.push(img.filename);
        }
    })
    
    request.body.password = await bcrypt.hash(request.body.password,await bcrypt.genSalt(10));
    Restaurant.create(request.body)
    .then(res=>{
        return response.status(200).json({status:true,res,msg:"SignUp Success"});
    })
    .catch(err=>{
        console.log(err);
        return response.status(500).json({status:false,err,msg:'Something Went Wrong'})
    });
}

export const signIn = async (request,response)=>{
    try{
        var rest =  await Restaurant.findOne({email:request.body.email});
         if(!rest)
             return response.status(400).json({status:false,error:"Not Restaurant Found"});
         
         var status = await bcrypt.compare(request.body.password,rest.password);
         if(status){
             let payload = {subject: rest.email};
             let token = jwt.sign(payload,'fdfxvcvnreorevvvcrerer');   
             return response.status(200).json({status:true,token,result:"Sign In Success"})
         }
         return response.status(400).json({status:false,error:"Wrong Password"});
    }
    catch(err){
     console.log(err);
     return response.status(500).json({error:"Internal Server Error"});
    }
}

export const list = (request,response)=>{
    Restaurant.find()
    .then(res=>{
        if(!res.length)
            return response.status(404).json({status:false,err:"NOt available"});
        return response.status(200).json({status:true,res})
    })
    .catch(err=>{
        console.log(err);
        return response.status(500).json({status:false,err:"Internal Server Error"})
    })
}

export const block = async (request,response)=>{
    Restaurant.findOneAndUpdate({_id:new mongoose.Types.ObjectId(request.params.id) },{status:"BLOCKED"})
    .then(res=>{
        console.log(res);
        return response.status(200).json({status:true,res});
    })
    .catch(err=>{
        console.log(err);
        return response.status(500).json({status:false,err});
    })
 }

 export const deny = async (request,response)=>{
    Restaurant.findOneAndUpdate({_id:new mongoose.Types.ObjectId(request.params.id) },{status:"DENY"})
    .then(res=>{
        console.log(res);
        return response.status(200).json({status:true,res});
    })
    .catch(err=>{
        console.log(err);
        return response.status(500).json({status:false,err});
    })
 }

 export const active = async (request,response)=>{
    Restaurant.findOneAndUpdate({_id:new mongoose.Types.ObjectId(request.params.id) },{status:"ACTIVE"})
    .then(res=>{
        console.log(res);
        return response.status(200).json({status:true,res});
    })
    .catch(err=>{
        console.log(err);
        return response.status(500).json({status:false,err});
    })
 }

 export const searchRest = (request,response)=>{
    Restaurant.find({$or:[
        {'name':{ $regex: '.*' + request.params.key + '.*' }},
        {'description':{ $regex: '.*' + request.params.key + '.*' }},
        {'address':{ $regex: '.*' + request.params.key + '.*' }}
    ]})
    .then(res=>{
         return response.status(200).json({status:true,res});
    })
    .catch(err=>{
         console.log(err);
         return response.staus(500).json({status:false,err:"Internal Server Error"})
    })
 }

 export const rate = async (request,response)=>{
    try{
       var rating = await Rating.create(request.body);

       var allratings = await Rating.find({restaurantId:request.body.restaurantId});
       let sum = 0 ;
       allratings.map((rate)=>{
            sum+= rate.rating;
       })
        return response.status(200).json({status:true,res:await Restaurant.updateOne({_id:request.body.restaurantId},{rating:((sum/allratings.length)/20).toFixed(1)})});
    }
    catch(err){
        console.log(err);
        return response.status(500).json({status:false,err});
    }
} 

export const profile = (request,response)=>{
    Restaurant.findOne({_id:request.params.id})
    .then(res=>{
        return response.status(200).json({status:true,res});
    })
    .catch(err=>{
        console.log(err);
        return response.status(500).json({status:false,err});
    })
}
 
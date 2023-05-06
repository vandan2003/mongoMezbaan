import { validationResult } from "express-validator";
import { Plan } from "../models/plan.model.js";
import { Subscription } from "../models/subscription.model.js";
import mongoose from "mongoose";

export const addPlan = async (request,response,next) => {
  try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
         return response.status(400).json({ msg: 'Bad request', msg: errors.array() });
      }
      const { planName, duration, price } = request.body; 
      const newPlan = await Plan.create( { planName, duration, price } );
      return response.status(200).json({ plan: newPlan, status: true });
  } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "plan Added Successfully...", error: 'Internal Server Error', status: false });
  }
}
  
  export const updatePlan = async (request, response, next) => {
    try {
      const { newplanName, newduration, newprice } = request.body;
      const result = await Plan.findOneAndUpdate(
        { _id : request.body._id},
        { $set: { planName: newplanName, duration: newduration, price: newprice } },
      );
      if (result==null) {
        return response.status(404).json({ msg: "plan not found", status: false });
      }
      return response.status(200).json({ plan: result, msg: "plan updated successfully......", status: true });
    } catch (err){
       console.log(err);
      return response.status(500).json({ msg: "Internal Server Error", status: false });
    }
}
 

export const removePlan = async (request, response, next) => {
  try {
    const result = await Plan.findOneAndDelete({ _id : request.body._id });

    if (!result) {
      return response.status(404).json({ error: "plan not found", status: false });
    }

    return response.status(200).json({ plan: result, msg: "plan removed successfully......", status: true });

  } catch (err) {
    console.log(err);
    return response.status(500).json({ error: "Internal Server Error", status: false });
  }
}


export const subscribePlan = async (request, response, next) => {
  try {
    const { restaurantId, planId, startingDate, endingDate } = request.body;
    console.log(planId)
    const plan = await Plan.findById( {_id:planId});
    if (!plan) {
      return response.status(404).json({ error: "Restaurant not found", status: false });
    }
      const subscription = await Subscription.create( {  restaurantId, planId, startingDate, endingDate } );
 
  return response.status(200).json({ result: subscription, status: true });

  } catch (err) {
    console.log(err);
    return response.status(500).json({ error: "Internal Server Error", status: false });
  }
}

export const planList = async (request,response,next) =>{
  try{
    const plans = await Plan.find();
    if(!plans.length)
      return response.status(404).json({ error: "Restaurant not found", status: false });
    return response.status(200).json({ result: plans, status: true });
  }
  catch(err){
    console.log(err);
    return response.status(500).json({ error: "Internal Server Error", status: false });
  }
}
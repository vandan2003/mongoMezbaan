import { validationResult } from "express-validator";
import { Plan } from "../models/plan.model.js";
import { Subscription } from "../models/subscription.model.js";

export const addPlan = async (request,response,next) => {
  try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
         return response.status(400).json({ error: 'Bad request', messages: errors.array() });
      }
      const { planName, duration, price } = request.body; 
      const newPlan = await Plan.create( { planName, duration, price } );
      return response.status(200).json({ plan: newPlan, status: true });
  } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "plan Added Successfully...", error: 'Internal Server Error', status: false });
  }
}
  
  export const updatePlan = async (request, response, next) => {
    try {
      const { planName, newplanName, newduration, newprice } = request.body;
      const result = await Plan.findOneAndUpdate(
        { planName },
        { $set: { planName: newplanName, duration: newduration, price: newprice } },
      );
      if (result==null) {
        return response.status(404).json({ error: "plan not found", status: false });
      }
  
      return response.status(200).json({ plan: result, message: "plan updated successfully......", status: true });
    } catch (err){
       console.log(err);
      return response.status(500).json({ error: "Internal Server Error", status: false });
    }
}
 

export const removePlan = async (request, response, next) => {
  try {

    const name = request.body.planName;
    const result = await Plan.findOneAndDelete({ planName: name });

    if (!result) {
      return response.status(404).json({ error: "plan not found", status: false });
    }

    return response.status(200).json({ plan: result, message: "plan removed successfully......", status: true });

  } catch (err) {
    console.log(err);
    return response.status(500).json({ error: "Internal Server Error", status: false });
  }
}


export const subscribePlan = async (request, response, next) => {
  try {
    const { restaurantId, planId, startingDate, endingDate } = request.body;

    const restaurant = await Plan.findById(restaurantId);
    if (!restaurant) {
      return response.status(404).json({ error: "Restaurant not found", status: false });
    }

    // const subscription = new Subscription({
    //   restaurant: restaurantid,
    //   plan: planId,
    //   startingDate: startingDate,
    //   endingDate: endingDate
    // });

//    const result = await Subscription.save();

  return response.status(200).json({ result: result, status: true });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error", status: false });
  }
}

import { Visit } from "../models/visit.model.js";

export const add = async (request, response) => {
    try {
        let result = await Visit.create(request.body);
        return response.status(200).json({status:false,result});
    } catch (err) {
        return response.status(500).json({ statue: false, err: "Something went wrong!!" })
    }
}

export const findByCustomer =  async (request, response) => {
    try {
        let result  =  await Visit.find({customerId:request.body.customerId}).populate("restaurantId");
        console.log(result);
        // return response.status(200).json({status:false,result});
    } catch (err) {
        return response.status(500).json({ statue: false, err: "Something went wrong!!" })
    }
}

export const findByRestaurant =  async (request, response) => {
    try {
        let result  =  await Visit.find({restaurantId:request.body.restaurantId}).populate('customerId');
        console.log(result);
        // return response.status(200).json({status:false,result});
    } catch (err) {
         console.log(err);
        return response.status(500).json({ statue: false, err: "Something went wrong!!" })
    }
}


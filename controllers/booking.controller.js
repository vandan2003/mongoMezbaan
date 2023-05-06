 
import { request, response } from "express";
import { Booking } from "../models/booking.model.js";

export const confirm = async (request,response) => {
  try {
    const { customerId,restaurantId,date,time,status,extraInfo,bookingAmount,totalGuests } = request.body; 
      const newBooking = await Booking.create( { customerId,restaurantId,date,time,status,extraInfo,bookingAmount,totalGuests } );
      response.status(200).json({ status: true, res: newBooking, msg: "Booking success" });
  } catch (err) {
    console.log(err);
    response.status(500).json({ status: false, msg: "Something went wrong" });
  }
};
 

export const cancel = async (request, response, next) => {
  try {

    const id = request.body._id;
    const result = await Booking.findOneAndDelete({ _id: id });

    if (!result) {
      return response.status(404).json({ msg: "booking not found", status: false });
    }

    return response.status(200).json({ plan: result, msg: "booking canceled successfully......", status: true });

  } catch (err) {
    console.log(err);
    return response.status(500).json({ msg: "Internal Server Error", status: false });
  }
}

export const history = async (req,res) => {
  try {
    const bookings = await Booking.find({ customerId: req.body.customerId });
    if (!bookings) {
      return res.status(404).json({ status: false, msg: "No History Available" });
    }
    res.status(200).json({msg: "This is booking History of all restaurents....", status: true, res: bookings });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false, msg: "Something went wrong" });
  }
};

export const historyRest = async (request,response) => {
  try {
    const bookings = await Booking.find({ restaurantId: request.params.id });
    if (!bookings) {
      return response.status(404).json({ status: false, msg: "No History Available" });
    }
    response.status(200).json({ msg: "This is booking according to restaurent", status: true, res: bookings });
  } catch (err) {
    console.log(err);
    response.status(500).json({ status: false, msg: "Something went wrong" });
  }
};

export const bookingCount = async(request,response,next)=>{
  try{
      var booking = await Booking.find({ restaurantId: request.params.id }).count();
      
      if(booking) 
      return response.status(200).json({record:booking, msg : "Number of Bookings" , status: true });

  }catch(err){
      console.log(err);
      return  response.status(500).json({error : "Internal server error",status: false});
  } 
}

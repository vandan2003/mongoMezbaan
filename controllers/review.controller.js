import { Review } from "../models/review.model.js";

export const add =async (request,response)=>{
    try{
        let date=new Date();
        request.body.date=date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
        request.body.time=date.getHours() + ":" + date.getMinutes() ;
       let result = await Review.create(request.body);
       return response.status(200).json({Result: result,status : true})
    }catch(err){
        console.log(err);
        return response.status(500).json({error : "Internal server error",status:false});
    }
}

export const fetchByRes =async (request,response)=>{
    try{
        let reviews = await Review.find({restaurantId:request.params.restaurantId});
        reviews.length==0 ? response.status(200).json({Result : "No Reviews Found",status:false}) : response.status(200).json({reviews,status:true});
    }
    catch(err){
        console.log(err);
        return response.status(500).json({error : "Internal server error",status:false});
    }
}

export const fetchByCus =async (request,response)=>{
    try{
        let reviews = await Review.find({customerId:request.params.customerId});
        console.log(reviews);
        return response.status(200).json({reviews,status:true});
    }
    catch(err){
        console.log(err);
        return response.status(500).json({error : "Internal server error",status:false});
    }
}

export const deleteReview = async (request,response,next)=>{
    try{
        let record= await Review.deleteOne({
                _Id:request.params.reviewId,
        });
        console.log(record);
        if(record.deletedCount)
            return response.status(200).json({ msg : "Remove Success" , status: true });
        return response.status(200).json({ msg : "Not Removed" , status: false });
    }
    catch(err){
        console.log(err);
        return response.status(500).json({error : "Internal server error",status:false});
    }
}

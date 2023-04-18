import jwt from "jsonwebtoken";
export const cusTokenVerify = (request,response,next)=>{
  let token = request.headers.authorization;
    try{
    if(!token){
     throw new Error();
    }
    jwt.verify(token,"fdfxvcvnreorevvvcrerer");
    next();
  }
  catch(err){
    return response.status(401).json({error: "Unauthorized request", status: false});
  }
}

export const resTokenVerify = (request,response,next)=>{
  let token = request.headers.authorization;
   try{
    if(!token){
     throw new Error();
    }
    jwt.verify(token,"fdfxvcvnreorevvvcrerer");
    next();
  }
  catch(err){
    return response.status(401).json({error: "Unauthorized request", status: false});
  }
}

export const adminTokenVerify = (request,response,next)=>{
  let token = request.headers.authorization;
   try{
    if(!token){
     throw new Error();
    }
    jwt.verify(token,"fdfxvcvnreorevvvcrerer");
    next();
  }
  catch(err){
    return response.status(401).json({error: "Unauthorized request", status: false});
  }
}
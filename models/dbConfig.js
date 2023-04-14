import mongoose from "mongoose";

// mongodb+srv://vandanv57:vandan22@cluster0.eow2b0o.mongodb.net/mezbaan?retryWrites=true&w=majority
mongoose.connect("mongodb+srv://vandanv57:vandan22@cluster0.eow2b0o.mongodb.net/mezbaan?retryWrites=true&w=majority")
.then((res)=>{
    console.log("Database Connected . . . ");
})
.catch(err=>{
    console.log(err);
})

export default mongoose.connection;
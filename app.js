import express from "express"
import restRouter from "./routes/restaurant.route.js";
import bodyParser from "body-parser";
const app = express();

app.set("view-engine","ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use("/restaurant",restRouter);

app.listen(3000,()=>{
    console.log("Server Started Mongo Mezbaan . . .");
})

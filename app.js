import express from "express"
import restRouter from "./routes/restaurant.route.js";
import AdminRouter from "./routes/admin.route.js";
import PlanRouter from "./routes/plan.route.js";
import bodyParser from "body-parser";
const app = express();

app.set("view-engine","ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use("/restaurant",restRouter);
app.use("/admin",AdminRouter);
app.use("/plan",PlanRouter);


app.listen(5000,()=>{
    console.log("Server Started Mongo Mezbaan . . .");
})

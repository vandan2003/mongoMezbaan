import express from "express"
import restRouter from "./routes/restaurant.route.js";


import AdminRouter from "./routes/admin.route.js";
import PlanRouter from "./routes/plan.route.js";
import BookingRouter from "./routes/booking.route.js";
import bodyParser from "body-parser";

import customerRouter from "./routes/customer.route.js"
import reviewRouter from "./routes/review.route.js"



const app = express();

app.set("view-engine","ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use("/restaurant",restRouter);


app.use("/admin",AdminRouter);
app.use("/plan",PlanRouter);
app.use("/booking",BookingRouter);

app.use("/customer",customerRouter);
app.use("/review",reviewRouter);

app.listen(3000,()=>{
    console.log("Server Started Mongo Mezbaan . . .");
})

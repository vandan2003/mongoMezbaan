import express from "express"
import restRouter from "./routes/restaurant.route.js";
import path from 'path';
import { fileURLToPath } from "url";
import { Colony } from "./models/colonies.model.js";

import AdminRouter from "./routes/admin.route.js";
import PlanRouter from "./routes/plan.route.js";
import BookingRouter from "./routes/booking.route.js";
import bodyParser from "body-parser";
import cors from 'cors';
import customerRouter from "./routes/customer.route.js"
import reviewRouter from "./routes/review.route.js"
import colonyRouter from "./routes/colony.route.js"
import PaymentRouter from "./routes/payment.route.js"
import VisitRouter from "./routes/visit.routes.js"
const app = express();

app.set("view-engine","ejs");
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicPath = path.join(__dirname,"public");
app.use(express.static(publicPath));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use("/restaurant",restRouter);


app.use("/admin",AdminRouter);
app.use("/plan",PlanRouter);
app.use("/booking",BookingRouter);

app.use("/customer",customerRouter);
app.use("/review",reviewRouter);

app.use("/payment",PaymentRouter);

app.use("/visit",VisitRouter);

app.get('/image/:filename', function (req, res) {
    const filename = req.params.filename;
    res.sendFile(path.join(__dirname, 'public', 'restImage', filename));
  });

app.use("/colony",colonyRouter);

app.listen(3000,()=>{
    console.log("Server Started Mongo Mezbaan . . .");
})

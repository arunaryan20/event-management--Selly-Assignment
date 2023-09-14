const express=require("express")
const app=express();
const cors=require("cors")
var bodyParser = require('body-parser')
const dotenv=require("dotenv");
const dbConnect = require("./config/db");
const auth_router = require("./routes/authRoutes");
const ticket_router = require("./routes/ticketRoutes");
const event_router = require("./routes/eventRoutes");
dotenv.config();
const PORT=(process.env.PORT)

// database connection
dbConnect();
app.use(bodyParser.json())
app.use(cors());
app.use(express.json());

// Authentication api
app.use("/auth",auth_router)

//Ticket api
app.use("/ticket",ticket_router)

//Event api
app.use("/event",event_router)

app.listen(PORT)


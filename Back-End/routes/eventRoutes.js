const express=require("express");
const verify=require("../middlewares/authMiddleware")
const event_router=express.Router();
const event_data=require("../controllers/eventController")


event_router.post("/create-event",verify,event_data.createEventController)
event_router.get("/get-all-event",verify,event_data.getEventController)

module.exports=event_router;
const express=require("express");
const verify=require("../middlewares/authMiddleware")
const ticket_router=express.Router();
const ticket_data=require("../controllers/ticketController")

ticket_router.post("/create-ticket",verify,ticket_data.createTicketController)
ticket_router.get("/get-all-ticket",verify,ticket_data.getTicketController)

module.exports=ticket_router;
const express=require("express")
const authData=require("../controllers/authController")
const auth_router=express.Router()

auth_router.post("/create-user",authData.registerController);
auth_router.post("/user-login",authData.loginController);

module.exports=auth_router;
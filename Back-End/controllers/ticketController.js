const ticketModel=require("../models/ticketModel")
const jwt=require("jsonwebtoken")

const createTicketController=async(req,res)=>{
          try{
                  const {name,phone,eventName,date}=req.body;
                  if(!name || !phone || !eventName || !date){
                    res.status(400).json({success:false,message:"All the fields are required"})
                  }else{
                     jwt.verify(req.token,"secretkey",async function(err,authData){
                        req.body.createdBy=authData.data._id;
                        if(err){
                            res.status(400).json({success:false,message:"Token is not valid"})
                        }else{
                            const data=await ticketModel.create(req.body)
                            res.status(200).json({success:true,message:"Ticket created successfully",Ticket:data})
                        }
                     })
                  }
          }catch(error){
            res.status(400).json({success:false,message:"create ticket controller error",error:error})
          }
}
const getTicketController=async(req,res)=>{
              try{
                       jwt.verify(req.token,"secretkey",async function(err,authData){
                           if(err){
                            res.status(404).json({success:false,message:"Token is not valid",error:err})
                           }else{
                            const data=await ticketModel.find({createdBy:authData.data._id})
                            if(data.length>0){
                                res.status(200).json({success:true,message:"all tickets",Tickets:data})
                            }else{
                                res.status(200).json({success:true,message:"Empthy"})
                            }
                           }
                       })
              }catch(err){
                res.status(404).json({success:false,message:"get all ticket controller error",error:err})
              }
}

module.exports={createTicketController,getTicketController}
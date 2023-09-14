const eventModel=require("../models/eventModel")
const jwt=require("jsonwebtoken")

const createEventController=async(req,res)=>{
          try{
                  const {name,eventName,place,date}=req.body;
                  if(!name || !eventName || !place || !date){
                    res.status(400).json({success:false,message:"All the fields are required"})
                  }else{
                     jwt.verify(req.token,"secretkey",async function(err,authData){
                        req.body.createdBy=authData.data._id;
                        if(err){
                            res.status(400).json({success:false,message:"Token is not valid"})
                        }else{
                            const data=await eventModel.create(req.body)
                            res.status(201).json({success:true,message:"Event created successfully",Event:data})
                        }
                     })
                  }
          }catch(error){
            res.status(400).json({success:false,message:"create event controller error",error:error})
          }
}
const getEventController=async(req,res)=>{
              try{
                       jwt.verify(req.token,"secretkey",async function(err,authData){
                           if(err){
                            res.status(404).json({success:false,message:"Token is not valid",error:err})
                           }else{
                            const data=await eventModel.find({createdBy:authData.data._id})
                            if(data.length>0){
                                res.status(200).json({success:true,message:"All events",Events:data})
                            }else{
                                res.status(200).json({success:true,message:"Empthy"})
                            }
                           }
                       })
              }catch(err){
                res.status(404).json({success:false,message:"get all event controller error",error:err})
              }
}

module.exports={createEventController,getEventController}
const mongoose=require("mongoose")

const ticketSchema=new mongoose.Schema({
     name:{
            type:String,
            require:[true,"please provide name"]
     },
     phone:{
        type:Number,
        require:[true,"please provide phone number"]
     },
     eventName:{
        type:String,
        require:[true,"please provide event name"]
     },
     date:{
        type:String,
        require:[true,"please provide date"]
     },
     createdBy:{
      type:mongoose.Types.ObjectId,
      ref:"EventUser"
     }
})

module.exports=mongoose.model("EventTicker",ticketSchema)
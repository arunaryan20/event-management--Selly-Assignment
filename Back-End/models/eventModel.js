const mongoose=require("mongoose")

const eventSchema=new mongoose.Schema({
     name:{
            type:String,
            require:[true,"please provide name"]
     },
     eventName:{
        type:String,
        require:[true,"please provide event name"]
     },
     place:{
        type:String,
        require:[true,"please provide address"]
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

module.exports=mongoose.model("EventName",eventSchema)
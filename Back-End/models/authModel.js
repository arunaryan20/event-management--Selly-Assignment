const mongoose=require("mongoose")

const authSchema=new mongoose.Schema({
name:{
    type:String,
    require:[true,"please provide name"]
},
email:{
    type:String,
    require:[true,"please provide email"]
},
phone:{
    type:Number,
    require:[true,"please provide phone"]
},
password:{
    type:String,
    require:[true,"please provide password"]
}
},{timestamps:true})

module.exports=mongoose.model("EventUser",authSchema)
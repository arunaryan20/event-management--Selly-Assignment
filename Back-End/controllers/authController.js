const authModel = require('../models/authModel')
var bcrypt = require('bcryptjs')
const jwt=require("jsonwebtoken")
const registerController = async (req, res) => {
  try {
    var { name, email, phone, password } = req.body
    if (!name || !email || !phone || !password) {
      res
        .status(400)
        .json({ success: false, message: 'All fields are require' })
    } else {
      const data = await authModel.findOne({ email: email })
      if (data) {
        res.status(400).json({ success: true, message: 'Email already exist' })
      } else {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
              if (err) {
                res
                  .status(400)
                  .json({
                    success: false,
                    message: 'password encryption error',
                    error: err
                  })
              } else {
                req.body.password = hash
                const data = await authModel.create(req.body)
                res
                  .status(201)
                  .json({
                    success: true,
                    message: 'User created successfully',
                    User: data
                  })
              }
            })
          })
      }
      
    }
  } catch (error) {
    res
      .status(404)
      .json({
        success: false,
        message: 'register controller error',
        error: error
      })
  }
}
const loginController = async (req, res) => {
    try{
         const {email,password}=req.body;
         if(!email || !password){
            res.status(400).json({success:false,message:"all fields are require"})
         }else{
            const data=await authModel.findOne({email:email})
            if(data){
                const passwordMatching=await bcrypt.compare(req.body.password,data.password)
                if(passwordMatching){
                    jwt.sign({data},"secretkey",{expiresIn:"1d"},function(err,token){
                        if(err){
                            res.status(200).json({success:true,message:"Error while token creation"})   
                        }else{
                            res.status(200).json({success:true,message:"User login successfull",token:token,User:data})   
                        }
                    })
                }else{
                    res.status(200).json({success:true,message:"Password not matching"})   
                }
               
            }else{
                res.status(404).json({success:true,message:"User does not exist"}) 
            }
           
         }
    }catch(error){
        res.status(400).json({success:false,message:"login controller error",error:error})
    }
}

module.exports = { registerController, loginController }

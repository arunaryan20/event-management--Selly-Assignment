const verify=(req,res,next)=>{
        const header_data=req.headers['authorization']
        if(typeof header_data==="undefined")
        {
            res.status(400).json({success:false,message:"token not found"})
        }else{
            const token=header_data.split(' ')[1];
            req.token=token;
            next()
        }
}

module.exports=verify;
const {Router} = require('express')

const User=require('../Models/userModel')
const router=Router();
const catchAsync = require('../utils/catchAsync')

router.post('/',catchAsync(async(req,res)=>{
  const newSong = await User.updateOne(
      {slug:req.body.name},
      {$push:{songs:req.body.id}},
      { $currentDate : { "createdAt" : true}},
   
  
)
  
  res.status(201).json({
    status:'success',

    data:{
      newSong
    }
    
})
})
)

module.exports=router;
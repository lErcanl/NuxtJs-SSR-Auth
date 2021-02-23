const User = require('../Models/userModel')
const catchAsync = require('../utils/catchAsync')

exports.getAlllUsers = catchAsync(async (req,res,next)=>{
    const users=await User.find().sort({createdAt:-1});


    res.status(201).json({
        status: 'success',
        data: {
          users
        }
      });
})
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};
exports.getUser = catchAsync(async(req,res,next)=>{
  const user = await User.findById(req.params.id);
  res.status(201).json({
    status: 'success',
    data: {
      user
    }
  });

})
exports.getArrays = catchAsync(async(req,res,next)=>{
  const user = await User.find().sort({date:-1});
  res.status(201).json({
    status: 'success',
    data: {
      user
    }
  });

})
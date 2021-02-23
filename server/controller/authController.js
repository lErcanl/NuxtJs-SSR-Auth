const {promisify} = require('util')
const User = require('../Models/userModel')
const catchAsync = require('../utils/catchAsync')
const jwt = require('jsonwebtoken')
const AppError =require('../utils/appError')
const config = require('../../nuxt.config')


const signToken = id =>{
  return jwt.sign({id},config.env.JWT_SECRET,{
    expiresIn:config.env.JWT_EXPIRES_IN
  });

}
const createSendToken= (user,statusCode,res) =>{
  const token = signToken(user._id);

  const cookieOptions = {
    expires:new Date(Date.now()+config.env.JWT_COOKIE_EXPIRES_IN *24*60*60*1000),    //1ms üzerinden 90 gün yaptık
    httpOnly:true //cookie browserda hiç bir şekilde değiştirilemez hale geldi.
}
  if(config.dev ==='production') cookieOptions.secure=true;     //cookie secure true https te çalışır hale geldi
user.password=undefined; //remove password from the output
  res.cookie('jwt',token,cookieOptions)
  res.status(statusCode).json({
    status:'success',
    token,
    data:{
      user
    }
    
  })

}
exports.signup = catchAsync(async(req,res)=>{
  console.log("signed up");
    const newUser = await User.create({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
})
createSendToken(newUser,201,res)
})

exports.login=catchAsync(async (req,res,next)=>{
  const {email,password} = req.body //req.body.email ve req.body.password demek oldu
  //1) if email and password exist
  if(!email || !password){
   return next(new AppError('Please provide email and password!',400)); //next middleware geldiğinde return yap çünkü diğer eleman çalışıyor
  }
    //2)if u the user exist and password correct
    const user= await User.findOne({email}).select('+password')
  

    if (!user||!(await user.correctPassword(password,user.password))) { //await kullandık çünkü correctpassword asycn function:
      return next(new AppError('Incorrect email or password',401)); //401 unautherize 
    }
    //3) everything is okay send the token
    createSendToken(user, 200, res);
})

exports.protect = catchAsync(async(req,res,next)=>{
  // 1) Getting token and check if its there
  let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
       token = req.headers.authorization.split(' ')[1];

    }
    else if(req.cookies.jwt){
      token=req.cookies.jwt;
      console.log(token +"is the real token");
    }
  // 2) Verification token.
    if(!token){
      return next(new AppError('You are not logged in! Please Log in to get access.',401))
    }
 const decoded = await promisify(jwt.verify)(token,config.env.JWT_SECRET)
 console.log(decoded);
  // 3)Check if user still exists.
  const currentUser = await User.findById(decoded.id);
  if(!currentUser){
    return next(new AppError('the user that belonging token does no longer exist!',401))
  }
  // 4)Check if user change password after the jwt was issued,

  req.user = currentUser;
  console.log(req.user);
  next();

})


//Only for render pages,no errors !
exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      console.log("we access");
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        config.env.JWT_SECRET
      );

      // 2) Check if user still exists
      const currentUser = await User.findById(decoded.id);

      if (!currentUser) {
        console.log("we got errorc2");

        return next();
      }

      // 3) Check if user changed password after the token was issued
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        console.log("we got errorc3");
 
        return next();
      }

      // THERE IS A LOGGED IN USER

      res.status(201).json({
        status:'success',

        data:{
          currentUser
        }
        
      })
    } catch (err) {
      console.log(err);
      console.log("we got error42");

      return next();

    }
  }
  else{
    next();
  }
};

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  console.log("logged ouut");
  res.status(200).json({ status: 'success' });
};

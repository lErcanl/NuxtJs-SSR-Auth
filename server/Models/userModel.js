const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')
const slugify = require('slugify')
const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,'please tell ur name!'],
            unique:true
        },
        password:{
            type:String,
            required:[true,'Enter a password'],
            minlength:8,
            select:false
        },
        passwordConfirm:{
            type:String,
            required:true,
            validate: {
                // This only works on CREATE and SAVE!!!
                validator: function(el) {
                  return el === this.password;
                },
                message: 'Passwords are not the same!'
              }
      
            },

    
        email:{
            type:String,
            required:[true,'please provide ur email'],
            unique:true,
            validate: [validator.isEmail, 'Please provide a valid email']

          
        },
        date: {
            type: Date,
            default: Date.now
          },
        photo:String,
        songs:Array,
        slug:String,
        passwordChangedAt: Date
    })
        userSchema.pre('save',async function(next){
            if(!this.isModified('password')) return next();
            this.password = await bcrypt.hash(this.password,12)

            this.passwordConfirm = undefined;
            next();

        }) 
        userSchema.pre('save',function(next){
            this.slug = slugify(this.name,{lower:true})
            next();
        })
    userSchema.methods.correctPassword=async function(candidatePassword,userPassword){
        //password select:false olduğu için this.password'ü burada kullanamıyoruz
        return await bcrypt.compare(candidatePassword,userPassword) //return true or false eğer eşitse true candidate bcrypt edilmermiş, user pass ise edilmiş password.
    }
    userSchema.methods.changedPasswordAfter = function(JWTTimeStamp){
        if(this.passwordChangedAt){
            console.log(this.passwordChangedAt,JWTTimeStamp);
        }
        return false;
        
    }
const User=mongoose.model('users',userSchema)
    
module.exports=User;
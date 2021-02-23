const {Schema,model}=require('mongoose');
const newsSchema = new Schema(
    {
        songid:{
            type:String,
            required:true,
            unique:true
        }
    })

    const songs=model('users',newsSchema)

    module.exports=songs
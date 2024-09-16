const mongoose=require('mongoose')

const ClassSchema=mongoose.Schema({
    branch:{
        type:String,
        required:true
    }
})

const Classes=mongoose.model('Classes',ClassSchema)
module.exports=Classes;

const mongoose = require("mongoose")
const validator=require("validator")
const userSchema = new mongoose.Schema({
   name:{
    type:String,
    trim:true,
    require:true
   },
   age:{
    type:Number,
    trim:true,
    require:true,
    validate(value){
         if(value<=18 && value>=45){
            throw new Error("Age restriction")
         }
    }
   },
   email:{
    type:String,
    trim:true,
    require:true,
    validate(value){
        if(!validator.isEmail(value)){
            throw new Error("Email is not valid")
        }
    }
   },
   password:{
    type:String,
    trim:true,
    require:true,
    validate(value){
        if(!validator.isStrongPassword(value)){
            throw new Error("write strong password")
        }
    }
   },
   status:{
      type:Boolean,
      default:true
   }
})

const model = mongoose.model("user", userSchema)
module.exports=model
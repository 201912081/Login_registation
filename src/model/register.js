const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')

const registerShema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    age:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

registerShema.pre("save",async function(next){
    // if(this.isModified("password")){
       this.password=await bcrypt.hash(this.password,10);

    // }
    next();
})

// create a collection
const register=new mongoose.model("register",registerShema)

module.exports=register;
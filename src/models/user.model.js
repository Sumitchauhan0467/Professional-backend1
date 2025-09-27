import mongoose,{Schema} from "mongoose"
import jwt from "jsonwebtoken"
import bycrypt from "bycrypt"
const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        index:true,
        trim:true,
        lowercase:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
    },
    fullname:{
        type:String,
        required:true,
        index:true,
        trim:true, 
    },
    avatar:{
        type:String, //cloudnary url
        required:true,
    },
    coverimage:{
        type:String   //cloudnary url
    },
    watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:"videos"
        }
    ],
    password:{
        type:String,
        required:[true,"password is required"]
    },
    refreshToken:{
        type:String
    }


},{timestamps:true})


userSchema.pre("Save", async function (next){
    if(!this.isModified("password")) return next;
this.password = bycrypt.hash(this.password,10)
next()
})

userSchema.methods.isPasswordCorrect= async function (password){
     return await bycrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
   return jwt.sign({
        _id : this._id,
        email :this.email,
        password : this.password,
        username:this.username,
        fullname:this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }

    )
}

userSchema .methods.refreshAccessToken = function(){
     return jwt.sign({
        _id : this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
    expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    })
}


export const user = mongoose.model("User",userSchema)

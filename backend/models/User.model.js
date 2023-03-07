const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

// DEFINE STRUCTOR MODEL USER
const userSchema = new mongoose.Schema({
    dayOfBirth:{
        type: String,
    },
    email:{
        type: String,
        required: [true, 'Email must be required'],
    },
    fullName:{
        type: String,
    },
    phone:{
        type: String,
    },
    password:{
        type: String,
        required: [true, 'Password must be required'],
    }
})

userSchema.pre('save', function(next){
    let user = this
    bcrypt.hash(user.password, 10, function(err, hash){
        if(err){
            return next(error)
        }else{
            user.password = hash
            next()
        }
    })
})

const User = mongoose.model('User', userSchema)
module.exports = User
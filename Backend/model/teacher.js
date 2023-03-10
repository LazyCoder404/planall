require('dotenv').config()
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

const TeacherSchema = mongoose.Schema({
    firstName: {
        type: String,
        maxLength: 100,
        required : true,
    },
    middleName:{
        type:String,
        maxLength: 50,
        required : true,
    },
    lastName:{
        type:String,
        maxLength: 50,
        required : true,
    },
    email:{
        type:String,
        maxLength: 100,
        required : true,
    },
    phone:{
        type:String,
        maxLength: 100,
        required : true,
    },
    designation:{
        type:String,
        maxLength: 100,
        required : true,
    },
    address:{
        type:String,
        required : true,
    },
    dob:{
        type:Date,
        required : true,
    },
    gender:{
        type:String,
        maxLength: 10,
        required : true,
    },
    image:{
        type:String,
        required : true,
    },
    teacherNumber:{
        type:String,
        required : true,
    },
    password:{
        type:String,
        required : true,
    },
    education:{
        type:String,
        required : true,
    },
    startDate:{
        type:Date,
        required : true,
    },
    flag:{
        type: Number,
        default:0
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})

TeacherSchema.methods.gettoken = async function(){
    const token = jwt.sign({_id:this._id},process.env.SECRET_KEY)
    this.tokens = this.tokens.concat({token:token})
    await this.save()
    return token
}

const Teacher = mongoose.model('teacher_mst',TeacherSchema)
module.exports = Teacher;
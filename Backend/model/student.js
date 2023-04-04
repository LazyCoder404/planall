const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

const StudentSchema = mongoose.Schema({
    firstName: {
        type: String,
        maxLength: 100,
    },
    middleName:{
        type:String,
        maxLength: 100,
    },
    lastName:{
        type:String,
        maxLength: 50,
    },
    rollNo:{
        type:Number,
    },
    email:{
        type:String,
        maxLength: 100,
    },
    phone:{
        type:String,
    },
    address:{
        type:String,
    },
    registerDate:{
        type:Date,
    },
    gender:{
        type:String,
        maxLength: 10,
    },
    class_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'class_mst'
    },
    section_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'section_mst'
    },
    fatherName:{
        type:String,
        maxLength: 100,
    },
    motherName:{
        type:String,
        maxLength: 100,
    },
    dob:{
        type:Date,
    },
    bloodGroup:{
        type:String,
    },
    image:{
        type:String,
    },
    password:{
        type:String,
    },
    parent_login_id:{
        type:String,
    },
    parent_pass:{
        type:String,
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

StudentSchema.methods.gettoken = async function(){
    const token = jwt.sign({_id:this._id},process.env.SECRET_KEY)
    this.tokens = this.tokens.concat({token:token})
    await this.save()
    return token
}

const Student = mongoose.model('student_mst',StudentSchema)
module.exports = Student;
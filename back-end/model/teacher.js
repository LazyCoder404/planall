const mongoose = require('mongoose');
const TeacherSchema = mongoose.Schema({
    teacher_f_name: {
        type: String,
        maxLength: 100,
        required : true,
    },
    teacher_m_name:{
        type:String,
        maxLength: 50,
        required : true,
    },
    teacher_l_name:{
        type:String,
        maxLength: 50,
        required : true,
    },
    teacher_mail:{
        type:String,
        maxLength: 100,
        required : true,
    },
    teacher_cont_no:{
        type:String,
        maxLength: 100,
        required : true,
    },
    teacher_designation:{
        type:String,
        maxLength: 100,
        required : true,
    },
    teacher_address:{
        type:String,
        required : true,
    },
    teacher_birth_date:{
        type:Date,
        required : true,
    },
    teacher_gender:{
        type:String,
        maxLength: 10,
        required : true,
    },
    teacher_img:{
        type:String,
        required : true,
    },
    teacher_no:{
        type:String,
        required : true,
    },
    teacher_pass:{
        type:String,
        required : true,
    },
    teacher_education:{
        type:String,
        required : true,
    },
    starting_date:{
        type:Date,
        required : true,
    },
    flag:{
        type: Number,
        default:0
    },
    created_at:{
        type:String,
        default:null
    },
    updated_at:{
        type:String,
        default:null
    }
})

const Teacher = mongoose.model('teacher_mst',TeacherSchema)
module.exports = Teacher;
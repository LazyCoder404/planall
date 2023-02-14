const mongoose = require('mongoose');
const StudentSchema = mongoose.Schema({
    student_f_name: {
        type: String,
        maxLength: 100,
        required : true,
    },
    student_m_name:{
        type:String,
        maxLength: 100,
        required : true,
    },
    student_l_name:{
        type:String,
        maxLength: 50,
        required : true,
    },
    student_role_no:{
        type:Number,
        required : true,
    },
    student_mail:{
        type:String,
        maxLength: 100,
        required : true,
    },
    student_cont_no:{
        type:String,
        maxLength: 100,
        required : true,
    },
    student_mob_no:{
        type:String,
        required : true,
    },
    studnet_address:{
        type:String,
        required : true,
    },
    student_reg_date:{
        type:Date,
        required : true,
    },
    student_gender:{
        type:String,
        maxLength: 10,
        required : true,
    },
    class_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'class_mst'
    },
    section_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'section_mst'
    },
    student_father_name:{
        type:String,
        maxLength: 100,
        required : true,
    },
    studnet_mother_name:{
        type:String,
        maxLength: 100,
        required : true,
    },
    student_birthdate:{
        type:Date,
        required : true,
    },
    student_blood_group:{
        type:String,
        required : true,
    },
    student_img:{
        type:String,
        required : true,
    },
    student_no:{
        type:String,
        required : true,
    },
    student_pass:{
        type:String,
        required : true,
    },
    parents_login_id:{
        type:String,
        required : true,
    },
    parents_pass:{
        type:String,
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

const Student = mongoose.model('student_mst',StudentSchema)
module.exports = Student;
const mongoose = require('mongoose');
const StudentComplainSchema = mongoose.Schema({
    student_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student_mst'
    },
    teacher_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teacher_mst'
    },
    complain_title:{
        type:Date,
        maxLength: 100,
        required : true,
    },
    complain_desc:{
        type:String,
        required : true,
    },
    date:{
        type:Date,
        required : true,
    },
    flag:{
        type:Number,
        default : 0,
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

const StudentComplain = mongoose.model('student_complain_mst',StudentComplainSchema)
module.exports = StudentComplain;
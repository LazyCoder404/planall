const mongoose = require('mongoose');
const StudentLeaveSchema = mongoose.Schema({
    student_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student_mst'
    },
    class_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'class_mst'
    },
    section_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teacher_mst'
    },
    leave_title:{
        type:String,
        maxLength: 100,
        required : true,
    },
    leave_desc:{
        type:String,
        required : true,
    },
    leave_date:{
        type:Date,
        required : true,
    },
    date:{
        type:Date,
        required : true,
    },
    leave_document:{
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

const StudentLeave = mongoose.model('student_leave_mst',StudentLeaveSchema)
module.exports = StudentLeave;
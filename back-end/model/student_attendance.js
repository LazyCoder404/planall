const mongoose = require('mongoose');
const StudentAttendenceSchema = mongoose.Schema({
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
    stream_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'stream_mst'
    },
    attence_date:{
        type:Date,
        required : true,
    },
    present:{
        type:Number,
        default : 0,
    },
    flag:{
        type:Number,
        default : 0,
    },
    year:{
        type:String,
        required : true,
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

const StudentSchema = mongoose.model('student_attendance_mst',StudentAttendenceSchema)
module.exports = StudentSchema;
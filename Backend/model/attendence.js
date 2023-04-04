const mongoose = require('mongoose')

const attendenceSchema = mongoose.Schema({
    student_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"student_mst"
    },
    teacher_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"teacher_mst"
    },
    subject:String,
    attendence:Number,
    date:Date
})

const attendence = mongoose.model('attendence',attendenceSchema)

module.exports = attendence
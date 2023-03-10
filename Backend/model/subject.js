const mongoose = require('mongoose');
const SubjectSchema = mongoose.Schema({
    subject_name: {
        type: String,
        maxLength: 100,
        required : true,
    },
    class_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'class_mst'
    },
    section_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teacher_mst'
    },
    teacher_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teacher_mst'
    },
    stream_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'stream_mst'
    },
    admin_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin_mst'
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

const Subject = mongoose.model('subject_mst',SubjectSchema)
module.exports = Subject;
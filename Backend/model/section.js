const mongoose = require('mongoose');
const SectionSchema = mongoose.Schema({
    section_name: {
        type: String,
        maxLength: 100,
        required : true,
    },
    capecity:{
        type:String,
        required : true,
    },
    teacher_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teacher_mst'
    },
    stream_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'stream_mst'
    },
    class_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'class_mst'
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

const Section = mongoose.model('section_mst',SectionSchema)
module.exports = Section;
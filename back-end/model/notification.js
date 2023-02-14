const mongoose = require('mongoose');
const notificationSchema = mongoose.Schema({
    notification:{
        type: String,
        required: true
    },
    notification_for:{
        type: String,
        maxLength:100
    },
    class_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'class_mst'
    },
    sec_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'stream_mst'
    },
    date:{
        type:Date,
        required : true,
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

const StudentSchema = mongoose.model('notification_mst',notificationSchema)
module.exports = StudentSchema;
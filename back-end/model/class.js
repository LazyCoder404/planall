const mongoose = require('mongoose');
const ClassSchema = mongoose.Schema({
    class_name: {
        type: String,
        maxLength: 100,
        required : true,
    },
    admin_id :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin_mst'
    },
    note:{
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

const Class = mongoose.model('class_mst',ClassSchema)
module.exports = Class;
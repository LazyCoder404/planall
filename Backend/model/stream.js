const mongoose = require('mongoose');
const StreamSchema = mongoose.Schema({
    stream_name: {
        type: String,
        maxLength: 100,
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

const Stream = mongoose.model('stream_mst',StreamSchema)
module.exports = Stream;
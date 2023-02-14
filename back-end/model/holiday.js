const mongoose = require('mongoose');
const HolidaySchema = mongoose.Schema({
    admin_id :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin_mst'
    },
    holiday_title: {
        type: String,
        maxLength: 100,
        required : true,
    },
    holiday_reason:{
        type:String,
        required : true,
    },
    date:{
        type:Date,
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

const Holiday = mongoose.model('holiday_mst',HolidaySchema)
module.exports = Holiday;
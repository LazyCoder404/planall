const mongoose = require('mongoose');
const AdminSchema = mongoose.Schema({
    admin_name: {
        type: String,
        maxLength: 50,
        required : true,
    },
    admin_pass:{
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

const Admin = mongoose.model('admin_mst',AdminSchema)
module.exports = Admin;
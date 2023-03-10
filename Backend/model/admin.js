require('dotenv').config()
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

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
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})

AdminSchema.methods.gettoken = async function() {
    const token = jwt.sign({_id:this._id},process.env.SECRET_KEY)
    this.tokens = this.tokens.concat({token:token})
    await this.save()
    return token
}

const Admin = mongoose.model('admin_mst',AdminSchema)
module.exports = Admin;
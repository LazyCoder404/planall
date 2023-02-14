const Response = require('../ResponseMessage/AllMessage')
const Admin = require('../model/admin');

exports.index = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    const admin = await Admin.find().select({ __v: 0 }).sort({ created_at: -1 });

    res.json(Response.ResponseDataMsg("Data Found SuccessFully", admin))
    return
}

exports.store = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    if (!req.body.admin_name || req.body.admin_name == "") {
        res.json(Response.RequiredErrors('Admin Name Is Required'))
        return
    }
    if (!req.body.admin_pass || req.body.admin_pass == "") {
        res.json(Response.RequiredErrors('Admin Password Is Required'))
        return
    }
    const admin = new Admin({
        admin_name: req.body.admin_name,
        admin_pass: req.body.admin_pass,
        created_at: Date.now()
    })
    const data = await admin.save();
    res.json(Response.Responsemsg("Data Saved SuccessFully"))
    return
}

exports.edit = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    const _id = req.params.id;
    const admin = await Admin.findOne({ _id: _id }).select({ __v: 0 });
    res.json(Response.ResponseDataMsg("Data Found Successfully", admin))
    return
}

exports.update = async (req, res) => {
    
        res.setHeader("Access-Control-Allow-Origin", "*")
        if (!req.body.admin_name || req.body.admin_name == "") {
            res.json(Response.RequiredErrors('Admin Name Is Required'))
            return
        }
        if (!req.body.admin_pass || req.body.admin_pass == "") {
            res.json(Response.RequiredErrors('Admin Password Is Required'))
            return
        }
        const _id = req.params.id;
        const data = {
            admin_name: req.body.admin_name,
            admin_pass: req.body.admin_pass,
            updated_at: Date.now()
        }
        const admin = await Admin.findByIdAndUpdate(_id, data, { new: true });
        res.json(Response.Responsemsg("Data Updated SuccessFully"))
        return
   
}

exports.delete = async(req,res) => {
    const _id = req.params.id;
    var deleted_data = await Admin.findByIdAndDelete({ _id: _id })
        if (deleted_data) {
            res.json(Response.Responsemsg("Data deleted SucessFully."))
            return
        }
}

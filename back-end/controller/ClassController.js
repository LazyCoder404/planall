const Response = require('../ResponseMessage/AllMessage')
const mongoose = require('mongoose')
const Class = require('../model/class');

exports.index = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    const classData = await Class.find().select({ __v: 0 }).sort({ created_at: -1 });

    res.json(Response.ResponseDataMsg("Data Found SuccessFully", classData))
    return
}

exports.store = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    if (!req.body.class_name || req.body.class_name == "") {
        res.json(Response.RequiredErrors('Class Name Is Required'))
        return
    }
    if (!req.body.admin_id || req.body.admin_id == "") {
        res.json(Response.RequiredErrors('Admin Id Is Required'))
        return
    }
    if (!req.body.note || req.body.note == "") {
        res.json(Response.RequiredErrors('Note Is Required'))
        return
    }
    const classData = new Class({
        class_name: req.body.class_name,
        admin_id: req.body.admin_id,
        note: req.body.note,
        created_at: Date.now()
    })
    const data = await classData.save();
    res.json(Response.Responsemsg("Data Saved SuccessFully"))
    return
}

exports.edit = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    const _id = req.params.id;
    const data = await Class.aggregate([
        {
            $match: { _id: mongoose.Types.ObjectId(_id) }
        },
        {
            $lookup: {
                from: 'admin_msts',
                localField: 'admin_id',
                foreignField: '_id',
                as: 'admin_data'
            }
        },
        {
            $unwind: "$admin_data"
        },
        { $project: {'_id':1, 'class_name':1,'note':1,'flag':1, 'admin_data': { '_id': 1, 'admin_name': 1 }} }

    ])
    res.json(Response.ResponseDataMsg("Data Found Successfully", data))
    return
}

exports.update = async (req, res) => {

    res.setHeader("Access-Control-Allow-Origin", "*")
    if (!req.body.class_name || req.body.class_name == "") {
        res.json(Response.RequiredErrors('Class Name Is Required'))
        return
    }
    if (!req.body.admin_id || req.body.admin_id == "") {
        res.json(Response.RequiredErrors('Admin Id Is Required'))
        return
    }
    if (!req.body.note || req.body.note == "") {
        res.json(Response.RequiredErrors('Note Is Required'))
        return
    }
    const _id = req.params.id;
    const data = {
        class_name: req.body.class_name,
        admin_id: req.body.admin_id,
        note: req.body.note,
        updated_at: Date.now()
    }
    const classData = await Class.findByIdAndUpdate(_id, data, { new: true });
    res.json(Response.Responsemsg("Data Updated SuccessFully"))
    return

}

exports.delete = async (req, res) => {
    const _id = req.params.id;
    var deleted_data = await Class.findByIdAndDelete({ _id: _id })
    if (deleted_data) {
        res.json(Response.Responsemsg("Data deleted SucessFully."))
        return
    }
}

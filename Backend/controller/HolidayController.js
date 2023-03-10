const Response = require('../ResponseMessage/AllMessage')
const mongoose = require('mongoose')
const Holiday = require('../model/holiday');

exports.index = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    const holiday = await Holiday.find().select({ __v: 0 }).sort({ created_at: -1 });

    res.json(Response.ResponseDataMsg("Data Found SuccessFully", holiday))
    return
}

exports.store = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    if (!req.body.holiday_title || req.body.holiday_title == "") {
        res.json(Response.RequiredErrors('Holiday Title Is Required'))
        return
    }
    if (!req.body.admin_id || req.body.admin_id == "") {
        res.json(Response.RequiredErrors('Admin Id Is Required'))
        return
    }
    if (!req.body.holiday_reason || req.body.holiday_reason == "") {
        res.json(Response.RequiredErrors('Holiday Reason Is Required'))
        return
    }
    if (!req.body.date || req.body.date == "") {
        res.json(Response.RequiredErrors('Date Is Required'))
        return
    }
    const holiday = new Holiday({
        admin_id: req.body.admin_id,
        holiday_title: req.body.holiday_title,
        holiday_reason: req.body.holiday_reason,
        date: req.body.date,
        flag: req.body.flag,
        created_at: Date.now()
    })
    const data = await holiday.save();
    res.json(Response.Responsemsg("Data Saved SuccessFully"))
    return
}

exports.edit = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    const _id = req.params.id;
    const data = await Holiday.aggregate([
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
    if (!req.body.holiday_title || req.body.holiday_title == "") {
        res.json(Response.RequiredErrors('Holiday Title Is Required'))
        return
    }
    if (!req.body.admin_id || req.body.admin_id == "") {
        res.json(Response.RequiredErrors('Admin Id Is Required'))
        return
    }
    if (!req.body.holiday_reason || req.body.holiday_reason == "") {
        res.json(Response.RequiredErrors('Holiday Reason Is Required'))
        return
    }
    if (!req.body.date || req.body.date == "") {
        res.json(Response.RequiredErrors('Date Is Required'))
        return
    }
    const _id = req.params.id;
    const data = {
        admin_id: req.body.admin_id,
        holiday_title: req.body.holiday_title,
        holiday_reason: req.body.holiday_reason,
        date: req.body.date,
        flag: req.body.flag,
        updated_at: Date.now()
    }
    const holiday = await Holiday.findByIdAndUpdate(_id, data, { new: true });
    res.json(Response.Responsemsg("Data Updated SuccessFully"))
    return

}

exports.delete = async (req, res) => {
    const _id = req.params.id;
    var deleted_data = await Holiday.findByIdAndDelete({ _id: _id })
    if (deleted_data) {
        res.json(Response.Responsemsg("Data deleted SucessFully."))
        return
    }
}

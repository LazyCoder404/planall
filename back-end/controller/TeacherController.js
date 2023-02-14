const Response = require('../ResponseMessage/AllMessage')
const mongoose = require('mongoose')
const Teacher = require('../model/teacher');


exports.index = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    const teacher = await Teacher.find().select({ __v: 0 }).sort({ created_at: -1 });

    res.json(Response.ResponseDataMsg("Data Found SuccessFully", teacher))
    return
}

exports.store = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    if (!req.body.teacher_f_name || req.body.teacher_f_name == "") {
        res.json(Response.RequiredErrors("First Name Is Required"))
        return
    }
    if (!req.body.teacher_m_name || req.body.teacher_m_name == "") {
        res.json(Response.RequiredErrors("Middle Name Is Required"))
        return
    }
    if (!req.body.teacher_l_name || req.body.teacher_l_name == "") {
        res.json(Response.RequiredErrors('Last Name Is Required'))
        return
    }
    if (!req.body.teacher_mail || req.body.teacher_mail == "") {
        res.json(Response.RequiredErrors('Mail Id Is Required'))
        return
    }
    if (!req.body.teacher_cont_no || req.body.teacher_cont_no == "") {
        res.json(Response.RequiredErrors('Contact Number Is Required'))
        return
    }
    if (!req.body.teacher_designation || req.body.teacher_designation == "") {
        res.json(Response.RequiredErrors('Designation Is Required'))
        return
    }
    if (!req.body.teacher_address || req.body.teacher_address == "") {
        res.json(Response.RequiredErrors('Address Is Required'))
        return
    }
    if (!req.body.teacher_birth_date || req.body.teacher_birth_date == "") {
        res.json(Response.RequiredErrors('Birthdate Is Required'))
        return
    }
    if (!req.body.teacher_gender || req.body.teacher_gender == "") {
        res.json(Response.RequiredErrors('Gender Is Required'))
        return
    }
    if (!req.body.teacher_img || req.body.teacher_img == "") {
        res.json(Response.RequiredErrors('Image Is Required'))
        return
    }
    if (!req.body.teacher_no || req.body.teacher_no == "") {
        res.json(Response.RequiredErrors('Teacher Number Is Required'))
        return
    }
    if (!req.body.teacher_pass || req.body.teacher_pass == "") {
        res.json(Response.RequiredErrors('Password Is Required'))
        return
    }
    if (!req.body.teacher_education || req.body.teacher_education == "") {
        res.json(Response.RequiredErrors('Education Is Required'))
        return
    }
    if (!req.body.starting_date || req.body.starting_date == "") {
        res.json(Response.RequiredErrors('Starting Date Is Required'))
        return
    }

    const teacher = new Teacher({
        teacher_f_name: req.body.teacher_f_name,
        teacher_m_name: req.body.teacher_m_name,
        teacher_l_name: req.body.teacher_l_name,
        teacher_mail: req.body.teacher_mail,
        teacher_cont_no: req.body.teacher_cont_no,
        teacher_designation: req.body.teacher_designation,
        teacher_address: req.body.teacher_address,
        teacher_birth_date: req.body.teacher_birth_date,
        teacher_gender: req.body.teacher_gender,
        teacher_img: req.body.teacher_img,
        teacher_no: req.body.teacher_no,
        teacher_pass: req.body.teacher_pass,
        teacher_education: req.body.teacher_education,
        starting_date: req.body.starting_date,
        flag: req.body.flag,
        created_at: Date.now()
    })
    const data = await teacher.save();
    res.json(Response.Responsemsg("Data Saved SuccessFully"))
    return
}

exports.edit = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    const _id = req.params.id;
    const teacher = await Teacher.findOne({ _id: _id }).select({ __v: 0 });
    res.json(Response.ResponseDataMsg("Data Found Successfully", teacher))
    return
}

exports.update = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    if (!req.body.teacher_f_name || req.body.teacher_f_name == "") {
        res.json(Response.RequiredErrors("First Name Is Required"))
        return
    }
    if (!req.body.teacher_m_name || req.body.teacher_m_name == "") {
        res.json(Response.RequiredErrors("Middle Name Is Required"))
        return
    }
    if (!req.body.teacher_l_name || req.body.teacher_l_name == "") {
        res.json(Response.RequiredErrors('Last Name Is Required'))
        return
    }
    if (!req.body.teacher_mail || req.body.teacher_mail == "") {
        res.json(Response.RequiredErrors('Mail Id Is Required'))
        return
    }
    if (!req.body.teacher_cont_no || req.body.teacher_cont_no == "") {
        res.json(Response.RequiredErrors('Contact Number Is Required'))
        return
    }
    if (!req.body.teacher_designation || req.body.teacher_designation == "") {
        res.json(Response.RequiredErrors('Designation Is Required'))
        return
    }
    if (!req.body.teacher_address || req.body.teacher_address == "") {
        res.json(Response.RequiredErrors('Address Is Required'))
        return
    }
    if (!req.body.teacher_birth_date || req.body.teacher_birth_date == "") {
        res.json(Response.RequiredErrors('Birthdate Is Required'))
        return
    }
    if (!req.body.teacher_gender || req.body.teacher_gender == "") {
        res.json(Response.RequiredErrors('Gender Is Required'))
        return
    }
    if (!req.body.teacher_img || req.body.teacher_img == "") {
        res.json(Response.RequiredErrors('Image Is Required'))
        return
    }
    if (!req.body.teacher_no || req.body.teacher_no == "") {
        res.json(Response.RequiredErrors('Teacher Number Is Required'))
        return
    }
    if (!req.body.teacher_pass || req.body.teacher_pass == "") {
        res.json(Response.RequiredErrors('Password Is Required'))
        return
    }
    if (!req.body.teacher_education || req.body.teacher_education == "") {
        res.json(Response.RequiredErrors('Education Is Required'))
        return
    }
    if (!req.body.starting_date || req.body.starting_date == "") {
        res.json(Response.RequiredErrors('Starting Date Is Required'))
        return
    }
    const _id = req.params.id;
    const data = {
        teacher_f_name: req.body.teacher_f_name,
        teacher_m_name: req.body.teacher_m_name,
        teacher_l_name: req.body.teacher_l_name,
        teacher_mail: req.body.teacher_mail,
        teacher_cont_no: req.body.teacher_cont_no,
        teacher_designation: req.body.teacher_designation,
        teacher_address: req.body.teacher_address,
        teacher_birth_date: req.body.teacher_birth_date,
        teacher_gender: req.body.teacher_gender,
        teacher_img: req.body.teacher_img,
        teacher_no: req.body.teacher_no,
        teacher_pass: req.body.teacher_pass,
        teacher_education: req.body.teacher_education,
        starting_date: req.body.starting_date,
        flag: req.body.flag,
        updated_at: Date.now()
    }
    const teacher = await Teacher.findByIdAndUpdate(_id, data, { new: true });
    res.json(Response.Responsemsg("Data Updated SuccessFully"))
    return

}

exports.delete = async (req, res) => {
    const _id = req.params.id;
    var deleted_data = await Teacher.findByIdAndDelete({ _id: _id })
    if (deleted_data) {
        res.json(Response.Responsemsg("Data deleted SucessFully."))
        return
    }
}

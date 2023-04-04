const Response = require('../ResponseMessage/AllMessage')
const mongoose = require('mongoose')
const Teacher = require('../model/teacher');
const Student = require('../model/student');
const fs = require('fs')


exports.index = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    const teacher = await Student.find().select({ __v: 0 }).sort({ created_at: -1 });

    res.json(Response.ResponseDataMsg("Data Found SuccessFully", teacher))
    return
}

exports.store = async (req, res) => {
    try{
        res.setHeader("Access-Control-Allow-Origin", "*")
        if(!req.body.firstName || !req.body.middleName || !req.body.lastName || !req.body.rollNo || !req.body.email || !req.body.phone || 
            !req.body.address || !req.body.gender || !req.body.class_id || !req.body.section_id || !req.body.fatherName || 
            !req.body.motherName || !req.body.dob || !req.body.bloodGroup || !req.body.password || !req.body.parent_login_id ||
            !req.body.parent_pass || !req.body.flag || !req.files){
            if(!req.body.firstName){
                res.json(Response.requiredError("First name required"))
            }else if(!req.body.middleName){
                res.json(Response.requiredError("Middle name required"))
            }else if(!req.body.lastName){
                res.json(Response.requiredError("Last name required"))
            }else if(!req.body.rollNo){
                res.json(Response.requiredError("Roll No. required"))
            }else if(!req.body.email){
                res.json(Response.requiredError("email required"))
            }else if(!req.body.phone){
                res.json(Response.requiredError("phone number required"))
            }else if(!req.body.address){
                res.json(Response.requiredError("address required"))
            }else if(!req.body.gender){
                res.json(Response.requiredError("gender required"))
            }else if(!req.body.class_id){
                res.json(Response.requiredError("class id required"))
            }else if(!req.body.section_id){
                res.json(Response.requiredError("section id required"))
            }else if(!req.body.fatherName){
                res.json(Response.requiredError("father name required"))
            }else if(!req.body.motherName){
                res.json(Response.requiredError("mother name required"))
            }else if(!req.body.dob){
                res.json(Response.requiredError("dob required"))
            }else if(!req.body.bloodGroup){
                res.json(Response.requiredError("blood group required"))
            }else if(!req.body.password){
                res.json(Response.requiredError("password required"))
            }else if(!req.body.parent_login_id){
                res.json(Response.requiredError("parent login id required"))
            }else if(!req.body.parent_pass){
                res.json(Response.requiredError("parent pass required"))
            }else if(!req.body.flag){
                res.json(Response.requiredError("flag required"))
            }else if(!req.files){
                res.json(Response.requiredError("image required"))
            }
        }else{
            if(req.files.image){
                const file = req.files.image
                const ext = file.name.split('.')
                const fileName = Date.now() + "." + ext[ext.length - 1]
                var origin = req.get('origin');
                // const url = `${origin}/image/loanIcon/${fileName}`
                const url = `http://localhost:5555/student/${fileName}`
                file.mv("public/student/" + fileName, async (err, data) => {
                    if (err) {
                        res.json(Response.catchError(err))
                    }
                    else {
                        const addStudent = Student({
                            firstName:req.body.firstName,
                            middleName:req.body.middleName,
                            lastName:req.body.lastName,
                            rollNo:req.body.rollNo,
                            email:req.body.email,
                            phone:req.body.phone,
                            address:req.body.address,
                            registerDate:new Date(Date.now()),
                            gender:req.body.gender,
                            class_id:req.body.class_id,
                            section_id:req.body.section_id,
                            fatherName:req.body.fatherName,
                            motherName:req.body.motherName,
                            dob:req.body.dob,
                            bloodGroup:req.body.bloodGroup,
                            image:url,
                            password:req.body.password,
                            parent_login_id:req.body.parent_login_id,
                            parent_pass:req.body.parent_pass,
                            flag:req.body.flag
                        })
                        const saveStudent = await addStudent.save()
                        if(saveStudent){
                            res.json(Response.successResponse("Student added succesfully"))
                        }else{
                            res.json(Response.catchError("Something went wrong"))
                        }
                    }
                })
            }else{
                res.json(Response.requiredError("Image is required"))
            }
        }
    }catch(err){
        console.log(err);
        res.json(Response.catchError(err.message))
    }
}

exports.edit = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    const _id = req.params.id;
    const teacher = await Student.findOne({ _id: _id }).select({ __v: 0 });
    res.json(Response.ResponseDataMsg("Data Found Successfully", teacher))
    return
}

exports.update = async (req, res) => {
    try{
        res.setHeader("Access-Control-Allow-Origin", "*")
        if(!req.body.firstName || !req.body.middleName || !req.body.lastName || !req.body.rollNo || !req.body.email || !req.body.phone || 
            !req.body.address || !req.body.gender || !req.body.class_id || !req.body.section_id || !req.body.fatherName || 
            !req.body.motherName || !req.body.dob || !req.body.bloodGroup || !req.body.password || !req.body.parent_login_id ||
            !req.body.parent_pass || !req.body.flag){
            if(!req.body.firstName){
                res.json(Response.requiredError("First name required"))
            }else if(!req.body.middleName){
                res.json(Response.requiredError("Middle name required"))
            }else if(!req.body.lastName){
                res.json(Response.requiredError("Last name required"))
            }else if(!req.body.rollNo){
                res.json(Response.requiredError("Roll No. required"))
            }else if(!req.body.email){
                res.json(Response.requiredError("email required"))
            }else if(!req.body.phone){
                res.json(Response.requiredError("phone number required"))
            }else if(!req.body.address){
                res.json(Response.requiredError("address required"))
            }else if(!req.body.gender){
                res.json(Response.requiredError("gender required"))
            }else if(!req.body.class_id){
                res.json(Response.requiredError("class id required"))
            }else if(!req.body.section_id){
                res.json(Response.requiredError("section id required"))
            }else if(!req.body.fatherName){
                res.json(Response.requiredError("father name required"))
            }else if(!req.body.motherName){
                res.json(Response.requiredError("mother name required"))
            }else if(!req.body.dob){
                res.json(Response.requiredError("dob required"))
            }else if(!req.body.bloodGroup){
                res.json(Response.requiredError("blood group required"))
            }else if(!req.body.password){
                res.json(Response.requiredError("password required"))
            }else if(!req.body.parent_login_id){
                res.json(Response.requiredError("parent login id required"))
            }else if(!req.body.parent_pass){
                res.json(Response.requiredError("parent pass required"))
            }else if(!req.body.flag){
                res.json(Response.requiredError("flag required"))
            }
        }else{
            let updateData = {
                firstName:req.body.firstName,
                middleName:req.body.middleName,
                lastName:req.body.lastName,
                rollNo:req.body.rollNo,
                email:req.body.email,
                phone:req.body.phone,
                address:req.body.address,
                registerDate:new Date(Date.now()),
                gender:req.body.gender,
                class_id:req.body.class_id,
                section_id:req.body.section_id,
                fatherName:req.body.fatherName,
                motherName:req.body.motherName,
                dob:req.body.dob,
                bloodGroup:req.body.bloodGroup,
                password:req.body.password,
                parent_login_id:req.body.parent_login_id,
                parent_pass:req.body.parent_pass,
                flag:req.body.flag
            }
            if(req.files){
                if(req.files.image){
                    const findBank = await Student.findById({_id:req.params.id})
                    const extName = findBank.image ? findBank.image.split("/") : ["", ""]
                    const imgName = extName[extName.length - 1]
                    fs.unlink(`public/student/${imgName}`, async (err, data) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("image deleted");
                        }
                    })
                    const file = req.files.image
                    const ext = file.name.split('.')
                    const fileName = Date.now() + "." + ext[ext.length - 1]
                    const url = `http://localhost:5555/student/${fileName}`
                    file.mv("public/student/" + fileName, async (err, data) => {
                        if(err){
                            console.log(err,"imageError");
                            res.json(Response.catchError(err))
                        }else{
                            updateData.image=url
                            const student = await Student.findByIdAndUpdate({_id:req.params.id}, updateData, { new: true });
                            res.json(Response.Responsemsg("Data Updated SuccessFully"))
                        }
                    })
                }
            }else{
                const student = await Student.findByIdAndUpdate({_id:req.params.id}, updateData, { new: true });
                res.json(Response.Responsemsg("Data Updated SuccessFully"))
            }
        }
    }catch(err){
        console.log(err);
        res.json(Response.catchError(err.message))
    }
}

exports.delete = async (req, res) => {
    const findBank = await Student.findById({_id:req.params.id})
    const extName = findBank.image ? findBank.image.split("/") : ["", ""]
    const imgName = extName[extName.length - 1]
    fs.unlink(`public/student/${imgName}`, async (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log("image deleted");
        }
        const delBank = await Student.findByIdAndDelete({_id:req.params.id})
        if (delBank) {
            res.json(Response.successResponse("Student deleted succesfully"))
        } else {
            res.json(Response.findError("something went wrong"))
        }
    })
}

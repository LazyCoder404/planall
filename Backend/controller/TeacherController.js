const Response = require('../ResponseMessage/AllMessage')
const mongoose = require('mongoose')
const Teacher = require('../model/teacher');
const fs = require('fs')


exports.GetAllTeacher = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    const teacher = await Teacher.find().select({ __v: 0 }).sort({ created_at: -1 });
    res.json(Response.dataResponse("Data Found SuccessFully", teacher))
    return
}

exports.AddTeacher = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    if(!req.body.firstName || !req.body.middleName || !req.body.lastName || !req.body.email || !req.body.phone || !req.body.designation || !req.body.address || 
        !req.body.dob || !req.body.gender || !req.body.teacherNumber || !req.body.password || !req.body.education || !req.body.startDate || !req.body.flag || 
        !req.files){
            if(!req.body.firstName){
                res.json(Response.requiredError("First name required"))
            }else if(!req.body.middleName){
                res.json(Response.requiredError("Middle name required"))
            }else if(!req.body.lastName){
                res.json(Response.requiredError("Last name required"))
            }else if(!req.body.email){
                res.json(Response.requiredError("email required"))
            }else if(!req.body.phone){
                res.json(Response.requiredError("phone required"))
            }else if(!req.body.designation){
                res.json(Response.requiredError("designation number required"))
            }else if(!req.body.address){
                res.json(Response.requiredError("address required"))
            }else if(!req.body.dob){
                res.json(Response.requiredError("dob required"))
            }else if(!req.body.gender){
                res.json(Response.requiredError("gender required"))
            }else if(!req.body.teacherNumber){
                res.json(Response.requiredError("teacherNumber required"))
            }else if(!req.body.password){
                res.json(Response.requiredError("password required"))
            }else if(!req.body.education){
                res.json(Response.requiredError("education required"))
            }else if(!req.body.startDate){
                res.json(Response.requiredError("startDate required"))
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
            const url = `http://localhost:5555/teacher/${fileName}`
            file.mv("public/teacher/" + fileName, async (err, data) => {
                if (err) {
                    res.json(Response.catchError(err))
                }else {
                    const addTeacher = new Teacher({
                        firstName:req.body.firstName,
                        middleName:req.body.middleName,
                        lastName:req.body.lastName,
                        email:req.body.email,
                        phone:req.body.phone,
                        designation:req.body.designation,
                        address:req.body.address,
                        dob:req.body.dob,
                        gender:req.body.gender,
                        image:url,
                        teacherNumber:req.body.teacherNumber,
                        password:req.body.password,
                        education:req.body.education,
                        startDate:req.body.startDate,
                        flag:req.body.flag
                    })
                    const saveTeacher = await addTeacher.save()
                    if(saveTeacher){
                        res.json(Response.successResponse("Teacher added succesfully"))
                    }else{
                        res.json(Response.catchError("Something went wrong"))
                    }
                }
            })
        }else{
            res.json(Response.requiredError("Image is required"))
        }
    }
    return
}

exports.ShowTeacherData = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    const _id = req.params.id;
    const teacher = await Teacher.findOne({ _id: _id }).select({ __v: 0 });
    res.json(Response.dataResponse("Data Found Successfully", teacher))
    return
}

exports.EditTeacherData = async (req, res) => {
    if(!req.params.id || !req.body.firstName || !req.body.middleName || !req.body.lastName || !req.body.email || !req.body.phone || !req.body.designation || !req.body.address || 
        !req.body.dob || !req.body.gender || !req.body.teacherNumber || !req.body.password || !req.body.education || !req.body.startDate || !req.body.flag){
            if(!req.params.id){
                res.json(Response.requiredError("id required"))
            }else if(!req.body.firstName){
                res.json(Response.requiredError("First name required"))
            }else if(!req.body.middleName){
                res.json(Response.requiredError("Middle name required"))
            }else if(!req.body.lastName){
                res.json(Response.requiredError("Last name required"))
            }else if(!req.body.email){
                res.json(Response.requiredError("email required"))
            }else if(!req.body.phone){
                res.json(Response.requiredError("phone required"))
            }else if(!req.body.designation){
                res.json(Response.requiredError("designation number required"))
            }else if(!req.body.address){
                res.json(Response.requiredError("address required"))
            }else if(!req.body.dob){
                res.json(Response.requiredError("dob required"))
            }else if(!req.body.gender){
                res.json(Response.requiredError("gender required"))
            }else if(!req.body.teacherNumber){
                res.json(Response.requiredError("teacherNumber required"))
            }else if(!req.body.password){
                res.json(Response.requiredError("password required"))
            }else if(!req.body.education){
                res.json(Response.requiredError("education required"))
            }else if(!req.body.startDate){
                res.json(Response.requiredError("startDate required"))
            }else if(!req.body.flag){
                res.json(Response.requiredError("flag required"))
            }
    }else{
        const findTeacher = await Teacher.findById({_id:req.params.id})
        if(findTeacher){
            let updateData ={
                firstName:req.body.firstName,
                middleName:req.body.middleName,
                lastName:req.body.lastName,
                email:req.body.email,
                phone:req.body.phone,
                designation:req.body.designation,
                address:req.body.address,
                dob:req.body.dob,
                gender:req.body.gender,
                teacherNumber:req.body.teacherNumber,
                password:req.body.password,
                education:req.body.education,
                startDate:req.body.startDate,
                flag:req.body.flag
            }
            if(req.files){
                if(req.files.image){
                    if (findTeacher.image) {
                        const extName = findTeacher.image.split("/")
                        const imgName = extName[extName.length - 1]
                        fs.unlink(`public/teacher/${imgName}`, (err, data) => {
                            if (err) {
                                console.log("image not found");
                            } else {
                                console.log("image deleted");
                            }
                        })
                    }
                    const file = req.files.image
                    const ext = file.name.split('.')
                    const fileName = Date.now() + "." + ext[ext.length - 1]
                    const url = `http://localhost:5555/teacher/${fileName}`
                    file.mv("public/teacher/" + fileName, async (err, data) => {
                        if (err) {
                            res.json(catchError(err))
                        }
                        else {
                            updateData.image=url
                            const updateTeacher = await Teacher.findByIdAndUpdate({_id:findTeacher._id},updateData,{new:true})
                            if(updateTeacher){
                                res.json(Response.successResponse("Teacher Updated Succesfully"))
                            }else{
                                res.json(Response.findError("Something went wrong"))
                            }
                        }
                    })
                }
            }else{
                const updateTeacher = await Teacher.findByIdAndUpdate({_id:findTeacher._id},updateData,{new:true})
                if(updateTeacher){
                    res.json(Response.successResponse("Teacher Updated Succesfully"))
                }else{
                    res.json(Response.findError("Something went wrong"))
                }
            }
        }else{
            res.json(Response.findError("Data not found"))
        }
    }

}

exports.deleteTeacherData = async (req, res) => {
    const findBank = await Teacher.findById({_id:req.params.id})
    const extName = findBank.image ? findBank.image.split("/") : ["", ""]
    const imgName = extName[extName.length - 1]
    fs.unlink(`public/teacher/${imgName}`, async (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log("image deleted");
        }
        const delBank = await Teacher.findByIdAndDelete({_id:req.params.id})
        if (delBank) {
            res.json(Response.successResponse("Teacher deleted succesfully"))
        } else {
            res.json(Response.findError("something went wrong"))
        }
    })
}

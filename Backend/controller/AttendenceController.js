require('dotenv').config()
const Response = require('../ResponseMessage/AllMessage')
const Attendence = require("../model/attendence");
const Student = require('../model/student');
const nodemailer = require('nodemailer');
const { default: mongoose } = require('mongoose');

exports.GetAttendenceTodayData = async(req,res) => {
    try{
        console.log(req.body);
        if(req.body.teacher_id && req.body.subject){
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            today = mm + '/' + dd + '/' + yyyy;
            const data = await Attendence.find({$and:[{date:new Date(today)},{teacher_id:req.body.teacher_id},{subject:req.body.subject}]}).populate("student_id")
            if(data.length===0){
                const student = await Student.find().select({_id:1})
                Promise.all(
                    student.map(async(val,ind)=>{
                        const addAttendence = Attendence({
                            student_id:val._id,
                            teacher_id:req.body.teacher_id,
                            subject:req.body.subject,
                            date:today,
                            attendence:0
                        })
                        const saveAttendence = await addAttendence.save()
                    })
                ).then(async()=>{
                    const data1 = await Attendence.find({$and:[{date:new Date(today)},{teacher_id:req.body.teacher_id},{subject:req.body.subject}]}).populate("student_id")
                    res.json(Response.dataResponse("data found succesfully1",data1))
                })
            }else{
                res.json(Response.dataResponse("data found succesfully2",data))
            }
        }else{
            res.json(Response.dataResponse("data found succesfullyss",[]))
        }
    }catch(err){
        console.log(err);
        res.json(Response.catchError(err.message))
    }
}

exports.AddAttendence = async(req,res)=>{
    try{
        if(!req.body.id || !req.body.attendence){
            if(!req.body.id){
                res.json(Response.requiredError("id is required"))
            }else if(!req.body.attendence){
                res.json(Response.requiredError("attendence is required"))
            }
        }else{
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            today = mm + '/' + dd + '/' + yyyy;
            const saveAttendence = await Attendence.findByIdAndUpdate({_id:req.body.id},{attendence:req.body.attendence},{new:true})
            if(saveAttendence){
                res.json(Response.successResponse("Attendence filled succesfully"))
            }else{
                console.log("here");
                res.json(Response.catchError("Something went wrong"))
            }
        }
    }catch(err){
        console.log(err);
        res.json(Response.catchError(err.message))
    }
}

exports.SendAttendenceMail = async(req,res) => {
    try{
        if(!req.body.id){
            res.json(Response.requiredError("id is required"))
        }else{
            const findStudent = await Student.findById({_id:req.body.id})
            if(findStudent){
                let transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 587,
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.EMAIL_PASS,
                    },
                });
                let mailOptions = {
                    from:process.env.EMAIL,
                    to:findStudent.parent_login_id,
                    subject:'Sending Email for Attendence',
                    text:`This is absent mail`
                }
                transporter.sendMail(mailOptions,(err,info)=>{
                    if(err){
                        console.log(err);
                    }else{
                        console.log('Email send to : ',info.accepted[0]);
                    }
                })
                res.json(Response.dataResponse("Mail sent successfully"))
            }else{
                res.json(Response.findError("Data not found"))
            }
        }
    }catch(err){
        console.log(err);
        res.json(Response.catchError(err.message))
    }
}

exports.GetPDFData = async(req,res) => {
    try{
        if(!req.body.id || !req.body.date || !req.body.subject){
            if(!req.body.id){
                res.json(Response.requiredError("id is required"))
            }else if(!req.body.date){
                res.json(Response.requiredError("date is required"))
            }else{
                res.json(Response.requiredError("subject is required"))
            }
        }else{
            const startDate = new Date(req.body.date?.split(" - ")[0])
            const endDate = new Date(req.body.date?.split(" - ")[1])
            console.log(startDate,"----------" , endDate);
            const student = await Student.findById({_id:req.body.id}).select({firstName:1,_id:0})
            const data = await Attendence.find({$and:[{student_id:req.body.id},{subject:req.body.subject},{date:{$gte:startDate,$lte:endDate}}]}).select({date:1,attendence:1})
            // const data = await Attendence.find({student_id:req.body.id})
            const resObj = {
                name:student.firstName,
                subject:req.body.subject,
                attendence:data
            }
            // console.log(data);
            res.json(Response.dataResponse("Data found succesfully",resObj))
        }
    }catch(err){
        console.log(err);
        res.json(Response.catchError(err.message))
    }
}
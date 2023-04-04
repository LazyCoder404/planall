require('dotenv').config()
const Response = require('../ResponseMessage/AllMessage')
const nodemailer = require('nodemailer')
const Admin = require('../model/admin');
const Teacher = require('../model/teacher');
const Student = require('../model/student');

exports.login = async(req,res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    if (!req.body.name || req.body.name == "") {
        res.json(Response.RequiredErrors("Name Is Required"))
        return
    }
    if (!req.body.password || req.body.password == "") {
        res.json(Response.RequiredErrors("Password Is Required"))
        return
    }
    if (!req.body.role || req.body.role == "") {
        res.json(Response.RequiredErrors('Role Is Required'))
        return
    }
    const role = req.body.role;
    console.log(req.body);
    if(role === 'admin'){
        const check_Admin =await Admin.findOne({$and:[{admin_name:req.body.name},{admin_pass:req.body.password}]})
        if(check_Admin){
            const token = await check_Admin.gettoken()
            res.json(Response.ResponseDataMsg("Admin Login SuccessFully", {token:token,role:"admin",id:check_Admin._id}))
            return
        }else{
            res.json(Response.RequiredErrors('incorrect Credential'))
            return 
        }
    }else if(role === 'teacher'){
        const check_Teacher =await Teacher.findOne({$and:[{email:req.body.name},{password:req.body.password}]})
        if(check_Teacher){
            const token = await check_Teacher.gettoken()
            res.json(Response.ResponseDataMsg("Teacher Login SuccessFully", {token:token,role:"teacher",id:check_Teacher._id}))
            return
        }else{
            res.json(Response.RequiredErrors('incorrect Credential'))
            return 
        }
    }else if(role === 'student'){
        const check_Teacher =await Student.findOne({$and:[{email:req.body.name},{password:req.body.password}]})
        if(check_Teacher){
            const token = await check_Teacher.gettoken()
            res.json(Response.ResponseDataMsg("Student Login SuccessFully", {token:token,role:"student",id:check_Teacher._id}))
            return
        }else{
            res.json(Response.RequiredErrors('incorrect Credential'))
            return 
        }
    }
}

exports.userLogout = async (req, res) => {
    try {
        req.admin.tokens = req.admin.tokens.filter((curr) => {
            return curr.token !== req.token
        })
        await req.admin.save()
        res.json(Response.successResponse("User logout succesfully"))
    } catch (err) {
        res.json(Response.catchError(err.message))
    }
}

exports.SendEmail = async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*")
        if(!req.body.email){
            res.json(Response.RequiredErrors("Id Field Is Required"))
            return
        }
        if(!req.body.type){
            res.json(Response.RequiredErrors("Type is required"))
            return
        }
        if(req.body.type==="admin"){
            const checkoldpass = await Admin.findOne({admin_name:req.body.email})
            if(checkoldpass){
                let transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 587,
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.EMAIL_PASS,
                    },
                    // tls:{
                    //     rejectUnauthorized:false
                    // }
                });
                let mailOptions = {
                    from:process.env.EMAIL,
                    to:checkoldpass.admin_name,
                    subject:'Sending Email using NodeJs',
                    text:`please open below url for reset password.
                    ${process.env.RESETPASSWORDURL}${checkoldpass._id}/admin`
                }
                console.log(mailOptions);
                transporter.sendMail(mailOptions,(err,info)=>{
                    if(err){
                        console.log(err);
                    }else{
                        console.log('Email send to : ',info.accepted[0]);
                        res.json(Response.ResponseDataMsg("email sent successfully",info.accepted[0]))
                    }
                })
            }else{
                res.json(Response.RequiredErrors("old Password Did Not Match With Our Databases"))
                return
            }
        }else if(req.body.type==="teacher"){
            const checkoldpass = await Teacher.findOne({_id:req.body.id}).select({admin_pass:1,_id:0})
            if(checkoldpass){
                let transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 587,
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.EMAIL_PASS,
                    },
                    // tls:{
                    //     rejectUnauthorized:false
                    // }
                });
                let mailOptions = {
                    from:process.env.EMAIL,
                    to:checkoldpass.student_mail,
                    subject:'Sending Email using NodeJs',
                    text:`please open below url for reset password.
                    ${process.env.RESETPASSWORDURL}${base64.encode(checkoldpass._id)}/teacher`
                }
                transporter.sendMail(mailOptions,(err,info)=>{
                    if(err){
                        console.log(err);
                    }else{
                        console.log('Email send to : ',info.accepted[0]);
                        res.json(helper.dataResponse("otp sent successfully",info.accepted[0]))
                    }
                })
            }else{
                res.json(Response.RequiredErrors("old Password Did Not Match With Our Database"))
                return
            }
        }else if(req.body.type==="student"){
            const checkoldpass = await Student.findOne({_id:req.body.id})
            if(checkoldpass){
                let transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 587,
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.EMAIL_PASS,
                    },
                    // tls:{
                    //     rejectUnauthorized:false
                    // }
                });
                let mailOptions = {
                    from:process.env.EMAIL,
                    to:checkoldpass.student_mail,
                    subject:'Sending Email using NodeJs',
                    text:`please open below url for reset password.
                    ${process.env.RESETPASSWORDURL}${base64.encode(checkoldpass._id)}/student`
                }
                transporter.sendMail(mailOptions,(err,info)=>{
                    if(err){
                        console.log(err);
                    }else{
                        console.log('Email send to : ',info.accepted[0]);
                        res.json(helper.dataResponse("otp sent successfully",info.accepted[0]))
                    }
                })
            }else{
                res.json(Response.RequiredErrors("old Password Did Not Match With Our Database"))
                return
            }
        }else{
            res.json(Response.CatchErrors("Enter Valid Role"))
        }
    } catch (error) {
        console.log(error);
        res.json(Response.CatchErrors(error.message))
    }
}

exports.ResetPassword = async(req,res) => {
    try{
        if(!req.body.user_id || !req.body.password){
            if(!req.body.user_id){
                res.json(Response.RequiredErrors("User id must be required"))
            }else{
                res.json(Response.RequiredErrors("Password must be required"))
            }
        }else{
            if(req.body.type==='admin'){
                const id = req.body.user_id
                const password = req.body.password
                const updatePassword = await Admin.findByIdAndUpdate({_id:id},{admin_pass:password,},{new:true})
                if(updatePassword){
                    res.json(Response.Responsemsg("Password Updated Succesfully"))
                }else{
                    res.json(Response.ResponseErrmsg("User not found"))
                }
            }else if(req.body.type==='teacher'){
                const id = req.body.user_id
                const password = req.body.password
                const updatePassword = await Teacher.findByIdAndUpdate({_id:id},{teacher_pass:password,},{new:true})
                if(updatePassword){
                    res.json(Response.Responsemsg("Password Updated Succesfully"))
                }else{
                    res.json(Response.ResponseErrmsg("User not found"))
                }
            }else if(req.body.type==='student'){
                const id = req.body.user_id
                const password = req.body.password
                const updatePassword = await Student.findByIdAndUpdate({_id:id},{student_pass:password,},{new:true})
                if(updatePassword){
                    res.json(Response.Responsemsg("Password Updated Succesfully"))
                }else{
                    res.json(Response.ResponseErrmsg("User not found"))
                }
            }
            
        }
    }catch(err){
        console.log(err);
        res.json(Response.CatchErrors("Data Not Found"))
    }
}

exports.HomeApi = (req,res) => {
    try{
        res.json(Response.successResponse("Authentication Succesfull"))
    }catch(err){
        res.json(Response.catchError(err.message))
    }
}
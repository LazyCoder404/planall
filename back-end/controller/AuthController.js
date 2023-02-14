const Response = require('../ResponseMessage/AllMessage')
const Admin = require('../model/admin')
const Teacher = require('../model/teacher')
const Student =require('../model/student')

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
    if(role == 'admin'){
        var check_Admin =await Admin.findOne({admin_name:req.body.name, admin_pass:req.body.password}).select({admin_name:1})
        if(check_Admin){
            res.json(Response.ResponseDataMsg("Login SuccessFully", check_Admin))
            return
        }else{
            res.json(Response.RequiredErrors('incorrect Credential'))
            return 
        }
    }else if(role == 'teacher'){
        var check_Teacher =await Teacher.findOne({teacher_mail:req.body.name, teacher_pass:req.body.password}).select({teacher_mail:1})
        if(check_Teacher){
            res.json(Response.ResponseDataMsg("Login SuccessFully", check_Teacher))
            return
        }else{
            res.json(Response.RequiredErrors('incorrect Credential'))
            return 
        }
    }
    else if(role == 'student'){
        var check_Student =await Admin.findOne({student_mail:req.body.student_mail, student_pass:req.body.student_pass}).select({student_mail:1})
        if(check_Student){
            res.json(Response.ResponseDataMsg("Login SuccessFully", check_Student))
            return
        }else{
            res.json(Response.RequiredErrors('incorrect Credential'))
            return 
        }
    }
    else{

    }
}
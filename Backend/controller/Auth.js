require('dotenv').config()
const Admin = require("../model/admin")
const Teacher = require("../model/teacher")
const Student = require("../model/student")
const Response = require("../ResponseMessage/AllMessage")
const jwt = require('jsonwebtoken')

exports.Authentication = async(req,res,next)=>{
    try{
        if(!req.headers.authorization || !req.body.role){
            if(!req.headers.authorization){
                res.json(AuthError("authentication token required"))
            }else if(!req.body.role){
                res.json(AuthError("user role required"))
            }
        }else{
            const authHader = req.headers.authorization
            const token = authHader.split(' ')[1]
            const verif = await jwt.verify(token, process.env.SECRET_KEY)
            req.verifytoken = token
            const role = req.body.role
            if(role==="admin"){
                const userData = await Admin.findById({_id:verif._id})
                if(userData){
                    req.admin = userData
                    req.token = token
                    next()
                }else{
                    res.json(Response.AuthError("invalid token"))
                }
            }else if(role==="teacher"){
                const userData = await Teacher.findById({_id:verif._id})
                if(userData){
                    req.admin = userData
                    req.token = token
                    next()
                }else{
                    res.json(Response.AuthError("invalid token"))
                }
            }else if(role==="student"){
                const userData = await Student.findById({_id:verif._id})
                if(userData){
                    req.admin = userData
                    req.token = token
                    next()
                }else{
                    res.json(Response.AuthError("invalid token"))
                }
            }
            
        }
    }catch(err){
        res.json(Response.AuthError(err.message))
    }
}
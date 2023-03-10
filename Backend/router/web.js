const express = require('express')
const Router = express.Router()
const AdminController = require('../controller/AdminController')
const ClassController = require('../controller/ClassController')
const SectionController = require("../controller/SectionController")
const HolidayController = require('../controller/HolidayController')
const TeacherController = require('../controller/TeacherController')
const AuthController = require('../controller/AuthController')
const StudentController = require('../controller/StudentController')
const LessonController = require("../controller/LessonControler")
const {Authentication} = require("../controller/Auth")

Router.post("/home",Authentication,AuthController.HomeApi)
Router.post("/logout",Authentication,AuthController.userLogout)

Router.get('/admin',AdminController.index)
Router.post('/admin',AdminController.store)
Router.get('/admin/:id',AdminController.edit)
Router.patch('/admin/:id',AdminController.update)
Router.delete('/admin/:id',AdminController.delete)

Router.get('/class',ClassController.index)
Router.post('/class',ClassController.store)
Router.get('/class/:id',ClassController.edit)
Router.patch('/class/:id',ClassController.update)
Router.delete('/class/:id',ClassController.delete)

Router.post("/section",SectionController.index)
Router.post("/section/add",SectionController.AddSection)

Router.get('/holiday',HolidayController.index)
Router.post('/holiday',HolidayController.store)
Router.get('/holiday/:id',HolidayController.edit)
Router.patch('/holiday/:id',HolidayController.update)
Router.delete('/holiday/:id',HolidayController.delete)

Router.post('/teacher',TeacherController.GetAllTeacher)
Router.post('/teacher/add',TeacherController.AddTeacher)
Router.post('/teacher/view/:id',TeacherController.ShowTeacherData)
Router.post('/teacher/edit/:id',TeacherController.EditTeacherData)
Router.post('/teacher/delete/:id',TeacherController.deleteTeacherData)

Router.post('/student',StudentController.index)
Router.post('/student/add',StudentController.store)
Router.post('/student/show/:id',StudentController.edit)
Router.post('/student/edit/:id',StudentController.update)
Router.post('/student/delete/:id',StudentController.delete)

Router.post("/lesson",LessonController.GetAllLesson)
Router.post("/lesson/add",LessonController.AddLesson)
Router.post("/lesson/view/:id",LessonController.ViewLesson)
Router.post("/lesson/edit/:id",LessonController.EditLesson)
Router.post("/lesson/delete/:id",LessonController.DeleteLesson)

Router.post('/login',AuthController.login)
Router.post("/send_mail",AuthController.SendEmail)
Router.post("/rest_password",AuthController.ResetPassword)
/* Export Router In Index Js File */
module.exports = Router
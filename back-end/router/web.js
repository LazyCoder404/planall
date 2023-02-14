const express = require('express')
const Router = express.Router()
const AdminController = require('../controller/AdminController')
const ClassController = require('../controller/ClassController')
const HolidayController = require('../controller/HolidayController')
const TeacherController = require('../controller/TeacherController')
const AuthController = require('../controller/AuthController')
const StudentController = require('../controller/StudentController')

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

Router.get('/holiday',HolidayController.index)
Router.post('/holiday',HolidayController.store)
Router.get('/holiday/:id',HolidayController.edit)
Router.patch('/holiday/:id',HolidayController.update)
Router.delete('/holiday/:id',HolidayController.delete)

Router.get('/teacher',TeacherController.index)
Router.post('/teacher',TeacherController.store)
Router.get('/teacher/:id',TeacherController.edit)
Router.patch('/teacher/:id',TeacherController.update)
Router.delete('/teacher/:id',TeacherController.delete)

Router.get('/student',StudentController.index)
Router.post('/student',StudentController.store)
Router.get('/student/:id',StudentController.edit)
Router.patch('/student/:id',StudentController.update)
Router.delete('/student/:id',StudentController.delete)

Router.post('/login',AuthController.login)
/* Export Router In Index Js File */
module.exports = Router
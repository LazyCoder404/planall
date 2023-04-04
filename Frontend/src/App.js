import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap-daterangepicker/daterangepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'boxicons/css/boxicons.css'
import './App.css';
import Login from './pages/login'
import Home from './pages/home'
import axios from "axios";
import Admin from './pages/Admin-component/Admin';
import AdminAdd from './pages/Admin-component/AdminAdd';
import AdminView from './pages/Admin-component/AdminView';
import Student from './pages/Student-component/Student';
import StudentAdd from './pages/Student-component/StudentAdd'
import StudentView from './pages/Student-component/StudentView'
import StudentEdit from './pages/Student-component/StudentEdit'
import Forgot from './pages/Webview/Forgot';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Lesson from './pages/Lesson/Lesson';
import LessonAdd from './pages/Lesson/LessonAdd';
import LessonEdit from './pages/Lesson/LessonEdit';
import LessonView from './pages/Lesson/LessonView';
import Teacher from './pages/Teacher/Teacher';
import TeacherAdd from './pages/Teacher/TeacherAdd'
import TeacherEdit from './pages/Teacher/TeacherEdit'
import TeacherView from './pages/Teacher/TeacherView'
import Attendence from './pages/Attendence/Attendence';
export const API = axios.create({baseURL:'http://localhost:5555/'}) 


const App = () => {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />

          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/add" element={<AdminAdd />} />
          <Route path="/admin/edit" element={<AdminAdd />} />
          <Route path="/admin/view" element={<AdminView />} />

          <Route path="/teacher" element={<Teacher/>} />
          <Route path="/teacher/add" element={<TeacherAdd/>} />
          <Route path="/teacher/edit/:_id" element={<TeacherEdit/>} />
          <Route path="/teacher/view/:_id" element={<TeacherView/>} />

          <Route path="/student" element={<Student />} />
          <Route path="/student/add" element={<StudentAdd />} />
          <Route path="/student/edit/:_id" element={<StudentEdit />} />
          <Route path="/student/view/:_id" element={<StudentView />} />
          <Route path="/forgot/password/:_id/:type" element={<Forgot/>} />

          <Route path='/lesson' element={<Lesson/>}/>
          <Route path='/lesson/add' element={<LessonAdd/>}/>
          <Route path='/lesson/edit/:_id' element={<LessonEdit/>}/>
          <Route path='/lesson/view/:_id' element={<LessonView/>}/>

          <Route path='/attendence' element={<Attendence/>} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position='bottom-right' autoClose={500}></ToastContainer>
    </>
  )
}


export default App


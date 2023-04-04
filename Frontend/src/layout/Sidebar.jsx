import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

const Sidebar = ({ sidebar }) => {

  const [role,setRole] = useState("")
  
  useEffect(()=>{
    setRole(Cookies.get('dprole'))
  },[])
  
  return (
    <>
      <div className={sidebar?"sidebar-wrapper active":"sidebar-wrapper"}>
        <div className="sidebar-header">
          <div className="d-flex justify-content-between">
              <div className='sidebar-logo'>
                    <i className='bx bxs-dashboard'></i>
                    <span>MERN</span>
              </div>
          </div>
        </div>
        <div className="sidebar-menu">
          <ul className="menu">
            <li className="sidebar-item">
                <Link to="/home" className={`sidebar-link `}>
                  <i className='bx bxs-videos'></i>
                  <span>Home</span>
                </Link>
            </li>
            {/* {
              role==="admin"?
              <li className="sidebar-item">
                  <Link to="/admin" className={`sidebar-link `}>
                    <i className='bx bxs-videos'></i>
                    <span>Admin</span>
                  </Link>
              </li>:""
            } */}
            {
              role==="admin" || role==="teacher"?
              <li className="sidebar-item">
                  <Link to="/student" className={`sidebar-link`} >
                    <i className='bx bxs-videos'></i>
                    <span>Student</span>
                  </Link>
              </li>:""
            }
            {
              role==="admin"?
              <li className="sidebar-item">
                  <Link to="/teacher" className={`sidebar-link`} >
                    <i className='bx bxs-videos'></i>
                    <span>Teacher</span>
                  </Link>
              </li>:""
            }
            {
              role==="teacher"?
              <li className="sidebar-item">
                  <Link to="/attendence" className={`sidebar-link`} >
                    <i className='bx bxs-videos'></i>
                    <span>Attendence</span>
                  </Link>
              </li>:""
            }
            <li className="sidebar-item">
                <Link to="/lesson" className={`sidebar-link`}>
                  <i className='bx bxs-movie-play'></i>
                  <span>Lesson</span>
                </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Sidebar
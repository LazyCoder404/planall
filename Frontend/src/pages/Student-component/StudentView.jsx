import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../../App";
import Layout from "../../layout/Layout";

const StudentView = () => {
    const {_id} = useParams()
    const navigate = useNavigate()
    const [user,setUser] = useState({
        email:"",
        password:"",
        id:""
    })
    const getData = async(id) => {
        const studentData = await API.post(`/student/show/${id}`)
        if(studentData.data.status===false){
            if (studentData.data.response_code === 429) {
                navigate("/")
            } else {
                toast.error('something went wrong')
            }
        }else{
            setUser({
                email:studentData.data.data.student_mail,
                password:studentData.data.data.student_pass,
                id:studentData.data.data._id
            })
        }
    }
    useEffect(()=>{
        getData(_id)
    },[])
    return (
        <>
            <Layout sidebar={true}>
        <div div className="page-heading">
          <h3><Link to="/student" className='btn btn-primary btn-icon me-3'><i class='bx bxs-left-arrow-alt'></i></Link><span>View Student Details </span></h3>
        </div>
        <div className='page-content'>
          <Card>
            <Card.Body>
              <Row>
                <Col md={4}>
                  <div className='mb-4'>
                  <p className="mb-0 fw-bold">Email</p> <span>{user.email}</span>
                  </div>
                </Col>
                <Col md={4}>
                  <div className='mb-4'>
                  <p className="mb-0 fw-bold">Password</p> <span>{user.password}</span>
                  </div>
                </Col>
                <Col md={4}>
                  <div className='mb-4'>
                  <p className="mb-0 fw-bold">Role</p><span> Student </span>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </div>
      </Layout>
        </>
    )
}

export default StudentView
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
      firstName:"",
      middleName:"",
      lastName:"",
      rollNo:"",
      phone:"",
      dob:"",
      bloodGroup:"",
      fatherName:"",
      motherName:"",
      address:"",
      gender:"",
      class_id:"",
      section_id:"",
      parent_login_id:"",
      parent_pass:"",
      flag:"",
      Email: "",
      Password:"",
      image:"",
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
              firstName:studentData.data.data.firstName,
              middleName:studentData.data.data.middleName,
              lastName:studentData.data.data.lastName,
              rollNo:studentData.data.data.rollNo,
              phone:studentData.data.data.phone,
              dob:studentData.data.data.dob.split("T")[0],
              bloodGroup:studentData.data.data.bloodGroup,
              fatherName:studentData.data.data.fatherName,
              motherName:studentData.data.data.motherName,
              address:studentData.data.data.address,
              gender:studentData.data.data.gender,
              class_id:studentData.data.data.class_id,
              section_id:studentData.data.data.section_id,
              parent_login_id:studentData.data.data.parent_login_id,
              parent_pass:studentData.data.data.parent_pass,
              flag:studentData.data.data.flag,
              Email: studentData.data.data.email,
              Password:studentData.data.data.password,
              image:studentData.data.data.image,
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
                <Col md={3}>
                  <div className='mb-4'>
                  <p className="mb-0 fw-bold">First Name</p> <span>{user.firstName}</span>
                  </div>
                </Col>
                <Col md={3}>
                  <div className='mb-4'>
                  <p className="mb-0 fw-bold">Middle Name</p> <span>{user.middleName}</span>
                  </div>
                </Col>
                <Col md={3}>
                  <div className='mb-4'>
                  <p className="mb-0 fw-bold">Last Name</p><span>{user.lastName}</span>
                  </div>
                </Col>
                <Col md={3}>
                  <div>
                  <p className="mb-0 fw-bold">Image</p><img src={user.image} alt="Logo" height={40} />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={3}>
                  <div className='mb-4'>
                  <p className="mb-0 fw-bold">Father Name</p> <span>{user.fatherName}</span>
                  </div>
                </Col>
                <Col md={3}>
                  <div className='mb-4'>
                  <p className="mb-0 fw-bold">Mother Name</p> <span>{user.motherName}</span>
                  </div>
                </Col>
                <Col md={3}>
                  <div className='mb-4'>
                  <p className="mb-0 fw-bold">Address</p><span>{user.address}</span>
                  </div>
                </Col>
                <Col md={3}>
                  <div className='mb-4'>
                  <p className="mb-0 fw-bold">Gender</p><span>{user.gender}</span>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={3}>
                  <div className='mb-4'>
                  <p className="mb-0 fw-bold">Roll No.</p> <span>{user.rollNo}</span>
                  </div>
                </Col>
                <Col md={3}>
                  <div className='mb-4'>
                  <p className="mb-0 fw-bold">Date of Birth</p> <span>{user.dob}</span>
                  </div>
                </Col>
                <Col md={3}>
                  <div className='mb-4'>
                  <p className="mb-0 fw-bold">Phone No</p><span>{user.phone}</span>
                  </div>
                </Col>
                <Col md={3}>
                  <div className='mb-4'>
                  <p className="mb-0 fw-bold">Blood Group</p><span>{user.bloodGroup}</span>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={3}>
                  <div className='mb-4'>
                  <p className="mb-0 fw-bold">Class</p> <span>{user.class_id}</span>
                  </div>
                </Col>
                <Col md={3}>
                  <div className='mb-4'>
                  <p className="mb-0 fw-bold">Section</p> <span>{user.section_id}</span>
                  </div>
                </Col>
                <Col md={3}>
                  <div className='mb-4'>
                  <p className="mb-0 fw-bold">Parent Id</p><span>{user.parent_login_id}</span>
                  </div>
                </Col>
                <Col md={3}>
                  <div className='mb-4'>
                  <p className="mb-0 fw-bold">Parent Password</p><span>{user.parent_pass}</span>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={3}>
                  <div className='mb-4'>
                  <p className="mb-0 fw-bold">Flag</p> <span>{user.flag}</span>
                  </div>
                </Col>
                <Col md={3}>
                  <div className='mb-4'>
                  <p className="mb-0 fw-bold">Email</p> <span>{user.Email}</span>
                  </div>
                </Col>
                <Col md={3}>
                  <div className='mb-4'>
                  <p className="mb-0 fw-bold">Password</p><span>{user.Password}</span>
                  </div>
                </Col>
                <Col md={3}>
                  <div className='mb-4'>
                  <p className="mb-0 fw-bold">Role</p><span>Student</span>
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
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../../App";
import Layout from "../../layout/Layout";

const TeacherView = () => {
    const {_id}= useParams()
    const [inpData, setInpData] = useState({
        firstName:"",
        middleName:"",
        lastName:"",
        email:"",
        phone:"",
        designation:"",
        address:"",
        dob:"",
        gender:"",
        teacherNumber:"",
        password:"",
        education:"",
        startDate:"",
        flag:"",
        image:"",
        id:""
    })

    const getData = async() => {
        const response = await API.post(`/teacher/view/${_id}`)
        console.log(response.data.data.dob.split("T")[0],"date");
        if(response.data.status===true){
            setInpData({
                firstName:response.data.data.firstName,
                middleName:response.data.data.middleName,
                lastName:response.data.data.lastName,
                email:response.data.data.email,
                phone:response.data.data.phone,
                designation:response.data.data.designation,
                address:response.data.data.address,
                dob:response.data.data?.dob?.split("T")[0],
                gender:response.data.data.gender,
                teacherNumber:response.data.data.teacherNumber,
                password:response.data.data.password,
                education:response.data.data.education,
                startDate:response.data.data?.startDate?.split("T")[0],
                flag:response.data.data.flag,
                image:response.data.data.image,
                id:response.data.data._id
            })
        }else{
            toast.error("Something went wrong")
        }
    }
    useEffect(()=>{
      getData()
    },[])
    return (
        <>
            <Layout sidebar={true}>
        <div div className="page-heading">
          <h3><Link to="/teacher" className='btn btn-primary btn-icon me-3'><i class='bx bxs-left-arrow-alt'></i></Link><span>View Student Details </span></h3>
        </div>
        <div className='page-content'>
          <Card>
            <Card.Body>
              <Row>
                <Col md={3}>
                  <div className='mb-4'>
                  <p className="mb-0 fw-bold">First Name</p> <span>{inpData.firstName}</span>
                  </div>
                </Col>
                <Col md={3}>
                  <div className='mb-4'>
                  <p className="mb-0 fw-bold">Middle Name</p> <span>{inpData.middleName}</span>
                  </div>
                </Col>
                <Col md={3}>
                  <div className='mb-4'>
                  <p className="mb-0 fw-bold">Last Name</p><span>{inpData.lastName}</span>
                  </div>
                </Col>
                <Col md={3}>
                  <div className='mb-4'>
                  <p className="mb-0 fw-bold">Image</p><span><img src={inpData.image} alt="Teacher Image" height={"50px"}/></span>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={3}>
                  <div className='mb-4'>
                  <p className="mb-0 fw-bold">Email</p><span>{inpData.email}</span>
                  </div>
                </Col>
                <Col md={3}>
                  <div className='mb-4'>
                  <p className="mb-0 fw-bold">Password</p><span>{inpData.password}</span>
                  </div>
                </Col>
                <Col md={3}>
                  <div className='mb-4'>
                  <p className="mb-0 fw-bold">Phone No.</p><span>{inpData.phone}</span>
                  </div>
                </Col>
                <Col md={3}>
                  <div className='mb-4'>
                  <p className="mb-0 fw-bold">Designation</p><span>{inpData.designation}</span>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={3}>
                  <div className='mb-4'>
                  <p className="mb-0 fw-bold">Gender</p><span>{inpData.gender}</span>
                  </div>
                </Col>
                <Col md={3}>
                  <div className='mb-4'>
                  <p className="mb-0 fw-bold">Education</p><span>{inpData.education}</span>
                  </div>
                </Col>
                <Col md={3}>
                  <div className='mb-4'>
                  <p className="mb-0 fw-bold">Date of Birth</p><span>{inpData.dob}</span>
                  </div>
                </Col>
                <Col md={3}>
                  <div className='mb-4'>
                  <p className="mb-0 fw-bold">Taecher No.</p><span>{inpData.teacherNumber}</span>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={3}>
                  <div className='mb-4'>
                  <p className="mb-0 fw-bold">Start Date</p><span>{inpData.startDate}</span>
                  </div>
                </Col>
                <Col md={3}>
                  <div className='mb-4'>
                  <p className="mb-0 fw-bold">Flag</p><span>{inpData.flag}</span>
                  </div>
                </Col>
                <Col md={3}>
                  <div className='mb-4'>
                  <p className="mb-0 fw-bold">Address</p><span>{inpData.address}</span>
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

export default TeacherView
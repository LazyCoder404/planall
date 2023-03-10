import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../../App";
import Layout from "../../layout/Layout";

const LessonView = () => {
    const {_id} = useParams()
    const [user,setUser] = useState({
        grade:"",
        subject:"",
        date:"",
        topic:"",
        lesson:"",
        foucus:"",
        material:"",
        objective:"",
        structure:"",
        assesment:"",
    })

    const getData = async(req,res)=>{
        const response = await API.post(`/lesson/view/${_id}`)
        if(response.data.status===true){
            setUser({
                grade:response.data.data.grade,
                subject:response.data.data.subject,
                date:response.data.data.date,
                topic:response.data.data.topic,
                lesson:response.data.data.lesson,
                foucus:response.data.data.foucus,
                material:response.data.data.material,
                objective:response.data.data.objective,
                structure:response.data.data.structure,
                assesment:response.data.data.assesment,
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
          <h3><Link to="/lesson" className='btn btn-primary btn-icon me-3'><i class='bx bxs-left-arrow-alt'></i></Link><span>View Lesson Details </span></h3>
        </div>
        <div className='page-content'>
          <Card>
            <Card.Body>
              <Row>
                <Col md={3}>
                  <div className='mb-4'>
                  <p className="mb-0 fw-bold">Grad</p> <span>{user.grade}</span>
                  </div>
                </Col>
                <Col md={3}>
                  <div className='mb-4'>
                  <p className="mb-0 fw-bold">Subject</p> <span>{user.subject}</span>
                  </div>
                </Col>
                <Col md={3}>
                  <div className='mb-4'>
                  <p className="mb-0 fw-bold">Topic</p> <span>{user.topic}</span>
                  </div>
                </Col>
                <Col md={3}>
                  <div className='mb-4'>
                  <p className="mb-0 fw-bold">Date</p><span>{user.date}</span>
                  </div>
                </Col>
                <Col md={3}>
                  <div className='mb-4'>
                  <p className="mb-0 fw-bold">Lesson</p> <span>{user.lesson}</span>
                  </div>
                </Col>
                <Col md={3}>
                  <div className='mb-4'>
                  <p className="mb-0 fw-bold">Lesson Fouce And Goal</p> <span>{user.foucus}</span>
                  </div>
                </Col>
                <Col md={3}>
                  <div className='mb-4'>
                  <p className="mb-0 fw-bold">Material Needed</p> <span>{user.material}</span>
                  </div>
                </Col>
                <Col md={3}>
                  <div className='mb-4'>
                  <p className="mb-0 fw-bold">Learning Objective</p><span>{user.objective}</span>
                  </div>
                </Col>
                <Col md={3}>
                  <div className='mb-4'>
                  <p className="mb-0 fw-bold">Structure/Activity</p> <span>{user.structure}</span>
                  </div>
                </Col>
                <Col md={3}>
                  <div className='mb-4'>
                  <p className="mb-0 fw-bold">Assesment</p><span>{user.assesment}</span>
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

export default LessonView
import React, { useState } from "react";
import { Breadcrumb,Form, Button, Card, Col, Row } from "react-bootstrap";
import {Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../../App";
import Layout from "../../layout/Layout";

const LessonAdd = () => {
    const [validate,setValidate] = useState(false)
    const navigate = useNavigate()
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
    const onChange = async(e) => {
        setUser({...user,[e.target.name]:e.target.value})
    }

    const saveData = async (event) => {
        if (user.grade==="" || user.subject==="" || user.date==="" || user.topic==="" || user.lesson==="" || user.foucus==="" || user.material==="" || 
        user.objective==="" || user.structure==="" || user.assesment==="") {
            setValidate(true)
        }else {
            const Form = new FormData()
            Form.append('grade', user.grade)
            Form.append('subject', user.subject)
            Form.append('date', user.date)
            Form.append('topic', user.topic)
            Form.append('lesson', user.lesson)
            Form.append('foucus', user.foucus)
            Form.append('material', user.material)
            Form.append('objective', user.objective)
            Form.append('structure', user.structure)
            Form.append('assesment', user.assesment)

            const response = await API.post("/lesson/add", Form)
            console.log(response,"ress");
            if (response.data.status === true) {
                toast.success("Student Added Succesfully")
                navigate("/lesson")
            } else {
                if (response.data.response_code == 429) {
                navigate("/")
                } else {
                toast.error('something went wrong')
                }
            }
        }
    }
    return (
        <>
            <Layout sidebar={true}>
                <div div className="page-heading">
                    <h3>Add Lesson</h3>
                    {/* <h3>Edit Cloud Provider</h3> */}
                    <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
                        <Breadcrumb.Item >
                            <Link to="/home"><i className='bx bx-home-alt me-2 fs-5' ></i> Home</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item >
                            <Link to="/lesson">Lesson</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>Lesson Add</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="page-content">
                <Form noValidate validated={validate}>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col md={4}>
                                    <Form.Label htmlFor="Grade">Grade</Form.Label>
                                    <Form.Control type="text" className="my-2" value={user.grade} onChange={onChange} name='grade' required/>
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="Subject">Subject</Form.Label>
                                    <Form.Control type="text" className="my-2" value={user.subject} onChange={onChange} name='subject' required/>
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="Date">Date</Form.Label>
                                    <Form.Control type="date" className="my-2" value={user.date} onChange={onChange} name='date' required/>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Label htmlFor="Topic">Topic</Form.Label>
                                    <Form.Control type="text" className="my-2" value={user.topic} onChange={onChange} name='topic' required/>
                                </Col>
                                <Col md={6}>
                                    <Form.Label htmlFor="Lesson">Lesson</Form.Label>
                                    <Form.Control type="text" className="my-2" value={user.lesson} onChange={onChange}  name='lesson' required/>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={12} sm={12}>
                                    <Form.Group>
                                        <Form.Label htmlFor='Focus'>Lesson Focus And Goal</Form.Label>
                                        <Form.Control as="textarea" rows={4} className="my-2" id='loan-desc' value={user.foucus} onChange={onChange} name='foucus'  placeholder="Enter Lesson Focus" required/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                            <Col lg={6} sm={12}>
                                    <Form.Group>
                                        <Form.Label htmlFor='Material'>Materials Needed</Form.Label>
                                        <Form.Control as="textarea" rows={4} className="my-2" id='loan-desc' value={user.material} onChange={onChange} name='material'  placeholder="Enter Needed Material" required/>
                                    </Form.Group>
                                </Col>
                                <Col lg={6} sm={12}>
                                    <Form.Group>
                                        <Form.Label htmlFor='Objective'>Learning Objective</Form.Label>
                                        <Form.Control as="textarea" rows={4} className="my-2" id='loan-desc' value={user.objective} onChange={onChange} name='objective'  placeholder="Enter Learning Objective" required/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={12} sm={12}>
                                    <Form.Group>
                                        <Form.Label htmlFor='Structure'>Structure/Activity</Form.Label>
                                        <Form.Control as="textarea" rows={4} className="my-2" id='loan-desc' value={user.structure} onChange={onChange} name='structure'  placeholder="Enter Structure/Activity" required/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={12} sm={12}>
                                    <Form.Group>
                                        <Form.Label htmlFor='Assesment'>Assesment</Form.Label>
                                        <Form.Control as="textarea" rows={4} className="my-2" id='loan-desc' value={user.assesment} onChange={onChange} name='assesment'  placeholder="Enter Assesment" required/>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Card.Body>
                        <Card.Footer className="text-end">
                            <Button variant="primary" className="me-3" onClick={saveData}>Save</Button> :
                            <Link to={'/lesson'}>
                                <Button variant="secondary">Cancel</Button>
                            </Link>
                        </Card.Footer>
                    </Card>
                </Form>
                </div>
            </Layout>
        </>
    )
}

export default LessonAdd
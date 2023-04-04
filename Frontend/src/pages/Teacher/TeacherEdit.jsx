import React, { useEffect, useState } from "react";
import { Breadcrumb,Form, Button, Card, Col, Row, InputGroup } from "react-bootstrap";
import {Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../../App";
import Layout from "../../layout/Layout";

const TeacherAdd = () => {
    const {_id}= useParams()
    const [validate,setValidate] = useState(false)
    const navigate = useNavigate()
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
                dob:response.data.data.dob.split("T")[0],
                gender:response.data.data.gender,
                teacherNumber:response.data.data.teacherNumber,
                password:response.data.data.password,
                education:response.data.data.education,
                startDate:response.data.data.startDate,
                flag:response.data.data.flag,
                image:response.data.data.image,
                id:response.data.data._id
            })
        }else{
            toast.error("Something went wrong")
        }
    }

    const saveData = async (event) => {
        if (inpData.firstName === "" || inpData.middleName=="" || inpData.lastName=="" || inpData.email=="" || inpData.phone=="" 
        || inpData.designation=="" || inpData.address=="" || inpData.dob=="" || inpData.gender=="" || inpData.teacherNumber=="" 
        || inpData.password=="" || inpData.education=="" || inpData.startDate=="" || inpData.flag=="" ) {
            setValidate(true)
        }else {
            const Form = new FormData()
            Form.append('firstName', inpData.firstName)
            Form.append('middleName', inpData.middleName)
            Form.append('lastName', inpData.lastName)
            Form.append('email', inpData.email)
            Form.append('phone', inpData.phone)
            Form.append('designation', inpData.designation)
            Form.append('address', inpData.address)
            Form.append('dob', inpData.dob)
            Form.append('gender', inpData.gender)
            Form.append('teacherNumber', inpData.teacherNumber)
            Form.append('password', inpData.password)
            Form.append('education', inpData.education)
            Form.append('startDate', inpData.startDate)
            Form.append('flag', inpData.flag)
            Form.append('image', selectedImage?selectedImage:inpData.image)

            const response = await API.post(`/teacher/edit/${_id}`, Form)
            console.log(response,"ress");
            if (response.data.status === true) {
                toast.success("Teacher Updated Succesfully")
                navigate("/teacher")
            } else {
                if (response.data.response_code == 429) {
                navigate("/")
                } else {
                toast.error('something went wrong')
                }
            }
        }
    }
    const onChange = async(e) => {
        setInpData({...inpData,[e.target.name]:e.target.value})
    }
    const [selectedImage, setSelectedImage] = useState();

    const onImags = (event) => {
        console.log(event.target.files[0]);
        setSelectedImage(event.target.files[0]);
    }
    useEffect(()=>{
        getData()
    },[])
    return (
        <>
            <Layout sidebar={true}>
                <div div className="page-heading">
                    <h3>Add Student</h3>
                    {/* <h3>Edit Cloud Provider</h3> */}
                    <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
                        <Breadcrumb.Item >
                            <Link to="/home"><i className='bx bx-home-alt me-2 fs-5' ></i> Home</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item >
                            <Link to="/teacher">Teacher</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>Teacher Add</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="page-content">
                <Form noValidate validated={validate}>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col md={4}>
                                    <Form.Label htmlFor="First Name">First Name</Form.Label>
                                    <Form.Control type="text" className="my-2" name="firstName" value={inpData.firstName} onChange={onChange} placeholder='Enter First Name' required/>
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="Middle Name">Middle Name</Form.Label>
                                    <Form.Control type="text" className="my-2" name="middleName" value={inpData.middleName} onChange={onChange} placeholder='Enter Middle Name' required/>
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="Last Name">Last Name</Form.Label>
                                    <Form.Control type="text" className="my-2" name="lastName" value={inpData.lastName} onChange={onChange} placeholder='Enter Last Name' required/>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4}>
                                    <Form.Label htmlFor="Roll No">Email</Form.Label>
                                    <Form.Control type="email" className="my-2" name="email" value={inpData.email} onChange={onChange} placeholder='Enter Email' required/>
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="Phone No.">Phone No.</Form.Label>
                                    <Form.Control type="number" className="my-2" name="phone" value={inpData.phone} onChange={onChange} placeholder='Enter Phone Number' required/>
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="Designation">Designation</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Designation" className="form-control my-1" name="designation" value={inpData.designation} onChange={onChange} required/>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4}>
                                    <Form.Label htmlFor="Date Of Birth">Date Of Birth</Form.Label>
                                    <Form.Control type="date" placeholder="DD-MM-YYYY" value={inpData.dob} className="form-control my-1" name="dob" onChange={onChange} required/>
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="Teacher Number">Teacher Number</Form.Label>
                                    <Form.Control type="number" className="my-2" name="teacherNumber" value={inpData.teacherNumber} onChange={onChange} placeholder='Enter Teacher Number' required/>
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="Education">Education</Form.Label>
                                    <Form.Control type="text" className="my-2" name="education" value={inpData.education} onChange={onChange} placeholder='Enter Education' required/>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={6} sm={12}>
                                    <Form.Group>
                                        <Form.Label htmlFor='Address'>Address</Form.Label>
                                        <Form.Control as="textarea" rows={4} className="my-2" id='loan-desc' value={inpData.address} name='address' onChange={onChange} placeholder="Enter Address" required/>
                                    </Form.Group>
                                </Col>
                                <Col md={2}>
                                    <Form.Label htmlFor="Gender">Gender</Form.Label>
                                    <Form.Select name="gender" onChange={onChange} required>
                                        <option value="">Select Gender</option>
                                        <option selected={inpData.gender==="male"?true:false} value="male">Male</option>
                                        <option selected={inpData.gender==="female"?true:false} value="female">Female</option>
                                    </Form.Select>
                                </Col>
                                <Col lg={4} sm={12}>
                                    <Form.Group >
                                    <Form.Label htmlFor='image'>Image</Form.Label>
                                    <InputGroup className="my-2">
                                        <Form.Control type="file" id='state-name' onChange={(e) => { onImags(e) }} placeholder="Upload Image"/>
                                        {selectedImage && (
                                            <img src={URL.createObjectURL(selectedImage)} alt="Logo" height={40} />
                                        )}
                                    </InputGroup>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4}>
                                <Form.Label htmlFor="Flag">Flag</Form.Label>
                                    <Form.Control type="number" className="my-2" name="flag" value={inpData.flag} onChange={onChange} placeholder='Enter Flag' required/>
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="name">Start Date</Form.Label>
                                    <Form.Control type="date" placeholder="DD-MM-YYYY" className="form-control my-1" name="startDate" onChange={onChange} required/>
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="password">Password</Form.Label>
                                    <Form.Control type="password" className="my-2" name='Password' value={inpData.password} onChange={(e)=>{setInpData({...inpData,['password']:e.target.value})}} placeholder='Enter Password'  required/>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4}>
                                    <Form.Label htmlFor="Role">Role</Form.Label>
                                    <Form.Select name="role" disabled>
                                        <option value="">Select Role</option>
                                        <option value="">admin</option>
                                        <option selected={true} value="">Teacher</option>
                                        <option value="">student</option>
                                    </Form.Select>
                                </Col>
                            </Row>
                        </Card.Body>
                        <Card.Footer className="text-end">
                            <Button variant="primary" className="me-3" onClick={saveData}>Save</Button> :
                            <Link to={'/teacher'}>
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

export default TeacherAdd
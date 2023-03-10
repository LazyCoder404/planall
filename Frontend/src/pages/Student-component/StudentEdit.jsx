import React, { useEffect, useState } from "react";
import { Breadcrumb,Form, Button, Card, Col, Row, InputGroup } from "react-bootstrap";
import {Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../../App";
import Layout from "../../layout/Layout";

const StudentEdit = () => {
    const [validate,setValidate] = useState(false)
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
    const [classData,setClassData] = useState([])
    const [secData,setSecData] = useState([])
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
                dob:studentData.data.data.dob,
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

    const onChange = async(e) => {
        if(e.target.name==='class_id'){
            const section = await API.post("/section",{class_id:e.target.value})
            if(section.data.status===true){
                setSecData(section?.data?.data)
            }else{
                setSecData([])
            }
        }
        setUser({...user,[e.target.name]:e.target.value})
    }
    const saveData = async (event) => {
        if (user.email === "" || user.password==="") {
            setValidate(true)
        }else {
            const Form = new FormData()
            Form.append('email', user.email)
            Form.append('password', user.password)
            const response = await API.post(`/student/edit/${_id}`, Form)
            if (response.data.status === true) {
                toast.success("Student Data Edited Succesfully")
                navigate("/student")
            } else {
                if (response.data.response_code == 429) {
                navigate("/")
                } else {
                toast.error('something went wrong')
                }
            }
        }
    }

    const [selectedImage, setSelectedImage] = useState();

    const onImags = (event) => {
        console.log(event.target.files[0]);
        setSelectedImage(event.target.files[0]);
    }

    useEffect(()=>{
        getData(_id)
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
                            <Link to="/admin">Student</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>Student Add</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="page-content">
                <Form noValidate validated={validate}>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col md={4}>
                                    <Form.Label htmlFor="First Name">First Name</Form.Label>
                                    <Form.Control type="text" className="my-2" name="firstName" value={user.firstName} onChange={onChange} placeholder='Enter First Name' required/>
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="Middle Name">Middle Name</Form.Label>
                                    <Form.Control type="text" className="my-2" name="middleName" value={user.middleName} onChange={onChange} placeholder='Enter Middle Name' required/>
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="Last Name">Last Name</Form.Label>
                                    <Form.Control type="text" className="my-2" name="lastName" value={user.lastName} onChange={onChange} placeholder='Enter Last Name' required/>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4}>
                                    <Form.Label htmlFor="Roll No">Roll No</Form.Label>
                                    <Form.Control type="number" className="my-2" name="rollNo" value={user.rollNo} onChange={onChange} placeholder='Enter Roll No' required/>
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="Phone No.">Phone No.</Form.Label>
                                    <Form.Control type="number" className="my-2" name="phone" value={user.phone} onChange={onChange} placeholder='Enter Phone Number' required/>
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="Date of Birth">Date of Birth</Form.Label>
                                    <Form.Control type="date" placeholder="DD-MM-YYYY" className="form-control my-1" name="dob" onChange={onChange} required/>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4}>
                                    <Form.Label htmlFor="Blood Group">Blood Group</Form.Label>
                                    <Form.Control type="text" className="my-2" name="bloodGroup" value={user.bloodGroup} onChange={onChange} placeholder='Enter Blood Group' required/>
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="Father Name">Father Name</Form.Label>
                                    <Form.Control type="text" className="my-2" name="fatherName" value={user.fatherName} onChange={onChange} placeholder='Enter Father Name' required/>
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="Mother Name">Mother Name</Form.Label>
                                    <Form.Control type="text" className="my-2" name="motherName" value={user.motherName} onChange={onChange} placeholder='Enter Mother Name' required/>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={6} sm={12}>
                                    <Form.Group>
                                        <Form.Label htmlFor='Address'>Address</Form.Label>
                                        <Form.Control as="textarea" rows={4} className="my-2" id='loan-desc' value={user.address} name='address' onChange={onChange} placeholder="Enter Address" required/>
                                    </Form.Group>
                                </Col>
                                <Col md={2}>
                                    <Form.Label htmlFor="Gender">Gender</Form.Label>
                                    <Form.Select name="gender" onChange={onChange} required>
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </Form.Select>
                                </Col>
                                <Col lg={4} sm={12}>
                                    <Form.Group >
                                    <Form.Label htmlFor='image'>Image</Form.Label>
                                    <InputGroup className="my-2">
                                        <Form.Control type="file" id='state-name' onChange={(e) => { onImags(e) }} placeholder="Enter Your Name" required/>
                                        {selectedImage && (
                                            <img src={URL.createObjectURL(selectedImage)} alt="Logo" height={40} />
                                        )}
                                    </InputGroup>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={2}>
                                    <Form.Label htmlFor="Class">Class</Form.Label>
                                    <Form.Select name="class_id" onChange={onChange} required>
                                        <option value="">Select Class</option>
                                        {
                                            classData.map((dataVal,ind)=>{
                                                return(
                                                    <option value={dataVal._id}>{dataVal.class_name}</option>
                                                )
                                            })
                                        }
                                    </Form.Select>
                                </Col>
                                <Col md={2}>
                                    <Form.Label htmlFor="Section">Section</Form.Label>
                                    <Form.Select name="section_id" onChange={onChange} required>
                                        <option value="">Select Section</option>
                                        {
                                            secData.map((dataVal,ind)=>{
                                                return(
                                                    <option value={dataVal._id}>{dataVal.section_name}</option>
                                                )
                                            })
                                        }
                                    </Form.Select>
                                </Col>
                                
                            </Row>
                            <Row>
                                <Col md={4}>
                                    <Form.Label htmlFor="Parent Login Id">Parent Login Id</Form.Label>
                                    <Form.Control type="text" className="my-2" name="parent_login_id" value={user.parent_login_id} onChange={onChange} placeholder='Enter Parent Login ID' required/>
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="Parent Password">Parent Password</Form.Label>
                                    <Form.Control type="text" className="my-2" name="parent_pass" value={user.parent_pass} onChange={onChange} placeholder='Enter Parent Password' required/>
                                </Col>
                                <Col md={4}>
                                <Form.Label htmlFor="Flag">Flag</Form.Label>
                                    <Form.Control type="number" className="my-2" name="flag" value={user.flag} onChange={onChange} placeholder='Enter Flag' required/>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4}>
                                    <Form.Label htmlFor="name">Email</Form.Label>
                                    <Form.Control type="text" className="my-2" name='Email' value={user.Email} onChange={onChange} placeholder='Enter Email'  required/>
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="password">Password</Form.Label>
                                    <Form.Control type="password" className="my-2" name='Password' value={user.Password} onChange={onChange} placeholder='Enter Password'  required/>
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="Role">Role</Form.Label>
                                    <Form.Select name="role" disabled>
                                        <option value="">Select Role</option>
                                        <option value="">admin</option>
                                        <option value="">teacher</option>
                                        <option selected={true} value="">student</option>
                                    </Form.Select>
                                </Col>
                            </Row>
                        </Card.Body>
                        <Card.Footer className="text-end">
                            <Button variant="primary" className="me-3" onClick={saveData}>Save</Button> :
                            <Link to={'/student'}>
                                <Button variant="secondary">Cancle</Button>
                            </Link>
                        </Card.Footer>
                    </Card>
                </Form>
                </div>
            </Layout>
        </>
    )
}

export default StudentEdit
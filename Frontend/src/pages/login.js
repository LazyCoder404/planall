import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API } from '../App'
import Cookies from 'js-cookie'

const Login = () => {
    const tokenAuth = async () => {
        const token = Cookies.get('dpjwt')
        const role = Cookies.get('dprole')
        const response = await API.post("/home", {role:role}, { headers: { "Authorization": `Bearer ${token}` } })
        console.log(response,"resss");
        if (response.data.status === true) {
          navigate("/home")
        }
    }

    const initialState = {
        name: "",
        password: "",
        role: ""
    }
    const [forgot,setForgot] = useState(false)
    const [data, setData] = useState(initialState);
    const navigate = useNavigate();
    function formHandler(e) {
        setData({ ...data, [e.target.name]: e.target.value });
    }
    const userLogin = async (e) => {
        e.preventDefault();
        if(data.name==="" || data.password==="" || data.role===""){
            if(data.name===""){
                toast.error("Please Enter Email")
            }else if(data.password===""){
                toast.error("Please Enter Password")
            }else if(data.role===""){
                toast.error("Please Select User Role")
            }
        }else{
            const results = await API.post('/login', data)
            console.log(results);
            if (results.data.status === true) {
                Cookies.set('dpjwt', results.data.data.token, { expires: 1 })
                Cookies.set('dprole', results.data.data.role, { expires: 1 })
                toast.success(`${results.data.data.role} Login Succesfully`)
                navigate('/home');
            }else{
                toast.error(results?.data?.response_message)
            }
        }
    }

    const restPass = async()=>{
        const mailData = {
            email:data.name,
            type:data.role
        }
        const results = await API.post('/send_mail',mailData)
        console.log(results);
        if (results.data.status === true) {
            setForgot(false)
            toast.success("Email send to your registerd mail id")
        }
    }

    useEffect(() => {
        tokenAuth()
      },[])
    return (
        <>
            <div className="auth">
                <Container>
                    {/* <div className="logo">
                        <div><img src="../../logo/logo1.png" alt="" width={200} /></div>
                        <h1>Front-end</h1>
                    </div> */}
                    <Row>
                        <Col xl={5} lg={7} md={10} className="auth-box">
                            <h1 className="auth-title">Log in</h1>
                            <p className="auth-subtitle mb-5">Hello, Welcome to your account</p>
                            {
                                forgot?
                                <Form>
                                <Form.Group className="position-relative has-icon-left form-control-lg-icon mb-4">
                                    <Form.Control type="text" name='name' value={data.name} onChange={formHandler} placeholder="Enter Name" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <div className='d-flex gap-2'>
                                        <Form.Check type="radio" label="admin" name="role" value="admin" onChange={formHandler} />
                                        <Form.Check type="radio" label="teacher" name="role" value="teacher" onChange={formHandler} />
                                        <Form.Check type="radio" label="student" name="role" value="student" onChange={formHandler} />
                                    </div>
                                </Form.Group>
                                <Button onClick={()=>{setForgot(false)}}>Login</Button>
                                <Button variant="primary" type="button" onClick={restPass} className="w-100 mt-2">
                                    Send Mail
                                </Button>

                                </Form>:
                                <Form>
                                <Form.Group className="position-relative has-icon-left form-control-lg-icon mb-4">
                                    <Form.Control type="text" name='name' value={data.name} onChange={formHandler} placeholder="Enter Name" />
                                </Form.Group>

                                <Form.Group className="position-relative has-icon-left form-control-lg-icon mb-4">
                                    <Form.Control type="password" name='password' value={data.password} onChange={formHandler} placeholder="Enter Password" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <div className='d-flex gap-2'>
                                        <Form.Check type="radio" label="admin" name="role" value="admin" onChange={formHandler} />
                                        <Form.Check type="radio" label="teacher" name="role" value="teacher" onChange={formHandler} />
                                        <Form.Check type="radio" label="student" name="role" value="student" onChange={formHandler} />
                                    </div>
                                </Form.Group>
                                <Button onClick={()=>{setForgot(true)}}>Forgot Password</Button>
                                <Button variant="primary" type="button" onClick={userLogin} className="w-100 mt-2">
                                    Login
                                </Button>

                                </Form>
                            }
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Login



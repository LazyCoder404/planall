import React, {useEffect, useState } from 'react'
import { Button, Container, Card, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API } from '../../App';

const Forgot = () => {
    const {_id,type} = useParams()
    const [pwd,setPwd] = useState("")
    const [validate,setValidate] = useState(false)
    const [done,setDone] = useState(false)
    const loginData = async (event) => {
        event.preventDefault()
        if (pwd === "") {
        setValidate(true)
        } else {
        const userData = {
            user_id:_id,
            password: pwd,
            type:type
        }
        console.log(pwd);
        const response = await API.post("/rest_password", userData)
        if (response.data.status === true) {
            setDone(true)
            toast.success('Password Succesfully Changed')

        } else {
            toast.error(response.data.response_message)
        }
        }
    }

    useEffect(() => {
    }, [])

    // designer code
    const [eye, seteye] = useState(true);
    const [password, setpassword] = useState("password");

    const Eye = () => {
        if (password === "password") {
        setpassword("text");
        seteye(false);
        }
        else {
        setpassword("password");
        seteye(true);
        }
    }

  return (
    <>
        <Container>
            <div className="auth">
            <div className="auth-box">
                <Card>
                {/* <Card.Header className="pb-0">
                    <div className='auth-logo'>
                    <img src="https://seeklogo.com/images/N/nodejs-logo-FBE122E377-seeklogo.com.png" alt="Node Js" className='logo-mini' />
                    </div>
                </Card.Header> */}
                    <Card.Body>
                    <h1 className='auth-title'>Forgot Password</h1>
                    <h2 className='auth-subtitle'>Demo Project</h2>
                    {
                        !done ? <Form method='post' noValidate validated={validate}>
                            <Form.Group className="mb-4 input-prefix">
                            <Form.Label>Enter New Password</Form.Label>
                            <Form.Control type={password} name='password' value={pwd} onChange={(e) => {setPwd(e.target.value)}} className="my-2" placeholder="Enter Password"  required/>
                            <i onClick={Eye} className={`bx me-4 ${eye ? "bx-hide" : "bx-show"}`}></i>
                            </Form.Group>
                            <Button variant="primary" type="submit" className="w-100 " onClick={loginData}>Confirm Password</Button>
                            </Form> : 
                            <Form method='post' noValidate validated={validate}>
                            <Form.Group className="mb-4 input-prefix"><br/><br/>
                            <Form.Label className='m-l-70'>Your Password has been succesfully updated.</Form.Label><br/>
                            </Form.Group>
                            </Form>
                    }
                </Card.Body>
            </Card>
            </div>
            </div>
        </Container>
    </>
  )
}

export default Forgot
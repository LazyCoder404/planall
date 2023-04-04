import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Dropdown } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { API } from '../App';

const Header = ({ openSidebar }) => {
    const navigate = useNavigate();
    const userLogout = async() => {
        const token = Cookies.get('dpjwt')
        const role = Cookies.get('dprole')
        if (token) {
            const response = await API.post("/logout", {role}, { headers: { "Authorization": `Bearer ${token}` } })
            toast('Logout Succesfully')
            Cookies.remove('dpjwt')
            Cookies.remove('dprole')
            navigate("/")
        } else {
            navigate("/")
        }
    }
  return (
    <>
       <header className="sidebar-header">
            <div className="header-left-menu">
                <Link to="/" className='d-xl-none'>
                    
                </Link>
            </div>
            <div className="header-right-menu">
                <Dropdown>
                    <Dropdown.Toggle id="dropdown-autoclose-true">
                        <div className="user-menu">
                            <div className="user-img">
                                <img src="../../logo/images.png"/>
                            </div>
                            <div className="user-name ms-2">
                                <h6>Front-end</h6>
                                <p>Admin</p>
                            </div>
                        </div>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="dropdown-menu dropdown-menu-end">
                        <Dropdown.Item onClick={userLogout} >
                            Logout
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Button className="burger-btn d-xl-none" onClick={openSidebar}>
                    <i className='bx bx-menu fs-3'></i>
                </Button>
            </div>
        </header> 
    </>
  )
}

export default Header
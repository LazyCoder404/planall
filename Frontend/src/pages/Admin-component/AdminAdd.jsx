import React from "react";
import { Breadcrumb,Form, Button, Card, Col, Row } from "react-bootstrap";
import {Link } from "react-router-dom";
import Layout from "../../layout/Layout";

const AdminAdd = () => {
    return (
        <>
            <Layout sidebar={true}>
                <div div className="page-heading">
                    <h3>Add Admin</h3>
                    {/* <h3>Edit Cloud Provider</h3> */}
                    <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
                        <Breadcrumb.Item >
                            <Link to="/home"><i className='bx bx-home-alt me-2 fs-5' ></i> Home</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item >
                            <Link to="/admin">Admin</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>Admin Add</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="page-content">
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col md={4}>
                                    <Form.Label htmlFor="name">Name</Form.Label>
                                    <Form.Control type="text" className="my-2" name='name' />
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="password">Password</Form.Label>
                                    <Form.Control type="password" className="my-2" name='password' />
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="Role">Role</Form.Label>
                                    <Form.Select name="role">
                                        <option value="">Select Role</option>
                                        <option value="">admin</option>
                                        <option value="">teacher</option>
                                        <option value="">student</option>
                                    </Form.Select>
                                </Col>
                            </Row>
                        </Card.Body>
                        <Card.Footer className="text-end">
                            <Button variant="primary" className="me-3">Save</Button> :
                            <Link to={'/admin'}>
                                <Button variant="secondary">Cancle</Button>
                            </Link>
                        </Card.Footer>
                    </Card>
                </div>
            </Layout>
        </>
    )
}

export default AdminAdd
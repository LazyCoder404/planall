import React from "react";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Layout from "../../layout/Layout";

const Admin = () => {
    return (
        <>
            <Layout sidebar={true}>
                <div className="page-heading">
                    <h3 className="my-1">Admin Details</h3>
                    <div className="page-heading-right">
                        <Link to="/admin/Add">
                            <Button variant="primary ms-3 my-1" value="create">Add New</Button>
                        </Link>
                    </div>
                </div>
            <div className='page-content'>
                <Row>
                    <Col xs={12}>
                        <Card>
                            <Card.Body>
                                <Table bordered responsive>
                                    <thead>
                                        <tr>
                                            <th width="5%" className="text-center">No.</th>
                                            <th width="20%" className="text-center">Name</th>
                                            <th width="20%" className="text-center">Password</th>
                                            <th width="20%" className="text-center" >Role</th>
                                            <th width="10%" className="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="text-center">
                                            <td>1</td>
                                            <td>Admin</td>
                                            <td>Admin@123</td>
                                            <td>Admin</td>
                                            <td className="text-center">
                                                <Link to={`/admin/view/`}>
                                                    <Button variant="outline-warning me-2 btn-icon"><i className='bx bx-show'></i></Button>
                                                </Link>
                                                <Link to={`/admin/edit/`}>
                                                    <Button variant="outline-primary me-2 btn-icon"><i class='bx bxs-pencil'></i></Button>
                                                </Link>
                                                <Button variant="outline-danger me-2 btn-icon" ><i className='bx bx-trash-alt' ></i></Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
            </Layout>
        </>
    )
}

export default Admin
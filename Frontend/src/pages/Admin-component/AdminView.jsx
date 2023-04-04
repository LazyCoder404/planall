import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Layout from "../../layout/Layout";

const AdminView = () => {
    return (
        <>
            <Layout sidebar={true}>
        <div div className="page-heading">
          <h3><Link to="/Admin" className='btn btn-primary btn-icon me-3'><i class='bx bxs-left-arrow-alt'></i></Link><span>View Admin Details </span></h3>
        </div>
        <div className='page-content'>
          <Card>
            <Card.Body>
              <Row>
                <Col md={4}>
                  <div className='mb-4'>
                  <p className="mb-0 fw-bold">No.</p> <span> 1 </span>
                  </div>
                </Col>
                <Col md={4}>
                  <div className='mb-4'>
                  <p className="mb-0 fw-bold">Name</p> <span> vishal </span>
                  </div>
                </Col>
                <Col md={4}>
                  <div className='mb-4'>
                  <p className="mb-0 fw-bold">Password</p> <span> vishal@123 </span>
                  </div>
                </Col>
                <Col md={4}>
                  <div className='mb-4'>
                  <p className="mb-0 fw-bold">Role</p><span> Admin </span>
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

export default AdminView
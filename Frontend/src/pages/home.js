import React, { useEffect } from 'react'
import Layout from '../layout/Layout'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { API } from '../App'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    useEffect(() => {
      }, [])
  return (
    <Layout sidebar={true}>
        <>
        <div className="page-content">
            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body>
                            <h3 className="text-center mb-0"><b>Welcome to Demo Project</b></h3>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
        </>
    </Layout>
  )
}

export default Home
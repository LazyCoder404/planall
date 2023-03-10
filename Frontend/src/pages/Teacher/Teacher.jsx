import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../App";
import Layout from "../../layout/Layout";
import Swal from 'sweetalert2'
import Pagination from 'rc-pagination'

const Teacher = () => {
    const [dataLength, setDataLength] = useState(1)
    const [data, setData] = useState([])
    const [sData, setSData] = useState([])
    const navigate = useNavigate()
    const getData = async () => {
        const response = await API.post("/teacher")
        if (response.data.status === false) {
            if (response.data.response_code === 429) {
                navigate("/")
            } else {
              setData([])
              setSData([])
              setDataLength(0)
            }
        } else {
            setData(response.data.data)
            setSData(response.data.data)
            setDataLength(1)
        }
    }

    const deleteUser = async (id) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger me-2'
            },
            buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                const delCategory = await API.post(`/teacher/delete/${id}`,)
                if (delCategory.data.status === false) {
                    if (delCategory.data.response_code === 429) {
                        navigate("/")
                    } else {
                        swalWithBootstrapButtons.fire(
                            'Cancelled',
                            `${delCategory.data.response_message}`,
                            'error'
                        )
                    }
                } else {
                    getData()
                    setCurrent(1)
                }
    
            }
        })
    }

     // Paggintion Code // 
    const [size, setSize] = useState(10);
    const [current, setCurrent] = useState(1);

    const wetData = (current, pageSize) => {
        return data.slice((current - 1) * pageSize, current * pageSize);
    };

    const PerPageChange = (value) => {
        setSize(value);
        const newPerPage = Math.ceil(data.length / value);
        if (current > newPerPage) {
            setCurrent(newPerPage);
        }
    }

    const PaginationChange = (page, pageSize) => {
        setCurrent(page);
        setSize(pageSize)
    }


    const PrevNextArrow = (current, type, originalElement) => {
        if (type === 'prev') {
            return <button className='paggination-btn'>Previous</button>;
        }
        if (type === 'next') {
            return <button className='paggination-btn'>Next</button>;
        }
        return originalElement;
    }

    useEffect(()=>{
        getData()
    })
    return (
        <>
            <Layout sidebar={true}>
                <div className="page-heading">
                    <h3 className="my-1">Teacher Details</h3>
                    <div className="page-heading-right">
                        <Link to="/teacher/Add">
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
                                            <th width="20%" className="text-center">First Name</th>
                                            <th width="20%" className="text-center">Last Name</th>
                                            <th width="10%" className="text-center">Image</th>
                                            <th width="20%" className="text-center">Password</th>
                                            <th width="10%" className="text-center" >Role</th>
                                            <th width="10%" className="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            wetData(current, size).map((dataVal,ind)=>{
                                                return(
                                                    <tr className="text-center" key={ind}>
                                                        <td className='text-center'>{(current === 1) ? ind + 1 : current * size + ind + 1 - size}</td>
                                                        <td>{dataVal.firstName}</td>
                                                        <td>{dataVal.lastName}</td>
                                                        <td className='text-center'>
                                                                <img src={dataVal.image} height={50} width={50} className="" alt="img" />
                                                        </td>
                                                        <td>{dataVal.password}</td>
                                                        <td>Teacher</td>
                                                        <td className="text-center">
                                                            <Link to={`/teacher/view/${dataVal._id}`}>
                                                                <Button variant="outline-warning me-2 btn-icon"><i className='bx bx-show'></i></Button>
                                                            </Link>
                                                            <Link to={`/teacher/edit/${dataVal._id}`}>
                                                                <Button variant="outline-primary me-2 btn-icon"><i class='bx bxs-pencil'></i></Button>
                                                            </Link>
                                                            <Button variant="outline-danger me-2 btn-icon" onClick={() => deleteUser(dataVal._id)} ><i className='bx bx-trash-alt' ></i></Button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>
                                <div className="pagination-custom">
                                {
                                data.length > size ?
                                <Pagination showTitle={false}
                                    className="pagination-data"
                                    onChange={PaginationChange}
                                    total={data.length}
                                    current={current}
                                    pageSize={size}
                                    showSizeChanger={false}
                                    itemRender={PrevNextArrow}
                                    onShowSizeChange={PerPageChange}
                                />:""
                                }
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
            </Layout>
        </>
    )
}

export default Teacher
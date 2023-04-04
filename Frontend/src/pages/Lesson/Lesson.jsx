import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify";
import { API } from "../../App";
import Layout from "../../layout/Layout";
import Swal from 'sweetalert2'
import Pagination from 'rc-pagination'
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
// import {Document, Packer} from "docx";
import { saveAs } from "file-saver";
import Cookies from "js-cookie";

const Lesson = () => {
//----------------------------------------------------------------------------------
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = async() =>{ 
        setShow(true);
        const response = await API.post("/student")
        if (response.data.status === false) {
            if (response.data.response_code === 429) {
                navigate("/")
            } else {
              setStudnet([])
            }
        } else {
            setStudnet(response.data.data)
        }
    }
    const [ischeaked, setcheakd] = useState([])
    const handelChecked = (e, ind) => {
        const sData = student
        const { value, checked } = e.target;
        if (checked) {
            sData[ind].ischeaked = checked
            setcheakd([...ischeaked, value])
            setStudnet(sData)

        } else {
            sData[ind].ischeaked = false
            setcheakd(ischeaked.filter((e) => e !== value))
            setStudnet(sData)
        }
    }


    const selectAll = async (e) => {
        // console.log(e.target.checked,"da");
        if (e.target.checked) {
            let ids = student
            let delId = []
            ids = ids.map((val) => {
                val.ischeaked = e.target.checked
                delId.push(val.email)
                return val
            })
            setStudnet(ids)
            setcheakd(delId)
        } else {
            let ids = student
            ids = ids.map((val) => {
                val.ischeaked = e.target.checked
                return val
            })
            setStudnet(ids)
            setcheakd([])
        }
    }

    const sendMail = async()=>{
        console.log(ischeaked,"isch");
        if(ischeaked.length===0){
            toast.error("Please select student")
        }else{
            const Form = new FormData
            Form.append('email',JSON.stringify(ischeaked))
            const response = await API.post("/lesson_mail",Form)
            toast.success("Mail send succesfully")
            handleClose()
        }
    }
//-------------------------------------------------------------------------------------
    const [role,setRole] = useState(Cookies.get('dprole'))
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [student,setStudnet] = useState([])
    const getData = async () => {
        const response = await API.post("/lesson")
        if (response.data.status == true) {
            setData(response.data.data)
        } else {
            toast.error("Something went wrong")
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
                const delCategory = await API.post(`/lesson/delete/${id}`,)
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

    useEffect(() => {
        getData()
    }, [])

    //PDF File Code
    const styles = StyleSheet.create({
        page: {
        //   flexDirection: 'row',
          backgroundColor: '#E4E4E4'
        },
        section: {
          margin: 10,
          marginTop:10,
          marginBottom:10,
          padding: 10,
          flexGrow: 1
        }
    });
      
    const MyDoc = (props) => (
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text>Date : {props.date}</Text>
                <Text>Grade : {props.grade}</Text>
                <Text>Subject : {props.subject}</Text>
                <Text>Topic : {props.topic}</Text>
                <Text>Lesson : {props.lesson}</Text>
                <Text>Lesson Focus and Goal : {props.focus}</Text>
                <Text>Material Needed: {props.material}</Text>
                <Text>Learning Objective : {props.objective}</Text>
                <Text>Structure/Activity : {props.structure}</Text>
                <Text>Assesment : {props.assesment}</Text>
            </View>
          </Page>
        </Document>
    );

    //Word File Code
    // function saveDocumentToFile(doc, fileName) {
    //     const packer = new Packer()
    //     const mimeType =
    //       "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    //     packer.toBlob(doc).then(blob => {
    //       const docblob = blob.slice(0, blob.size, mimeType);
    //       saveAs(docblob, fileName);
    //     });
    // }

    // function generateWordDocument(event) {
    //     event.preventDefault();
    //     let doc = new Document();
    //     saveDocumentToFile(doc, "NewDocument.docx");
    //   }
    return (
        <>
            <Layout sidebar={true}>
                <div className="page-heading">
                    <h3 className="my-1">Lesson Details</h3>
                    {
                        role==="teacher"?
                        <div className="page-heading-right">
                            <Link to="/lesson/Add">
                                <Button variant="primary ms-3 my-1" value="create">Add New</Button>
                            </Link>
                        </div>:""
                    }
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
                                                <th width="20%" className="text-center">Subject</th>
                                                <th width="20%" className="text-center">Topic</th>
                                                <th width="15%" className="text-center" >Date</th>
                                                <th width="10%" className="text-center">PDF</th>
                                                <th width="10%" className="text-center">Mail</th>
                                                {/* <th width="10%" className="text-center">Word</th> */}
                                                <th width="10%" className="text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                wetData(current, size).map((dataVal, ind) => {
                                                    return (
                                                        <tr className="text-center" key={ind}>
                                                            <td className='text-center'>{(current === 1) ? ind + 1 : current * size + ind + 1 - size}</td>
                                                            <td>{dataVal.subject}</td>
                                                            <td>{dataVal.topic}</td>
                                                            <td>{dataVal?.date?.split("T")[0]}</td>
                                                            <td>{
                                                                <PDFDownloadLink document={
                                                                <MyDoc grade={dataVal.grade}
                                                                    subject={dataVal.subject}
                                                                    date={dataVal?.date?.split("T")[0]}
                                                                    topic={dataVal.topic}
                                                                    lesson={dataVal.lesson}
                                                                    focus={dataVal.foucus}
                                                                    material={dataVal.material}
                                                                    objective={dataVal.objective}
                                                                    structure={dataVal.structure}
                                                                    assesment={dataVal.assesment}
                                                                />
                                                                } fileName={`${dataVal.subject}.pdf`}>
                                                                {({ blob, url, loading, error }) => (loading ? <Button>Loading</Button> : <Button>Download</Button>)}
                                                              </PDFDownloadLink>
                                                            }</td>
                                                            <td className="text-center">
                                                                <Button variant="primary" className="me-3" onClick={handleShow}>Send</Button>
                                                            </td>
                                                            {/* <td>
                                                                <Button onClick={generateWordDocument}>Download</Button>
                                                            </td> */}
                                                            <td className="text-center">
                                                                <Link to={`/lesson/view/${dataVal._id}`}>
                                                                    <Button variant="outline-warning me-2 btn-icon"><i className='bx bx-show'></i></Button>
                                                                </Link>
                                                                {
                                                                    role==="teacher"?
                                                                    <>
                                                                    <Link to={`/lesson/edit/${dataVal._id}`}>
                                                                        <Button variant="outline-primary me-2 btn-icon"><i class='bx bxs-pencil'></i></Button>
                                                                    </Link>
                                                                    <Button variant="outline-danger me-2 btn-icon" onClick={() => deleteUser(dataVal._id)} ><i className='bx bx-trash-alt' ></i></Button>
                                                                    </>:""
                                                                }
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
                                                /> : ""
                                        }
                                    </div>

                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
                <Modal  size="xl" show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Send To Student</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table bordered responsive>
                            <thead>
                                <tr>
                                    <th width="6%" className='text-center'>
                                        <Form.Check type="checkbox" onClick={(e) => selectAll(e)}/>
                                    </th>
                                    <th width="6%">
                                        <div className="table-sort-filter justify-content-center">No</div>
                                    </th>
                                    <th width="15%">
                                        <div className="table-sort-filter">Name</div>
                                    </th>
                                    <th width="30%">
                                        <div className="table-sort-filter">Email</div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                student.map((dataVal,ind)=>{
                                    return(
                                        <tr key={ind}>
                                            <td className='text-center'><Form.Check type="checkbox" value={dataVal.email} checked={dataVal.ischeaked} onChange={(e) => handelChecked(e, ind)} /></td>
                                            <td className='text-center'>1</td>
                                            <td>{dataVal?.firstName}</td>
                                            <td>{dataVal?.email}</td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="primary" onClick={sendMail} >
                        Send
                    </Button>
                    <Button variant="danger" onClick={handleClose} >
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
            </Layout>
        </>
    )
}

export default Lesson
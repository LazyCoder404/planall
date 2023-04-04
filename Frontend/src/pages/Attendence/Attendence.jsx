import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import Modal from 'react-bootstrap/Modal';
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../../App";
import Layout from "../../layout/Layout";
import Pagination from 'rc-pagination'
// import {Document, Packer} from "docx";
import { saveAs } from "file-saver";
import Cookies from "js-cookie";
import jsPDF from 'jspdf'
import DateRangePicker from 'react-bootstrap-daterangepicker';


const Attendence = () => {

//----------------------------------------------------------------------------------
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
//----------------------------------------------------------------------------------
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [initData,setInitData] = useState({
        subject:"",
        teacher:""
    })
    const [student,setStudent] = useState("")
    const [date,setDate] = useState("")
    const getData = async (sub) => {
        const data = {
            teacher_id:Cookies.get("dpteacher"),
            subject:sub
        }
        const response = await API.post("/attendence/get",data)
        if (response.data.status === false) {
            if (response.data.response_code === 429) {
                navigate("/")
            } else {
              setData([])
            }
        } else {
            setData(response.data.data)
        }
    }

    const change = async(e) => {
        setInitData({...initData,['subject']:e.target.value})
        getData(e.target.value)
    }
    
    const fillAttendence = async(id,fill) => {
        if(initData.subject==="" || initData.teacher===""){
            if(initData.teacher===""){
                toast.error("You are not able to fill attendence")
            }else{
                toast.error("Please select subject")
            }
        }else{
            const Form = new FormData
            Form.append('id',id)
            Form.append('attendence',fill)
            const res = await API.post("/attendence/add",Form)
            if(res.data.status===true){
                // var statusData = data.findIndex(x => x._id ===id);
                // // let mainData = data
                // data[statusData].attendence=fill
                // console.log(data,"mianData");
                // setData(data)
                getData(initData.subject)
                toast.success("Attendence filled succesfully")
            }else{
                toast.error("Something went wrong")
            }
        }
    }

    const sendMail = async(id) =>{
        const res = await API.post("/attendence/mail",{id:id})
        if(res.data.status===true){
            toast.success("Mail sent succesfully")
        }else{
            toast.error("Something went wrong")
        }
    }

    const selectDate = async()=>{
        handleShow()
        // const doc = new jsPDF();
        // doc.text("Hello world!", 10, 10);
        // doc.save("as4.pdf");
    }

    const downloadPDF = async()=>{
        if(date===""){
            toast.warning("Please select date")
        }else{
            const Form = new FormData
            Form.append('date',date)
            Form.append('id',student)
            Form.append('subject',initData.subject)
            const response = await API.post("/attendence/pdf",Form)
            console.log(response);
            if(response.data.status===true){
                // const myData = 
                let myData = `name : ${response.data.data.name} \n subject : ${response.data.data.subject} \n Attendence : \n`
                response?.data?.data?.attendence?.map((dataVal,ind)=>{
                    myData = myData + `${dataVal?.date?.split("T")[0]} : ${dataVal.attendence==1?"Present":"Absent"} \n`
                })
                const doc = new jsPDF();
                doc.text(myData,10,10);
                doc.save("attendence.pdf");
            }
        }
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
        // getData()
        const role = Cookies.get('dprole')
        if(role==="teacher"){
            setInitData({...initData,['teacher']:Cookies.get('dpteacher')})
        }
    }, [])

    

    return (
        <>
            <Layout sidebar={true}>
                <div className="page-heading">
                    <h3 className="my-1">Attendence Details</h3>
                    <Row className="align-items-center gx-3">
                    <Col md="auto" xs={6}>
                        <Form.Select className="my-1" name="subject" onChange={change}>
                        <option >Select Subject</option>
                        <option value={"English"}>English</option>
                        <option value={"Hindi"}>Hindi</option>
                        <option value={"Gujarati"}>Gujarati</option>
                        </Form.Select>
                    </Col>
                    </Row>
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
                                                <th width="20%" className="text-center">Present/Absent</th>
                                                <th width="20%" className="text-center">Attendence</th>
                                                <th width="15%" className="text-center" >Email</th>
                                                <th width="10%" className="text-center">Sheet</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                wetData(current, size).map((dataVal, ind) => {
                                                    return (
                                                        <tr className="text-center" key={ind}>
                                                            <td className='text-center'>{(current === 1) ? ind + 1 : current * size + ind + 1 - size}</td>
                                                            <td>{dataVal?.student_id?.firstName}</td>
                                                            <td className="text-center">
                                                                <Button variant="outline-success" size="sm" className="btn-icon" onClick={()=>{fillAttendence(dataVal._id,1)}} ><i className='bx' >P</i></Button>
                                                                <Button variant="outline-danger" size="sm" className="btn-icon m-2" onClick={()=>{fillAttendence(dataVal._id,2)}} ><i className='bx' >A</i></Button>
                                                            </td>
                                                            <td className="text-center">
                                                                {
                                                                    dataVal.attendence===0?"Not Attendence":
                                                                    dataVal.attendence===1?"Present":"Absent"
                                                                    // dataVal.attendence
                                                                }
                                                            </td>
                                                            <td className="text-center">
                                                                <Button variant="primary" className="me-3" onClick={()=>{sendMail(dataVal?.student_id?._id)}}>Send</Button>
                                                            </td>
                                                            <td>{
                                                                <Button onClick={()=>{selectDate();setStudent(dataVal?.student_id?._id);}}>Download</Button>
                                                            }</td>
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
                        <Modal.Title>Get Attendence PDF</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <DateRangePicker onApply={(e)=>{setDate(e.target.value)}} onCancel={()=>{setDate("")}}>
                        <input type='text' value={date} name='date' className="form-control" placeholder="Select Date"/>
                    </DateRangePicker>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="primary" onClick={downloadPDF} >
                        Download
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

export default Attendence
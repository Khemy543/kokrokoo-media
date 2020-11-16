/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Table,
  Container,
  Row,
  Col,Spinner, Modal,ModalBody,ModalFooter, Input
} from "reactstrap";


import Header from "components/Headers/Header.js";
import axios from "axios";
import ApprovedSubscriptions from "./ApprovedSubscriptions";

let user = localStorage.getItem("access_token");
var domain = "https://media-backend.kokrokooad.com";

function CompletedDetails (props){
const [subscription, setSubscription] = React.useState([]);
const  [title, setTitle] = React.useState("");
const [file, setFile] = React.useState("");
const [isActiveSpinner, setIsActiveSpinner] = React.useState(false)
const [modal, setModal] = React.useState(false);
const [total, setTotal] = React.useState(0);


  React.useEffect(()=>{
    setIsActiveSpinner(true)
    //subscription details
    let total = 0;
    axios.get(`${domain}/api/subscription/${props.location.state.id}/details`,
    { headers: { 'Authorization': `Bearer ${user}` } })
    .then(res=>{
      console.log(res.data);
      setSubscription(res.data)
      setTitle(props.location.state.title)
      setIsActiveSpinner(false)
      for(var i=0; i<res.data.length; i++){
        total = total + Number(res.data[i].total_amount)
      }
      setTotal(total)
    })
    .catch(error=>{
      console.log(error)
    })

    
  },[])
  
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(e);
    let formData = new FormData();
    formData.append('transmission_cert',file)
    axios.post(`${domain}/api/subscription/uplaod/${props.location.state.id}/transmission-cert`,
    formData,{ headers: { 'Authorization': `Bearer ${user}` } })
    .then(res=>{
      console.log(res.data)
    })
    .catch(error=>{
      console.log(error.response.data)
    })
  }
  
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
        {isActiveSpinner?
          <Row>
            <Col md="12" style={{textAlign:"center"}}>
             <h4>Please Wait <Spinner size="sm" style={{marginLeft:"5px"}}/></h4> 
            </Col>
          </Row>
          :
          <Row>
            <Col className="mb-5 mb-xl-0" lg="12">
            <p style={{fontSize:"13px", fontWeight:500}}
            >View Approved Campaign Details, Download Ad File</p>
            <Card>
              <CardHeader>
              <Row>
                <Col>
                <h4 style={{textTransform:"uppercase"}}>{title}</h4>
                </Col>
                <Col>
                  <h3>Total Campaign Amount : <span style={{color:"red"}}>GH¢ {total}.00</span></h3>
                </Col>
              </Row>
             
              </CardHeader>
              <CardBody>
                {subscription.map((item,key)=>(
                  <Row style={{marginBottom:"20px"}}>
                    <Col md="12">
                    <h3>Total Amount  : {item.total_amount}</h3>
                    <p style={{marginBottom:"0px", fontSize:"14px",fontWeight:600}}>{item.selected_date} - {item.day.day}</p>
                    <Table  bordered>
                    <thead style={{backgroundColor:"#01a9ac",color:"black",height:""}}>
                      <tr>
                      <td>#</td>
                      <td>Duration</td>
                      <td>Rate</td>
                      <td>Selected Spots</td>
                      <td>Time Segment</td>
                      <td>Amount</td>
                      </tr>
                      </thead>
                      <tbody>
                      {item.details.map((value,index)=>(
                        <tr>
                          <td>{index + 1}</td>
                          <td>{value.duration.duration} {value.duration.unit.unit}</td>
                          <td>{value.duration.rate}</td>
                          <td>{value.selected_spots}</td>
                          <td>{value.ratecard.start_time} - {value.ratecard.end_time}</td>
                          <td>{Number(value.duration.rate) * value.selected_spots}.00</td>
                        </tr>
                        ))}
                      </tbody>
                  </Table>
                    </Col>
                  </Row>
                
                  ))}
                  <div>
                  <form onSubmit={handleSubmit}>
                  <label>Upload Transmission Certificate</label>
                  <br/>
                  <Input 
                      type="file"
                      onChange={e=>setFile(e.target.files[0])}
                  />
                    <Button
                    color="info"
                    type="submit"
                    >
                      Upload File
                    </Button>
                    </form>
                  </div>
              </CardBody>
            </Card>  
            </Col>
          </Row>
        }
        </Container>
      </>
    );
  }

export default CompletedDetails;

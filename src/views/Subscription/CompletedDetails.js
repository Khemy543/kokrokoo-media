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
  Col,Spinner, Modal,ModalHeader,ModalFooter, Input,Progress
} from "reactstrap";


import Header from "components/Headers/Header.js";
import axios from "axios";
import ApprovedSubscriptions from "./ApprovedSubscriptions";

let user = localStorage.getItem("access_token");
var domain = "https://media.test.backend.kokrokooad.com";

function CompletedDetails (props){
const [subscription, setSubscription] = React.useState([]);
const  [title, setTitle] = React.useState("");
const [file, setFile] = React.useState("");
const [isActiveSpinner, setIsActiveSpinner] = React.useState(false)
const [modal, setModal] = React.useState(false);
const [change, setChange] = React.useState(false)
const [percentage, setPercentage] = React.useState(0)


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
    })
    .catch(error=>{
      console.log(error)
    })

    
  },[])
  
  const handleSubmit=(e)=>{
    e.preventDefault();
    let formData = new FormData();
    formData.append('transmission_cert',file);
    axios({
      method:'post',
      headers:{
          "Authorization":`Bearer ${user}`,
          "Content-Type":"mutipart/form-data"
      },
      data:formData,
      url:`${domain}/api/subscription/uplaod/${props.location.state.id}/transmission-cert`,
      onUploadProgress: (progressEvent) => {
          const {loaded , total} = progressEvent;
          let percentage = Math.floor(loaded * 100 / total);
          setModal(true)
          if(percentage<100){
              setPercentage(percentage);
          }
          else{
              setPercentage(100)
          }
    }})
    .then(res=>{
      console.log(res.data);
      setChange(true);
      setTimeout(
        function(){
          setModal(false)
        }.bind(this),1500)
    })
    .catch(error=>{
      console.log(error);
      setModal(false)
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
                <h3>Total Amount : <span style={{color:"red"}}>GH¢ {props.location.state.payment_amount.campaign_total_amount_without_discount}</span></h3>
                <h3>Total Amount Including Discount : <span style={{color:"red"}}>GH¢ {props.location.state.payment_amount.campaign_total_amount_with_discount}</span></h3>
                </Col>
              </Row>
             
              </CardHeader>
              <CardBody>
                {subscription.map((item,key)=>(
                  <Row style={{marginBottom:"20px"}}>
                    <Col md="12">
                    <h3>Daily Amount  : {item.total_amount}</h3>
                    <p style={{marginBottom:"0px", fontSize:"14px",fontWeight:600}}>{item.selected_date} - {item.day.day}</p>
                    {item.details[0].ratecard.isAPrintCard != 1?
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
                    :
                  <Table  bordered>
                    <thead style={{backgroundColor:"#01a9ac",color:"black",height:""}}>
                      <tr>
                      <td>#</td>
                      <td>Size</td>
                      <td>Page Section</td>
                      <td>Amount</td>
                      </tr>
                      </thead>
                      <tbody>
                      {item.details.map((value,index)=>(
                        <tr>
                          <td>{index + 1}</td>
                          <td>{value.ratecard.size}</td>
                          <td>{value.ratecard.page_section}</td>
                          <td>{value.ratecard.cost}</td>
                        </tr>
                        ))}
                      </tbody>
                  </Table>
                }
                    </Col>
                  </Row>
                
                  ))}
                  <div>
                  <form onSubmit={handleSubmit}>
                  <label style={{fontWeight:600}}>Upload Transmission Certificate</label>
                  <br/>
                  <Input 
                      type="file"
                      onChange={e=>setFile(e.target.files[0])}
                  />
                  <br/>
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
        <Modal isOpen={modal}>
          {!change?
            <ModalHeader style={{textAlign:"center", display:"block"}}>
              Uploading Transmission Certificate
            <Progress value={percentage} style={{marginTop:"10px"}}/>
            </ModalHeader>
            :
            <ModalHeader style={{textAlign:"center", display:"block"}}>
                Saved
            </ModalHeader>
          }
        </Modal>
      </>
    );
  }

export default CompletedDetails;

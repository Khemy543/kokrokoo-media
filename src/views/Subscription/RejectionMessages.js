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
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col,
  Spinner,
  Form,
  ModalHeader,
  ModalFooter,
  Modal
} from "reactstrap";


import Header from "components/Headers/Header.js";
import axios from "axios";

let user = localStorage.getItem("access_token");
var domain = "https://media-backend.kokrokooad.com";

function RejectionMessages (props){
const [messages, setMessages] = React.useState([]);
const [isActiveSpinner, setIsActiveSpinner] = React.useState(true)
const [rejection_message, setRejectionMessage] = React.useState("");
const [messageData,setMessageData]=  React.useState([])
const [modal, setModal] = React.useState(false)
  React.useEffect(()=>{
    console.log(props.location)
    setIsActiveSpinner(true)
    axios.get(`${domain}/api/rejected-messages`,
    { headers: { 'Authorization': `Bearer ${user}` } })
    .then(res=>{
      console.log(res.data);
      setMessages(res.data.rejected_message)
      setIsActiveSpinner(false)
    })
    .catch(error=>{
      console.log(error)
    })

    
  },[])

  const handlePush=(checked,id)=>{
    let tempMessages = messageData;
    if(checked === true){
      tempMessages.push(id)
      console.log(tempMessages)
    }
    else{
      let index = tempMessages.indexOf(id);
      if(index!==-1){
          tempMessages.splice(index,1);
         console.log(tempMessages)
      }
    }
  }

  const handelSubmit=(e)=>{
    e.preventDefault()
    axios.post(`${domain}/api/reject/${props.location.state.id}/subscriptions`,
    {message_id:messageData, message:rejection_message},
    { headers: { 'Authorization': `Bearer ${user}` } })
    .then(res=>{
      console.log(res.data);
      setModal(true);
      setTimeout(
        function(){
          props.history.push("/media/pending-subscription")
        },1500)
    })
    .catch(error=>{
      console.log(error)
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
            >State Reasons For <span style={{color:"red"}}>Rejecting</span> Campiagn</p>
            <Card>
              <Form onSubmit={handelSubmit}>
              <CardHeader>
              <h3>Reason For Rejection</h3>
              </CardHeader>
              <CardBody>
                {messages.map((value)=>(
                    <FormGroup check key={value.id} style={{marginBottom:"5px"}}>
                        <Label check>
                        <Input type="checkbox" value={value.message} onChange={(e)=>handlePush(e.target.checked,value.id)}/>{' '}
                        <p style={{fontSize:"14px", fontWeight:600}}>{value.message}</p>
                        </Label>
                    </FormGroup>
                ))}

                <Row style={{marginTop:"15px"}}>
                    
                    <Col md="8">
                    <p style={{fontSize:"14px", fontWeight:600}}>Others? Please Enter Your reason For Rejection</p>
                    <Input
                        type="textarea"
                        placeholder="Type Rejection Message..."
                        value={rejection_message}
                        onChange={(e)=>setRejectionMessage(e.target.value)}
                    />
                    </Col>
                </Row>
              </CardBody>
              <CardFooter>
                    <Button
                    color="info"
                    type="submit"
                
                    >Submit</Button>
              </CardFooter>
                </Form>
            </Card>  
            </Col>
          </Row>
        }
        </Container>
        <Modal isOpen={modal}>
          <ModalHeader>
            <h3>Campiagn Rejected!!</h3>
          </ModalHeader>
          <ModalFooter>
            <Button color="danger" onClick={()=>setModal(false)}>Close</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }

export default RejectionMessages;

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
// react component that copies the given text inside your clipboard
import { CopyToClipboard } from "react-copy-to-clipboard";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Input,
  Button,Form,FormGroup,Label, ModalFooter,ModalHeader,Modal
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import LoadingOverlay from "react-loading-overlay";
import FadeLoader from "react-spinners/FadeLoader";
import axios from "axios";/* 
import history from "../../history.js"; */
import { RateConsumer } from "../../context.js";

let user = localStorage.getItem("access_token");
var domain = "https://media.test.backend.kokrokooad.com";

function CreateRateCard(props) {
    const [isActive, setIsActive] = React.useState(false);
    const [rate_card_title, setTitle] = React.useState("");
    const [service_description,setDescription] = React.useState("");
    const [file_types,setFile_types] = React.useState([]);
    const [modal,setModal] = React.useState(false);
    const [alertmessage, setMessage] = React.useState("")


    const pushType=(value,checked)=>{
        if(checked){
            file_types.push(value);
        }
        else{
           let tempArray = file_types;
           let index = tempArray.indexOf(value);
           if(index!==-1){
               tempArray.splice(index,1);
               setFile_types(tempArray)
           }
        }
    }

    const handlTitleSubmit=(e)=>{
        e.preventDefault();
        setIsActive(true)
        console.log(e);
        console.log("file_types:",file_types)
        if(file_types.length <=0 ){
            setModal(true)
            setMessage("Please Choose A File Type")
            setIsActive(false)

        }
        else{
        axios.post(`${domain}/api/ratecard/new-title`,{rate_card_title,service_description,file_types},
        {headers:{ 'Authorization':`Bearer ${user}`}}
        )
        .then(res=>{
            console.log(res.data);
            if(res.data.status === "success"){
            if(res.data.media_type.id === 3){
            props.history.push("/media/print-rate-details",{rate_title:res.data.ratecard_title.title, title_id:res.data.ratecard_title.id})
            }
            else{
            props.history.push("/media/rate-details",{rate_title:res.data.ratecard_title.title, title_id:res.data.ratecard_title.id})
            }
            setIsActive(false)
            }
        })
        .catch(error=>{
            if(error.response.data.status ==="Forbidden"){
                setModal(true);
                setMessage("Access Denied");
                setIsActive(false)
            }else{
            console.log(error.response.data);
            setModal(true)
            setMessage(error.response.data.errors.rate_card_title)
            setIsActive(false)
            }
        })
    }
}

    
    return (
      <>
      <LoadingOverlay 
      active = {isActive}
      spinner={<FadeLoader color={'#4071e1'}/>}
      >
      <Header/>
        <Container className=" mt--8" fluid>
            
          <Row>
            <Col md="10" sm="12" xs="12" lg="12" xl="12">
            <p style={{fontSize:"13px", fontWeight:500}}
            >Create A RateCard, Enter TItle, Description And Select File Types</p>
            <Card style={{boxShadow:"0 2px 12px rgba(0,0,0,0.1)"}}>
            <CardHeader className=" bg-transparent">
                  <h3 className=" mb-0">ENTER RATE CARD TITLE</h3>
            </CardHeader>

            <CardBody>
            <Row>
            <RateConsumer>
            {value=>(
                <Col md="12">
                    <Form role="form" onSubmit={handlTitleSubmit}>
                    <FormGroup>
                    <Input type="input" placeholder="Enter Rate Card Title" value={rate_card_title} onChange={e=>setTitle(e.target.value)} required/>
                    </FormGroup>
                    <br/>    
                    <FormGroup>
                    <Input type="textarea" placeholder="Enter Description" value={service_description} onChange={e=>setDescription(e.target.value)} required/>
                    </FormGroup>
                    <Label>File Type</Label>
                    {value.media_type !== "Print"?
                    <>
                    <FormGroup check>
                        <Label check>
                        <Input type="checkbox" value="video" onChange={(e)=>pushType(e.target.value,e.target.checked)}/>{' '}
                        <h3 style={{fontWeight:600, fontSize:"14px"}}>Video</h3>
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                        <Input type="checkbox" value="audio" onChange={(e)=>pushType(e.target.value,e.target.checked)}/>{' '}
                        <h3 style={{fontWeight:600, fontSize:"14px"}}>Audio</h3>
                        </Label>
                    </FormGroup>
                    </>
                    :
                    <></>
                    }
                    <FormGroup check>
                        <Label check>
                        <Input type="checkbox" value="application" onChange={(e)=>pushType(e.target.value,e.target.checked)}/>{' '}
                        <h3 style={{fontWeight:600, fontSize:"14px"}}>Document</h3>
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                        <Input type="checkbox"value="image" onChange={(e)=>pushType(e.target.value,e.target.checked)}/>{' '}
                        <h3 style={{fontWeight:600, fontSize:"14px"}}>Image</h3>
                        </Label>
                    </FormGroup>
      
                    <br/>
                    <Button
                    color="info"
                    type="submit"
                    >
                    Next
                    </Button>
                    </Form>
                </Col>  
                )}
                </RateConsumer>  
                </Row>
            </CardBody>    
            </Card>    
            </Col>
            </Row>
        </Container>
        <Modal isOpen={modal}>
            <ModalHeader>
                {alertmessage}
            </ModalHeader>
            <ModalFooter>
                <Button color="danger" onClick={()=>setModal(false)}>Cancel</Button>
            </ModalFooter>
        </Modal>
        </LoadingOverlay>
      </>
    );
  }


export default CreateRateCard;

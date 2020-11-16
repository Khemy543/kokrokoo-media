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
  UncontrolledTooltip,
  Input,
  Button,
  CardTitle,
  Nav,NavItem,NavLink,TabContent,CardFooter,Form,FormGroup,Label, Modal, ModalHeader, ModalFooter
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import LoadingOverlay from "react-loading-overlay";
import FadeLoader from "react-spinners/FadeLoader";
import axios from "axios";/* 
import history from "../../history.js"; */
import { RateConsumer } from "../../context.js";

let user = localStorage.getItem("access_token");
var domain = "https://media-backend.kokrokooad.com";

function EditRateTitle(props) {
    const [isActive, setIsActive] = React.useState(false);
    const [rate_card_title, setTitle] = React.useState(props.location.state.title);
    const [service_description,setDescription] = React.useState(props.location.state.description);
    const [file_types,setFile_types] = React.useState(props.location.state.file_types);
    const [modal, setModal] = React.useState(false)

    const videoCheck=()=>{
        let myChecked = file_types
        for(var i=0; i<myChecked.length;i++){
            if(myChecked[i] === "video"){
                return true
                break;
            }
            else{
                continue;
                return false
            }
        }
    }
    const audioCheck=()=>{
        let myChecked = file_types;
        for(var i=0; i<myChecked.length;i++){
            if(myChecked[i] === "audio"){
                return true;
                break;
            }
            else{
                continue;
            }
        }
    }
    const DocumentCheck=()=>{
        let myChecked = file_types;
        for(var i=0; i<myChecked.length;i++){
            if(myChecked[i] === "application"){
                return true;
                break;
            }
            else{
                continue;
            }
        }
    }
    const ImageCheck=()=>{
        let myChecked = file_types;
        for(var i=0; i<myChecked.length;i++){
            if(myChecked[i] === "image"){
                return true;
                break;
            }
            else{
                continue;
            }
        }
    }

    const pushType=(value)=>{
        console.log("checking...")
        let tempArray = file_types;
        let selected = tempArray.find(item=>item === value);
        if(selected !==undefined){
            let newData = tempArray.filter(item=>item !== value);
            console.log(newData)
            setFile_types(newData);
        }
        else{
            tempArray.push(value);
            console.log(tempArray)
            setFile_types(tempArray);
        }
    }

    const handlTitleSubmit=(e)=>{
        e.preventDefault();
        setIsActive(true)
        console.log(e);
        console.log("file_types:",file_types)
        if(file_types.length <=0 ){
            alert("choose file type");
            setIsActive(false)

        }
        else{
        axios.patch(`${domain}/api/ratecard/${props.location.state.title_id}/update-title`,{rate_card_title,service_description,file_types},
        {headers:{ 'Authorization':`Bearer ${user}`}}
        )
        .then(res=>{
            console.log(res.data);
            console.log(localStorage.getItem("media_type"))
            if(res.data[1] === "saved"){
                if(localStorage.getItem('media_type') === "Print"){
                    props.history.push("/media/edit/print",{title_id:props.location.state.title_id});
                }
                else{
                    props.history.push("/media/edit/video",{title_id:props.location.state.title_id});
                }
                
            }
        })
        .catch(error=>{
            console.log(error.response.data);
            if(error.response.data.status === "Forbidden"){
                setModal(true);
            }
            setIsActive(false)
        })
    }
}

    const handleEdit=()=>{
        if(localStorage.getItem('media_type') === "Print"){
            props.history.push("/media/edit/print",{title_id:props.location.state.title_id});
        }
        else{
            props.history.push("/media/edit/video",{title_id:props.location.state.title_id});
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
            <Col md="10">
            <Card style={{boxShadow:"0 2px 12px rgba(0,0,0,0.1)"}}>
            <CardHeader className=" bg-transparent">
                  <h3 className=" mb-0">EDIT RATE CARD TITLE</h3>
            </CardHeader>
            
            <Form role="form" onSubmit={handlTitleSubmit}>
            <CardBody>
            <Row>
            <RateConsumer>
            {value=>(
                <Col md="12">
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
                        <Input type="checkbox" value="video" onChange={(e)=>pushType(e.target.value)} checked={videoCheck()}/>{' '}
                        Video
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                        <Input type="checkbox" value="audio" onChange={(e)=>pushType(e.target.value)} checked={audioCheck()}/>{' '}
                        Audio
                        </Label>
                    </FormGroup>
                    </>
                    :
                    <></>
                    }
                    <FormGroup check>
                        <Label check>
                        <Input type="checkbox" value="application" onChange={(e)=>pushType(e.target.value)} checked={DocumentCheck()}/>{' '}
                        Document
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                        <Input type="checkbox"value="image" onChange={(e)=>pushType(e.target.value)} checked={ImageCheck()}/>{' '}
                        Image
                        </Label>
                    </FormGroup>

                </Col>    
                )}
                </RateConsumer>  
                </Row>
            </CardBody>  
            <CardFooter>
                <Button
                color="info"
                type="submit"
                >
                Save Changes
                </Button>

                <Button 
                color="primary"
                onClick={()=>handleEdit()}
                >
                    Edit Details
                </Button>
            </CardFooter>  
            </Form>
            </Card>    
            </Col>
            </Row>
        </Container>
        <Modal isOpen={modal}>
            <ModalHeader>
                Access Denied
            </ModalHeader>
            <ModalFooter>
                <Button color="danger" onClick={()=>setModal(false)}>Close</Button>
            </ModalFooter>
        </Modal>
        </LoadingOverlay>
      </>
    );
  }


export default EditRateTitle;

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
  Nav,NavItem,NavLink,TabContent,TabPane,Form,Modal,ModalBody
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import UserCard from "../../components/Cards/UserCard.js";
import LoadingOverlay from "react-loading-overlay";
import FadeLoader from "react-spinners/FadeLoader";
import axios from "axios";
import Pagination from "react-js-pagination";
//require("bootstrap/less/bootstrap.less");

let user = localStorage.getItem("access_token");
var domain = "https://media-backend.kokrokooad.com";


function EditUsers(props) {
    const [iActive, setIsActive] = React.useState(false);
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [phone1, setPhone1] = React.useState("");
    const [phone2, setPhone2] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [role, setRole] = React.useState("");
    const [modal, setModal] = React.useState(false);

    const toggleModal=()=>setModal(!modal);
    
    React.useEffect(()=>{
        let all_data = JSON.parse(localStorage.getItem('storageData'));
        
        var  user = all_data[0];
        setIsActive(true)
        axios.get(`${domain}/api/super-admin/get/${props.location.state.admin_id}/details`,
        {headers:{ 'Authorization':`Bearer ${user}`}})
        .then(res=>{
            console.log(res.data);
            setName(res.data.name);
            setEmail(res.data.email);
            setPhone1(res.data.phone1);
            setPhone2(res.data.phone2);
            setTitle(res.data.title);
            setRole(res.data.role);
            setIsActive(false)
        })
        .catch(error=>{
            console.log(error)
        })
    },[])

    const handleSubmit=(e)=>{
        let all_data = JSON.parse(localStorage.getItem('storageData'));
        
        var  user = all_data[0];
        setIsActive(true)
        e.preventDefault();
        console.log(e)
        axios.patch(`${domain}/api/super-admin/update/${props.location.state.admin_id}/details`,{
            name,email,phone1,phone2,role,title},{headers:{ 'Authorization':`Bearer ${user}`}})
        .then(res=>{
            console.log(res.data);
            if(res.data.status === "success"){
                setIsActive(false);
                setModal(true)
            setTimeout(
                function(){
                    setModal(false);
                    props.history.push("/media/admin-details",{admin_id:props.location.state.admin_id})
                },2000)
            }
                
        })
        .catch(error=>{
            console.log(error)
        })
    }

    return (
      <>
      <LoadingOverlay 
      active = {iActive}
      spinner={<FadeLoader color={'#4071e1'}/>}
      >
      <Header/>
        <Container className=" mt--7" fluid>
            
          <Row>
            <Col md="10">
            <Card className="shadow">
                <CardBody className="mt-5">
                <Form onSubmit={handleSubmit}  role="form">    
                <Input value={name} type="text" onChange={e=>setName(e.target.value)} placeholder="Full Name" required/>
                    <br/>
                    <Input value={email} type="email" onChange={e=>setEmail(e.target.value)} placeholder="Email" required/>
                    <br/>
                    <Row>
                        <Col>
                    <Input value={phone1} type="number" onChange={e=>setPhone1(e.target.value)} placeholder="Phone" required />
                    </Col>
                    <Col>
                    <Input value={phone2} type="number" onChange={e=>setPhone2(e.target.value)} placeholder="Phone (optional)"/>
                    </Col>
                    </Row>
                    <br/>
                    <Input value={title} type="text" onChange={e=>setTitle(e.target.value)} placeholder="Title" required/>
                    <br/>
                    <Input value={role} type="text" onChange={e=>setRole(e.target.value)} placeholder="Role" required/>
                    <Button
                        style={{backgroundColor:"#404E67", color:"white",marginTop:"20px"}}
                        type="submit"
                        >
                            EDIT
                        </Button> 
                    </Form>
                </CardBody>
            </Card>
                   
            </Col>
            </Row>
        </Container>
        <Modal isOpen={modal} toggle={toggleModal} style={{maxHeight:"40px", maxWidth:"300px",backgroundColor:"#404E67"}} className="alert-modal">
            <ModalBody>
            <h4 style={{textAlign:"center", marginTop:"-3%", fontWeight:"500", color:"white"}}>UPDATED!!</h4>
            </ModalBody>
        </Modal>
        </LoadingOverlay>
      </>
    );
  }


export default EditUsers;

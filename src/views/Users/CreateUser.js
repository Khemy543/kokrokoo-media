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
  Nav,NavItem,NavLink,TabContent,TabPane,Form,FormGroup,Label,Modal,ModalBody,Alert
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import LoadingOverlay from "react-loading-overlay";
import FadeLoader from "react-spinners/FadeLoader";
import axios from "axios";

let user = localStorage.getItem("access_token");
var domain = "https://media.test.backend.kokrokooad.com";

function CreateUser(props) {
    const [isActive, setIsActive] = React.useState(false);
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [phone1, setPhone1] = React.useState("");
    const [phone2, setPhone2] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [role, setRole] = React.useState(1);
    const [modal, setModal]= React.useState(false);
    const [alert,setAlert] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [roles,setRoles] = React.useState([]);


    React.useEffect(()=>{
        axios.get(`${domain}/api/get-roles`,
        {headers:{ 'Authorization':`Bearer ${user}`}})
        .then(res=>{
            console.log("roles",res);
        })
    })

    const toggleModal=()=>setModal(!modal);
    const handleSubmit=(e)=>{
        setIsActive(true);
        e.preventDefault();
        console.log(e);
        console.log(user)
        axios.post(`${domain}/api/super-admin/add-new/staff`,
        {name,email,phone1,phone2,title,role},
        {headers:{ 'Authorization':`Bearer ${user}`}}
        )
        .then(res=>{
            console.log(res.data);
            if(res.data.status === "success"){
                setModal(true);
                setTimeout(
                    function(){
                        setModal(false);
                        props.history.push("/media/view-users");
                    },1500
                )
                
            }
        })
        .catch(error=>{
            console.log(error.response.data);
            if(error){
                setIsActive(false);
                setMessage(error.response.data.errors.email || error.response.data.errors.phone1 || error.response.data.errors.phone2);
                setAlert(true);
            }
        })
    }

    
    return (
      <>
      <LoadingOverlay 
      active = {isActive}
      spinner={<FadeLoader color={'#4071e1'}/>}
      >
      <Header/>
        <Container className=" mt--7" fluid>
            
          <Row>
            <Col md="10">
            <Card className="shadow">
                <CardBody>
                {alert?
                  <Alert color="warning" fade={true} style={{textAlign:"center",height:"50px"}}>
                  {message}
                </Alert>
                :
                <div>
                </div>
                }
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Name</Label>
                    <Input type="text" name="email"  placeholder="Enter Name" value={name} onChange={e=>setName(e.target.value)} required/>
                </FormGroup>
                <FormGroup>
                    <Label>Email</Label>
                    <Input type="email" name="email"  placeholder="Enter Email" value={email} onChange={e=>setEmail(e.target.value)} required/>
                </FormGroup>
                <Row>
                <Col md="6">
                <FormGroup>
                    <Label>Phone 1</Label>
                    <Input type="number" name="phone1"  placeholder="Enter Phone" value={phone1} onChange={e=>setPhone1(e.target.value)} required/>
                </FormGroup>
                </Col>
                <Col md="6">
                <FormGroup>
                    <Label>Phone 2</Label>
                    <Input type="number" name="phone2"  placeholder="Enter Phone (optional)" value={phone2} onChange={e=>setPhone2(e.target.value)}/>
                </FormGroup>
                </Col>
                </Row>
                <FormGroup>
                    <Label>Title</Label>
                    <Input type="text" name="title"  placeholder="Enter Title" value={title} onChange={e=>setTitle(e.target.value)} required/>
                </FormGroup>
                <FormGroup>
                    <Label>Role</Label>
                    <Input type="select" name="role"  placeholder="Enter Role" value={role} onChange={e=>setRole(e.target.value)} required>
                    {roles.map(value=>(<option value={value.role} key={value.id}>{value.role}</option>))}
                    </Input>
                </FormGroup>
                <Button style={{backgroundColor:"#404E67", color:"white"}} type="submit">
                    Create
                </Button>    
            </Form>
            </CardBody>
            </Card>    
            </Col>
            </Row>
        </Container>
        <Modal isOpen={modal} toggle={toggleModal} style={{maxHeight:"40px", maxWidth:"300px",backgroundColor:"#404E67"}} className="alert-modal">
            <ModalBody>
            <h4 style={{textAlign:"center", marginTop:"-3%", fontWeight:"500", color:"white"}}>NEW ADMIN CREATED</h4>
            </ModalBody>
        </Modal>
        </LoadingOverlay>
      </>
    );
  }


export default CreateUser;

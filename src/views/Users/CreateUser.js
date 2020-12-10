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
  Button, InputGroup, InputGroupAddon,CardFooter, Form, FormGroup,InputGroupText,
  Label,Modal,ModalHeader,Alert, ModalFooter
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
    const [title, setTitle] = React.useState("Mr");
    const [role, setRole] = React.useState(2);
    const [modal, setModal]= React.useState(false);
    const [alert,setAlert] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [roles,setRoles] = React.useState([]);


    React.useEffect(()=>{
        axios.get(`${domain}/api/get-roles`,
        {headers:{ 'Authorization':`Bearer ${user}`}})
        .then(res=>{
            console.log("roles",res);
            setRoles(res.data)
        })
    },[])

    const toggleModal=()=>setModal(!modal);
    const handleSubmit=(e)=>{
        setIsActive(true);
        e.preventDefault();
        console.log(e);
        console.log(user)
        axios.post(`${domain}/api/super-admin/add-new/staff`,
        {name,email,phone1,phone2,title,role_id:role},
        {headers:{ 'Authorization':`Bearer ${user}`}}
        )
        .then(res=>{
            console.log(res.data);
            if(res.data.status === "success"){
                setModal(true);
                setMessage("User Created!")
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
                setModal(true)
                setMessage(error.response.data.errors.email || error.response.data.errors.phone1 || error.response.data.errors.phone2);
                
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
        <Col lg="7" className="ml-auto mr-auto">
        <p style={{fontSize:"13px", fontWeight:500}}>Create A New User for Your Media House</p>
        <Card>
            <Form onSubmit={handleSubmit}>
            <CardHeader>
                Create New User
            </CardHeader>
            <CardBody>
                <Row>
                    <Col>
                       <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="fa fa-user" />
                            </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="User Name" type="text" name="username" value={name} onChange={e=>setName(e.target.value)} required/>
                        </InputGroup>
                        </FormGroup>
                        <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="fa fa-envelope" />
                            </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Email" type="email" name="email" value={email} onChange={e=>setEmail(e.target.value)} required/>
                        </InputGroup>
                        </FormGroup>
                        <FormGroup className="mb-3">
                        <Row>
                        <Col>
                        <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="fa fa-phone" />
                            </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Phone" type="text" name="phone" value={phone1} onChange={e=>setPhone1(e.target.value)} required/>
                        </InputGroup>
                        </Col>
                        <Col>
                        <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="fa fa-phone" />
                            </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Phone" type="text" name="phone" value={phone2} onChange={e=>setPhone2(e.target.value)}/>
                        </InputGroup>
                        </Col>
                        </Row>
                        </FormGroup>
                        <Row>
                             <Col>
                                <FormGroup className="mb-3">
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="fa fa-briefcase" />
                                    </InputGroupText>
                                    </InputGroupAddon>
                                    <Input placeholder="Role" type="select" name="title" value={title} onChange={e=>setTitle(e.target.value)} required>
                                    <option vlaue="Mr">Mr</option>
                                    <option vlaue="Mrs">Mrs</option>
                                    <option vlaue="Miss">Miss</option>
                                    </Input>
                                </InputGroup>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup className="mb-3">
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="fa fa-user" />
                                    </InputGroupText>
                                    </InputGroupAddon>
                                    <Input placeholder="Role" type="select" name="role" value={role} onChange={e=>setRole(e.target.value)} required>
                                    {roles.map((value,key)=>(
                                        <option value={value.id} key={key}>{value.role}</option>
                                    ))}
                                    </Input>
                                </InputGroup>
                                </FormGroup>
                            </Col>
                        </Row>
                        
                    </Col>
                </Row>
            </CardBody>
            <CardFooter>
                <Button color="info" type="submit">Create</Button>
            </CardFooter>
            </Form> 
        </Card>
        </Col>
      </Row>
      </Container>
        <Modal isOpen={modal} toggle={toggleModal}>
            <ModalHeader>
                {message}
            </ModalHeader>
            <ModalFooter>
                <Button color="danger" onClick={()=>setModal(false)}>Close</Button>
            </ModalFooter>
        </Modal>
        </LoadingOverlay>
      </>
    );
  }


export default CreateUser;

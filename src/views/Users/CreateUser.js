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
  Nav,NavItem,NavLink,TabContent,TabPane,Form,FormGroup,Label,Modal,ModalBody
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";
import axios from "axios";

let user =1;
let loggedin_data = false;
let all_data = JSON.parse(localStorage.getItem('storageData'));
console.log("all_data:", all_data)
if(all_data !== null){
  user = all_data[0];
  loggedin_data = all_data[1];
  //get user
  console.log("user:",user);
}

function CreateUser(props) {
    const [isActive, setIsActive] = React.useState(false);
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [phone1, setPhone1] = React.useState("");
    const [phone2, setPhone2] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [role, setRole] = React.useState("");
    const [modal, setModal]= React.useState(false);


    const toggleModal=()=>setModal(!modal);
    const handleSubmit=(e)=>{
        setIsActive(true);
        e.preventDefault();
        console.log(e);
        console.log(user)
        axios.post("https://media-kokrokooad.herokuapp.com/api/super-admin/add-new/staff",
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
            console.log(error.response.data)
        })
    }

    
    return (
      <>
      <LoadingOverlay 
      active = {isActive}
      spinner={<BounceLoader color={'#4071e1'}/>}
      >
      <Header/>
        <Container className=" mt--9" fluid>
            
          <Row>
            <Col md="10">
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="exampleEmail">Name</Label>
                    <Input type="text" name="email"  placeholder="Enter Name" value={name} onChange={e=>setName(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input type="email" name="email"  placeholder="Enter Email" value={email} onChange={e=>setEmail(e.target.value)}/>
                </FormGroup>
                <Row>
                <Col md="6">
                <FormGroup>
                    <Label for="exampleEmail">Phone 1</Label>
                    <Input type="number" name="phone1"  placeholder="Enter Phone"value={phone1} onChange={e=>setPhone1(e.target.value)}/>
                </FormGroup>
                </Col>
                <Col md="6">
                <FormGroup>
                    <Label for="exampleEmail">Phone 2</Label>
                    <Input type="number" name="phone2"  placeholder="Enter Phone"value={phone2} onChange={e=>setPhone2(e.target.value)}/>
                </FormGroup>
                </Col>
                </Row>
                <FormGroup>
                    <Label for="exampleEmail">Title</Label>
                    <Input type="text" name="title"  placeholder="Enter Title"value={title} onChange={e=>setTitle(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label for="exampleEmail">Role</Label>
                    <Input type="text" name="role"  placeholder="Enter Role"value={role} onChange={e=>setRole(e.target.value)}/>
                </FormGroup>
                <Button style={{backgroundColor:"#404E67", color:"white"}} type="submit">
                    Create
                </Button>    
            </Form>    
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

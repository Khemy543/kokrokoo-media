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
  Nav,NavItem,NavLink,TabContent,TabPane,Form
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import UserCard from "../../components/Cards/UserCard.js";
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";
import axios from "axios";
import Pagination from "react-js-pagination";
//require("bootstrap/less/bootstrap.less");




function EditUsers(props) {
    const [iActive, setIsActive] = React.useState(false);
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [phone1, setPhone1] = React.useState("");
    const [phone2, setPhone2] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [role, setRole] = React.useState("");
    
    React.useEffect(()=>{
        let all_data = JSON.parse(localStorage.getItem('storageData'));
        
        var  user = all_data[0];
        axios.get("https://media-kokrokooad.herokuapp.com/api/super-admin/get/"+props.location.state.admin_id+"/details",
        {headers:{ 'Authorization':`Bearer ${user}`}})
        .then(res=>{
            console.log(res.data);
            setName(res.data.name);
            setEmail(res.data.email);
            setPhone1(res.data.phone1);
            setPhone2(res.data.phone2);
            setTitle(res.data.title);
            setRole(res.data.role);
        })
        .catch(error=>{
            console.log(error)
        })
    },[])

    const handleSubmit=(e)=>{
        let all_data = JSON.parse(localStorage.getItem('storageData'));
        
        var  user = all_data[0];
        e.preventDefault();
        console.log(e)
        axios.patch("https://media-kokrokooad.herokuapp.com/api/super-admin/update/"+props.location.state.admin_id+"/details",{
            name,email,phone1,phone2,role,title},{headers:{ 'Authorization':`Bearer ${user}`}})
        .then(res=>{
            console.log(res.data);
        })
        .catch(error=>{
            console.log(error)
        })
    }

    return (
      <>
      <LoadingOverlay 
      active = {iActive}
      spinner={<BounceLoader color={'#4071e1'}/>}
      >
      <Header/>
        <Container className=" mt--7" fluid>
            
          <Row>
            <Col md="10">
            <Card>
                <CardBody>
                <Form onSubmit={handleSubmit}>    
                <Input value={name} type="text" onChange={e=>setName(e.target.value)}/>
                    <br/>
                    <Input value={email} type="text" onChange={e=>setEmail(e.target.value)}/>
                    <br/>
                    <Row>
                        <Col>
                    <Input value={phone1} type="text" onChange={e=>setPhone1(e.target.value)}/>
                    </Col>
                    <Col>
                    <Input value={phone2} type="text" onChange={e=>setPhone2(e.target.value)}/>
                    </Col>
                    </Row>
                    <br/>
                    <Input value={title} type="text" onChange={e=>setTitle(e.target.value)} />
                    <br/>
                    <Input value={role} type="text" onChange={e=>setRole(e.target.value)} />
                    <Button
                        style={{backgroundColor:"#404E67", color:"white",marginTop:"20px"}}
                        type="submit"
                        >
                            Edit
                        </Button> 
                    </Form>
                </CardBody>
            </Card>
                   
            </Col>
            </Row>
        </Container>
        </LoadingOverlay>
      </>
    );
  }


export default EditUsers;

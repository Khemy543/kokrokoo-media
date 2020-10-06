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

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,Modal,ModalBody
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import LoadingOverlay from "react-loading-overlay";
import FadeLoader from "react-spinners/FadeLoader";
import axios from "axios";
import Header from "components/Headers/Header";

let user = localStorage.getItem("access_token");
var domain = "https://media.test.backend.kokrokooad.com";

class Profile extends React.Component {

  state={
    media:[],
    name:"",
    email:"",
    phone1:"",
    phone2:"",
    title:"", 
    id:"",
    isActive:false,
    modal:false,
    message:"",
  }

componentDidMount(){
  this.setState({isActive:true})
  axios.get(`${domain}/api/user`,{
    headers:{ 'Authorization':`Bearer ${user}`}
        }
        )
        .then(res=>{
        console.log(res.data)
        if(res.data.user !== null){
          this.setState({
            name:res.data.user.name, 
            email:res.data.user.email,
            phone1:res.data.user.phone1,
            phone2:res.data.user.phone2,
            title:res.data.user.title,
            id:res.data.user.id,
            isActive:false
          })
        }

        }).catch(error=>{
        console.log(error.response.data)
        });

        axios.get("https://backend.kokrokooad.com/api/media-types")
        .then(res=>{
          console.log(res.data);
          this.setState({media:res.data})
        })
        .catch(error=>{
          console.log(error)
        })
}

toggleModal=()=>this.setState({modal:!this.state.modal});

handleSubmit=(e)=>{
  this.setState({isActive:true})
  e.preventDefault();
  console.log(e);
  console.log(this.state.id)
  axios.patch(`${domain}/api/update/${this.state.id}`,{
  name:this.state.name, email:this.state.email,phone1:this.state.phone1,phone1:this.state.phone2,title:this.state.title},{
    headers:{ 'Authorization':`Bearer ${user}`}})
  .then(res=>{
    console.log(res.data)
    this.setState({message:"UPDATED!!",isActive:false,modal:true});

    setTimeout(
      function(){
          this.setState({modal:false})
      }.bind(this),2000)
  
  })
  .catch(error=>{
    console.log(error)
    if(error){
      this.setState({message:error.response.data.errors.email || error.response.data.errors.phone1 || error.response.data.errors.phone2,
      modal:true,isActive:false
      })
      
    }
  })
}

  render() {
    return (
      <>
      <LoadingOverlay 
      active = {this.state.isActive}
      spinner={<FadeLoader color={'#4071e1'}/>}
      >
      <Header/>
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={require("assets/img/new_logo.png")}
                        />
                      </a>
                    </div>
                  </Col>
                </Row>
                
                <CardBody className="pt-0 pt-md-4">
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <div className="text-center">
                    <h3>
                      {this.state.username}
                    </h3>
                    <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      {this.state.name}
                    </div>
                    <div className="h5 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      {this.state.title}
                    </div>
                    </div>
                </CardBody>
              </Card>
            </Col>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">My account</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form onSubmit = {this.handleSubmit}>
                    <h6 className="heading-small text-muted mb-4">
                      User information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Username
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={this.state.name}
                              id="input-username"
                              placeholder="Username"
                              type="text"
                              onChange={e=>this.setState({name:e.target.value})}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Email address
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-email"
                              placeholder="Email"
                              value={this.state.email}
                              type="email"
                              onChange={e=>this.setState({email:e.target.value})}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Phone
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={this.state.phone1}
                              id="input-first-name"
                              placeholder="First name"
                              type="text"
                              onChange={e=>this.setState({phone1:e.target.value})}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Phone
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={this.state.phone2}
                              id="input-last-name"
                              placeholder="Last name"
                              type="text"
                              onChange={e=>this.setState({phone2:e.target.value})}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                        <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-title"
                            >
                              Title
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={this.state.title}
                              id="input-title"
                              placeholder="Title"
                              type="text"
                              onChange={e=>this.setState({title:e.target.value})}
                            />
                          </FormGroup>
                        </Col>
                        </Row>
                    </div>
                   
                    <hr className="my-4" />

                    <div className="pl-lg-4">
                    <Row>
                    <Button
                      type="submit"
                      color="info"
                    >
                      Edit profile details
                    </Button>
                    </Row>
                  </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
            </Row>
        </Container>
        <Modal isOpen={this.state.modal} toggle={()=>this.toggleModal} style={{maxHeight:"40px", maxWidth:"300px",backgroundColor:"#404E67"}} className="alert-modal">
            <ModalBody>
            <h4 style={{textAlign:"center", marginTop:"-3%", fontWeight:"500", color:"white"}}>{this.state.message}</h4>
            </ModalBody>
        </Modal>
        </LoadingOverlay>
      </>
    );
  }
}

export default Profile;

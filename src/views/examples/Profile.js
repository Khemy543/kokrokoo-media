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

let user =null;
let all_data = JSON.parse(localStorage.getItem('storageData'));
if(all_data !== null){
  user = all_data[0];
}


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
    company_id:"",
    company_name:"",
    business_cert:"", 
    address:"",
    company_profile:"",
    logo:"",
    media_house:"",
    media_type:"",
    industry_type:"",
    operation_cert:"",
    policy:"", 
    website:""
  }

componentDidMount(){
  this.setState({isActive:true})
  axios.get("https://media-kokrokooad.herokuapp.com/api/user",{
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

            company_id:res.data.company.id,
            company_name:res.data.company.company_name,
            business_cert:res.data.company.business_cert, 
            address:res.data.company.address,
            company_profile:res.data.company.company_profile,
            logo:res.data.company.logo,
            media_house:res.data.company.media_house,
            media_type:res.data.company.media_type,
            industry_type:res.data.company.industry_type,
            operation_cert:res.data.company.operation_cert,
            policy:res.data.company.policy, 
            website:res.data.company.website,
            isActive:false
          })
        }

        }).catch(error=>{
        console.log(error)
        });

        axios.get("https://kokrokooad.herokuapp.com/api/media-types")
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
  axios.patch("https://media-kokrokooad.herokuapp.com/api/update/"+this.state.id+"",{
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

handleSubmitCompany=(e)=>{
  this.setState({isActive:true})
  e.preventDefault();
  console.log(e);
  console.log(this.state.company_id)
  axios.post("https://media-kokrokooad.herokuapp.com/api/super-admin/update-company/"+this.state.company_id+"",{
    company_name:this.state.company_name,
    business_cert:this.state.business_cert, 
    address:this.state.address,
    company_profile:this.state.company_profile,
    logo:this.state.logo,
    media_house:this.state.media_house,
    media_type:this.state.media_type,
    industy_type:this.state.industy_type,
    operation_cert:this.state.operation_cert,
    policy:this.state.policy, 
    website:this.state.website,
},{
    headers:{ 'Authorization':`Bearer ${user}`}})
  .then(res=>{
    console.log(res.data);
    this.setState({message:"UPDATED!!",isActive:false,modal:true});

    setTimeout(
      function(){
          this.setState({modal:false})
      }.bind(this),2000)
  
  })
  .catch(error=>{
    console.log(error.response.data)
   /*  if(error){
      this.setState({message:error.response.data.errors.email || error.response.data.errors.phone1 || error.response.data.errors.phone2,
      modal:true,isActive:false
      })
      
    } */
  })
}

  render() {
    return (
      <>
      <LoadingOverlay 
      active = {this.state.isActive}
      spinner={<FadeLoader color={'#4071e1'}/>}
      >
        <UserHeader userName={this.state.name}/>
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
            <Row>
            <Col className="order-xl-1 mt-3" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Company Information</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                <Form onSubmit = {this.handleSubmitCompany}>
                <Row>
                  <Col lg="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-first-name"
                      >
                        Company Name
                      </label>
                      <Input
                        className="form-control-alternative"
                        value={this.state.company_name}
                        id="input-first-name"
                        placeholder="Company name"
                        type="text"
                        onChange={e=>this.setState({company_name:e.target.value})}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-last-name"
                      >
                        Company Profile
                      </label>
                      <Input
                        className="form-control-alternative"
                        value={this.state.company_profile}
                        id="input-last-name"
                        placeholder="Company Profile"
                        type="text"
                        onChange={e=>this.setState({company_profile:e.target.value})}
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
                          Address
                        </label>
                        <Input
                          className="form-control-alternative"
                          value={this.state.address}
                          id="input-first-name"
                          placeholder="Address"
                          type="text"
                          onChange={e=>this.setState({address:e.target.value})}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-last-name"
                        >
                          Media House
                        </label>
                        <Input
                          className="form-control-alternative"
                          value={this.state.media_house}
                          id="input-last-name"
                          placeholder="Media House"
                          type="text"
                          onChange={e=>this.setState({media_house:e.target.value})}
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
                          Media Type
                        </label>
                        <Input
                          value={this.state.media_type}
                          type="select"
                          onChange={e=>this.setState({media_type:e.target.value})}
                        >
                          {this.state.media.map(value=>(<option value={value.id} key={value.id}>{value.mediaType}</option>))}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-last-name"
                        >
                          Industry Type
                        </label>
                        <Input
                          className="form-control-alternative"
                          value={this.state.industry_type}
                          id="input-last-name"
                          placeholder="Industry Type"
                          type="text"
                          onChange={e=>this.setState({industry_type:e.target.value})}
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
                          Business Certificate
                        </label>
                        <Input
                          className="form-control-alternative"
                          value={`https://media-kokrokooad.herokuapp.com${this.state.business_cert}`}
                          id="input-first-name"
                          placeholder="Business Certificate"
                          type="text"
                          onChange={e=>this.setState({business_cert:e.target.value})}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-last-name"
                        >
                          Operation Certificate
                        </label>
                        <Input
                          className="form-control-alternative"
                          value={this.state.operation_cert}
                          id="input-last-name"
                          placeholder="Operation Certificate"
                          type="text"
                          onChange={e=>this.setState({operation_cert:e.target.value})}
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
                          Policy
                        </label>
                        <Input
                          className="form-control-alternative"
                          value={this.state.policy}
                          id="input-first-name"
                          placeholder="Policy"
                          type="text"
                          onChange={e=>this.setState({policy:e.target.value})}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-last-name"
                        >
                          Website
                        </label>
                        <Input
                          className="form-control-alternative"
                          value={this.state.website}
                          id="input-last-name"
                          placeholder="Website"
                          type="text"
                          onChange={e=>this.setState({website:e.target.value})}
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
                              logo
                            </label>
                            <Input
                              className="form-control-alternative"
                              value=""
                              type="file"
                              onChange={e=>this.setState({logo:e.target.value})}
                            />
                          </FormGroup>
                        </Col>
                        
                      </Row>
                <hr className="my-4" />
                <div className="pl-lg-4">
                  <Row>
                  <Button
                    type="submit"
                    color="info"
                  >
                    Edit company details
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

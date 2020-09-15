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


class CompanyProfile extends React.Component {

  state={
    media:[],
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
    purpose:"", 
    website:"",

    bank_name:"",
    bank_branch:"",
    account_name:"",
    account_number:""
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
            purpose:res.data.company.purpose, 
            website:res.data.company.website
          })
        }

        }).catch(error=>{
        console.log(error.response.data)
        });

        axios.get("https://media-kokrokooad.herokuapp.com/api/super-admin/get-bank/details",{
        headers:{ 'Authorization':`Bearer ${user}`}
        }
        )
        .then(res=>{
        console.log(res.data)
          this.setState({
            bank_name:res.data.bank_name,
            bank_branch:res.data.bank_branch,
            account_name:res.data.account_name,
            account_number:res.data.account_number,
            isActive:false
          })

        }).catch(error=>{
        console.log(error.response.data)
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
    purpose:this.state.purpose, 
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
  })
}

handleBankEdit=(e)=>{
    e.preventDefault();
    axios.patch("https://media-kokrokooad.herokuapp.com/api/super-admin/update-bank/details",{
        bank_name:this.state.bank_name,
        bank_branch:this.state.bank_branch,
        account_name:this.state.account_name,
        account_number:this.state.account_number
    },
    { headers:{ 'Authorization':`Bearer ${user}`}})
    .then(res=>{
      console.log(res.data);
    })
    .catch(error=>{
      console.log(error.response.data)
    })
}

  render() {
    return (
      <>
      <LoadingOverlay 
      active = {this.state.isActive}
      spinner={<FadeLoader color={'#4071e1'}/>}
      >
        <UserHeader userName={this.state.company_name}/>
        {/* Page content */}
        <Container className="mt--7" fluid>
            <Row>
            <Col className="order-xl-1 mt-3" xl="10">
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
                          Business Certificate
                        </label>
                        <a href={`${this.state.business_cert}`}
                        style={{marginLeft:"10px"}}
                        target="_blank"
                        width="100%" height="100%"
                        >
                        <i className="fa fa-download"/>
                        </a>
                        <br/>
                        <Input
                          className="form-control-alternative"
                          type="file"
                          onChange={e=>this.setState({business_cert:e.target.files[0]})}
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
                        <a href={`${this.state.operation_cert}`}
                        style={{marginLeft:"10px"}}
                        target="_blank"
                        width="100%" height="100%"
                        >
                        <i className="fa fa-download"/>
                        </a>
                        <br/>
                        <Input
                          className="form-control-alternative"
                          type="file"
                          onChange={e=>this.setState({operation_cert:e.target.files[0]})}
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

          <Row>
            <Col className="order-xl-1 mt-3" xl="10">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Payment Information</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                <Form onSubmit = {this.handleBankEdit}>
                <Row>
                  <Col lg="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-first-name"
                      >
                        Bank Name
                      </label>
                      <Input
                        className="form-control-alternative"
                        value={this.state.bank_name}
                        id="input-first-name"
                        placeholder="Bank name"
                        type="text"
                        onChange={e=>this.setState({bank_name:e.target.value})}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-last-name"
                      >
                        Bank Branch
                      </label>
                      <Input
                        className="form-control-alternative"
                        value={this.state.bank_branch}
                        id="input-last-name"
                        placeholder="Bank Branch"
                        type="text"
                        onChange={e=>this.setState({bank_branch:e.target.value})}
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
                          Account Name
                        </label>
                        <Input
                          className="form-control-alternative"
                          value={this.state.account_name}
                          id="input-first-name"
                          placeholder="Account Name"
                          type="text"
                          onChange={e=>this.setState({account_name:e.target.value})}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-last-name"
                        >
                          Account Number 
                        </label>
                        <Input
                          className="form-control-alternative"
                          value={this.state.account_number}
                          id="input-last-name"
                          placeholder="Account Number"
                          type="text"
                          onChange={e=>this.setState({account_number:e.target.value})}
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
                    Edit Bank Details
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

export default CompanyProfile;

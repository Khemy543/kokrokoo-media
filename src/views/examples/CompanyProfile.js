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
    regions:[],
    languages:[],
    logo:"",
    media_house:"",
    media_type:"",
    operation_cert:"",
    purpose:"", 
    website:"",
    imagePreviewUrl: '',
    percentage:0,
    country:"Ghana"

    /* bank_name:"",
    bank_branch:"",
    account_name:"",
    account_number:"" */
  }

  
componentDidMount(){
  this.setState({isActive:true})
  axios.get(`${domain}/api/company-profile`,{
    headers:{ 'Authorization':`Bearer ${user}`}
        }
        )
        .then(res=>{
        console.log(res.data)
        
          this.setState({
            company_id:res.data.id,
            company_name:res.data.company_name,
            business_cert:res.data.business_cert, 
            address:res.data.address,
            logo:res.data.logo,
            imagePreviewUrl:`${domain}${res.data.logo}`,
            media_house:res.data.media_house,
            media_type:res.data.media_type,
            purpose:res.data.purpose,
            operation_cert:res.data.operation_cert,
            purpose:res.data.purpose, 
            website:res.data.website,
            languages:res.data.languages,
            regions:res.data.region,
            isActive:false
          })

        }).catch(error=>{
        console.log(error.response.data)
        });

       /*  axios.get(`${domain}/api/super-admin/get-bank/details`,{
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
          })

        }).catch(error=>{
        console.log(error.response.data)
        }); */

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


    handleSubmitCompany=(e)=>{
      e.preventDefault()
        this.setState({isActive:true})
        let tempLanguages = this.state.languages.split(",");
        let tempRegions = this.state.regions.split(",");
        console.log(tempRegions)
        console.log(tempLanguages)
        var bodyFormData = new FormData();
        bodyFormData.append('business_cert',this.state.business_cert);
        bodyFormData.append('operation_cert',this.state.operational_cert);
        bodyFormData.append('logo',this.state.logo);
        bodyFormData.append('company_email',this.state.company_email);
        bodyFormData.append('company_name',this.state.company_name);
        bodyFormData.append('address',this.state.address);
        bodyFormData.append('address',this.state.address);
        bodyFormData.append('media_house',this.state.media_house);
        bodyFormData.append('media_type',this.state.media_type);
        bodyFormData.append('website',this.state.website);
        bodyFormData.append('purpose',this.state.purpose);
        bodyFormData.append('languagues',tempLanguages);
        bodyFormData.append('region',tempRegions);
        bodyFormData.append('country',this.state.country);
        bodyFormData.append('company_profile', "its me")
        
            for(var pair of bodyFormData.entries()) {
                console.log(pair[0]+ ': '+ pair[1]); 
            }

            axios({
                method:'post',
                url:`${domain}/api/super-admin/update-company/${this.state.company_id}`,
                data:bodyFormData,
                headers: {'Content-Type': 'multipart/form-data','Authorization':`Bearer ${user}` },
                onUploadProgress: (progressEvent) => {
                    const {loaded , total} = progressEvent;
                    let percentage = Math.floor(loaded * 100 / total);
                    console.log(percentage)
                    if(percentage<100){
                        this.setState({percentage:percentage});
                    }
                    else{
                        this.setState({percentage:100})
                    }
            }})
            .then(res=>{
                console.log("data",res.data);
                /* this.setState({isActive:false, message:"Registration Successful!", modal:true
                })
                setTimeout(
                    function(){
                        this.setState({modal:false});
                        this.props.history.push("/auth/await-verification",{
                            email:this.state.email
                        })
                    }
                    .bind(this),
                    2000
                ) */
            })
            .catch(error=>{
                console.log(error.response.data)
                /* if(error.response){
                    console.log(error.response.data);
                    this.setState({
                        modal:true, isActive:false, message:error.response.data.errors.business_cert || error.response.data.errors.operation_cert || error.response.data.errors.logo || error.response.data.errors.company_name || error.response.data.errors.media_house || error.response.data.errors.website
                    })
                } */
            })

}

_handleImageChange(e) {
  e.preventDefault();

  let reader = new FileReader();
  let file = e.target.files[0];

  reader.onloadend = () => {
    this.setState({
      logo: file,
      imagePreviewUrl: reader.result
    });
  }

  reader.readAsDataURL(file)
}
/* handleBankEdit=(e)=>{
    e.preventDefault();
    axios.patch(`${domain}/api/super-admin/update-bank/details`,{
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
} */

pushType = (value,checked)=>{
  let tempRegions = this.state.regions;
  if(checked){
      tempRegions.push(value);
      this.setState({regions:tempRegions})
  }else{
     let index = tempRegions.indexOf(value);
     if(index!==-1){
         tempRegions.splice(index,1);
         this.setState({regions:tempRegions})
     }
  }
  
  console.log(tempRegions)
}

pushLanguages = (value,checked)=>{
  let tempLanguages = this.state.languages;
  if(checked){
      tempLanguages.push(value);
      this.setState({languages:tempLanguages})
  }else{
     let index = tempLanguages.indexOf(value);
     if(index!==-1){
         tempLanguages.splice(index,1);
         this.setState({languages:tempLanguages})
     }
  }
  
  console.log(tempLanguages)
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
                          htmlFor="input-last-name"
                        >
                          Purpose
                        </label>
                       {/*  <Input type="select" placeholder="Purpose"  value={this.state.purpose} onChange={e=>this.setState({purpose:e.target.value})}>
                            <option value="Public">Public</option>
                            <option value="Public(Foreign)">Public(Foreign)</option>
                            <option value="Commercial">Commercial</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Kids Entertainment">Kids Entertainment</option>
                            <option value="Sports">Sports</option>
                            <option value="Lifestyle">Lifestyle</option>
                            <option value="News & Business">News & Business</option>
                            <option value="Others">Others</option>
                            </Input> */}
                            <Input className="form-control-alternative" type="text" value={this.state.purpose} onChange={e=>this.setState({purpose:e.target.value})} placeholder="Purpose"/>
                      </FormGroup>
                    </Col>
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
                        className="form-control-alternative"
                          value={this.state.media_type}
                          type="select"
                          onChange={e=>this.setState({media_type:e.target.value})}
                          disabled
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
                  <Col md="12">
                  <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-last-name"
                        >
                          Coverage Regions
                        </label>
                        <Input
                          className="form-control-alternative"
                          value={this.state.regions}
                          id="input-last-name"
                          placeholder="Coverage Regions"
                          type="textarea"
                          onChange={e=>this.setState({regions:e.target.value})}
                        />
                      </FormGroup>
                      </Col>
                  </Row>
                  <Row>
                  <Col md="12">
                  <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-last-name"
                        >
                          Languages
                        </label>
                        <Input
                          className="form-control-alternative"
                          value={this.state.languages}
                          id="input-last-name"
                          placeholder="Languages"
                          type="textarea"
                          onChange={e=>this.setState({languages:e.target.value})}
                        />
                      </FormGroup>
                      </Col>
                  </Row>
                  
                  <br/>
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
                  <Col sm="12" xs="12">
                      <small className=" d-block text-uppercase font-weight-bold mb-4">
                        Company Logo
                      </small>
                      <img
                        alt="..."
                        className=" img-fluid rounded-circle shadow"
                        src={this.state.imagePreviewUrl}
                        style={ {width: "150px",marginBottom:"20px"} }
                      ></img>
                      <br/>
                  <input type="file" 
                                onChange={(e)=>this._handleImageChange(e)} />
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

         {/*  <Row>
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
          </Row> */}
          
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

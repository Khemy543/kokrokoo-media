import React from "react";
// reactstrap components
import {
  Card,
  CardBody,
  Container,
  Row,
  Input,
  Button,
  Form,
  Col,
  Nav, NavLink,NavItem,TabContent,  TabPane
} from "reactstrap";
// core components
import LoadingOverlay from "react-loading-overlay";
import FadeLoader from "react-spinners/FadeLoader";
import Header from "components/Headers/Header";
import axios from 'axios';
import classnames from 'classnames';

let user = localStorage.getItem("access_token");
var domain = "https://media-backend.kokrokooad.com";
function RegistrationPayment(props) {
const [isActive, setIsActive] = React.useState(false);
const [firstname, setFirstname] = React.useState("");
const [lastname, setLastname] = React.useState("");
const [email, setEmail] = React.useState("");
const [amount, setAmount] = React.useState("");
const [phonenumber,setPhonenumber] =React.useState("");
const [activeTab, setActiveTab] = React.useState("1");
const [file, setFile] = React.useState(null);
const [percentage, setPercentage] = React.useState(0)

React.useEffect(()=>{
  console.log(props.location.state)
},[])

const handleSubmit=(e)=>{/* 
    setIsActive(true) */
    e.preventDefault();
    /* axios.post("")
    props.history.push("/client/payment/account-information", {firstname:firstname,
      lastname:lastname, 
      email:email,
      amount:amount,
      invoice_id:props.location.state.invoice_id,
      cart_id: props.location.state.cart_id
    });
    setIsActive(false) */

    axios.post(`${domain}/api/initialize/registration/payment`,
    {
        phonenumber:phonenumber,
        firstname: firstname,
        lastname: lastname,
        country:"Ghana"
    },{headers:{ 'Authorization':`Bearer ${user}`}})
    .then(res=>{
        console.log(res.data);
        if(res.data.status === "success"){
          window.location=`${res.data.url}`
        }
    })
    .catch(error=>{
        console.log(error.response.data);
    })
}

/* const handlePOSubmit=(e)=>{
  e.preventDefault();
  if(file !== null){
    var bodyFormData = new FormData();
    bodyFormData.append('file',file)
    axios({
      method:'post',
      url:`${domain}/api/payment-via-po`,
      data:bodyFormData,
      headers: {'Content-Type': 'multipart/form-data','Authorization':`Bearer ${user}`},
      onUploadProgress: (progressEvent) => {
          const {loaded , total} = progressEvent;
          let cal_percentage = Math.floor(loaded * 100 / total);
          console.log(cal_percentage)
          if(percentage<100){
              setPercentage(cal_percentage)
          }
          else{
              setPercentage(100)
          }
  }})
    .then(res=>{
      console.log(res.data)
    })
    .catch(error=>{
      console.log(error.response.data)
    })
  }

}
 */

const toggle = tab => {
  if(activeTab !== tab) setActiveTab(tab);
}

  return (
    <>
      <LoadingOverlay
        active={isActive}
        spinner={<FadeLoader color={'#4071e1'} />}
      >
      <Header />
      <Container className=" mt--9" fluid>
      <Row>
            <Col md="5" className="ml-auto mr-auto">
            <Row>
                <Col md ="6" className="ml-auto mr-auto">
                <div style={{textAlign:"center"}}>
                <span>
                <img src={require("../../assets/img/brand/kokro-yellow.png")} alt="#" style={{height:"50px", width:"auto"}}/>
                </span>
                </div>
                </Col>
            </Row>
            <Row>
              
            <Col md="6" className="ml-auto mr-auto">
                    <p style={{fontSize:"12px", fontWeight:600}}>Registration Payment Details</p>

                </Col>
            </Row>

                
                
              <Card style={{border:"1px solid #0000001f", borderRadius:"0px"}}>
                <CardBody>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                        <label style={{fontSize:"13px" , fontWeight:600}}>First Name</label>
                        <Input type="text" value={firstname} required onChange={e=>setFirstname(e.target.value)} placeholder="First Name"/>
                        </Col>
                        <Col>
                        <label  style={{fontSize:"13px" , fontWeight:600}}>last Name</label>
                        <Input type="text" required value={lastname} onChange={e=>setLastname(e.target.value)} placeholder="Last Name"/>
                        </Col>
                    </Row>
                    
                    <Row style={{marginTop:"20px"}}>
                        <Col>
                        <label  style={{fontSize:"13px" , fontWeight:600}}>Email Address</label>
                        <Input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email Address"/>
                        </Col>
                        
                    </Row>
                    <Row style={{marginTop:"20px"}}>
                        <Col>
                        <label style={{fontSize:"13px" , fontWeight:600}}>Phone Number</label>
                            <Input  type="number" value={phonenumber} name="phone Number" onChange={e=>setPhonenumber(e.target.value)} required placeholder="Phone Number"/>
                        </Col>
                        
                    </Row>
                    <Row style={{marginTop:"30px"}}>
                        <Col> 
                            <Button color="primary" type="submit">Proceed</Button>
                        </Col>
                    </Row>
                    <p style={{textAlign:"center", marginTop:"15px", fontSize:"12px",fontWeight:600}}>Contact <a href="!#">support@kokrokooad.com</a> for any questions</p>
                  </Form>
                </CardBody>
              </Card>
              <Row style={{marginTop:"20px"}}>
                  <Col md="7" className="ml-auto mr-auto">
                      <img src={require("assets/img/brand/mastercard.png")} alt="#" style={{width:"60px", height:"auto"}}/>
                      <img src={require("assets/img/brand/visa.png")} alt="#" style={{width:"60px", height:"auto"}}/>
                      <img src={require("assets/img/brand/mobilemoney.png")} alt="#" style={{width:"80px", height:"auto"}}/>
                  </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </LoadingOverlay>
    </>
  );
}


export default RegistrationPayment;

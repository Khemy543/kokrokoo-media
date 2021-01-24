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
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,Container,Alert
} from "reactstrap";
import axios from "axios";
import LoadingOverlay from "react-loading-overlay";
import FadeLoader from "react-spinners/FadeLoader";
import AuthNavbar from "../../components/Navbars/AuthNavbar.js";

var domain = "https://media.test.backend.kokrokooad.com";
function Login(props){
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isActive , setIsActive] = React.useState(false);
  const [alert, setAlert] = React.useState(false);
  const [eye ,setEye] = React.useState(false);

  const toggleEye=()=>setEye(!eye);
  

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(e)
    setIsActive(true);

    axios.post(`${domain}/oauth/token`,{
      grant_type: "password",
      client_id: 1,
      client_secret:"6wbQEcqNmWCSkY13sUZLCMRKBQwzEIHZss8Nr5ln",
      username: username,
      password: password,
      provider: "users",
    headers:{"Content-Type": "application/json", "Accept": "application/json"}}
  )
    .then(res=>{
      if(res.data.status == "success"){
        const token_data  = res.data.access_token;
        localStorage.setItem('access_token',token_data);
        window.location.reload("/");
        setIsActive(false);

      }
    })
    .catch(error=>{
      console.log(error.response.data)
      setAlert(true);
      setIsActive(false);
    })
  }

    return (
      <>
      <LoadingOverlay 
      active = {isActive}
      spinner={<FadeLoader color={'#4071e1'}/>}
      >
      <div
        style={{
          backgroundImage: "url(" + require("../../assets/img/brand/login.jpeg") + ")",
          backgroundPosition:"center",
          backgroundRepeat:"repeat",
          backgroundSize:"cover",
          height:"100vh"
        }}
      >
      
      <div className="filter" />
      <AuthNavbar />
      <Container>
        <Row>
        <Col lg="5" md="7" className="ml-auto mr-auto mt-6 mb-auto">
          <Card style={{boxShadow:"0 2px 12px rgba(0,0,0,0.1)"}}>
            
            <CardBody className="px-lg-5 py-lg-5">
            <h3 className="text-center">MEDIA LOGIN</h3>
              {alert?
                  <Alert color="warning" fade={true} style={{textAlign:"center",height:"50px"}}>
                  Incorrect Credentials
                </Alert>
                :
                <div>
                </div>
                }
              <div className="text-center text-muted mb-4">
                
              </div>
              <Form role="form" onSubmit={handleSubmit}>
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Email" type="text" name="username" value={username} onChange={e=>setUsername(e.target.value)} required/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Password" type={eye?"text":"password"} name="password" value={password} onChange={e=>setPassword(e.target.value)} required/>
                    <InputGroupAddon addonType="append">
                    <InputGroupText>
                    <i className={!eye?"fa fa-eye-slash":"fa fa-eye"} onClick={toggleEye} style={{cursor:"pointer"}}/>
                    </InputGroupText>
                  </InputGroupAddon>
                  </InputGroup>
                </FormGroup>
                <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id=" customCheckLogin"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor=" customCheckLogin"
                  >
                    <span >Remember me</span>
                  </label>
                </div>
                <div className="text-center">
                  <Button className="my-4" color="primary" type="submit" >
                    SIGN IN
                  </Button>
                </div>
              </Form>
              <Row className="mt-3">
                <Col xs="6">
                  <a
                    href="/auth/forget-password"
                  >
                    <small>Forgot password?</small>
                  </a>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        </Row>
        </Container>
        </div>
        </LoadingOverlay>
      </>
    );
  }


export default Login;

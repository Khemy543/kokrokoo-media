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
  Col,Container
} from "reactstrap";
import axios from "axios";
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";


function Login({history}){
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isActive , setIsActive] = React.useState(false);
  
  var storageData =[];

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(e)
    setIsActive(true);

    axios.post("https://media-kokrokooad.herokuapp.com/oauth/token",{
      grant_type: "password",
      client_id: 1,
      client_secret:"4AsiEW6jSyq1nC2b9xM2qkyLfSVu4bJbGU8sG1qu",
      username: username,
      password: password,
      provider: "users",
    headers:{"Content-Type": "application/json", "Accept": "application/json"}}
  )
    .then(res=>{
      console.log(res.data)
      if(res.data.status == "success"){
        const token_data  = res.data.access_token;
        const loggedin = true;
        storageData.push(token_data,loggedin)
        localStorage.setItem('storageData',JSON.stringify(storageData));
        console.log("storagedata:",storageData);
        history.push("/homepage")
        setIsActive(false);

      }
    })
    .catch(error=>{
      console.log(error.response.data)
      setIsActive(false);
    })
  }

    return (
      <>
      <LoadingOverlay 
      active = {isActive}
      spinner={<BounceLoader color={'#4071e1'}/>}
      >
      <Container>
        <Row>
        <Col lg="5" md="7" className="ml-auto mr-auto mt-7 mb-auto">
          <Card className="shadow border-0">
            
            <CardBody className="px-lg-5 py-lg-5">
              <h3 className="text-center">Sign In</h3>
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
                    <Input placeholder="Password" type="password" name="password" value={password} onChange={e=>setPassword(e.target.value)} required/>
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
                    <span className="text-muted">Remember me</span>
                  </label>
                </div>
                <div className="text-center">
                  <Button className="my-4" color="primary" type="submit" >
                    Sign in
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <small>Forgot password?</small>
              </a>
            </Col>
            <Col className="text-right" xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <small>Create new account</small>
              </a>
            </Col>
          </Row>
        </Col>
        </Row>
        </Container>
        </LoadingOverlay>
      </>
    );
  }


export default Login;

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
import { Link } from "react-router-dom";
import axios from "axios";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media,
  ModalBody,
  ModalFooter,
  Button,
  Modal,
  ModalHeader
} from "reactstrap";
import {RateConsumer} from "../../context.js";


let user = localStorage.getItem("access_token");
var domain = "https://media.test.backend.kokrokooad.com";

class AdminNavbar extends React.Component {
state={
    username:"",
    published:false,
    modal:false,
    message:"",
    messageModal:false
  }

componentDidMount(){
  axios.get(`${domain}/api/user`,{
    headers:{ 'Authorization':`Bearer ${user}`}
        }
        )
        .then(res=>{
        console.log(res.data)
        if(res.data.user !== null){
          this.setState({username:res.data.user.name, published:res.data.company.isPublished});
          localStorage.setItem('media_type',res.data.company.media_type);
          localStorage.setItem('published',res.data.company.isPublished)
        }

        }).catch(error=>{
        console.log(error)
        });
}

handlePublish=()=>{
  axios.post(`${domain}/api/super-admin/publish-company`,null,
  {headers:{ 'Authorization':`Bearer ${user}`}})
  .then(res=>{
    console.log(res.data);
    if(res.data.status === "Company is live already" || res.data.status === "Turned services on"){
      this.setState({published:true,messageModal:true, message:res.data.status});
      setTimeout(
        function() {
            this.setState({ messageModal: false });
        }
        .bind(this),
        1500
    );
    }
  })
  .catch(error=>{
    console.log(error.response.data)
  })
}

handleUnPublish=()=>{
  this.setState({modal:false})
  axios.post(`${domain}/api/super-admin/unpublish-company`,null,
  {headers:{ 'Authorization':`Bearer ${user}`}})
  .then(res=>{
    console.log(res.data);
    if(res.data.status === "Turned services off" || res.data.status ==="Services are already off"){
      this.setState({published:false,messageModal:true, message:res.data.status});
      setTimeout(
        function() {
            this.setState({ messageModal: false });
        }
        .bind(this),
        1500
    );

    }
  })
  .catch(error=>{
    console.log(error.response.data)
  })
}
  
  
  render() {
    return (
      <>
        <Navbar className="navbar-top navbar-dark shadow" expand="md" id="navbar-main">
          <Container fluid>
            <div
              className="h4 mb-0 text-uppercase d-none d-lg-inline-block"
              
            >
              {this.props.brandText}
            </div>
            {/* <Form className="navbar-search navbar form-inline mr-3 d-none d-md-flex ml-lg-auto" style={{color:"rgba(50, 50, 93, 0.62)"}}>
              <FormGroup className="mb-0" style={{color:"rgba(50, 50, 93, 0.62)"}}>
                <InputGroup className="input-group-alternative" style={{color:"rgba(50, 50, 93, 0.62)"}}>
                  <InputGroupAddon addonType="prepend" style={{color:"rgba(50, 50, 93, 0.62)"}}>
                    <InputGroupText style={{color:"rgba(50, 50, 93, 0.62)"}}>
                      <i className="fa fa-search" style={{color:"rgba(50, 50, 93, 0.62)"}}/>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Search" type="text" style={{color:"rgba(50, 50, 93, 0.62)"}}/>
                </InputGroup>
              </FormGroup>
            </Form> */}
            <Nav className="align-items-center d-none d-md-flex" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <img
                        alt="..."
                        src={require("assets/img/new_logo.png")}
                      />
                    </span>
                    <Media className="ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm font-weight-bold" style={{color:"#32325d"}}>
                        {this.state.username}  <i className="fa fa-chevron-down ml-2" style={{fontSize:"11px"}}/>
                      </span>
                    </Media>
                  </Media>
                </DropdownToggle>
                <RateConsumer>
                  {value=>(
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem className="noti-title" header tag="div">
                    <h6 className="text-overflow m-0">Welcome!</h6>
                  </DropdownItem>
                  <DropdownItem to="/media/user-profile" tag={Link}>
                    <i className="ni ni-single-02" />
                    <span>My profile</span>
                  </DropdownItem>
                  {!this.state.published?
                  <DropdownItem onClick={()=>{this.handlePublish()}}>
                    <i className="fa fa-bell-o" />
                    <span>Publish</span>
                  </DropdownItem>
                  :
                  <DropdownItem onClick={()=>this.setState({modal:true})}>
                    <i className="fa fa-bell-slash-o" />
                    <span>Unpublish</span>
                  </DropdownItem>
                  }
                  <DropdownItem divider />
                  <DropdownItem onClick={()=>value.logout()}>
                    <i className="ni ni-user-run" />
                    <span>Logout</span>
                  </DropdownItem>
                </DropdownMenu>
              )}
              </RateConsumer>
              </UncontrolledDropdown>
            </Nav>
            <Modal isOpen={this.state.modal}>
            <ModalBody>
              Do You Want To Unpublish Your Media House?
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={()=>{this.handleUnPublish()}}>Yes</Button>
              <Button color="info" onClick={()=>this.setState({moda:false})}>No</Button>
            </ModalFooter>
            </Modal>
            <Modal isOpen={this.state.messageModal}>
            <ModalHeader style={{borderBottom:"1px solid rgb(64 78 103 / 30%)"}}>
              Message
            </ModalHeader>
              <ModalBody style={{textAlign:"center"}}>
                {this.state.message}
              </ModalBody>

            </Modal>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default AdminNavbar;

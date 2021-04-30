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
    messageModal:false,
    logo:"",
    adminPublish:0
  }

componentDidMount(){
  axios.get(`${domain}/api/user`,{
    headers:{ 'Authorization':`Bearer ${user}`}
        }
        )
        .then(res=>{
        console.log(res.data)
          this.setState({username:res.data.name});
  })

  axios.get(`${domain}/api/company-profile`,{
    headers:{ 'Authorization':`Bearer ${user}`}
        })
        .then(res=>{
        console.log(res.data)
          this.setState({published:res.data.isPublished, logo:res.data.logo, adminPublish:res.data.published_by_admin});
          
      })
}

handlePublish=()=>{
  axios.post(`${domain}/api/super-admin/publish-company`,null,
  {headers:{ 'Authorization':`Bearer ${user}`}})
  .then(res=>{
    console.log(res.data);
    if(res.data.status === "Company is live already" || res.data.status === "Turned services on"){
      this.setState({published:1,messageModal:true, message:res.data.status});
    }
  })
  .catch(error=>{
    console.log(error)
  })
}

handleUnPublish=()=>{
  this.setState({modal:false})
  axios.post(`${domain}/api/super-admin/unpublish-company`,null,
  {headers:{ 'Authorization':`Bearer ${user}`}})
  .then(res=>{
    console.log(res.data);
    if(res.data.status === "Turned services off" || res.data.status ==="Services are already off"){
      this.setState({published:0,messageModal:true, message:res.data.status});
    }
  })
  .catch(error=>{
    console.log(error)
    if(error.response && error.response.status && error.response.status === 403){
        this.setState({message:"Unauthorized to use this service"})
    }
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
            <Nav className="align-items-center d-none d-md-flex" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <img
                        alt="..."
                        src={`https://uploads.kokrokooad.com/${this.state.logo}`}
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
                  {this.state.adminPublish ===1 && this.state.published === 0?
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
            <ModalHeader>
              Do You Want To Unpublish Your Media House?
            </ModalHeader>
            <ModalFooter>
              <Button color="danger" onClick={()=>{this.handleUnPublish()}}>Yes</Button>
              <Button color="info" onClick={()=>this.setState({modal:false})}>No</Button>
            </ModalFooter>
            </Modal>
            <Modal isOpen={this.state.messageModal}>
              <ModalHeader style={{textAlign:"center"}}>
                {this.state.message}
              </ModalHeader>
                <ModalFooter>
                  <Button color="danger" onClick={()=>this.setState({messageModal:false})}>Close</Button>
                </ModalFooter>
            </Modal>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default AdminNavbar;

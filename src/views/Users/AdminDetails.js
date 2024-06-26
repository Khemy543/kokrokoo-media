import React from "react";
// react component that copies the given text inside your clipboard
import { CopyToClipboard } from "react-copy-to-clipboard";
import {Link} from "react-router-dom";
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
  Nav,NavItem,NavLink,TabContent,TabPane,FormGroup,Label,Popover, PopoverHeader, PopoverBody,Modal,ModalBody
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import UserCard from "../../components/Cards/UserCard.js";
import LoadingOverlay from "react-loading-overlay";
import FadeLoader from "react-spinners/FadeLoader";
import axios from "axios";
import Pagination from "react-js-pagination";
//require("bootstrap/less/bootstrap.less");

let user = localStorage.getItem("access_token");
var domain = "https://media.test.backend.kokrokooad.com";


class AdminDetails extends React.Component{
    state={
        user:[],
        popoverOpen:false,
        popover2Open:false,
        popover3Open:false,
        iActive:false,
        isActive:"",
        message:"",
        modal:false
    }
    
       toggle = () => this.setState({popoverOpen:!this.state.popoverOpen});
       toggle2 = ()=> this.setState({popover2Open:!this.state.popover2Open});
       toggle3 = ()=> this.setState({popover3Open:!this.state.popover3Open});
       toggleModal = ()=>this.setState({modal:!this.state.modal})
    
    componentDidMount(){
        this.setState({iActive:true})
        axios.get(`${domain}/api/super-admin/get/${this.props.location.state.admin_id}/details`,
        {headers:{ 'Authorization':`Bearer ${user}`}})
        .then(res=>{
            console.log(res.data);
            this.setState({user:res.data,isActive:res.data.isActive,iActive:false});
        })
        .catch(error=>{
            console.log(error)
        })
    }


    handleBlock=(e)=>{
        this.setState({iActive:true})
        console.log(e);
        axios.post(`${domain}/api/super-admin/block/${this.props.location.state.admin_id}`,null,
        {headers:{ 'Authorization':`Bearer ${user}`}})
        .then(res=>{
            console.log(res.data);
            if(res.data.status === "user blocked"){
                this.setState({popoverOpen:false});
                setTimeout(
                    function(){
                        this.setState({message:"USER BLOCKED!!", modal:true,iActive:false})
                        window.location.reload("/")
                    }
                    .bind(this),
                    2000
                )
            }
            
           

        })
        .catch(error=>{
            console.log(error)
        })
    }

     handleUnBlock=(e)=>{
        this.setState({iActive:true})
        console.log(e)
        axios.post(`${domain}/api/super-admin/unblock/${this.props.location.state.admin_id}`,null,
        {headers:{ 'Authorization':`Bearer ${user}`}})
        .then(res=>{
            console.log(res.data);
            if(res.data.status === "user unblocked"){
                this.setState({popover2Open:false});
                setTimeout(
                    function(){
                        this.setState({message:"USER UNBLOCKED!!", modal:true,iActive:false})
                        window.location.reload("/")
                    }
                    .bind(this),
                    2000
                )
            }
        })
        .catch(error=>{
            console.log(error)
        })
    }

    handleDelete=()=>{
        let all_data = JSON.parse(localStorage.getItem('storageData'));
        
        var  user = all_data[0]
        this.setState({iActive:true})
        axios.delete(`${domain}/api/super-admin/delete/${this.props.location.state.admin_id}`,
        {headers:{ 'Authorization':`Bearer ${user}`}})
        .then(res=>{
            console.log(res.data);
            if(res.data.status === "user deleted"){
                this.setState({popover3Open:false});
                setTimeout(
                    function(){
                        this.setState({message:"USER DELETED!!", modal:true,iActive:false})
                        this.props.history.push("/media/view-users");
                    }
                    .bind(this),
                    2000
                )
            }
        })
        .catch(error=>{
            console.log(error)
        })
    }
    render(){
    const {name,email,phone1,phone2,title,role,last_login,company_id,acivation_code} = this.state.user
    return (
      <>
      <LoadingOverlay 
      active = {this.state.iActive}
      spinner={<FadeLoader color={'#4071e1'}/>}
      >
      <Header/>
        <Container className=" mt--7" fluid>
            
          <Row>
            <Col md="10">
            <Card className="shadow">
                <CardBody>
                    <Input value={name} disabled style={{textTransform:"uppercase"}}/>
                    <br/>
                    <Input value={email} disabled/>
                    <br/>
                    <Row>
                        <Col>
                    <Input value={phone1} disabled/>
                    </Col>
                    <Col>
                    <Input value={phone2} disabled/>
                    </Col>
                    </Row>
                    <br/>
                    <Input value={title} disabled style={{textTransform:"uppercase"}}/>
                    <br/>
                    <Input value={role} disabled style={{textTransform:"uppercase"}}/>
                    <br/>
                    <Row>
                        <Col>
                    <Input value={last_login} disabled/>
                    </Col>
                    <Col>
                    <Input value={acivation_code} disabled/>
                    </Col>
                    </Row>
                </CardBody>
            </Card>
            <Row style={{marginTop:"20px"}}>
            <Col md="7">
            <Row>   
            <Col md="3" sm="3" xs="3">
            <Button
            style={{backgroundColor:"#404E67", color:"white"}}
            onClick={()=>{this.props.history.push("/media/edit-admin",{admin_id:this.props.location.state.admin_id})}}
            >
                EDIT
            </Button>
            </Col>
            <Col md="5" sm="5" xs="5">
            {this.state.isActive==="active"?
            <div>
            <Button
            color="warning"
            id="block"
            >
            BLOCK
            </Button>   
            <Popover placement="bottom" isOpen={this.state.popoverOpen} target="block" toggle={()=>this.toggle()}>
                <PopoverHeader>Block User?</PopoverHeader>
                <PopoverBody>
                    <Button color="danger" onClick={()=>this.handleBlock()}>yes</Button> <Button color="info" onClick={()=>this.toggle()}>no</Button>
                </PopoverBody>
            </Popover>
            </div>:
            <div>
            <Button
            color="success"
            id="unblock"
            >
            UNBLOCK
            </Button>   
            <Popover placement="bottom" isOpen={this.state.popover2Open} target="unblock" toggle={()=>this.toggle2()}>
                <PopoverHeader>Unblock User?</PopoverHeader>
                <PopoverBody>
                    <Button color="danger" onClick={()=>this.handleUnBlock()}>yes</Button> <Button color="info" onClick={()=>this.toggle2()}>no</Button>
                </PopoverBody>
            </Popover>
            </div>}
            
            </Col>
            <Col md="4" xs="4" sm="4">
            <Button
            color="danger"
            id="delete"
            >
            DELETE
            </Button>   
            <Popover placement="bottom" isOpen={this.state.popover3Open} target="delete" toggle={()=>this.toggle3()}>
                <PopoverHeader>Delete User?</PopoverHeader>
                <PopoverBody>
                    <Button color="danger" onClick={()=>this.handleDelete()}>yes</Button> <Button color="info" onClick={()=>this.toggle3()}>no</Button>
                </PopoverBody>
            </Popover>
            </Col>
            </Row> 
            </Col>
            </Row>

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


export default AdminDetails;

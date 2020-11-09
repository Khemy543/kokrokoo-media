import React from "react";
// react component that copies the given text inside your clipboard
import { CopyToClipboard } from "react-copy-to-clipboard";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Button,
  Table,
  Modal,
  ModalHeader,
  ModalFooter,
  Spinner
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import UserCard from "../../components/Cards/UserCard.js";
import LoadingOverlay from "react-loading-overlay";
import FadeLoader from "react-spinners/FadeLoader";
import axios from "axios";
import Pagination from "react-js-pagination";


let user = localStorage.getItem("access_token");
var domain = "https://media.test.backend.kokrokooad.com";

function ViewUsers({history}) {
    const [isActive, setIsActive] = React.useState(true);
    const [users, setUsers] = React.useState([]);
    const [data, setData] = React.useState([])
    const [modal, setModal] = React.useState(false);
    const [id, setId] = React.useState(null);
    const [alertmessage, setMessage] = React.useState("");
    const [alertModal, setAlertModal] = React.useState(false)

    React.useEffect(()=>{
        getUsers();
    },[])

    function getUsers(pageNumber=1){
        setIsActive(true);
      axios.get(`${domain}/api/super-admin/get-all/staff?page=${pageNumber}`,
      {headers:{ 'Authorization':`Bearer ${user}`}})
      .then(res=>{
        console.log(res.data)
          setUsers(res.data);
          setData(res.data.data)
          setIsActive(false)
      })
      .catch(error=>{
        console.log(error.response.data)
        if(error.response.data.status === "Forbidden"){
          setIsActive(false)
          setAlertModal(true);
          setMessage("Access Denied");
          setData([])
        }
      });
    }

    
    const handleBlock=(id)=>{
      let tempData = data
        axios.post(`${domain}/api/super-admin/block/${id}`,null,
        {headers:{ 'Authorization':`Bearer ${user}`}})
        .then(res=>{
            console.log(res.data);
            let selected = tempData.find(item=>item.id === id);
            selected.isActive = "inactive";
            setData(tempData);
            setAlertModal(true);
            setMessage("UserBlocked!")
            setTimeout(
              function(){
                setAlertModal(false)
              }.bind(this),1500)
        })
        .catch(error=>{
            console(error)
        })
    }
    
    
    const handleUnBlock=(id)=>{
        let tempData = data;
        axios.post(`${domain}/api/super-admin/unblock/${id}`,null,
        {headers:{ 'Authorization':`Bearer ${user}`}})
        .then(res=>{
            console.log(res.data);
            let selected = tempData.find(item=>item.id === id);
            selected.isActive = "active";
            setData(tempData);
            setAlertModal(true);
            setMessage("User UnBlocked!")
            setTimeout(
              function(){
                setAlertModal(false)
              }.bind(this),1500)
        })
        .catch(error=>{
            console(error)
        })
    }
    
    const deleteUser=(id)=>{
        let tempData = data;
        axios.delete(`${domain}/api/super-admin/delete/${id}`,
        {headers:{ 'Authorization':`Bearer ${user}`}})
        .then(res=>{
            console.log(res.data);
            let newData = tempData.filter(item=>item.id !== id);
            setData(newData);
            setModal(false)
        })
        .catch(error=>{

            console(error.response.data)
        })
    }


    const { meta} = users;
    return (
      <>
      <Header />
      <Container className=" mt--9" fluid>
      {isActive?
        <Row>
            <Col md="12" style={{textAlign:"center"}}>
             <h4>Please Wait <Spinner size="sm" style={{marginLeft:"5px"}}/></h4> 
            </Col>
        </Row>
          :
        <>
          {!isActive &&data&& data.length<=0?
            <Row>
            <Col md="12" style={{textAlign:"center"}}>
             <h4>No User Created</h4> 
            </Col>
          </Row>
          :
        <>
        <p style={{fontSize:"13px", fontWeight:500}}
            >View, Edit or Delete Users You Have Created.</p>
          <Row style={{marginTop:"20px"}}>
            <Col lg="12" md="12" xl="12" sm="12" xs="12">
            <Card style={{boxShadow:"0 2px 12px rgba(0,0,0,0.1)"}}>
            <CardBody style={{overflowX:"scroll"}}>
            <Table striped bordered>
            <thead style={{backgroundColor:"#01a9ac",color:"black",height:""}}>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {data.map((value,key)=>(
          <tr>
                <td>{key+1}</td>
                <td>{value.title}</td>
                <td>{value.name}</td>
                <td>{value.email}</td>
                <td>{value.phone1}</td>
                <td>{value.role.role}</td>
                <td>{value.role.created_at}</td>
                <td>
                  <Row>
                    <Col md="6" lg="6" sm="6" xs="6" >
                    {/* <Button color="info" style={{padding:"5px 10px 5px 10px"}}
                    onClick={()=>this.handleView(value.id,value.title)}
                    ><i className="fa fa-eye"/></Button> */}
                    {value.isActive === "active"?
                    <Button color="warning" style={{padding:"5px 10px 5px 10px"}}
                    onClick={()=>handleBlock(value.id)}
                    ><i className="fa fa-lock"/></Button>
                    :
                    <Button color="success" style={{padding:"5px 10px 5px 10px"}}
                    onClick={()=>handleUnBlock(value.id)}
                    ><i className="fa fa-unlock"/></Button>
                    }
                    <Button color="danger" style={{padding:"5px 10px 5px 10px"}}
                    onClick={()=>{setModal(true); setId(value.id)}}
                    ><i className="fa fa-trash"/>
                    </Button>
                    </Col>
                  </Row>  
                  </td>
          </tr>
          ))}
          </tbody>
          </Table>
          </CardBody>
          <CardBody>
          <Pagination
            totalItemsCount={meta&&meta.total}
            activePage={meta&&meta.current_page}
            itemsCountPerPage={meta&&meta.per_page}
            onChange={(pageNumber)=>getUsers(pageNumber)}
            itemClass="page-item"
            linkClass="page-link"
            firstPageText="First"
            lastPageText = "Last"
            />
          </CardBody>
          </Card>
          </Col>
          </Row>
          </>
          }
          </>
          }
      </Container>
            <Modal isOpen={alertModal}>
              <ModalHeader>
              <h4 style={{textAlign:"center"}}>{alertmessage}</h4>
              </ModalHeader>
              <ModalFooter>
                <Button color="danger" onClick={()=>setAlertModal(false)}>Cancel</Button>
              </ModalFooter>
            </Modal>

            <Modal isOpen={modal}>
              <ModalHeader>
                Are you sure want to delete?
              </ModalHeader>
              <ModalFooter>
              <Button color="danger" onClick={()=>deleteUser(id)}>
                yes
              </Button>
              <Button color="info" onClick={()=>setModal(false)}>
                No
              </Button>
              </ModalFooter>
            </Modal>
      </>
    );
  }


export default ViewUsers;

import React from "react";
// react component that copies the given text inside your clipboard
import { CopyToClipboard } from "react-copy-to-clipboard";
// reactstrap components
import {
  Card,
  CardBody,
  Container,
  Row,
  Col,
  Button,Table,
  Modal,
  ModalBody,Spinner,
  ModalFooter,
  ModalHeader
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import LoadingOverlay from "react-loading-overlay";
import FadeLoader from "react-spinners/FadeLoader";
import axios from "axios";/* 
import history from "../../history.js"; */

let user = localStorage.getItem("access_token");
var domain = "https://media.test.backend.kokrokooad.com";

function ViewRateCards(props) {
    const [isActive, setIsActive] = React.useState(false);
    const [isActiveSpinner, setIsActiveSpinner] = React.useState(false);
    const [rateCards, setRateCards] = React.useState([]);
    const [modal, setModal] = React.useState(false);
    const [deleteID, setId]=React.useState(null);



    React.useEffect(()=>{
      setIsActiveSpinner(true)
        axios.get(`${domain}/api/ratecard/company-ratecards`,
    {headers:{ 'Authorization':`Bearer ${user}`}})
    .then(res=>{
        console.log(res.data);
        setRateCards(res.data)
        setIsActiveSpinner(false)
    })
    .catch(error=>{
        console.log(error)
    })
    },[])
    

    
    const handleView=(id)=>{
      if(localStorage.getItem('media_type') === "Print"){
        props.history.push("/media/print/view-details",{title_id:id});
      }
      else{
        props.history.push("/media/view-details",{title_id:id});
      }
      
    }

    const hanldeDelete=()=>{
      setModal(false);
      setIsActive(true)
      axios.delete(`${domain}/api/ratecard/${deleteID}/delete`,
      {headers:{ 'Authorization':`Bearer ${user}`}})
      .then(res=>{
        console.log(res.data)
        if(res.data.status ==="Ratecard deleted"){
          let tempData = rateCards;
          let newData = tempData.filter(item=>item.id !== deleteID);
          setRateCards(newData)
          setIsActive(false);
        }
      })
      .catch(error=>{
        console.log(error);
        setIsActive(false)
      })
    }

    return (
      <>
      <Header/>
        <Container className=" mt--8" fluid>
        {isActiveSpinner?
          <Row>
            <Col md="12" style={{textAlign:"center"}}>
             <h4>Please Wait <Spinner size="sm" style={{marginLeft:"5px"}}/></h4> 
            </Col>
          </Row>
          :
          <>
          <Row>
            <Col lg="12" md="12" sm="12" md="12" xs="12">
            <p style={{fontSize:"13px", fontWeight:500}}
            >Edit, Delete and View RateCard Services</p>
            <Card style={{boxShadow:"0 2px 12px rgba(0,0,0,0.1)"}}>
            <CardBody style={{overflowX:"scroll"}}>
            <Table stripped bordered>
            <thead style={{backgroundColor:"#01a9ac",color:"black",height:""}}>
            <tr>
              <th>#</th>{/* 
              <th>Rate Card ID</th> */}
              <th>Rate Card</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rateCards.map((value, index)=>(
              <tr>
              <td>{index+1}</td>{/* 
              <td>{value.id}</td> */}
              <td>{value.rate_card_title}</td>
              <td>{value.service_description}</td>
              <td>
                <Row>
                  <Col md="6" lg="6" sm="6" xs="6" >
                  <Button color="info" style={{borderRadius:"100%", padding:"2px 5px 2px 5px"}} onClick={()=>handleView(value.id)}><i className="fa fa-eye"/></Button>
                 
                  
                  <Button color="success" style={{borderRadius:"100%", padding:"2px 5px 2px 5px"}}
                    onClick={()=>props.history.push("/media/edit-ratecard-title",
                            {
                              title_id:value.id,
                              description:value.service_description,
                              file_types:value.file_types,
                              title:value.rate_card_title
                              
                            })}
                  ><i className="fa fa-pencil"/></Button>
                  
                  <Button color="danger" style={{borderRadius:"100%", padding:"2px 6px 2px 6px"}}
                  onClick={()=>{setModal(true); setId(value.id)}}
                  ><i className="fa fa-trash"/></Button>
                  
                  </Col>
                </Row>  
                </td>
            </tr>
            ))}  
          </tbody>
          </Table> 
          </CardBody>
          </Card>
          </Col>
          </Row> 
          </>
        }
        </Container>
        <Modal isOpen={modal}>
          <ModalHeader>
            Do you want to Delete?
          </ModalHeader>
          <ModalFooter>
            <Button color="danger"
            onClick={()=>hanldeDelete()}
            >
              Yes
            </Button>
            <Button color="info"
            onClick={()=>setModal(false)}
            >
              No
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }


export default ViewRateCards;

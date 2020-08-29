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
  ModalBody,
  ModalFooter
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import LoadingOverlay from "react-loading-overlay";
import FadeLoader from "react-spinners/FadeLoader";
import axios from "axios";/* 
import history from "../../history.js"; */

let user =null;
let all_data = JSON.parse(localStorage.getItem('storageData'));
if(all_data !== null){
  user = all_data[0];
}

function ViewRateCards(props) {
    const [isActive, setIsActive] = React.useState(false);
    const [rateCards, setRateCards] = React.useState([]);
    const [modal, setModal] = React.useState(false);
    const [deleteID, setId]=React.useState(null);



    React.useEffect(()=>{
      setIsActive(true)
        axios.get("https://media-kokrokooad.herokuapp.com/api/ratecard/company-ratecards",
    {headers:{ 'Authorization':`Bearer ${user}`}})
    .then(res=>{
        console.log(res.data);
        setRateCards(res.data)
        setIsActive(false)
    })
    .catch(error=>{
        console.log(error)
    })
    },[])
    
  
    const handleEdit=(id)=>{
      if(localStorage.getItem('media_type') === "Print"){
        props.history.push("/media/edit-ratecards/print",{title_id:id});
      }
      else{
        props.history.push("/media/edit-ratecards",{title_id:id});
      }
    }
    
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
      axios.delete("https://media-kokrokooad.herokuapp.com/api/ratecard/"+deleteID+"/delete",
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
      <LoadingOverlay 
      active = {isActive}
      spinner={<FadeLoader color={'#4071e1'}/>}
      >
      <Header/>
        <Container className=" mt--8" fluid>
          <Row>
            <Col lg="12">
            <Card style={{boxShadow:"0 2px 12px rgba(0,0,0,0.1)"}}>
            <CardBody style={{overflowX:"scroll"}}>
            <Table stripped bordered>
            <thead style={{backgroundColor:"#01a9ac",color:"black",height:""}}>
            <tr>
              <th>#</th>
              <th>Rate Card ID</th>
              <th>Rate Card</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rateCards.map((value, index)=>(
              <tr>
              <td>{index+1}</td>
              <td>{value.id}</td>
              <td>{value.rate_card_title}</td>
              <td>{value.service_description}</td>
              <td>
                <Row>
                  <Col md="6" lg="6" sm="6" xs="6" >
                  <Button color="info" style={{padding:"5px 10px 5px 10px"}}
                  onClick={()=>handleView(value.id)}
                  ><i className="fa fa-eye"/></Button>
                  <Button color="success" style={{padding:"5px 10px 5px 10px"}}
                  onClick={()=>handleEdit(value.id)}
                  ><i className="fa fa-pencil"/></Button>
                  <Button color="danger" style={{padding:"5px 10px 5px 10px"}}
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
        </Container>
        <Modal isOpen={modal}>
          <ModalBody>
            Do you want to Delete?
          </ModalBody>
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
        </LoadingOverlay>
      </>
    );
  }


export default ViewRateCards;

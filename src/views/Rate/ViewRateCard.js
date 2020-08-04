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
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  Input,
  Button,
  CardTitle,
  Nav,NavItem,NavLink,TabContent,TabPane,Form,FormGroup,Label,Table
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import LoadingOverlay from "react-loading-overlay";
import FadeLoader from "react-spinners/FadeLoader";
import axios from "axios";/* 
import history from "../../history.js"; */

let user =1;
let loggedin_data = false;
let all_data = JSON.parse(localStorage.getItem('storageData'));
console.log("all_data:", all_data)
if(all_data !== null){
  user = all_data[0];
  loggedin_data = all_data[1];
  //get user
  console.log("user:",user);
}

function ViewRateCards(props) {
    const [isActive, setIsActive] = React.useState(false);
    const [rateCards, setRateCards] = React.useState([]);


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
              <th>ID</th>
              <th>Rate Card ID</th>
              <th>Rate Card</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rateCards.map((value, index)=>(
              <tr>
              <td>{value.id}</td>
              <td>{value.id}</td>
              <td>{value.rate_card_title}</td>
              <td>1</td>
              <td>1</td>
              <td>
                <Row>
                  <Col md="6" lg="6" sm="6" xs="6" >
                  <Button color="info" style={{padding:"5px 10px 5px 10px"}}><i className="fa fa-eye"/></Button>
                  <Button color="success" style={{padding:"5px 10px 5px 10px"}}><i className="fa fa-pencil"/></Button>
                  <Button color="danger" style={{padding:"5px 10px 5px 10px"}}><i className="fa fa-trash"/></Button>
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
        </LoadingOverlay>
      </>
    );
  }


export default ViewRateCards;

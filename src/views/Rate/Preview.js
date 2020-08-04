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
  Nav,NavItem,NavLink,TabContent,TabPane,Form,FormGroup,Label
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import LoadingOverlay from "react-loading-overlay";
import FadeLoader from "react-spinners/FadeLoader";
import axios from "axios";/* 
import history from "../../history.js"; */

let user =null;
let all_data = JSON.parse(localStorage.getItem('storageData'));
console.log("all_data:", all_data)
if(all_data !== null){
  user = all_data[0];
}

function Preview(props) {
    const [isActive, setIsActive] = React.useState(false);
    const [rate_card_title, setTitle] = React.useState("");
    const [service_description,setDescription] = React.useState("");
    const [file_types,setFile_types] = React.useState([]);
    
    return (
      <>
      <LoadingOverlay 
      active = {isActive}
      spinner={<FadeLoader color={'#4071e1'}/>}
      >
      <Header/>
        <Container className=" mt--8" fluid>
            
          <Row>
            <Col md="12">
            <Card style={{boxShadow:"0 2px 12px rgba(0,0,0,0.1)"}}>
            <CardBody>
            <Row>
                <Col md="12">
                   
                </Col>    
                </Row>
            </CardBody>    
            </Card>    
            </Col>
            </Row>
        </Container>
        </LoadingOverlay>
      </>
    );
  }


export default Preview;

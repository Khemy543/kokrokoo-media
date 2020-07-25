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
  Nav,NavItem,NavLink,TabContent,TabPane
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";
import axios from "axios";

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


function RateCardDetails(props) {
    const [activeTab, setActiveTab] = React.useState("1");
    const [card_details, setCard_detials]= React.useState([]);
    const [isActive, setIsActive] = React.useState(false)
    
    const toggle = tab => {
        if (activeTab !== tab) {
          setActiveTab(tab);
        }
      };  


      React.useEffect(()=>{
          setIsActive(true)
          console.log(props.location.state.card_details)
          let my_card_data = props.location.state.card_details;
          var new_card_details = [];
        var i=0; let x = 1
        for(i=0; i<my_card_data.length; i++){
            
            my_card_data[i].id = x;
            new_card_details.push(my_card_data[i])
            x++;
            
        }
        console.log("my_card:",new_card_details)
        
        setCard_detials(new_card_details)
        setIsActive(false)
      },[])

    return (
      <>
      <LoadingOverlay 
      active = {isActive}
      spinner={<BounceLoader color={'#4071e1'}/>}
      >
      <Header/>
        <Container className=" mt--8" fluid>
            
          <Row>
            <Col md="10">
            <Card>
                <CardTitle className="text-uppercase" style={{padding:"0px 0px 0px 0px", margin:"20px 20px 0px 0px"}}>
                    <h2 style={{marginLeft:"40px"}}>
                    {props.location.state.title}
                    </h2>
                    </CardTitle>
                    <CardBody>
                    <Container>
                        
                        <div className="nav-tabs-navigation">
                            <div className="nav-tabs-wrapper">
                            <Nav role="tablist" tabs>
                                {console.log("card_details:",card_details)}
                                {card_details.map(value=>(
                                    <NavItem>
                                <NavLink
                                    style={{cursor:"pointer"}}
                                    className={activeTab === `${value.id}` ? "active" : ""}
                                    onClick={() => {
                                    toggle(`${value.id}`);
                                    }}
                                >
                                <h4 style={{color:"#404E67"}}>
                                    {value.day}</h4>
                                </NavLink>
                                </NavItem>
                                ))}
                                
                                
                            </Nav>
                            </div>
                        </div>
                        {/* Tabes */}
                        <TabContent className="" activeTab={activeTab}>
                            {card_details.map(value=>(
                                <TabPane tabId={`${value.id}`} id={value.day}>
                            <Container>
                                <br/>
                            <Row>
                                <Col md="6">
                                <h3>SPOT: {value.spot}</h3>
                                <h3>TIME: {value.time}</h3>
                                </Col>
                            </Row>
                            <br/>
                            <Row>
                                <Col>
                                <h3>Duration</h3>
                                <h3>Rate</h3>
                                </Col>
                                <Col>
                                <h3>:</h3>
                                <h3>:</h3>
                                </Col>
                            {value.rate_details.map(rate=>(
                                <Col>

                               
                                    <div>
                                    <h4>{rate.duration} {rate.unit}</h4>
                                    <h4>{rate.rate}</h4>
                                    </div>
                               
                               
                                </Col>
                            ))}
                            </Row>
                            <br/>
                            
                            </Container>
                            </TabPane>
                            ))}
                            
                            </TabContent>
                        </Container>
                        </CardBody>
                </Card>
            </Col>
            </Row>
        </Container>
        </LoadingOverlay>
      </>
    );
  }


export default RateCardDetails;

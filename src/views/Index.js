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
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,CardFooter
} from "reactstrap";
import axios from "axios";

import Header from "components/Headers/Header.js";

let user = localStorage.getItem("access_token");
var domain = "https://media-backend.kokrokooad.com";


function Index (props){
const [statData, setStatData] = React.useState([])
  React.useEffect(()=>{
    axios.get(`${domain}/api/dashboard/stat`,{
      headers:{ 'Authorization':`Bearer ${user}`}})
      .then(res=>{
          console.log(res.data);
          setStatData(res.data)
      })
      .catch(error=>{
          if(!error.response){
              alert("please check your internet connection")
          }
          else{
          console.log(error.response.data);
          if(error.response.status === 401){
              localStorage.clear();
              window.location.reload("/")
          }
          } 
      })
  },[])

  const {active, expired, approved, pending, rejected} = statData;
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="mb-5 mb-xl-0" lg="12">
            <Row>
              {/* <Col md="3" className="mb-4">
              <Card style={{boxShadow:"0 2px 12px rgba(0,0,0,0.1)", background:"linear-gradient(to right, #fe9365, #feb798)",cursor:"pointer"}} onClick={()=>props.history.push('/media/view-subscription')}>
                <CardBody style={{padding:"5px 15px 5px 15px"}}>
                  <Row>
                    <Col style={{color:"white"}}>
                    <h1 style={{fontSize:"24px",color:"white"}}><i className="fa fa-th-list mr-2"/>0</h1> 
                    <p style={{fontSize:"14px", fontWeight:600, textTransform:"uppercase"}}>All Campaigns</p>
                    </Col>
                  </Row>  
                </CardBody>  
                <CardFooter style={{background:"linear-gradient(to right, #fe9365, #feb798)", borderTop:"1px solid white",padding:"10px 10px 10px 10px"}}>
                </CardFooter>   
              </Card>  
              </Col> */}

              <Col md="3" className="mb-4">
              <Card style={{boxShadow:"0 2px 12px rgba(0,0,0,0.1)", background:"linear-gradient(to right, #0ac282, #0df3a3)",cursor:"pointer"}}  onClick={()=>props.history.push('/media/approved-subscription')}>
                <CardBody style={{padding:"5px 15px 5px 15px"}}>
                  <Row>
                    <Col style={{color:"white"}}>
                    <h1 style={{fontSize:"24px",color:"white"}}><i className="fa fa-thumbs-up mr-2"/>{approved}</h1>
                    <p style={{fontSize:"14px", fontWeight:600, textTransform:"uppercase"}}>Approved Campaigns</p>
                    </Col>
                  </Row>  
                </CardBody>  
                <CardFooter style={{background:"linear-gradient(to right, #0ac282, #0df3a3)", borderTop:"1px solid white",padding:"10px 10px 10px 10px"}}>
                </CardFooter>  
              </Card>  
              </Col>

              <Col md="3" className="mb-4">
              <Card style={{boxShadow:"0 2px 12px rgba(0,0,0,0.1)", background:"linear-gradient(to right, #fe5d70, #fe909d)",cursor:"pointer"}}  onClick={()=>props.history.push('/media/rejected-subscription')}>
                <CardBody style={{padding:"5px 15px 5px 15px"}}>
                  <Row>
                    <Col style={{color:"white"}}>
                    <h1 style={{fontSize:"24px",color:"white"}}><i className="fa fa-thumbs-down mr-2"/>{rejected}</h1>
                    <p style={{fontSize:"14px", fontWeight:600, textTransform:"uppercase"}}>Rejected Campaigns</p>
                    </Col>
                  </Row>  
                </CardBody>  
                <CardFooter style={{background:"linear-gradient(to right, #fe5d70, #fe909d)", borderTop:"1px solid white",padding:"10px 10px 10px 10px"}}>
                </CardFooter>  
              </Card>  
              </Col>

              <Col md="3" className="mb-4">
              <Card style={{boxShadow:"0 2px 12px rgba(0,0,0,0.1)", background:"linear-gradient(to right, #01a9ac, #01dbdf)",cursor:"pointer"}} onClick={()=>props.history.push('/media/completed-subscription')}>
                <CardBody style={{padding:"5px 10px 5px 10px"}}>
                  <Row>
                    <Col style={{color:"white"}}>
                    <h1 style={{fontSize:"24px",color:"white"}}><i className="fa fa-star mr-2"/>{expired}</h1>
                    <p style={{fontSize:"14px", fontWeight:600, textTransform:"uppercase"}}>Completed Campaigns</p>
                    </Col>
                  </Row>  
                </CardBody>  
                <CardFooter style={{background:"linear-gradient(to right, #01a9ac, #01dbdf)", borderTop:"1px solid white",padding:"10px 10px 10px 10px"}}>
                </CardFooter>  
              </Card>  
              </Col>

              <Col md="3" className="mb-4">
              <Card style={{boxShadow:"0 2px 12px rgba(0,0,0,0.1)", background:"#01a9ac",cursor:"pointer"}}  onClick={()=>props.history.push('/media/pending-subscription')}>
                <CardBody style={{padding:"5px 15px 5px 15px"}}>
                  <Row>
                    <Col style={{color:"white"}}>
                    <h1 style={{fontSize:"24px",color:"white"}}><i className="fa fa-hand-paper mr-2"/>{pending}</h1>
                    <p style={{fontSize:"14px", fontWeight:600, textTransform:"uppercase"}}>Pending Campaigns</p>
                    </Col>
                  </Row>  
                </CardBody>  
                <CardFooter style={{background:"#01a9ac", borderTop:"1px solid white",padding:"10px 10px 10px 10px"}}>
                </CardFooter>  
              </Card>  
              </Col>

              {/* <Col md="3" className="mb-4">
              <Card style={{boxShadow:"0 2px 12px rgba(0,0,0,0.1)", background:"#01a9ac",cursor:"pointer"}} >
                <CardBody style={{padding:"5px 15px 5px 15px"}}>
                  <Row>
                    <Col style={{color:"white"}}>
                    <h1 style={{fontSize:"24px",color:"white"}}><i className="fa fa-heart mr-2"/>{active}</h1>
                    <p style={{fontSize:"14px", fontWeight:600, textTransform:"uppercase"}}>Active Campaigns</p>
                    </Col>
                  </Row>  
                </CardBody>  
                <CardFooter style={{background:"#01a9ac", borderTop:"1px solid white",padding:"10px 10px 10px 10px"}}>
                </CardFooter>  
              </Card>  
              </Col> */}

              {/* <Col md="3" className="mb-4">
              <Card style={{boxShadow:"0 2px 12px rgba(0,0,0,0.1)", background:"#fe9365",cursor:"pointer"}} onClick={()=>props.history.push('/media/active-subscription')}>
                <CardBody style={{padding:"5px 15px 5px 15px"}}>
                  <Row>
                    <Col style={{color:"white"}}>
                    <h1 style={{fontSize:"24px",color:"white"}}><i className="fa fa-eye mr-2"/>5</h1>
                    <p style={{fontSize:"14px", fontWeight:600, textTransform:"uppercase"}}>Active Campaigns</p>
                    </Col>
                  </Row>  
                </CardBody>  
                <CardFooter style={{background:"#fe9365", borderTop:"1px solid white",padding:"10px 10px 10px 10px"}}>
                </CardFooter>  
              </Card>  
              </Col> */}

              <Col md="3" className="mb-4">
              {/* <Card style={{boxShadow:"0 2px 12px rgba(0,0,0,0.1)", background:"#0ac282"}}>
                <CardBody style={{padding:"5px 15px 5px 15px"}}>
                  <Row>
                    <Col style={{color:"white"}}>
                    <h1 style={{fontSize:"24px",color:"white"}}><i className="fa fa-credit-card mr-2"/>5</h1>
                    <p>Transactions</p>
                    </Col>
                  </Row>  
                </CardBody>  
                <CardFooter style={{background:"#0ac282", borderTop:"1px solid white",padding:"10px 10px 10px 10px"}}>
                </CardFooter>  
              </Card>   */}
              </Col>
            </Row>
            </Col>
          </Row>
        </Container>
      </>
    );
  }

export default Index;

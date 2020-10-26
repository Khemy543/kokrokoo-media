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
  CardFooter,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,Spinner
} from "reactstrap";


import Header from "components/Headers/Header.js";
import axios from "axios";

let user = localStorage.getItem("access_token");
var domain = "https://media.test.backend.kokrokooad.com";

function PendingSubscriptions (props){
  const [subscriptions, setSubscription] = React.useState([]);
  const [isActiveSpinner, setIsActiveSpinner] = React.useState(true)

  React.useEffect(()=>{
    setIsActiveSpinner(true)
    axios.get(`${domain}/api/pending-subscriptions`,
    { headers: { 'Authorization': `Bearer ${user}` } })
    .then(res=>{
      console.log(res.data);
      setSubscription(res.data)
      setIsActiveSpinner(false)
    })
    .catch(error=>{
      console.log(error.response.data)
    })
  },[])

  const getDetails=(id, title)=>{
    props.history.push("/media/subscription-details",{id:id, title:title})
  }

    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
        {isActiveSpinner?
          <Row>
            <Col md="12" style={{textAlign:"center"}}>
             <h4>Please Wait <Spinner size="sm" style={{marginLeft:"5px"}}/></h4> 
            </Col>
          </Row>
          :
          <>
          {!isActiveSpinner && subscriptions.length<=0?
                <Row>
                <Col md="12" style={{textAlign:"center"}}>
                <h4>No Pending Campaigns</h4> 
                </Col>
              </Row>
              :
            <>
          <Row>
            <Col className="mb-5 mb-xl-0" lg="12">
            <Card>
              <CardBody style={{overflowX:"scroll"}}>
              <Table striped bordered>
                  <thead style={{backgroundColor:"#01a9ac",color:"black",height:""}}>
                    <tr>
                      <th>#</th>
                      <th>Campaign ID</th>
                      <th>Campaign Title</th>
                      <th>Rate Card</th>
                      <th>Created Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {subscriptions.map((value,index)=>(
                    <tr>
                      <th scope="row">{index +1}</th>
                      <td>{value.id}</td>
                      <td>{value.title}</td>
                      <td>{value.rate_card_title}</td>
                      <td>{value.time}</td>
                      <td style={{textAlign:"center"}}>
                      <Button color="info" style={{borderRadius:"100%", padding:"2px 5px 2px 5px"}} onClick={()=>getDetails(value.id, value.title)}><i className="fa fa-eye"/></Button>
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
          </>
        }
        </Container>
      </>
    );
  }

export default PendingSubscriptions;

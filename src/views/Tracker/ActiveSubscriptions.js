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
  Col, Spinner
} from "reactstrap";
import Pagination from "react-js-pagination";


import Header from "components/Headers/Header.js";
import axios from "axios";

let user = localStorage.getItem("access_token");
var domain = "https://media.test.backend.kokrokooad.com";

function ActiveSubscriptions (props){
  const [subscriptions, setSubscription] = React.useState([]);
  const [isActiveSpinner, setIsActiveSpinner] = React.useState(true)
  const [data, setData]  = React.useState([]);

  React.useEffect(()=>{
    getSubscriptions()
  },[]);

  function getSubscriptions(pageNumber = 1){
    setIsActiveSpinner(true)
    axios.get(`${domain}/api/active-subscriptions?page=${pageNumber}`,
    { headers: { 'Authorization': `Bearer ${user}` } })
    .then(res=>{
      console.log(res.data);
      setSubscription(res.data);
      setData(res.data.data);
      setIsActiveSpinner(false)
    })
    .catch(error=>{
      console.log(error.response.data)
    })
  }

  const {meta} = subscriptions
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
           {!isActiveSpinner && data.length<=0?
                <Row>
                <Col md="12" style={{textAlign:"center"}}>
                <h4>No Live Campaigns</h4> 
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
                      <th>RateCard service</th>
                      <th>Production Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                  {data.map((value,index)=>(
                    <tr>
                      <th scope="row">{index +1}</th>
                      <td>{value.campaign_title_generated_id}</td>
                      <td>{value.campaign_title}</td>
                      <td>{value.rate_card_title}</td>
                      <td>{value.selected_date}</td>
                      <td>{value.status}</td>
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
                onChange={(pageNumber)=>getSubscriptions(pageNumber)}
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
      </>
    );
  }

export default ActiveSubscriptions;

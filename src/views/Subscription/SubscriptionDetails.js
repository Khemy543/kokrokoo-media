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
  Col
} from "reactstrap";


import Header from "components/Headers/Header.js";
import axios from "axios";

let user = null;
let all_data = JSON.parse(localStorage.getItem('storageData'));
console.log("all_data:", all_data)
if (all_data !== null) {
  user = all_data[0];
}

function SubscriptionDetails (props){
const [subscription, setSubscription] = React.useState([]);
  React.useEffect(()=>{
    axios.get("https://media-kokrokooad.herokuapp.com/api/"+props.location.state.id+"/subscriptions",
    { headers: { 'Authorization': `Bearer ${user}` } })
    .then(res=>{
      console.log(res.data);
      setSubscription(res.data)
    })
    .catch(error=>{
      console.log(error.response.data)
    })
  },[])

    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="mb-5 mb-xl-0" lg="12">
            <Card>
              <CardHeader>
                Show Entries
              </CardHeader>
              <CardBody style={{overflowX:"scroll"}}>
              
              </CardBody>
              <CardFooter>
                Showing 1 to 5 of Entries
              </CardFooter>   
            </Card>  
            </Col>
          </Row>
        </Container>
      </>
    );
  }

export default SubscriptionDetails;

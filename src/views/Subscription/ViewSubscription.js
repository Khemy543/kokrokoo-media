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

function ViewSubscription (props){

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
              <Table striped bordered>
                  <thead>
                    <tr>
                      <th>Subscription ID</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Spot</th>
                      <th>Subscription Title</th>
                      <th>Duration</th>
                      <th>Rate Card</th>
                      <th>Status</th>
                      <th>Created Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>20-20-20</td>
                      <td>20-20-02</td>
                      <td>5</td>
                      <td>UG</td>
                      <td>30sec</td>
                      <td>JINGLE</td>
                      <td>Live</td>
                      <td>20-20-20</td>
                      <td><Button color="info" style={{padding:"3px 6px 3px 6px"}}><i className="fa fa-eye"/></Button></td>
                    </tr>
                  </tbody>
                </Table>
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

export default ViewSubscription;

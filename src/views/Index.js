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
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
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
  Col
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "variables/charts.js";

import Header from "components/Headers/Header.js";

function Index (props){

    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="mb-5 mb-xl-0" lg="11">
            <Row>
              <Col md="4" className="mb-4">
              <Card style={{boxShadow:"0 2px 12px rgba(0,0,0,0.1)"}}>
                <CardHeader>
                  DASHBOARD
                </CardHeader>  
                <CardBody>
                  all
                </CardBody>  
              </Card>  
              </Col>

              <Col md="4">
              <Card style={{boxShadow:"0 2px 12px rgba(0,0,0,0.1)"}}>
                <CardHeader>
                  DASHBOARD
                </CardHeader>  
                <CardBody>
                  all
                </CardBody>  
              </Card>  
              </Col>

              <Col md="4">
              <Card style={{boxShadow:"0 2px 12px rgba(0,0,0,0.1)"}}>
                <CardHeader>
                  DASHBOARD
                </CardHeader>  
                <CardBody>
                  all
                </CardBody>  
              </Card>  
              </Col>

              <Col md="4">
              <Card style={{boxShadow:"0 2px 12px rgba(0,0,0,0.1)"}}>
                <CardHeader>
                  DASHBOARD
                </CardHeader>  
                <CardBody>
                  all
                </CardBody>  
              </Card>  
              </Col>
            </Row>    
            </Col>
          </Row>
        </Container>
      </>
    );
  }

export default Index;

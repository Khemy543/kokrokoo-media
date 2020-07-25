import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
    Col,
    UncontrolledTooltip,
    Input,
    Button,Form,Table
  } from "reactstrap";
  // core components
  import Header from "components/Headers/Header.js";
  import { RateConsumer } from "../../context.js";
  import axios from "axios";

  function Cart(){
      return(
        <>
        <Header />
        <RateConsumer>
        {
          value=>(
        <Container className=" mt--8" fluid>
          <Row>
           <h4 style={{marginLeft:"20px"}}>CART</h4> 
          <Card style={{overflowX:"scroll", margin:"10px",boxShadow:"0 2px 12px rgba(0,0,0,0.1)"}}>
          <Table striped >
          <thead style={{backgroundColor:"#404E67",color:"white"}}>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>segment</th>
              <th>Title</th>
              <th>media House</th>
              <th>Rate card</th>
              <th>rate</th>
              <th>spot</th>
              <th>duration</th>
              <th>amount</th>
              <th>pay later</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
          
                {value.cart.map((item, index)=>(
            <tr key={index}>
              <th scope="row">{item.id}</th>
              <td>{item.date}</td>
              <td>time</td>
              <td>{item.segment.videoTitle}</td>
              <td>media house</td>
              <td>{item.segment.rate_card_title}</td>
              <td>{item.segment.rate}</td>
              <td>{item.segment.spotNumber}</td>
              <td>{item.segment.duration} {item.segment.unit}</td>
              <td>{item.segment.total}</td>
              <td>yes</td>
              <td style={{color:"red"}}><i className="ni ni-building"/></td> 
            </tr>
                ))}
          
          </tbody>
        
        </Table>
        <br/>
        <Row>
          <Col md="6">
            <h4 style={{marginLeft:"20px"}}>TOTAL : {value.cart.length}</h4>
          </Col> 
          <Col md="6">
                <h4>TOTAL AMOUNT: GH¢ {}</h4>
          </Col>
        </Row>  
          </Card>
          </Row>
          <br/>
          <Row>
            <h4 style={{marginLeft:"20px"}}>PAY LATER</h4>
          <Card style={{overflowX:"scroll", margin:"10px",boxShadow:"0 2px 12px rgba(0,0,0,0.1)"}}>
          <Table striped >
          <thead style={{backgroundColor:"#404E67",color:"white"}}>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>segment</th>
              <th>Title</th>
              <th>media House</th>
              <th>Rate card</th>
              <th>rate</th>
              <th>spot</th>
              <th>duration</th>
              <th>amount</th>
              <th>pay later</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
          
                {value.cart.map((item, index)=>(
            <tr key={index}>
              <th scope="row">{item.id}</th>
              <td>{item.date}</td>
              <td>time</td>
              <td>{item.segment.videoTitle}</td>
              <td>media house</td>
              <td>{item.segment.rate_card_title}</td>
              <td>{item.segment.rate}</td>
              <td>{item.segment.spotNumber}</td>
              <td>{item.segment.duration} {item.segment.unit}</td>
              <td>{item.segment.total}</td>
              <td>yes</td>
              <td style={{color:"red"}}><i className="ni ni-building"/></td> 
            </tr>
                ))}
          
          </tbody>
        
        </Table>
        <br/>
        <Row>
          <Col md="6">
            <h4 style={{marginLeft:"20px"}}>TOTAL : {value.cart.length}</h4>
          </Col> 
          <Col md="6">
                <h4>TOTAL AMOUNT: GH¢ {}</h4>
          </Col>
        </Row>  
          </Card>
          </Row>
        </Container>
      )
            }
            </RateConsumer>
        </>
      )
  }

  export default Cart;
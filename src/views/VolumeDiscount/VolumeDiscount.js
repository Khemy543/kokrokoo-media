import React from "react";
import {
    Container,Row,Col, Table
} from "reactstrap";
import Header from "components/Headers/Header.js";

class VolumeDiscount extends React.Component{
    render(){
        return(
            <>
            <Header />
            <Container className="mt--7" fluid>
            <p
            style={{fontSize:"13px", fontWeight:500}}
            >See All <span style={{color:"red"}}>Discounts</span> Your Offer The Media Houses.</p>
            <Row style={{marginTop:"20px"}}>
            <Col lg="12" xs="12" md="12" sm="12" xl="12">
            <h3>THE VINE COMPANY</h3>
            <p style={{fontWeight:500,fontSize:"13px"}}>Radio Vine FM</p>
            <Table striped bordered>
            <thead>
                <tr>
                <th>#</th>
                <th style={{fontWeight:1000}}>Amount Range (Min-Max)</th>
                <th style={{fontWeight:1000}}>Discount Offer(%)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <th scope="row">1</th>
                <td>GH¢ 2000 - GH¢ 5000</td>
                <td>10%</td>
                </tr>
                <tr>
                <th scope="row">2</th>
                <td>Gh¢ 5000 - GH¢ 10000</td>
                <td>15%</td>
                </tr>
                <tr>
                <th scope="row">3</th>
                <td>GH¢ 10000 - GH¢ 15000</td>
                <td>20%</td>
                </tr>
            </tbody>
            </Table>
            </Col>
            </Row>
            </Container>
            </>
        )
    }
}
export default VolumeDiscount;
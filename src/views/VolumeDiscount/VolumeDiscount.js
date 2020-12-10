import React from "react";
import {
    Container,Row,Col, Table,Spinner
} from "reactstrap";
import Header from "components/Headers/Header.js";
import axios from "axios";

let user = localStorage.getItem("access_token");
var domain = "https://media.test.backend.kokrokooad.com";
class VolumeDiscount extends React.Component{

    state={
        volume:[],
        company_name:"",
        media_house:"",
        isActive:true
    }

    componentDidMount(){
        axios.get(`${domain}/api/company/volume-discount`,
        {headers:{ 'Authorization':`Bearer ${user}`}})
        .then(res=>{
            console.log(res.data);
            this.setState({volume:res.data, isActive:false})
        })
        .catch(error=>{
            console.log(error)
            
        })

        axios.get(`${domain}/api/company-profile`,{
            headers:{ 'Authorization':`Bearer ${user}`}
                })
            .then(res=>{
                console.log(res.data);
                this.setState({
                    company_name:res.data.company_name,
                    media_house:res.data.media_house
                })
            })
    }

    render(){
        return(
            <>
            <Header />
            <Container className="mt--7" fluid>
        {this.state.isActive?
          <Row>
            <Col md="12" style={{textAlign:"center"}}>
             <h4>Please Wait <Spinner size="sm" style={{marginLeft:"5px"}}/></h4> 
            </Col>
          </Row>
          :
          <>
          {this.state.volume.length<=0?
          <Row>
              <Col md="12" style={{textAlign:"center"}}>
              <h4>No Volume Discount Offered To Clients</h4>
              </Col>
          </Row>
          :
            <Row style={{marginTop:"20px"}}>
            <Col lg="12" xs="12" md="12" sm="12" xl="12">
            <p
            style={{fontSize:"13px", fontWeight:500}}
            >See All <span style={{color:"red"}}>Discounts</span> You Offer The Clients.</p>
            <h3>{this.state.company_name}</h3>
            <p style={{fontWeight:500,fontSize:"13px"}}>{this.state.media_house}</p>
            <Table striped bordered>
            <thead>
                <tr>
                <th>#</th>
                <th style={{fontWeight:1000}}>Amount Range (Min-Max)</th>
                <th style={{fontWeight:1000}}>Discount Offer(%)</th>
                </tr>
            </thead>
            <tbody>
            {this.state.volume.map((value,key)=>(
                <tr>
                <th scope="row">{key+1}</th>
                <td>GH¢ {value.amount_range}</td>
                <td>{value.percentile}%</td>
                </tr>
                ))}
            </tbody>
            </Table>
            </Col>
            </Row>
            }
            </>
            }
            </Container>
            </>
        )
    }
}
export default VolumeDiscount;
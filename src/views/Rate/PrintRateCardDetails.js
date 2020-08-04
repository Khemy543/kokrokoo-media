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
  Nav,NavItem,NavLink,TabContent,TabPane,Form,FormGroup,Label
} from "reactstrap";
import classnames from 'classnames';
// core components
import Header from "components/Headers/Header.js";
import LoadingOverlay from "react-loading-overlay";
import FadeLoader from "react-spinners/FadeLoader";
import axios from "axios";/* 
import history from "../../history.js"; */

let user =null;
let all_data = JSON.parse(localStorage.getItem('storageData'));
console.log("all_data:", all_data)
if(all_data !== null){
  user = all_data[0];
}

class PrintRateDetails extends React.Component {
    
    state = {
        isActive:false,
        days:[]
    }

    componentDidMount(){
        this.setState({isActive:true});
        console.log(this.props.location)
        if(this.props.location.state !== undefined){
            this.setState({title:this.props.location.state.rate_title});
        }
        else{
            this.props.history.push("/media/create-ratecards")
        }
        

        axios.get("https://media-kokrokooad.herokuapp.com/api/fetch-days-and-units")
        .then(res=>{
            console.log(res.data)
            this.setState({days:res.data.days, units:res.data.units,isActive:false})
        })
    }

    toggle = tab => {
        if(this.state.activeTab !== tab) this.setState({activeTab:tab});
      }

    render(){
    return (
      <>
      <LoadingOverlay 
      active = {this.state.isActive}
      spinner={<FadeLoader color={'#4071e1'}/>}
      >
      <Header/>
        <Container className=" mt--8" fluid>
            
          <Row>
            <Col md="10">
            <Card style={{boxShadow:"0 2px 12px rgba(0,0,0,0.1)"}}>
            <CardHeader className=" bg-transparent">
                  <h3 className=" mb-0">RATE CARD DETAILS</h3>
            </CardHeader>

            <CardBody>
                <Row>
                <Col md="12" lg="12" sm="12" xs="12">
                <Col sm="12" md="12" xs="12" style={{marginBottom:"30px"}}>
                <Input type="text" placeholder="Enter Rate Card Title" value={this.state.title} onChange={e=>this.setState({title:e.target.value})}/>
                </Col>
                <div className="nav-tabs-navigation">
                <div className="nav-tabs-wrapper">
                <Nav role="tablist" tabs>
                    {this.state.days.map(value=>(
                    <NavItem key={value.id}>
                    <NavLink
                    style={{cursor:"pointer",textTransform:"uppercase"}}
                        className={classnames({ active: this.state.activeTab === `${value.id}` })}
                        onClick={() => { this.toggle(`${value.id}`); }}
                    >
                        {value.day}
                    </NavLink>
                    </NavItem>
            ))}
            </Nav>
            </div>
            </div>
             {/* Tab Details */}
             <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                 <Container>   
                    <Row>
                    <Col sm="6" md="6" xs="6" lg="6" style={{marginTop:"20px"}}>
                    
                    </Col>
                    </Row>
                </Container>
                </TabPane>
                <TabPane tabId="2">
                 <Container>   
                    <Row>
                    <Col sm="6" md="6" xs="6" lg="6" style={{marginTop:"20px"}}>
                    </Col>
                    </Row>
                </Container>
                </TabPane>

                <TabPane tabId="3">
                 <Container>   
                    <Row>
                    <Col sm="6" md="6" xs="6" lg="6" style={{marginTop:"20px"}}>
                    </Col>
                    </Row>
                </Container>
                </TabPane>

                <TabPane tabId="4">
                 <Container>   
                    <Row>
                    <Col sm="6" md="6" xs="6" lg="6" style={{marginTop:"20px"}}>
                    </Col>
                    </Row>
                </Container>
                </TabPane>

                <TabPane tabId="5">
                 <Container>   
                    <Row>
                    <Col sm="6" md="6" xs="6" lg="6" style={{marginTop:"20px"}}>
                    </Col>
                    </Row>
                </Container>
                </TabPane>

                <TabPane tabId="6">
                 <Container>   
                    <Row>
                    <Col sm="6" md="6" xs="6" lg="6" style={{marginTop:"20px"}}>
                    </Col>
                    </Row>
                </Container>
                </TabPane>

                <TabPane tabId="7">
                 <Container>   
                    <Row>
                    <Col sm="6" md="6" xs="6" lg="6" style={{marginTop:"20px"}}>
                    </Col>
                    </Row>
                </Container>
                </TabPane>
            </TabContent>
            </Col>
            </Row>
            </CardBody>    
            </Card>    
            </Col>
            </Row>
        </Container>
        </LoadingOverlay>
      </>
    );
  }
}


export default PrintRateDetails;

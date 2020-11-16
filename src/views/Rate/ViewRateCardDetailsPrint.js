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
import {Link} from "react-router-dom";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Button,
  Nav,NavItem,NavLink,TabContent,TabPane,Table,Spinner
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import LoadingOverlay from "react-loading-overlay";
import FadeLoader from "react-spinners/FadeLoader";
import axios from "axios";

let user = localStorage.getItem("access_token");
var domain = "https://media-backend.kokrokooad.com";

class ViewRateCardDetailsPrint extends React.Component{

    state={
        isActive:false,
        isActiveSpinner:true,
        activeTab:"1",
        days:[],
        data:[],
        allData:[],
        title:""
    }
     


      componentDidMount(){
        axios.get(`${domain}/api/fetch-days-and-units`)
        .then(res=>{
            this.setState({days:res.data.days, units:res.data.units})
        });

        axios.get(`${domain}/api/ratecard/${this.props.location.state.title_id}/preview`,
      { headers: { 'Authorization': `Bearer ${user}` } })
      .then(res => {
        console.log("fitsdy",res.data.details);
        if(res.data !== []){
            this.setState({allData:res.data.details, title:res.data.rate_card_title});
              let tempData = res.data.details;
              let selectedDetaisl = tempData.find(item=> item.day.id === 1);
              if(selectedDetaisl !== undefined){
              this.setState({data:selectedDetaisl[0], isActiveSpinner:false})
              }
              else{
                this.setState({data:[], isActiveSpinner:false})
              }
            }
      })
      .catch(error => {
        console.log(error)
      });
    

      }


      toggle = tab => {
        if(this.state.activeTab !== tab) this.setState({activeTab:tab});
      }
    
      getDetails=(id)=>{
        let tempData = this.state.allData;
        const newId = Number(id)
        let selectedDetaisl = tempData.filter(item=> item.day.id === newId);
        console.log("selected",selectedDetaisl)
        if(selectedDetaisl[0] !== undefined){
          this.setState({data:selectedDetaisl[0][0]})
        }
        else{
          this.setState({data:[]})
        }
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
        {this.state.isActiveSpinner?
          <Row>
            <Col md="12" style={{textAlign:"center"}}>
             <h4>Please Wait <Spinner size="sm" style={{marginLeft:"5px"}}/></h4> 
            </Col>
          </Row>
          :
          <>
          <Row>
            <Col md="10">
            <Card className=" shadow"> 
                <CardHeader className="text-uppercase" style={{padding:"0px 0px 0px 0px", margin:"20px 20px 0px 0px"}}>
                    <h2 style={{marginLeft:"40px"}}>
                   {this.state.title}
                    </h2>
                    </CardHeader>
                    <CardBody>
                    <Container>
                        
                        <div className="nav-tabs-navigation">
                            <div className="nav-tabs-wrapper">
                            <Nav role="tablist" tabs>
                                {this.state.days.map((value,index)=>(
                                <NavItem key={index}>
                                <NavLink
                                   style={{cursor:"pointer",textTransform:"uppercase",fontSize:"14px", fontWeight:"bold"}}
                                    className={this.state.activeTab === `${value.id}` ? "active" : ""}
                                    onClick={() => { this.toggle(`${value.id}`); this.getDetails(value.id)}}
                                >
                                    {value.day}
                                </NavLink>
                                </NavItem>
                            ))}
                            </Nav>
                            </div>
                        </div>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId={this.state.activeTab}>
                            <Container style={{borderBottom:"1px solid rgb(64 78 103 / 30%)"}}>
                                <br/>
                                {this.state.data.length<=0?
                                <Row>
                                  <Col md="6" className="mr-auto ml-auto" style={{textAlign:"center"}}>
                                    <h3>No Data Saved For This Day</h3>
                                  </Col>
                                </Row>
                                :
                                <>
                            <Row>
                            <Col>
                                <Table bordered>
                                    <tbody>
                                        <tr>
                                            <th style={{fontWeight:1000}}>SIZE</th>
                                            {this.state.data.map((item, index)=>(
                                            <td>{item.duration} {item.size}</td>
                                            ))}

                                        </tr>
                                        <tr>
                                            <th style={{fontWeight:1000}}>RATE</th>
                                            {this.state.data.map((item, index)=>(
                                            <td>{item.cost}</td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <th style={{fontWeight:1000}}>PAGE SECTION</th>
                                            {this.state.data.map((item, index)=>(
                                            <td>{item.page_section}</td>
                                            ))}
                                        </tr>
                                    </tbody>
                                </Table>
                                </Col>
                            </Row>
                        
                            <br/>
                            </>
                                }
                            </Container>
                            </TabPane>
                            </TabContent>
                        </Container>
                        </CardBody>
                </Card>
            </Col>
            </Row>
            <br/>
            <Row>
            <Col>
            <Button
            color="danger"
            
            >
            Back
            </Button>
            </Col>
            
            </Row>
            </>
        }
        </Container>
        </LoadingOverlay>
      </>
    );
  }
}


export default ViewRateCardDetailsPrint;

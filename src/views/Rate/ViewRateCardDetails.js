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
  Nav,NavItem,NavLink,TabContent,TabPane,Table
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import LoadingOverlay from "react-loading-overlay";
import FadeLoader from "react-spinners/FadeLoader";
import axios from "axios";

let user =null;
let all_data = JSON.parse(localStorage.getItem('storageData'));
if(all_data !== null){
  user = all_data[0];
}

class ViewRateCardDetails extends React.Component{

    state={
        isActive:false,
        activeTab:"1",
        days:[],
        data:[],
        allData:[],
        title:""
    }
     


      componentDidMount(){
        this.setState({isActive:true})
        axios.get("https://media-kokrokooad.herokuapp.com/api/fetch-days-and-units")
        .then(res=>{
            console.log(res.data)
            this.setState({days:res.data.days, units:res.data.units})
        });

        axios.get("https://media-kokrokooad.herokuapp.com/api/ratecard/" +this.props.location.state.title_id + "/preview",
      { headers: { 'Authorization': `Bearer ${user}` } })
      .then(res => {
        console.log(res.data);
        let newArray = []
        for(var i=0; i<res.data.details.length; i++){
            newArray.push(...res.data.details[i]);
        }
        console.log("new:",newArray)
        this.setState({allData:newArray,title:res.data.rate_card_title});
          let tempData = newArray;
          let selectedDetaisl = tempData.filter(item=> item.day.id === 1);
          console.log("selected:",selectedDetaisl);
          if(selectedDetaisl !== undefined){
          this.setState({data:selectedDetaisl,isActive:false})
          }
          else{
            this.setState({data:[],isActive:false})
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
        console.log("alldata:",tempData)
        const newId = Number(id)
        let selectedDetaisl = tempData.filter(item=> item.day.id === newId);
        console.log(selectedDetaisl)
        if(selectedDetaisl !== undefined){
          this.setState({data:selectedDetaisl})
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
                                    style={{cursor:"pointer",textTransform: "uppercase" }}
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
                            {this.state.data.map((value,index)=>(
                            <Container style={{borderBottom:"1px solid rgb(64 78 103 / 30%)"}} key={index}>
                                <br/>
                            <Row>
                                <Col md="6">
                                <h3>SPOT: {value.no_of_spots}</h3>
                                <h3>TIME: {value.start_time} - {value.end_time}</h3>
                                </Col>
                            </Row>
                            <br/>
                            
                            <Row>
                            <Col>
                                <Table bordered>
                                    <tbody>
                                        <tr>
                                            <th style={{fontWeight:1000}}>DURATION</th>
                                            {value.duration.map((item, index)=>(
                                            <td>{item.duration} {item.unit_id}</td>
                                            ))}

                                        </tr>
                                        <tr>
                                            <th style={{fontWeight:1000}}>RATE</th>
                                            {value.duration.map((item, index)=>(
                                            <td>{item.rate}</td>
                                            ))}
                                        </tr>
                                    </tbody>
                                </Table>
                                </Col>
                            </Row>
                        
                            <br/>
                            
                            </Container>
                        ))}
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
        </Container>
        </LoadingOverlay>
      </>
    );
  }
}


export default ViewRateCardDetails;

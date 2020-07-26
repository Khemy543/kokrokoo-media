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
  Nav,NavItem,NavLink,TabContent,TabPane,FormGroup,Label
} from "reactstrap";
import classnames from 'classnames';
// core components
import Header from "components/Headers/Header.js";
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";
import axios from "axios";

let user =1;
let loggedin_data = false;
let all_data = JSON.parse(localStorage.getItem('storageData'));
console.log("all_data:", all_data)
if(all_data !== null){
  user = all_data[0];
  loggedin_data = all_data[1];
  //get user
  console.log("user:",user);
}

class RateCardDetails extends React.Component{
    state={
        isActive:false,
        newSlot:[],
        activeTab:"1",
        slotValue:1,
        startTime:"",
        days:[],
        units:[],
        title:this.props.location.state.rate_title
    }

    componentDidMount(){
        axios.get("https://media-kokrokooad.herokuapp.com/api/fetch-days-and-units")
        .then(res=>{
            console.log(res.data)
            this.setState({days:res.data.days, units:res.data.units})
        })
    }
    
    toggle = tab => {
        if(this.state.activeTab !== tab) this.setState({activeTab:tab});
      }

    AddSlot=()=>{
          var tempSlot = [...this.state.newSlot];
          tempSlot.push({id:this.state.slotValue});
          console.log(tempSlot)
          return(this.setState({newSlot:tempSlot, slotValue:this.state.slotValue+1}));
      }

    handleDelete=(id)=>{
        
        console.log("id:",id)
        var tempSlot = [...this.state.newSlot];
        let newArray = tempSlot.filter(item=>item.id !== id);
        return(this.setState({newSlot:newArray}))
        console.log("temp",newArray)
    }

    handleSubmit=()=>{
        axios.post("https://media-kokrokooad.herokuapp.com/api/ratecard/"+this.props.location.state.rate_id+"/add-details")
    }

    
    render(){
    return (
      <>
      <LoadingOverlay 
      active = {this.state.isActive}
      spinner={<BounceLoader color={'#4071e1'}/>}
      >
      <Header/>
        <Container className=" mt--8" fluid>
            
          <Row>
            <Col md="10">
            <Card className="shadow">
            <CardHeader className=" bg-transparent">
                  <h3 className=" mb-0">ENTER RATE CARD DETAILS</h3>
            </CardHeader>

            <CardBody>
            <Row>
            <Col md="12" lg="12" sm="12" xs="12">
            <Col sm="12" md="12" xs="12" style={{marginBottom:"30px"}}>
                        <Input type="text" placeholder="Enter Rate Card Title" value={this.state.title} onChange={e=>this.setState({title:e.target.value})}/>
            </Col>
            <Nav tabs>
                {this.state.days.map(value=>(
                <NavItem key={value.id}>
                <NavLink
                    className={classnames({ active: this.state.activeTab === `${value.id}` })}
                    onClick={() => { this.toggle(`${value.id}`); }}
                >
                    {value.day}
                </NavLink>
                </NavItem>
            ))}
            </Nav>
            {/* Tab Details */}
            <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                 <Container>   
                    <Row>
                    
                    <Col sm="6" md="6" xs="6" lg="6" style={{marginTop:"20px"}}>
                    <FormGroup>
                        <Label for="exampleTime">Start Time</Label>
                        <Input
                        type="time"
                        name="time"
                        id="exampleTime"
                        placeholder="time placeholder"
                        value={this.state.startTime}
                        onChange={e=>console.log(e.target.value)}
                        />
                    </FormGroup>
                    </Col>
                    <Col sm="6" md="6" xs="6" lg="6" style={{marginTop:"20px"}}>
                    <FormGroup>
                        <Label for="exampleTime">End Time</Label>
                        <Input
                        type="time"
                        name="time"
                        id="exampleTime"
                        placeholder="time placeholder"
                        />
                    </FormGroup>
                    </Col> 
                    </Row>
                    <Row>
                        <Col md="3" sm="3" xs="3" lg="3">
                        <Label>Duration</Label>
                        <Input type="number" min="0"/>
                        </Col>
                        <Col md="3" sm="3" xs="3" lg="3">
                        <Label>Unit</Label>
                        <Input type="select">
                            {this.state.units.map(value=>(<option key={value.id} value={value.unit}>{value.unit}</option>))}
                        </Input>
                        </Col>
                        <Col md="4" sm="4" xs="4" lg="4">
                        <Label>Rate</Label>
                        <Input type="number" min="0"/>
                        </Col>
                        <Col md="2" sm="2" xs="2" lg="2" className="text-center">
                        <Button
                        onClick={()=>this.AddSlot()}
                        style={{marginTop:"30px",backgroundColor:"#404E67",color:"white"}}
                        >
                        <i className="fa fa-plus"/>
                        </Button>
                        </Col>
                    </Row>
                    {this.state.newSlot.map((value,index)=>(
                        <Row key={index} style={{marginTop:"10px"}}>
                            <Col md="3" sm="3" xs="3" lg="3">
                            <Input type="number"/>
                            </Col>
                            <Col md="3" sm="3" xs="3" lg="3">
                            <Input type="select">
                            <option>Secs</option>
                            <option>Mins</option>
                            <option>Hr</option>
                            </Input>
                            </Col>
                            <Col md="4" sm="4" xs="4" lg="4">
                            <Input type="number"/>
                            </Col>
                            <Col md="2" sm="2" xs="2" lg="2" className="text-center">

                            <i className="fa fa-trash" style={{color:"red",fontSize:"20px",marginTop:"15px",cursor:"pointer"}} onClick={()=>this.handleDelete(value.id)}/>
                            </Col>
                        </Row>
                    ))}

                    <Row style={{marginTop:"20px"}}>
                        <Col md="6"sm="6"lg="6"xs="6">
                            <Button
                            color="danger"
                            >
                                Submit
                            </Button>    
                        </Col>
                        <Col md="6"sm="6"lg="6"xs="6">
                            <Button
                            color="info"
                            >
                                Review
                            </Button>    
                        </Col>
                    </Row>    
                </Container>
                </TabPane>
                <TabPane tabId="2">
                <Container>   
                   <Row>
                   <Col sm="6" md="6" xs="6" lg="6" style={{marginTop:"20px"}}>
                   <FormGroup>
                       <Label for="exampleTime">Start Time</Label>
                       <Input
                       type="time"
                       name="time"
                       id="exampleTime"
                       placeholder="time placeholder"
                       value={this.state.startTime}
                       onChange={e=>console.log(e.target.value)}
                       />
                   </FormGroup>
                   </Col>
                   <Col sm="6" md="6" xs="6" lg="6" style={{marginTop:"20px"}}>
                   <FormGroup>
                       <Label for="exampleTime">End Time</Label>
                       <Input
                       type="time"
                       name="time"
                       id="exampleTime"
                       placeholder="time placeholder"
                       />
                   </FormGroup>
                   </Col> 
                   </Row>
                   <Row>
                       <Col md="3" sm="3" xs="3" lg="3">
                       <Label>Duration</Label>
                       <Input type="number" min="0"/>
                       </Col>
                       <Col md="3" sm="3" xs="3" lg="3">
                       <Label>Unit</Label>
                       <Input type="select">
                           {this.state.units.map(value=>(<option key={value.id} value={value.unit}>{value.unit}</option>))}
                       </Input>
                       </Col>
                       <Col md="4" sm="4" xs="4" lg="4">
                       <Label>Rate</Label>
                       <Input type="number" min="0"/>
                       </Col>
                       <Col md="2" sm="2" xs="2" lg="2" className="text-center">
                       <Button
                       onClick={()=>this.AddSlot()}
                       style={{marginTop:"30px",backgroundColor:"#404E67",color:"white"}}
                       >
                       <i className="fa fa-plus"/>
                       </Button>
                       </Col>
                   </Row>
                   {this.state.newSlot.map((value,index)=>(
                       <Row key={index} style={{marginTop:"10px"}}>
                           <Col md="3" sm="3" xs="3" lg="3">
                           <Input type="number"/>
                           </Col>
                           <Col md="3" sm="3" xs="3" lg="3">
                           <Input type="select">
                           <option>Secs</option>
                           <option>Mins</option>
                           <option>Hr</option>
                           </Input>
                           </Col>
                           <Col md="4" sm="4" xs="4" lg="4">
                           <Input type="number"/>
                           </Col>
                           <Col md="2" sm="2" xs="2" lg="2" className="text-center">

                           <i className="fa fa-trash" style={{color:"red",fontSize:"20px",marginTop:"15px",cursor:"pointer"}} onClick={()=>this.handleDelete(value.id)}/>
                           </Col>
                       </Row>
                   ))}

                   <Row style={{marginTop:"20px"}}>
                       <Col md="6"sm="6"lg="6"xs="6">
                           <Button
                           color="danger"
                           >
                               Submit
                           </Button>    
                       </Col>
                       <Col md="6"sm="6"lg="6"xs="6">
                           <Button
                           color="info"
                           >
                               Review
                           </Button>    
                       </Col>
                   </Row>    
               </Container>
               </TabPane>
               <TabPane tabId="3">
                 <Container>   
                    <Row>
                    <Col sm="6" md="6" xs="6" lg="6" style={{marginTop:"20px"}}>
                    <FormGroup>
                        <Label for="exampleTime">Start Time</Label>
                        <Input
                        type="time"
                        name="time"
                        id="exampleTime"
                        placeholder="time placeholder"
                        value={this.state.startTime}
                        onChange={e=>console.log(e.target.value)}
                        />
                    </FormGroup>
                    </Col>
                    <Col sm="6" md="6" xs="6" lg="6" style={{marginTop:"20px"}}>
                    <FormGroup>
                        <Label for="exampleTime">End Time</Label>
                        <Input
                        type="time"
                        name="time"
                        id="exampleTime"
                        placeholder="time placeholder"
                        />
                    </FormGroup>
                    </Col> 
                    </Row>
                    <Row>
                        <Col md="3" sm="3" xs="3" lg="3">
                        <Label>Duration</Label>
                        <Input type="number" min="0"/>
                        </Col>
                        <Col md="3" sm="3" xs="3" lg="3">
                        <Label>Unit</Label>
                        <Input type="select">
                            {this.state.units.map(value=>(<option key={value.id} value={value.unit}>{value.unit}</option>))}
                        </Input>
                        </Col>
                        <Col md="4" sm="4" xs="4" lg="4">
                        <Label>Rate</Label>
                        <Input type="number" min="0"/>
                        </Col>
                        <Col md="2" sm="2" xs="2" lg="2" className="text-center">
                        <Button
                        onClick={()=>this.AddSlot()}
                        style={{marginTop:"30px",backgroundColor:"#404E67",color:"white"}}
                        >
                        <i className="fa fa-plus"/>
                        </Button>
                        </Col>
                    </Row>
                    {this.state.newSlot.map((value,index)=>(
                        <Row key={index} style={{marginTop:"10px"}}>
                            <Col md="3" sm="3" xs="3" lg="3">
                            <Input type="number"/>
                            </Col>
                            <Col md="3" sm="3" xs="3" lg="3">
                            <Input type="select">
                            <option>Secs</option>
                            <option>Mins</option>
                            <option>Hr</option>
                            </Input>
                            </Col>
                            <Col md="4" sm="4" xs="4" lg="4">
                            <Input type="number"/>
                            </Col>
                            <Col md="2" sm="2" xs="2" lg="2" className="text-center">

                            <i className="fa fa-trash" style={{color:"red",fontSize:"20px",marginTop:"15px",cursor:"pointer"}} onClick={()=>this.handleDelete(value.id)}/>
                            </Col>
                        </Row>
                    ))}

                    <Row style={{marginTop:"20px"}}>
                        <Col md="6"sm="6"lg="6"xs="6">
                            <Button
                            color="danger"
                            >
                                Submit
                            </Button>    
                        </Col>
                        <Col md="6"sm="6"lg="6"xs="6">
                            <Button
                            color="info"
                            >
                                Review
                            </Button>    
                        </Col>
                    </Row>    
                </Container>
                </TabPane>
                <TabPane tabId="4">
                 <Container>   
                    <Row>
                    <Col sm="6" md="6" xs="6" lg="6" style={{marginTop:"20px"}}>
                    <FormGroup>
                        <Label for="exampleTime">Start Time</Label>
                        <Input
                        type="time"
                        name="time"
                        id="exampleTime"
                        placeholder="time placeholder"
                        value={this.state.startTime}
                        onChange={e=>console.log(e.target.value)}
                        />
                    </FormGroup>
                    </Col>
                    <Col sm="6" md="6" xs="6" lg="6" style={{marginTop:"20px"}}>
                    <FormGroup>
                        <Label for="exampleTime">End Time</Label>
                        <Input
                        type="time"
                        name="time"
                        id="exampleTime"
                        placeholder="time placeholder"
                        />
                    </FormGroup>
                    </Col> 
                    </Row>
                    <Row>
                        <Col md="3" sm="3" xs="3" lg="3">
                        <Label>Duration</Label>
                        <Input type="number" min="0"/>
                        </Col>
                        <Col md="3" sm="3" xs="3" lg="3">
                        <Label>Unit</Label>
                        <Input type="select">
                            {this.state.units.map(value=>(<option key={value.id} value={value.unit}>{value.unit}</option>))}
                        </Input>
                        </Col>
                        <Col md="4" sm="4" xs="4" lg="4">
                        <Label>Rate</Label>
                        <Input type="number" min="0"/>
                        </Col>
                        <Col md="2" sm="2" xs="2" lg="2" className="text-center">
                        <Button
                        onClick={()=>this.AddSlot()}
                        style={{marginTop:"30px",backgroundColor:"#404E67",color:"white"}}
                        >
                        <i className="fa fa-plus"/>
                        </Button>
                        </Col>
                    </Row>
                    {this.state.newSlot.map((value,index)=>(
                        <Row key={index} style={{marginTop:"10px"}}>
                            <Col md="3" sm="3" xs="3" lg="3">
                            <Input type="number"/>
                            </Col>
                            <Col md="3" sm="3" xs="3" lg="3">
                            <Input type="select">
                            <option>Secs</option>
                            <option>Mins</option>
                            <option>Hr</option>
                            </Input>
                            </Col>
                            <Col md="4" sm="4" xs="4" lg="4">
                            <Input type="number"/>
                            </Col>
                            <Col md="2" sm="2" xs="2" lg="2" className="text-center">

                            <i className="fa fa-trash" style={{color:"red",fontSize:"20px",marginTop:"15px",cursor:"pointer"}} onClick={()=>this.handleDelete(value.id)}/>
                            </Col>
                        </Row>
                    ))}

                    <Row style={{marginTop:"20px"}}>
                        <Col md="6"sm="6"lg="6"xs="6">
                            <Button
                            color="danger"
                            >
                                Submit
                            </Button>    
                        </Col>
                        <Col md="6"sm="6"lg="6"xs="6">
                            <Button
                            color="info"
                            >
                                Review
                            </Button>    
                        </Col>
                    </Row>    
                </Container>
                </TabPane>
                <TabPane tabId="5">
                 <Container>   
                    <Row>
                    <Col sm="6" md="6" xs="6" lg="6" style={{marginTop:"20px"}}>
                    <FormGroup>
                        <Label for="exampleTime">Start Time</Label>
                        <Input
                        type="time"
                        name="time"
                        id="exampleTime"
                        placeholder="time placeholder"
                        value={this.state.startTime}
                        onChange={e=>console.log(e.target.value)}
                        />
                    </FormGroup>
                    </Col>
                    <Col sm="6" md="6" xs="6" lg="6" style={{marginTop:"20px"}}>
                    <FormGroup>
                        <Label for="exampleTime">End Time</Label>
                        <Input
                        type="time"
                        name="time"
                        id="exampleTime"
                        placeholder="time placeholder"
                        />
                    </FormGroup>
                    </Col> 
                    </Row>
                    <Row>
                        <Col md="3" sm="3" xs="3" lg="3">
                        <Label>Duration</Label>
                        <Input type="number" min="0"/>
                        </Col>
                        <Col md="3" sm="3" xs="3" lg="3">
                        <Label>Unit</Label>
                        <Input type="select">
                            {this.state.units.map(value=>(<option key={value.id} value={value.unit}>{value.unit}</option>))}
                        </Input>
                        </Col>
                        <Col md="4" sm="4" xs="4" lg="4">
                        <Label>Rate</Label>
                        <Input type="number" min="0"/>
                        </Col>
                        <Col md="2" sm="2" xs="2" lg="2" className="text-center">
                        <Button
                        onClick={()=>this.AddSlot()}
                        style={{marginTop:"30px",backgroundColor:"#404E67",color:"white"}}
                        >
                        <i className="fa fa-plus"/>
                        </Button>
                        </Col>
                    </Row>
                    {this.state.newSlot.map((value,index)=>(
                        <Row key={index} style={{marginTop:"10px"}}>
                            <Col md="3" sm="3" xs="3" lg="3">
                            <Input type="number"/>
                            </Col>
                            <Col md="3" sm="3" xs="3" lg="3">
                            <Input type="select">
                            <option>Secs</option>
                            <option>Mins</option>
                            <option>Hr</option>
                            </Input>
                            </Col>
                            <Col md="4" sm="4" xs="4" lg="4">
                            <Input type="number"/>
                            </Col>
                            <Col md="2" sm="2" xs="2" lg="2" className="text-center">

                            <i className="fa fa-trash" style={{color:"red",fontSize:"20px",marginTop:"15px",cursor:"pointer"}} onClick={()=>this.handleDelete(value.id)}/>
                            </Col>
                        </Row>
                    ))}

                    <Row style={{marginTop:"20px"}}>
                        <Col md="6"sm="6"lg="6"xs="6">
                            <Button
                            color="danger"
                            >
                                Submit
                            </Button>    
                        </Col>
                        <Col md="6"sm="6"lg="6"xs="6">
                            <Button
                            color="info"
                            >
                                Review
                            </Button>    
                        </Col>
                    </Row>    
                </Container>
                </TabPane>
                <TabPane tabId="6">
                 <Container>   
                    <Row>
                    <Col sm="6" md="6" xs="6" lg="6" style={{marginTop:"20px"}}>
                    <FormGroup>
                        <Label for="exampleTime">Start Time</Label>
                        <Input
                        type="time"
                        name="time"
                        id="exampleTime"
                        placeholder="time placeholder"
                        value={this.state.startTime}
                        onChange={e=>console.log(e.target.value)}
                        />
                    </FormGroup>
                    </Col>
                    <Col sm="6" md="6" xs="6" lg="6" style={{marginTop:"20px"}}>
                    <FormGroup>
                        <Label for="exampleTime">End Time</Label>
                        <Input
                        type="time"
                        name="time"
                        id="exampleTime"
                        placeholder="time placeholder"
                        />
                    </FormGroup>
                    </Col> 
                    </Row>
                    <Row>
                        <Col md="3" sm="3" xs="3" lg="3">
                        <Label>Duration</Label>
                        <Input type="number" min="0"/>
                        </Col>
                        <Col md="3" sm="3" xs="3" lg="3">
                        <Label>Unit</Label>
                        <Input type="select">
                            {this.state.units.map(value=>(<option key={value.id} value={value.unit}>{value.unit}</option>))}
                        </Input>
                        </Col>
                        <Col md="4" sm="4" xs="4" lg="4">
                        <Label>Rate</Label>
                        <Input type="number" min="0"/>
                        </Col>
                        <Col md="2" sm="2" xs="2" lg="2" className="text-center">
                        <Button
                        onClick={()=>this.AddSlot()}
                        style={{marginTop:"30px",backgroundColor:"#404E67",color:"white"}}
                        >
                        <i className="fa fa-plus"/>
                        </Button>
                        </Col>
                    </Row>
                    {this.state.newSlot.map((value,index)=>(
                        <Row key={index} style={{marginTop:"10px"}}>
                            <Col md="3" sm="3" xs="3" lg="3">
                            <Input type="number"/>
                            </Col>
                            <Col md="3" sm="3" xs="3" lg="3">
                            <Input type="select">
                            <option>Secs</option>
                            <option>Mins</option>
                            <option>Hr</option>
                            </Input>
                            </Col>
                            <Col md="4" sm="4" xs="4" lg="4">
                            <Input type="number"/>
                            </Col>
                            <Col md="2" sm="2" xs="2" lg="2" className="text-center">

                            <i className="fa fa-trash" style={{color:"red",fontSize:"20px",marginTop:"15px",cursor:"pointer"}} onClick={()=>this.handleDelete(value.id)}/>
                            </Col>
                        </Row>
                    ))}

                    <Row style={{marginTop:"20px"}}>
                        <Col md="6"sm="6"lg="6"xs="6">
                            <Button
                            color="danger"
                            >
                                Submit
                            </Button>    
                        </Col>
                        <Col md="6"sm="6"lg="6"xs="6">
                            <Button
                            color="info"
                            >
                                Review
                            </Button>    
                        </Col>
                    </Row>    
                </Container>
                </TabPane>
                <TabPane tabId="7">
                 <Container>   
                    <Row>
                    <Col sm="6" md="6" xs="6" lg="6" style={{marginTop:"20px"}}>
                    <FormGroup>
                        <Label for="exampleTime">Start Time</Label>
                        <Input
                        type="time"
                        name="time"
                        id="exampleTime"
                        placeholder="time placeholder"
                        value={this.state.startTime}
                        onChange={e=>console.log(e.target.value)}
                        />
                    </FormGroup>
                    </Col>
                    <Col sm="6" md="6" xs="6" lg="6" style={{marginTop:"20px"}}>
                    <FormGroup>
                        <Label for="exampleTime">End Time</Label>
                        <Input
                        type="time"
                        name="time"
                        id="exampleTime"
                        placeholder="time placeholder"
                        />
                    </FormGroup>
                    </Col> 
                    </Row>
                    <Row>
                        <Col md="3" sm="3" xs="3" lg="3">
                        <Label>Duration</Label>
                        <Input type="number" min="0"/>
                        </Col>
                        <Col md="3" sm="3" xs="3" lg="3">
                        <Label>Unit</Label>
                        <Input type="select">
                            {this.state.units.map(value=>(<option key={value.id} value={value.unit}>{value.unit}</option>))}
                        </Input>
                        </Col>
                        <Col md="4" sm="4" xs="4" lg="4">
                        <Label>Rate</Label>
                        <Input type="number" min="0"/>
                        </Col>
                        <Col md="2" sm="2" xs="2" lg="2" className="text-center">
                        <Button
                        onClick={()=>this.AddSlot()}
                        style={{marginTop:"30px",backgroundColor:"#404E67",color:"white"}}
                        >
                        <i className="fa fa-plus"/>
                        </Button>
                        </Col>
                    </Row>
                    {this.state.newSlot.map((value,index)=>(
                        <Row key={index} style={{marginTop:"10px"}}>
                            <Col md="3" sm="3" xs="3" lg="3">
                            <Input type="number"/>
                            </Col>
                            <Col md="3" sm="3" xs="3" lg="3">
                            <Input type="select">
                            <option>Secs</option>
                            <option>Mins</option>
                            <option>Hr</option>
                            </Input>
                            </Col>
                            <Col md="4" sm="4" xs="4" lg="4">
                            <Input type="number"/>
                            </Col>
                            <Col md="2" sm="2" xs="2" lg="2" className="text-center">

                            <i className="fa fa-trash" style={{color:"red",fontSize:"20px",marginTop:"15px",cursor:"pointer"}} onClick={()=>this.handleDelete(value.id)}/>
                            </Col>
                        </Row>
                    ))}

                    <Row style={{marginTop:"20px"}}>
                        <Col md="6"sm="6"lg="6"xs="6">
                            <Button
                            color="danger"
                            >
                                Submit
                            </Button>    
                        </Col>
                        <Col md="6"sm="6"lg="6"xs="6">
                            <Button
                            color="info"
                            >
                                Review
                            </Button>    
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


export default RateCardDetails;

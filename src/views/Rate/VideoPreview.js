import React from "react";
import  { Prompt } from 'react-router-dom';
import NavigationPrompt from "react-router-navigation-prompt";
// reactstrap components
import {
  Card,
  CardBody,
  Container,
  Row,
  Col, CardHeader, Nav, NavItem, NavLink,
  TabContent,TabPane,Input,Button, FormGroup,Label,FormFeedback,Spinner, CardFooter,Modal,ModalFooter,ModalHeader
} from "reactstrap";
// core components
import classnames from 'classnames';
import Header from "components/Headers/Header.js";
import LoadingOverlay from "react-loading-overlay";
import FadeLoader from "react-spinners/FadeLoader";
import axios from "axios";/* 
import history from "../../history.js"; */

let user = localStorage.getItem("access_token");
var domain = "https://media-backend.kokrokooad.com";

class VideoPreview extends React.Component{

  state={
    isActive:false,
    isActiveSpinner:false,
    activeTab:"1",
    days:[],
    data:[],
    allData:[],
    timeCheck:false,
    units:[],
    title:"",
    id:1,
    allow:true,
    modal:false,
    alertMessage:""
  }

  componentDidMount(){
    this.setState({isActiveSpinner:true})
    axios.get(`${domain}/api/fetch-days-and-units`)
    .then(res=>{
        console.log(res.data)
        this.setState({days:res.data.days, units:res.data.units})
    });

    axios.get(`${domain}/api/ratecard/${this.props.location.state.title_id}/preview`,
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
          this.setState({data:selectedDetaisl,isActiveSpinner:false})
          }
          else{
            this.setState({data:[],isActive:false})
          }
        
      })
      .catch(error => {
        console.log(error)
        if(error.response.data.status === "Forbidden"){
          this.setState({modal:true, alertMessage:"Access Denied"})
        }
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

  handleRateChange=(id,value,index)=>{
    let tempDetails = this.state.data;
    let selectedIndex = tempDetails[index]
    const selectedDetail = selectedIndex.duration.find(item=>item.id === id);
    selectedDetail.rate  = value;
    this.setState({data:tempDetails})
  }

  handleDurationChange=(id,value,index)=>{
    let tempDetails = this.state.data;
    let selectedIndex = tempDetails[index]
    const selectedDetail = selectedIndex.duration.find(item=>item.id === id);
    selectedDetail.duration  = value;
    this.setState({data:tempDetails})
  }
  
  handleUnitChange=(id, value,index)=>{
    let tempDetails = this.state.data;
    let selectedIndex = tempDetails[index]
    const selectedDetail = selectedIndex.duration.find(item=>item.id === id);
    selectedDetail.unit.id  = value;
    this.setState({data:tempDetails})
  }

  handleDelete=(id,index)=>{
    axios.delete(`${domain}/api/ratecard/${id}/delete-duration`,
    { headers: { 'Authorization': `Bearer ${user}` } })
    .then(res=>{
      console.log(res.data);
      if(res.data.status === "deleted"){
        let tempDetails = this.state.data;
        let selectedIndex = tempDetails[index];
        let selectedDetail = selectedIndex.duration.filter(item=>item.id !== id);
        console.log(selectedDetail)
        selectedIndex.duration = selectedDetail;
        this.setState({data:tempDetails})
      }
    })
    .catch(error=>{
      console.log(error);
    })
   
  }

  handleSpotChange=(id,value)=>{
      let tempDetails = this.state.data;
      let selected = tempDetails.find(item=>item.id===id);
      selected.no_of_spots=value;
      this.setState({data:tempDetails});
  }

  handleStartTime=(id,value)=>{
    let tempDetails = this.state.data;
      let selected = tempDetails.find(item=>item.id===id);
      selected.start_time=value;
      this.setState({data:tempDetails});
  }

  handleEndTime=(id,value)=>{
    let tempDetails = this.state.data;
      let selected = tempDetails.find(item=>item.id===id);
      selected.end_time=value;
      this.setState({data:tempDetails});
  }

  handleAddSlot=(id)=>{
    let tempDetails = this.state.data;
    let selected = tempDetails.find(item=>item.id === id);
    if(selected.duration[selected.duration.length-1].duration && selected.duration[selected.duration.length-1].rate){
    selected.duration.push({id:`#${this.state.id}`,duration:"", unit:{unit:"Sec", id:1}, rate:""});
    this.setState({data:tempDetails, id:this.state.id+1});
    }
  }

  handleDeleteSegment=(id)=>{
    this.setState({isActive:true});
    axios.delete(`${domain}/api/ratecard/detail/${id}/delete`,
    { headers: { 'Authorization': `Bearer ${user}` } })
    .then(res=>{
      console.log(res.data);
      if(res.data.status === "deleted"){
        let tempDetails = this.state.data;
        let newData = tempDetails.filter(item=>item.id !== id);
        this.setState({data:newData, isActive:false});
      }
    })
    .catch(error=>{
      console.log(error);
      this.setState({isActive:false})
    })
  }

  handleSubmit=(id)=>{
    let tempDetails = this.state.data;
    let selected = tempDetails.find(item=>item.id === id);
    console.log(selected);
    axios.patch(`${domain}/api/ratecard/${id}/update`,
    {start_time:selected.start_time, end_time:selected.end_time, no_of_spots:selected.no_of_spots,day_id:selected.day.id, durations:selected.duration},
    { headers: { 'Authorization': `Bearer ${user}`}})
    .then(res=>{
      console.log(res.data);
      if(res.data.status === "saved"){
        this.setState({
          isActive:false,
          alertMessage:"Changes Saved",
          modal:true
        })
      }
    })
    .catch(error=>{
      console.log(error);
      this.setState({isActive:false})
    })
  }

  handleComplete=()=>{
    console.log("completing...")
    axios.post(`${domain}/api/ratecard/${this.props.location.state.title_id}/complete/create`,null,
    { headers: { 'Authorization': `Bearer ${user}`}})
    .then(res=>{
      console.log(res.data);
      this.setState({allow:false})
      this.props.history.push('/media/view-ratecards')
    })
    .catch(error=>{
      console.log(error.response.data)
    })
  }


  handleDeleteRatecard=()=>{
    axios.delete(`${domain}/api/ratecard/${this.props.location.state.title_id}/delete`,
    {headers:{ 'Authorization':`Bearer ${user}`}})
    .then(res=>{
        console.log(res.data);
        this.setState({allow:false})
    })
}

  render(){
  return (
      <>
      <LoadingOverlay
        active={this.state.isActive}
        spinner={<FadeLoader color={'#4071e1'}/>}
      >

        <NavigationPrompt when={this.state.allow} 
        afterConfirm={()=>this.handleDeleteRatecard()}
        disableNative={true}
        >
        {({ onConfirm, onCancel }) => (
            <Modal isOpen={this.state.allow}>
                <ModalHeader>
                You have unsaved changes, are you sure you want to leave?
                </ModalHeader>
                <ModalFooter>
                    <Button color="danger" onClick={onConfirm}>Yes</Button>
                    <Button color="info" onClick={onCancel}>No</Button>
                </ModalFooter>
            </Modal>
        )}
        </NavigationPrompt>;
        <Header />
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
            <Col md="12" sm="12" lg="12" xl="12" xs="12">
            <p style={{fontSize:"13px", fontWeight:500}}
            >Edit RateCard Details, Delete and Add More Fields.</p>
              <Card className="shadow">
                <CardHeader className=" bg-transparent">
                  <h3 className=" mb-0">{this.state.title}</h3>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col md="12">
                      <div className="nav-tabs-navigation">
                        <div className="nav-tabs-wrapper">
                          <Nav role="tablist" tabs>
                            {this.state.days.map(value => (
                              <NavItem key={value.id}>
                                <NavLink
                                  style={{ cursor: "pointer", textTransform: "uppercase",fontSize:"14px", fontWeight:"bold" }}
                                  className={classnames({ active: this.state.activeTab === `${value.id}` })}
                                  onClick={() => { this.toggle(`${value.id}`); this.getDetails(value.id)}}
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
                        <TabPane tabId={this.state.activeTab}>
                          <Container>
                          {this.state.data.length<=0?
                          <Row>
                            <Col md="6" className="mr-auto ml-auto" style={{textAlign:"center"}}>
                              <h3>No Data Saved For This Day</h3>
                            </Col>
                          </Row>
                          :
                          <>
                          {this.state.data.map((value, index)=>(
                          <div key={index} style={{paddingBottom:"50px"}}>
                          <Row>
                          <Col sm="6" md="6" xs="6" lg="6">
                            <FormGroup>
                                <Label for="exampleTime"  id="boldstyle">Start Time</Label>
                                <Input
                                type="time"
                                name="time"
                                id="exampleTime"
                                placeholder="time placeholder"
                                value={value.start_time}
                                onChange={e=>this.handleStartTime(value.id,e.target.value)}
                                />
                            </FormGroup>
                            </Col>
                            <Col sm="6" md="6" xs="6" lg="6" >
                            <FormGroup>
                                <Label for="exampleTime" id="boldstyle">End Time</Label>
                                <Input
                                invalid={this.state.timeCheck}
                                type="time"
                                name="time"
                                id="exampleTime"
                                value={value.end_time}
                                placeholder="time placeholder"
                                onChange={e=>this.handleEndTime(value.id, e.target.value)}
                                />
                                <FormFeedback tooltip>End time must be greater than start time</FormFeedback>
                            </FormGroup>
                            </Col> 
                          </Row>
                          <Row>
                        <Col md="12">
                        <Row>
                        <Col>
                        <Label id="boldstyle">Number of Spots</Label>
                        <Input type="number" min="0" placeholder="Number of Spots" value={value.no_of_spots} onChange={e=>this.handleSpotChange(value.id,e.target.value)}/>
                        </Col>
                        <Col>
                        <Button
                        color="info"
                        style={{marginTop:"30px"}}
                        onClick={()=>this.handleAddSlot(value.id)}
                        >
                        <i className="fa fa-plus" />
                        </Button>
                        </Col>
                        </Row>    
                        </Col>
                        
                        </Row>
                        <br/>    
                        <Row>
                            <Col>
                            <h3 id="boldstyle">Duration</h3>
                            </Col>
                            <Col>
                            <h3 id="boldstyle">Unit</h3>
                            </Col>
                            <Col>
                            <h3 id="boldstyle">Rate</h3>
                            </Col>
                            <Col>
                            <h3 style={{textAlign:"center"}} id="boldstyle">Delete</h3>
                            </Col>
                          </Row>
                          {value.duration.map((item, key)=>(
                            <Row key={key} style={{marginBottom:"20px"}}>
                            <Col md="3" sm="3" xs="3" lg="3">
                            <Input type="number" min="0" value={item.duration} onChange={e=>this.handleDurationChange(item.id, e.target.value,index)}/>
                            </Col>
                            <Col md="3" sm="3" xs="3" lg="3">
                            <Input type="select" value={item.unit.id} onChange={e=>this.handleUnitChange(item.id, e.target.value,index)}>
                                {this.state.units.map(value=>(<option key={value.id} value={value.id}>{value.unit}</option>))}
                            </Input>
                            </Col>
                            <Col md="4" sm="4" xs="4" lg="4">
                            <Input type="number" min="0" value={item.rate} onChange={e=>this.handleRateChange(item.id, e.target.value,index)}/>
                            </Col>
                            <Col md="2" sm="2" xs="2" lg="2" className="text-center">
                            <i className="fa fa-trash" style={{color:"red",fontSize:"20px",marginTop:"15px",cursor:"pointer"}} onClick={()=>this.handleDelete(item.id,index)}/>
                            </Col>
                        </Row>
                          ))}
                          <br/>
                          <Row>
                            <Col md="2">
                              <Button
                              color="info"
                              onClick={()=>this.handleSubmit(value.id)}
                              >
                                Save Changes
                              </Button>
                            </Col>
                            <Col md="3">
                              <Button
                              color="danger"
                              onClick={()=>this.handleDeleteSegment(value.id)}
                              >
                                Delete Segment
                              </Button>
                            </Col>
                           
                            <Col md="6">

                            </Col>
                          </Row>
                          </div>
                          ))}
                          </>
                            }
                          
                          </Container>
                        </TabPane>
                      </TabContent>
                            
                </Col>    
                </Row>
            </CardBody>
            <CardFooter >
                    <Button
                    style={{float:"right"}}
                    onClick={()=>{
                      this.setState({allow:false});
                      setTimeout(
                    function(){
                        
                      this.props.history.push("/media/rate-details",{title_id:this.props.location.state.title_id, rate_title:this.state.title})
                    }
                    .bind(this),
                    500
                )}}
                    color="info"
                    >
                    Add New Segment
                    </Button>

                    <Button
                    style={{float:"right", marginRight:"10px"}}
                    onClick={()=>this.handleComplete()}
                    color="success"
                    >
                   Complete
                    </Button>
            </CardFooter>
            </Card>    
            </Col>
            </Row>
          </>
        }
        </Container>
        <Modal isOpen={this.state.modal}>
                <ModalHeader>
                    {this.state.alertMessage}
                </ModalHeader>
                <ModalFooter>
                    <Button color="danger" onClick={()=>this.setState({modal:false})}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </LoadingOverlay>
      </>
    );
  }
}


export default VideoPreview;

/* onChange={e=>{e.target.value <= this.state.startTime? this.setState({timeCheck:true, EndTime:e.target.value}) : this.setState({timeCheck:false,EndTime:e.target.value})}} */
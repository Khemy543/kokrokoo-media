import React from "react";
// reactstrap components
import {
  Card,
  CardBody,
  Container,
  Row,
  Col, CardHeader, Nav, NavItem, NavLink,
  TabContent,TabPane,Input,Button, FormGroup,Label,FormFeedback
} from "reactstrap";
// core components
import classnames from 'classnames';
import Header from "components/Headers/Header.js";
import LoadingOverlay from "react-loading-overlay";
import FadeLoader from "react-spinners/FadeLoader";
import axios from "axios";/* 
import history from "../../history.js"; */

let user = null;
let all_data = JSON.parse(localStorage.getItem('storageData'));
console.log("all_data:", all_data)
if (all_data !== null) {
  user = all_data[0];
}

class VideoPreview extends React.Component{

  state={
    isActive:false,
    activeTab:"1",
    days:[],
    data:[],
    allData:[],
    timeCheck:false,
    units:[],
    title:"",
    id:1
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
    selectedDetail.unit  = value;
    this.setState({data:tempDetails})
  }

  handleDelete=(id,index)=>{
    axios.delete("https://media-kokrokooad.herokuapp.com/api/ratecard/"+id+"/delete-duration",
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
    selected.duration.push({id:`#${this.state.id}`,duration:"", unit_id:1, rate:""});
    this.setState({data:tempDetails, id:this.state.id+1});
    }
  }

  handleSubmit=(id)=>{
    let tempDetails = this.state.data;
    let selected = tempDetails.find(item=>item.id === id);
    console.log(selected);
    this.setState({isActive:true})
    axios.patch("https://media-kokrokooad.herokuapp.com/api/ratecard/"+id+"/update",
    {start_time:selected.start_time, end_time:selected.end_time, no_of_spots:selected.no_of_spots,day_id:selected.day.id, durations:selected.duration},
    { headers: { 'Authorization': `Bearer ${user}`}})
    .then(res=>{
      console.log(res.data);
      if(res.data.status === "saved"){
        alert("changes saved");
        this.setState({isActive:false})
      }
    })
    .catch(error=>{
      console.log(error);
      this.setState({isActive:false})
    })
  }


  render(){
  return (
      <>
      <LoadingOverlay
        active={this.state.isActive}
        spinner={<FadeLoader color={'#4071e1'} />}
      >
        <Header />
        <Container className=" mt--8" fluid>

          <Row>
            <Col md="12">
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
                                  style={{ cursor: "pointer", textTransform: "uppercase" }}
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
                          {this.state.data.map((value, index)=>(
                          <div key={index} style={{paddingBottom:"50px"}}>
                          <Row>
                          <Col sm="6" md="6" xs="6" lg="6">
                            <FormGroup>
                                <Label for="exampleTime">Start Time</Label>
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
                                <Label for="exampleTime">End Time</Label>
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
                        <Label>Number of Slots</Label>
                        <Input type="number" min="0" placeholder="number of slots" value={value.no_of_spots} onChange={e=>this.handleSpotChange(value.id,e.target.value)}/>
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
                            <h3>Duration</h3>
                            </Col>
                            <Col>
                            <h3>Unit</h3>
                            </Col>
                            <Col>
                            <h3>Rate</h3>
                            </Col>
                            <Col>
                            <h3 style={{textAlign:"center"}}>Delete</h3>
                            </Col>
                          </Row>
                          {value.duration.map((item, key)=>(
                            <Row key={key} style={{marginBottom:"20px"}}>
                            <Col md="3" sm="3" xs="3" lg="3">
                            <Input type="number" min="0" value={item.duration} onChange={e=>this.handleDurationChange(item.id, e.target.value,index)}/>
                            </Col>
                            <Col md="3" sm="3" xs="3" lg="3">
                            <Input type="select" value={item.unit} onChange={e=>this.handleUnitChange(item.id, e.target.value,index)}>
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
                          <Row>
                            <Col md="5">
                              <Button
                              color="info"
                              onClick={()=>this.handleSubmit(value.id)}
                              >
                                Save Changes
                              </Button>
                            </Col>
                          </Row>
                          </div>
                          ))}
                         

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


export default VideoPreview;

/* onChange={e=>{e.target.value <= this.state.startTime? this.setState({timeCheck:true, EndTime:e.target.value}) : this.setState({timeCheck:false,EndTime:e.target.value})}} */
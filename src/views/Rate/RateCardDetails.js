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
        activeTab:"1",
        days:[],
        units:[],
        title:this.props.location.state.rate_title,

        slotValue:2,
        newSlot:[],
        duration:"",
        unit:"",
        rate:"",
        startTime:"",
        EndTime:"",
        slotNumber:"",

        slotValueTues:2,
        newSlotTues:[],
        durationTues:"",
        unitTues:"",
        rateTues:"",
        startTimeTues:"",
        EndTimeTues:"",
        slotNumberTues:"",

        slotValueWed:2,
        newSlotWed:[],
        durationWed:"",
        unitWed:"",
        rateWed:"",
        startTimeWed:"",
        EndTimeWed:"",
        slotNumberWed:"",

        slotValueThurs:2,
        newSlotThurs:[],
        durationThurs:"",
        unitThurs:"",
        rateThurs:"",
        startTimeThurs:"",
        EndTimeThurs:"",
        slotNumberThurs:"",

        slotValueFri:2,
        newSlotFri:[],
        durationFri:"",
        unitFri:"",
        rateFri:"",
        startTimeFri:"",
        EndTimeFri:"",
        slotNumberFri:"",

        slotValueSat:2,
        newSlotSat:[],
        durationSat:"",
        unitSat:"",
        rateSat:"",
        startTimeSat:"",
        EndTimeSat:"",
        slotNumberSat:"",

        slotValueSun:2,
        newSlotSun:[],
        durationSun:"",
        unitSun:"",
        rateSun:"",
        startTimeSun:"",
        EndTimeSun:"",
        slotNumberSun:"",
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

    AddSlotMonday=()=>{
        var tempSlot = [...this.state.newSlot];
        console.log(tempSlot)
        if(this.state.duration !=="" && this.state.rate !== "" && this.state.newSlot.length <=0 ){
            tempSlot.push({id:this.state.slotValue,duration:"",unit:"",rate:""});
            console.log("first:",tempSlot)
            return(this.setState({newSlot:tempSlot, slotValue:this.state.slotValue+1}));
        }
        else
        if(this.state.duration !=="" && this.state.rate !== "" && this.state.newSlot.length > 0){
           let lastElement = tempSlot[tempSlot.length -1];
            if(lastElement.duration && lastElement.rate){
                tempSlot.push({id:this.state.slotValue,duration:"",unit:"",rate:""});
                console.log("second:",tempSlot)
                return(this.setState({newSlot:tempSlot, slotValue:this.state.slotValue+1}));
            }
        }
          
      }

      handleDurationChange=(id , value)=>{
        var tempSlot = [...this.state.newSlot];
        const selected = tempSlot.find(item=>item.id===id);
        const index = tempSlot.indexOf(selected);
        const selectedIndex = tempSlot[index];
        console.log(tempSlot)
        selectedIndex.duration = value;
        return(this.setState({newSlot:tempSlot}))

      }

      handleUnitChange=(id , value)=>{
        var tempSlot = [...this.state.newSlot];
        const selected = tempSlot.find(item=>item.id===id);
        const index = tempSlot.indexOf(selected);
        const selectedIndex = tempSlot[index];
        console.log(tempSlot)
        selectedIndex.unit = value;
        return(this.setState({newSlot:tempSlot}))

      }

      handleRateChange=(id , value)=>{
        var tempSlot = [...this.state.newSlot];
        const selected = tempSlot.find(item=>item.id===id);
        const index = tempSlot.indexOf(selected);
        const selectedIndex = tempSlot[index];
        console.log(tempSlot)
        selectedIndex.rate = value;
        return(this.setState({newSlot:tempSlot}))

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

    /* tab 2 */

    AddSlotTuesday=()=>{
        var tempSlot = [...this.state.newSlotTues];
        console.log(tempSlot)
        if(this.state.durationTues !=="" && this.state.rateTues !== "" && this.state.newSlotTues.length <=0 ){
            tempSlot.push({id:this.state.slotValueTues,duration:"",unit:"",rate:""});
            console.log("first:",tempSlot)
            return(this.setState({newSlotTues:tempSlot, slotValueTues:this.state.slotValueTues+1}));
        }
        else
        if(this.state.durationTues !=="" && this.state.rateTues !== "" && this.state.newSlotTues.length > 0){
           let lastElement = tempSlot[tempSlot.length -1];
            if(lastElement.duration && lastElement.rate){
                tempSlot.push({id:this.state.slotValueTues,duration:"",unit:"",rate:""});
                console.log("second:",tempSlot)
                return(this.setState({newSlotTues:tempSlot, slotValueTues:this.state.slotValueTues+1}));
            }
        }
          
      }

      handleDurationChangeTues=(id , value)=>{
        var tempSlot = [...this.state.newSlotTues];
        const selected = tempSlot.find(item=>item.id===id);
        const index = tempSlot.indexOf(selected);
        const selectedIndex = tempSlot[index];
        console.log(tempSlot)
        selectedIndex.duration = value;
        return(this.setState({newSlotTues:tempSlot}))

      }

      handleUnitChangeTues=(id , value)=>{
        var tempSlot = [...this.state.newSlotTues];
        const selected = tempSlot.find(item=>item.id===id);
        const index = tempSlot.indexOf(selected);
        const selectedIndex = tempSlot[index];
        console.log(tempSlot)
        selectedIndex.unit = value;
        return(this.setState({newSlotTues:tempSlot}))

      }

      handleRateChangeTues=(id , value)=>{
        var tempSlot = [...this.state.newSlotTues];
        const selected = tempSlot.find(item=>item.id===id);
        const index = tempSlot.indexOf(selected);
        const selectedIndex = tempSlot[index];
        console.log(tempSlot)
        selectedIndex.rate = value;
        return(this.setState({newSlotTues:tempSlot}))

      }

    handleDeleteTues=(id)=>{
        
        console.log("id:",id)
        var tempSlot = [...this.state.newSlotTues];
        let newArray = tempSlot.filter(item=>item.id !== id);
        return(this.setState({newSlotTues:newArray}))
        console.log("temp",newArray)
    }

    handleSubmitTues=()=>{
        axios.post("https://media-kokrokooad.herokuapp.com/api/ratecard/"+this.props.location.state.rate_id+"/add-details")
    }

    /* tab 3 */

    AddSlotWednesday=()=>{
        var tempSlot = [...this.state.newSlotWed];
        console.log(tempSlot)
        if(this.state.durationWed !=="" && this.state.rateWed !== "" && this.state.newSlotWed.length <=0 ){
            tempSlot.push({id:this.state.slotValueWed,duration:"",unit:"",rate:""});
            console.log("first:",tempSlot)
            return(this.setState({newSlotWed:tempSlot, slotValueWed:this.state.slotValueWed+1}));
        }
        else
        if(this.state.durationWed !=="" && this.state.rateWed !== "" && this.state.newSlotWed.length > 0){
           let lastElement = tempSlot[tempSlot.length -1];
            if(lastElement.duration && lastElement.rate){
                tempSlot.push({id:this.state.slotValueWed,duration:"",unit:"",rate:""});
                console.log("second:",tempSlot)
                return(this.setState({newSlotWed:tempSlot, slotValueWed:this.state.slotValueWed+1}));
            }
        }
          
      }

      handleDurationChangeWed=(id , value)=>{
        var tempSlot = [...this.state.newSlotWed];
        const selected = tempSlot.find(item=>item.id===id);
        const index = tempSlot.indexOf(selected);
        const selectedIndex = tempSlot[index];
        console.log(tempSlot)
        selectedIndex.duration = value;
        return(this.setState({newSlotWed:tempSlot}))

      }

      handleUnitChangeWed=(id , value)=>{
        var tempSlot = [...this.state.newSlotWed];
        const selected = tempSlot.find(item=>item.id===id);
        const index = tempSlot.indexOf(selected);
        const selectedIndex = tempSlot[index];
        console.log(tempSlot)
        selectedIndex.unit = value;
        return(this.setState({newSlotWed:tempSlot}))

      }

      handleRateChangeWed=(id , value)=>{
        var tempSlot = [...this.state.newSlotWed];
        const selected = tempSlot.find(item=>item.id===id);
        const index = tempSlot.indexOf(selected);
        const selectedIndex = tempSlot[index];
        console.log(tempSlot)
        selectedIndex.rate = value;
        return(this.setState({newSlotWed:tempSlot}))

      }

    handleDeleteWed=(id)=>{
        
        console.log("id:",id)
        var tempSlot = [...this.state.newSlotWed];
        let newArray = tempSlot.filter(item=>item.id !== id);
        return(this.setState({newSlotWed:newArray}))
        console.log("temp",newArray)
    }

    handleSubmitWed=()=>{
        axios.post("https://media-kokrokooad.herokuapp.com/api/ratecard/"+this.props.location.state.rate_id+"/add-details")
    }

    /* tab 4 */
    AddSlotThursday=()=>{
        var tempSlot = [...this.state.newSlotThurs];
        console.log(tempSlot)
        if(this.state.durationThurs !=="" && this.state.rateThurs !== "" && this.state.newSlotThurs.length <=0 ){
            tempSlot.push({id:this.state.slotValueThurs,duration:"",unit:"",rate:""});
            console.log("first:",tempSlot)
            return(this.setState({newSlotThurs:tempSlot, slotValueThurs:this.state.slotValueThurs+1}));
        }
        else
        if(this.state.durationThurs !=="" && this.state.rateThurs !== "" && this.state.newSlotThurs.length > 0){
           let lastElement = tempSlot[tempSlot.length -1];
            if(lastElement.duration && lastElement.rate){
                tempSlot.push({id:this.state.slotValueThurs,duration:"",unit:"",rate:""});
                console.log("second:",tempSlot)
                return(this.setState({newSlotThurs:tempSlot, slotValueThurs:this.state.slotValueThurs+1}));
            }
        }
          
      }

      handleDurationChangeThurs=(id , value)=>{
        var tempSlot = [...this.state.newSlotThurs];
        const selected = tempSlot.find(item=>item.id===id);
        const index = tempSlot.indexOf(selected);
        const selectedIndex = tempSlot[index];
        console.log(tempSlot)
        selectedIndex.duration = value;
        return(this.setState({newSlotThurs:tempSlot}))

      }

      handleUnitChangeThurs=(id , value)=>{
        var tempSlot = [...this.state.newSlotThurs];
        const selected = tempSlot.find(item=>item.id===id);
        const index = tempSlot.indexOf(selected);
        const selectedIndex = tempSlot[index];
        console.log(tempSlot)
        selectedIndex.unit = value;
        return(this.setState({newSlotThurs:tempSlot}))

      }

      handleRateChangeThurs=(id , value)=>{
        var tempSlot = [...this.state.newSlotThurs];
        const selected = tempSlot.find(item=>item.id===id);
        const index = tempSlot.indexOf(selected);
        const selectedIndex = tempSlot[index];
        console.log(tempSlot)
        selectedIndex.rate = value;
        return(this.setState({newSlotThurs:tempSlot}))

      }

    handleDeleteThurs=(id)=>{
        
        console.log("id:",id)
        var tempSlot = [...this.state.newSlotThurs];
        let newArray = tempSlot.filter(item=>item.id !== id);
        return(this.setState({newSlotThurs:newArray}))
        console.log("temp",newArray)
    }

    handleSubmitThurs=()=>{
        axios.post("https://media-kokrokooad.herokuapp.com/api/ratecard/"+this.props.location.state.rate_id+"/add-details")
    }

    /* tab 5 */
    AddSlotFriday=()=>{
        var tempSlot = [...this.state.newSlotFri];
        console.log(tempSlot)
        if(this.state.durationFri !=="" && this.state.rateFri !== "" && this.state.newSlotFri.length <=0 ){
            tempSlot.push({id:this.state.slotValueFri,duration:"",unit:"",rate:""});
            console.log("first:",tempSlot)
            return(this.setState({newSlotFri:tempSlot, slotValueFri:this.state.slotValueFri+1}));
        }
        else
        if(this.state.durationFri !=="" && this.state.rateFri !== "" && this.state.newSlotFri.length > 0){
           let lastElement = tempSlot[tempSlot.length -1];
            if(lastElement.duration && lastElement.rate){
                tempSlot.push({id:this.state.slotValueFri,duration:"",unit:"",rate:""});
                console.log("second:",tempSlot)
                return(this.setState({newSlotFri:tempSlot, slotValueFri:this.state.slotValueFri+1}));
            }
        }
          
      }

      handleDurationChangeFri=(id , value)=>{
        var tempSlot = [...this.state.newSlotFri];
        const selected = tempSlot.find(item=>item.id===id);
        const index = tempSlot.indexOf(selected);
        const selectedIndex = tempSlot[index];
        console.log(tempSlot)
        selectedIndex.duration = value;
        return(this.setState({newSlotFri:tempSlot}))

      }

      handleUnitChangeFri=(id , value)=>{
        var tempSlot = [...this.state.newSlotFri];
        const selected = tempSlot.find(item=>item.id===id);
        const index = tempSlot.indexOf(selected);
        const selectedIndex = tempSlot[index];
        console.log(tempSlot)
        selectedIndex.unit = value;
        return(this.setState({newSlotFri:tempSlot}))

      }

      handleRateChangeFri=(id , value)=>{
        var tempSlot = [...this.state.newSlotFri];
        const selected = tempSlot.find(item=>item.id===id);
        const index = tempSlot.indexOf(selected);
        const selectedIndex = tempSlot[index];
        console.log(tempSlot)
        selectedIndex.rate = value;
        return(this.setState({newSlotFri:tempSlot}))

      }

    handleDeleteFri=(id)=>{
        
        console.log("id:",id)
        var tempSlot = [...this.state.newSlotFri];
        let newArray = tempSlot.filter(item=>item.id !== id);
        return(this.setState({newSlotFri:newArray}))
        console.log("temp",newArray)
    }

    handleSubmitFri=()=>{
        axios.post("https://media-kokrokooad.herokuapp.com/api/ratecard/"+this.props.location.state.rate_id+"/add-details")
    }

    /* tab 6 */
    AddSlotSaturday=()=>{
        var tempSlot = [...this.state.newSlotSat];
        console.log(tempSlot)
        if(this.state.durationSat !=="" && this.state.rateSat !== "" && this.state.newSlotSat.length <=0 ){
            tempSlot.push({id:this.state.slotValueSat,duration:"",unit:"",rate:""});
            console.log("first:",tempSlot)
            return(this.setState({newSlotSat:tempSlot, slotValueSat:this.state.slotValueSat+1}));
        }
        else
        if(this.state.durationSat !=="" && this.state.rateSat !== "" && this.state.newSlotSat.length > 0){
           let lastElement = tempSlot[tempSlot.length -1];
            if(lastElement.duration && lastElement.rate){
                tempSlot.push({id:this.state.slotValueSat,duration:"",unit:"",rate:""});
                console.log("second:",tempSlot)
                return(this.setState({newSlotSat:tempSlot, slotValueSat:this.state.slotValueSat+1}));
            }
        }
          
      }

      handleDurationChangeSat=(id , value)=>{
        var tempSlot = [...this.state.newSlotSat];
        const selected = tempSlot.find(item=>item.id===id);
        const index = tempSlot.indexOf(selected);
        const selectedIndex = tempSlot[index];
        console.log(tempSlot)
        selectedIndex.duration = value;
        return(this.setState({newSlotSat:tempSlot}))

      }

      handleUnitChangeSat=(id , value)=>{
        var tempSlot = [...this.state.newSlotSat];
        const selected = tempSlot.find(item=>item.id===id);
        const index = tempSlot.indexOf(selected);
        const selectedIndex = tempSlot[index];
        console.log(tempSlot)
        selectedIndex.unit = value;
        return(this.setState({newSlotSat:tempSlot}))

      }

      handleRateChangeSat=(id , value)=>{
        var tempSlot = [...this.state.newSlotSat];
        const selected = tempSlot.find(item=>item.id===id);
        const index = tempSlot.indexOf(selected);
        const selectedIndex = tempSlot[index];
        console.log(tempSlot)
        selectedIndex.rate = value;
        return(this.setState({newSlotSat:tempSlot}))

      }

    handleDeleteSat=(id)=>{
        
        console.log("id:",id)
        var tempSlot = [...this.state.newSlotSat];
        let newArray = tempSlot.filter(item=>item.id !== id);
        return(this.setState({newSlotSat:newArray}))
        console.log("temp",newArray)
    }

    handleSubmitSat=()=>{
        axios.post("https://media-kokrokooad.herokuapp.com/api/ratecard/"+this.props.location.state.rate_id+"/add-details")
    }

    /* tab 7 */
    AddSlotSunday=()=>{
        var tempSlot = [...this.state.newSlotSun];
        console.log(tempSlot)
        if(this.state.durationSun !=="" && this.state.rateSun !== "" && this.state.newSlotSun.length <=0 ){
            tempSlot.push({id:this.state.slotValueSun,duration:"",unit:"",rate:""});
            console.log("first:",tempSlot)
            return(this.setState({newSlotSun:tempSlot, slotValueSun:this.state.slotValueSun+1}));
        }
        else
        if(this.state.durationSun !=="" && this.state.rateSun !== "" && this.state.newSlotSun.length > 0){
           let lastElement = tempSlot[tempSlot.length -1];
            if(lastElement.duration && lastElement.rate){
                tempSlot.push({id:this.state.slotValueSun,duration:"",unit:"",rate:""});
                console.log("second:",tempSlot)
                return(this.setState({newSlotSun:tempSlot, slotValueSun:this.state.slotValueSun+1}));
            }
        }
          
      }

      handleDurationChangeSun=(id , value)=>{
        var tempSlot = [...this.state.newSlotSun];
        const selected = tempSlot.find(item=>item.id===id);
        const index = tempSlot.indexOf(selected);
        const selectedIndex = tempSlot[index];
        console.log(tempSlot)
        selectedIndex.duration = value;
        return(this.setState({newSlotSun:tempSlot}))

      }

      handleUnitChangeSun=(id , value)=>{
        var tempSlot = [...this.state.newSlotSun];
        const selected = tempSlot.find(item=>item.id===id);
        const index = tempSlot.indexOf(selected);
        const selectedIndex = tempSlot[index];
        console.log(tempSlot)
        selectedIndex.unit = value;
        return(this.setState({newSlotSun:tempSlot}))

      }

      handleRateChangeSun=(id , value)=>{
        var tempSlot = [...this.state.newSlotSun];
        const selected = tempSlot.find(item=>item.id===id);
        const index = tempSlot.indexOf(selected);
        const selectedIndex = tempSlot[index];
        console.log(tempSlot)
        selectedIndex.rate = value;
        return(this.setState({newSlotSun:tempSlot}))

      }

    handleDeleteSun=(id)=>{
        
        console.log("id:",id)
        var tempSlot = [...this.state.newSlotSun];
        let newArray = tempSlot.filter(item=>item.id !== id);
        return(this.setState({newSlotSun:newArray}))
        console.log("temp",newArray)
    }

    handleSubmitSun=()=>{
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
                style={{cursor:"pointer"}}
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
                        onChange={e=>this.setState({startTime:e.target.value})}
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
                        value={this.state.EndTime}
                        onChange={e=>this.setState({EndTime:e.target.value})}
                        placeholder="time placeholder"
                        />
                    </FormGroup>
                    </Col> 
                    </Row>
                    <Row>
                        <Col md="6">
                        <Row>
                        <Col>
                        Number of Slots : 
                        </Col>
                        <Col>
                        <Input type="number" min="0" placeholder="number of slots" value={this.state.slotNumber} onChange={e=>this.setState({slotNumber:e.target.value})}/>
                        </Col>
                        </Row>    
                        </Col>
                        
                    </Row>
                    <br/>    
                    <Row>
                        <Col md="3" sm="3" xs="3" lg="3">
                        <Label>Duration</Label>
                        <Input type="number" min="0" value={this.state.duration} onChange={e=>this.setState({duration:e.target.value})}/>
                        </Col>
                        <Col md="3" sm="3" xs="3" lg="3">
                        <Label>Unit</Label>
                        <Input type="select" value={this.state.unit} onChange={e=>this.setState({unit:e.target.unit})}>
                            {this.state.units.map(value=>(<option key={value.id} value={value.unit}>{value.unit}</option>))}
                        </Input>
                        </Col>
                        <Col md="4" sm="4" xs="4" lg="4">
                        <Label>Rate</Label>
                        <Input type="number" min="0" value={this.state.rate} onChange={e=>this.setState({rate:e.target.value})}/>
                        </Col>
                        <Col md="2" sm="2" xs="2" lg="2" className="text-center">
                        <Button
                        onClick={()=>this.AddSlotMonday()}
                        style={{marginTop:"30px",backgroundColor:"#404E67",color:"white"}}
                        >
                        <i className="fa fa-plus"/>
                        </Button>
                        </Col>
                    </Row>
                    {this.state.newSlot.map((value,index)=>(
                        <Row key={index} style={{marginTop:"10px"}}>
                            <Col md="3" sm="3" xs="3" lg="3">
                            <Input type="number" onChange={(e)=>this.handleDurationChange(value.id, e.target.value)}/>
                            </Col>
                            <Col md="3" sm="3" xs="3" lg="3">
                            <Input type="select" onChange={(e)=>this.handleUnitChange(value.id, e.target.value)}>
                            <option>Secs</option>
                            <option>Mins</option>
                            <option>Hr</option>
                            </Input>
                            </Col>
                            <Col md="4" sm="4" xs="4" lg="4">
                            <Input type="number" onChange={(e)=>this.handleRateChange(value.id,e.target.value)}/>
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
                {/* tab 2 */}
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
                       value={this.state.startTimeTues}
                       onChange={e=>this.setState({startTimeTues:e.target.value})}
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
                       value={this.state.EndTimeTues}
                       onChange={e=>this.setState({EndTimeTues:e.target.value})}
                       placeholder="time placeholder"
                       />
                   </FormGroup>
                   
                   </Col> 
                   </Row>
                   <Row>
                        <Col md="6">
                        <Row>
                        <Col>
                        Number of Slots : 
                        </Col>
                        <Col>
                        <Input type="number" min="0" placeholder="number of slots" value={this.state.slotNumberTues} onChange={e=>this.setState({slotNumberTues:e.target.value})}/>
                        </Col>
                        </Row>    
                        </Col>
                        
                    </Row>
                    <br/> 
                   <Row>
                       <Col md="3" sm="3" xs="3" lg="3">
                       <Label>Duration</Label>
                       <Input type="number" min="0" value={this.state.durationTues} onChange={e=>this.setState({durationTues:e.target.value})}/>
                       </Col>
                       <Col md="3" sm="3" xs="3" lg="3">
                       <Label>Unit</Label>
                       <Input type="select" value={this.state.unitTues} onChange={e=>this.setState({unitTues:e.target.value})}>
                           {this.state.units.map(value=>(<option key={value.id} value={value.unit}>{value.unit}</option>))}
                       </Input>
                       </Col>
                       <Col md="4" sm="4" xs="4" lg="4">
                       <Label>Rate</Label>
                       <Input type="number" min="0" value={this.state.rateTues} onChange={e=>this.setState({rateTues:e.target.value})}/>
                       </Col>
                       <Col md="2" sm="2" xs="2" lg="2" className="text-center">
                       <Button
                       onClick={()=>this.AddSlotTuesday()}
                       style={{marginTop:"30px",backgroundColor:"#404E67",color:"white"}}
                       >
                       <i className="fa fa-plus"/>
                       </Button>
                       </Col>
                   </Row>
                   {this.state.newSlotTues.map((value,index)=>(
                       <Row key={index} style={{marginTop:"10px"}}>
                           <Col md="3" sm="3" xs="3" lg="3">
                           <Input type="number" onChange ={e=>this.handleDurationChangeTues(value.id,e.target.value)}/>
                           </Col>
                           <Col md="3" sm="3" xs="3" lg="3">
                           <Input type="select" onChange={e=>this.handleUnitChangeTues(value.id,e.target.value)}>
                           {this.state.units.map(value=>(<option key={value.id} value={value.unit}>{value.unit}</option>))}
                           </Input>
                           </Col>
                           <Col md="4" sm="4" xs="4" lg="4">
                           <Input type="number" onChange={e=>this.handleRateChangeTues(value.id, e.target.value)}/>
                           </Col>
                           <Col md="2" sm="2" xs="2" lg="2" className="text-center">

                           <i className="fa fa-trash" style={{color:"red",fontSize:"20px",marginTop:"15px",cursor:"pointer"}} onClick={()=>this.handleDeleteTues(value.id)}/>
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
               {/* tab 3 */}
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
                        value={this.state.startTimeWed}
                        onChange={e=>this.setState({startTimeWed:e.target.value})}
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
                        value={this.state.EndTimeWed}
                        onChange={e=>this.setState({EndTimeWed:e.target.value})}
                        placeholder="time placeholder"
                        />
                    </FormGroup>
                    </Col> 
                    </Row>
                    <Row>
                        <Col md="6">
                        <Row>
                        <Col>
                        Number of Slots : 
                        </Col>
                        <Col>
                        <Input type="number" min="0" placeholder="number of slots" value={this.state.slotNumberWed} onChange={e=>this.setState({slotNumberWed:e.target.value})}/>
                        </Col>
                        </Row>    
                        </Col>
                        
                    </Row>
                    <br/> 
                    <Row>
                        <Col md="3" sm="3" xs="3" lg="3">
                        <Label>Duration</Label>
                        <Input type="number" min="0" value={this.state.durationWed} onChange={e=>this.setState({durationWed:e.target.value})}/>
                        </Col>
                        <Col md="3" sm="3" xs="3" lg="3">
                        <Label>Unit</Label>
                        <Input type="select" value={this.state.unitWed} onChange={e=>this.setState({unitWed:e.target.value})}>
                            {this.state.units.map(value=>(<option key={value.id} value={value.unit}>{value.unit}</option>))}
                        </Input>
                        </Col>
                        <Col md="4" sm="4" xs="4" lg="4">
                        <Label>Rate</Label>
                        <Input type="number" min="0" value={this.state.rateWed} onChange={e=>this.setState({rateWed:e.target.value})}/>
                        </Col>
                        <Col md="2" sm="2" xs="2" lg="2" className="text-center">
                        <Button
                        onClick={()=>this.AddSlotWednesday()}
                        style={{marginTop:"30px",backgroundColor:"#404E67",color:"white"}}
                        >
                        <i className="fa fa-plus"/>
                        </Button>
                        </Col>
                    </Row>
                    {this.state.newSlotWed.map((value,index)=>(
                        <Row key={index} style={{marginTop:"10px"}}>
                            <Col md="3" sm="3" xs="3" lg="3">
                            <Input type="number" onChange={e=>this.handleDurationChangeWed(value.id, e.target.value)}/>
                            </Col>
                            <Col md="3" sm="3" xs="3" lg="3">
                            <Input type="select" onChange={e=>this.handleUnitChangeWed(value.id,e.target.value)}>
                            {this.state.newSlotWed.map(value=>(<option key={value.id} value={value.unit}>{value.unit}</option>))}
                            </Input>
                            </Col>
                            <Col md="4" sm="4" xs="4" lg="4">
                            <Input type="number" onChange={e=>this.handleRateChangeWed(value.id,e.target.value)}/>
                            </Col>
                            <Col md="2" sm="2" xs="2" lg="2" className="text-center">

                            <i className="fa fa-trash" style={{color:"red",fontSize:"20px",marginTop:"15px",cursor:"pointer"}} onClick={()=>this.handleDeleteWed(value.id)}/>
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
                {/* tab 4 */}
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
                        value={this.state.startTimeThurs}
                        onChange={e=>this.setState({startTimeThurs:e.target.value})}
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
                        value={this.state.EndTimeThurs}
                        onChange={e=>this.setState({EndTimeThurs:e.target.value})}
                        placeholder="time placeholder"
                        />
                    </FormGroup>
                    </Col> 
                    </Row>
                    <Row>
                        <Col md="6">
                        <Row>
                        <Col>
                        Number of Slots : 
                        </Col>
                        <Col>
                        <Input type="number" min="0" placeholder="number of slots" value={this.state.slotNumberThurs} onChange={e=>this.setState({slotNumberThurs:e.target.value})}/>
                        </Col>
                        </Row>    
                        </Col>
                        
                    </Row>
                    <br/> 
                    <Row>
                        <Col md="3" sm="3" xs="3" lg="3">
                        <Label>Duration</Label>
                        <Input type="number" min="0" value={this.state.durationThurs} onChange={e=>this.setState({durationThurs:e.target.value})}/>
                        </Col>
                        <Col md="3" sm="3" xs="3" lg="3">
                        <Label>Unit</Label>
                        <Input type="select" value={this.state.unitThurs} onChange={e=>this.setState({unitThurs:e.target.value})}>
                            {this.state.units.map(value=>(<option key={value.id} value={value.unit}>{value.unit}</option>))}
                        </Input>
                        </Col>
                        <Col md="4" sm="4" xs="4" lg="4">
                        <Label>Rate</Label>
                        <Input type="number" min="0" value={this.state.rateThurs} onChange={e=>this.setState({rateThurs:e.target.value})}/>
                        </Col>
                        <Col md="2" sm="2" xs="2" lg="2" className="text-center">
                        <Button
                        onClick={()=>this.AddSlotThursday()}
                        style={{marginTop:"30px",backgroundColor:"#404E67",color:"white"}}
                        >
                        <i className="fa fa-plus"/>
                        </Button>
                        </Col>
                    </Row>
                    {this.state.newSlotThurs.map((value,index)=>(
                        <Row key={index} style={{marginTop:"10px"}}>
                            <Col md="3" sm="3" xs="3" lg="3">
                            <Input type="number" onChange={e=>this.handleDurationChangeThurs(value.id,e.target.value)}/>
                            </Col>
                            <Col md="3" sm="3" xs="3" lg="3">
                            <Input type="select" onChange={e=>this.handleUnitChangeThurs(value.id, e.target.value)}>
                            {this.state.units.map(value=>(<option key={value.id} value={value.unit}>{value.unit}</option>))}
                            </Input>
                            </Col>
                            <Col md="4" sm="4" xs="4" lg="4">
                            <Input type="number" onChange={e=>this.handleRateChangeThurs(value.id, e.target.value)}/>
                            </Col>
                            <Col md="2" sm="2" xs="2" lg="2" className="text-center">

                            <i className="fa fa-trash" style={{color:"red",fontSize:"20px",marginTop:"15px",cursor:"pointer"}} onClick={()=>this.handleDeleteThurs(value.id)}/>
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
                {/* tab 5 */}
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
                        value={this.state.startTimeFri}
                        onChange={e=>this.setState({startTimeFri:e.target.value})}
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
                        value={this.state.EndTimeFri}
                        onChange={e=>this.setState({EndTimeFri:e.target.value})}
                        placeholder="time placeholder"
                        />
                    </FormGroup>
                    </Col> 
                    </Row>
                    <Row>
                        <Col md="6">
                        <Row>
                        <Col>
                        Number of Slots : 
                        </Col>
                        <Col>
                        <Input type="number" min="0" placeholder="number of slots" value={this.state.slotNumberFri} onChange={e=>this.setState({slotNumberFri:e.target.value})}/>
                        </Col>
                        </Row>    
                        </Col>
                        
                    </Row>
                    <br/> 
                    <Row>
                        <Col md="3" sm="3" xs="3" lg="3">
                        <Label>Duration</Label>
                        <Input type="number" min="0" value={this.state.durationFri} onChange={e=>this.setState({durationFri:e.target.value})}/>
                        </Col>
                        <Col md="3" sm="3" xs="3" lg="3">
                        <Label>Unit</Label>
                        <Input type="select"  value={this.state.unitFri} onChange={e=>this.setState({unitFri:e.target.value})}>
                            {this.state.units.map(value=>(<option key={value.id} value={value.unit}>{value.unit}</option>))}
                        </Input>
                        </Col>
                        <Col md="4" sm="4" xs="4" lg="4">
                        <Label>Rate</Label>
                        <Input type="number" min="0" value={this.state.rateFri} onChange={e=>this.setState({rateFri:e.target.value})}/>
                        </Col>
                        <Col md="2" sm="2" xs="2" lg="2" className="text-center">
                        <Button
                        onClick={()=>this.AddSlotFriday()}
                        style={{marginTop:"30px",backgroundColor:"#404E67",color:"white"}}
                        >
                        <i className="fa fa-plus"/>
                        </Button>
                        </Col>
                    </Row>
                    {this.state.newSlotFri.map((value,index)=>(
                        <Row key={index} style={{marginTop:"10px"}}>
                            <Col md="3" sm="3" xs="3" lg="3">
                            <Input type="number" onChange={e=>this.handleDurationChangeFri(value.id,e.target.value)}/>
                            </Col>
                            <Col md="3" sm="3" xs="3" lg="3">
                            <Input type="select" onChange={e=>this.handleUnitChangeFri(value.id,e.target.value)}>
                            {this.state.units.map(value=>(<option key={value.id} value={value.unit}>{value.unit}</option>))}
                            </Input>
                            </Col>
                            <Col md="4" sm="4" xs="4" lg="4">
                            <Input type="number" onChange={e=>this.handleRateChangeFri(value.id,e.target.value)}/>
                            </Col>
                            <Col md="2" sm="2" xs="2" lg="2" className="text-center">

                            <i className="fa fa-trash" style={{color:"red",fontSize:"20px",marginTop:"15px",cursor:"pointer"}} onClick={()=>this.handleDeleteFri(value.id)}/>
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
                {/* tab 6 */}
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
                        value={this.state.startTimeSat}
                        onChange={e=>this.setState({startTimeSat:e.target.value})}
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
                        value={this.state.EndTimeSat}
                        onChange={e=>this.setState({EndTimeSat:e.target.value})}
                        placeholder="time placeholder"
                        />
                    </FormGroup>
                    </Col> 
                    </Row>
                    <Row>
                        <Col md="6">
                        <Row>
                        <Col>
                        Number of Slots : 
                        </Col>
                        <Col>
                        <Input type="number" min="0" placeholder="number of slots" value={this.state.slotNumberSat} onChange={e=>this.setState({slotNumberSat:e.target.value})}/>
                        </Col>
                        </Row>    
                        </Col>
                        
                    </Row>
                    <br/> 
                    <Row>
                        <Col md="3" sm="3" xs="3" lg="3">
                        <Label>Duration</Label>
                        <Input type="number" min="0" value={this.state.durationSat} onChange={e=>this.setState({durationSat:e.target.value})}/>
                        </Col>
                        <Col md="3" sm="3" xs="3" lg="3">
                        <Label>Unit</Label>
                        <Input type="select" value={this.state.unitSat} onChange={e=>this.setState({unitSat:e.target.value})}>
                            {this.state.units.map(value=>(<option key={value.id} value={value.unit}>{value.unit}</option>))}
                        </Input>
                        </Col>
                        <Col md="4" sm="4" xs="4" lg="4">
                        <Label>Rate</Label>
                        <Input type="number" min="0" value={this.state.rateSat} onChange={e=>this.setState({rateSat:e.target.value})}/>
                        </Col>
                        <Col md="2" sm="2" xs="2" lg="2" className="text-center">
                        <Button
                        onClick={()=>this.AddSlotSaturday()}
                        style={{marginTop:"30px",backgroundColor:"#404E67",color:"white"}}
                        >
                        <i className="fa fa-plus"/>
                        </Button>
                        </Col>
                    </Row>
                    {this.state.newSlotSat.map((value,index)=>(
                        <Row key={index} style={{marginTop:"10px"}}>
                            <Col md="3" sm="3" xs="3" lg="3">
                            <Input type="number" onChange={e=>this.handleDurationChangeSat(value.id,e.target.value)}/>
                            </Col>
                            <Col md="3" sm="3" xs="3" lg="3">
                            <Input type="select" onChange={e=>this.handleUnitChangeSat(value.id,e.target.value)}>
                            {this.state.units.map(value=>(<option key={value.id} value={value.unit}>{value.unit}</option>))}
                            </Input>
                            </Col>
                            <Col md="4" sm="4" xs="4" lg="4">
                            <Input type="number"onChange={e=>this.handleRateChangeSat(value.id,e.target.value)}/>
                            </Col>
                            <Col md="2" sm="2" xs="2" lg="2" className="text-center">

                            <i className="fa fa-trash" style={{color:"red",fontSize:"20px",marginTop:"15px",cursor:"pointer"}} onClick={()=>this.handleDeleteSat(value.id)}/>
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
                {/* tab 7 */}
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
                        value={this.state.startTimeSun}
                        onChange={e=>this.setState({startTimeSun:e.target.value})}
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
                        value={this.state.EndTimeSun}
                        onChange={e=>this.setState({EndTimeSun:e.target.value})}
                        placeholder="time placeholder"
                        />
                    </FormGroup>
                    </Col> 
                    </Row>
                    <Row>
                        <Col md="6">
                        <Row>
                        <Col>
                        Number of Slots : 
                        </Col>
                        <Col>
                        <Input type="number" min="0" placeholder="number of slots" value={this.state.slotNumberSun} onChange={e=>this.setState({slotNumberSun:e.target.value})}/>
                        </Col>
                        </Row>    
                        </Col>
                        
                    </Row>
                    <br/> 
                    <Row>
                        <Col md="3" sm="3" xs="3" lg="3">
                        <Label>Duration</Label>
                        <Input type="number" min="0" value={this.state.durationSun} onChange={e=>this.setState({durationSun:e.target.value})}/>
                        </Col>
                        <Col md="3" sm="3" xs="3" lg="3">
                        <Label>Unit</Label>
                        <Input type="select" value={this.state.unitSun} onChange={e=>this.setState({unitSun:e.target.value})}>
                            {this.state.units.map(value=>(<option key={value.id} value={value.unit}>{value.unit}</option>))}
                        </Input>
                        </Col>
                        <Col md="4" sm="4" xs="4" lg="4">
                        <Label>Rate</Label>
                        <Input type="number" min="0" value={this.state.rateSun} onChange={e=>this.setState({rateSun:e.target.value})}/>
                        </Col>
                        <Col md="2" sm="2" xs="2" lg="2" className="text-center">
                        <Button
                        onClick={()=>this.AddSlotSunday()}
                        style={{marginTop:"30px",backgroundColor:"#404E67",color:"white"}}
                        >
                        <i className="fa fa-plus"/>
                        </Button>
                        </Col>
                    </Row>
                    {this.state.newSlotSun.map((value,index)=>(
                        <Row key={index} style={{marginTop:"10px"}}>
                            <Col md="3" sm="3" xs="3" lg="3">
                            <Input type="number" onChange={e=>this.handleDurationChangeSun(value.id,e.target.value)}/>
                            </Col>
                            <Col md="3" sm="3" xs="3" lg="3">
                            <Input type="select" onChange={e=>this.handleUnitChangeSun(value.id,e.target.value)}>
                            {this.state.units.map(value=>(<option key={value.id} value={value.unit}>{value.unit}</option>))}
                            </Input>
                            </Col>
                            <Col md="4" sm="4" xs="4" lg="4">
                            <Input type="number" onChange={e=>this.handleRateChangeSun(value.id,e.target.value)}/>
                            </Col>
                            <Col md="2" sm="2" xs="2" lg="2" className="text-center">

                            <i className="fa fa-trash" style={{color:"red",fontSize:"20px",marginTop:"15px",cursor:"pointer"}} onClick={()=>this.handleDeleteSun(value.id)}/>
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

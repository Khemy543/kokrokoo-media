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
  Button,Modal, ModalBody,ModalHeader, ModalFooter,
  InputGroup,InputGroupAddon,InputGroupText,Table, Form
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import axios from "axios";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";

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

function Calender(props){
    const [eventData, setEventData] = React.useState([]);
    const [id, setId] = React.useState(null);
    const [rateCards, setRateCards] = React.useState([]);
    const [selectCard, setSelectedCard]= React.useState([]);
    const [modal, setModal]=React.useState(false);
    const [spotNumber, setSpotNumber]=React.useState("");
    const [radioInfo, setRadioInfo]=React.useState([]);
    const [title, setTitle] = React.useState(props.location.state.videoTitle);
    const [inCart_id ,setInCart_id ] = React.useState("");
    const [subscriptionid, setSubscriptionid] = React.useState(null);
    const  [rateTotal, setRateTotal] = React.useState(0);
    const [isActive, setIsActive] = React.useState(false);



    const toggle =() => setModal(!modal);
    var save = [];

    const {
        buttonLabel,
        className
      } = props;

      console.log("ne:",props.location.state)
      let newEvents = [];
      var i; var x =1;
      const card_details = props.location.state.rate_card.card_details;
      
      React.useEffect(()=>{
          setRateCards(card_details)
          console.log("im there")
          console.log(card_details)
          let my_card_data = props.location.state.rate_card.card_details;
          var new_card_details = [];
        var j=0; let n = 1
        for(j=0; j<my_card_data.length; j++){
            
            my_card_data[j].id = `${n}`;
            new_card_details.push(my_card_data[j])
            n++;
            
        }
        console.log("my_card:",new_card_details)
        
        setRateCards(new_card_details)
        


        for(i=0; i<card_details.length; i++){
            
            if(card_details[i].day === "Monday"){
            newEvents.push({title:card_details[i].day, daysOfWeek:['1'],id:x});
            x++;
            }
            if(card_details[i].day === "Tuesday"){
                newEvents.push({title:card_details[i].day, daysOfWeek:['2'],id:x});
                x++;
                }
                if(card_details[i].day === "Wednesday"){
                    newEvents.push({title:card_details[i].day, daysOfWeek:['3'],id:x});
                    x++;
                    }
                    if(card_details[i].day === "Thursday"){
                        newEvents.push({title:card_details[i].day, daysOfWeek:['4'],id:x});
                        x++;
                        }
                        if(card_details[i].day === "Friday"){
                            newEvents.push({title:card_details[i].day, daysOfWeek:['5'],id:x});
                            x++;
                            }
                            if(card_details[i].day === "Saturday"){
                                newEvents.push({title:card_details[i].day, daysOfWeek:['6'],id:x});
                                x++;
                                }
                                if(card_details[i].day === "Sunday"){
                                    newEvents.push({title:card_details[i].day, daysOfWeek:['7'],id:x});
                                    x++;
                                    }
            
        }
        setEventData(newEvents)
        console.log("newEvents:",newEvents)


        var file = props.location.state.media_file;
        var reader = new FileReader(file);
        console.log("file:", reader.duration)
      },[])

     const handleDateClick=(calEvent, jsEvent, view, resourceObj)=>{
         console.log(calEvent.event._def.publicId)
         const card_details_id = calEvent.event._def.publicId;
         const selectedCard = getRateCard(card_details_id);
         console.log("my_card sel:",selectedCard);
         setSelectedCard(selectedCard);
         setModal(true);
     }

     const getRateCard=(id)=>{
         const tempRateCards = rateCards;
         const selectedRateCard = tempRateCards.find(item=> item.id === id);
         return selectedRateCard;
     }

     const handleUpload=(e)=>{
         setIsActive(true)
         if(subscriptionid===null){
             alert("no saved items")
         }
         else{
        let file  =props.location.state.videoFile;
        console.log(file);
        let formData = new FormData();
        formData.append('ad',file);
        var options = { content: formData };
        console.log("bdy:",formData)
         axios({method:'post', url:"https://kokrokooad.herokuapp.com/api/"+subscriptionid+"/upload-ad",
         data:formData,headers:{'Authorization':`Bearer ${user}`, "Content-Type":"mutipart/form-data"}})
         .then(res=>{
             console.log(res.data);
             if(res.data.status === "ad saved"){
                alert("subscription created")
                setIsActive(false);
             }
         })
         .catch(error=>{
             console.log(error)
             setIsActive(false)
         })
     }
    }
    
    const handleCompare=(duration,unit)=>{
        console.log("compare", duration,unit);
        if(unit === 'Hr'){
            duration = duration*3600;
            if(duration < props.location.state.file_duration){
                return true
            }
            else{
                return false
            }
        }else

        if(unit === 'Min'){
            duration = duration*60;
            if(duration < props.location.state.file_duration){
                return true
            }else{
                return false
            }
        }else

        if(unit === 'Sec'){
            if(duration < props.location.state.file_duration){
                
                return true
            }
            else{
                return false
            }
        }
    }

      const handleSave=(e)=>{
        e.preventDefault();
        radioInfo.total = rateTotal;
        radioInfo.spotNumber = spotNumber;
        radioInfo.rate_card_title = props.location.state.rate_card.title;
        radioInfo.videoDuration = props.location.state.file_duration;
        radioInfo.ratecard_id = props.location.state.rate_card.id;
        radioInfo.day = selectCard.id;
        radioInfo.inCart_id = inCart_id;
        radioInfo.videoTitle = title;
        console.log("selected:", radioInfo, "spot number:",spotNumber);

        let url = ""; let method = "";
        if(subscriptionid === null){
            url = "https://kokrokooad.herokuapp.com/api/subscription/create";
            method = "post";
        }
        else{
            url = "https://kokrokooad.herokuapp.com/api/subscription/"+subscriptionid+"/update";
            method = "patch";
        }
        setIsActive(true)
        axios({method:method, url:url,data:{ratecard_id:props.location.state.rate_card.id, segment:radioInfo, title:title},
            headers:{ 'Authorization':`Bearer ${user}`}
                })
        .then(res=>{
            console.log(res.data);
            if(res.data.success === "success"){
                console.log("saved");
                console.log("myid",subscriptionid)
                setSubscriptionid(res.data.scheduled_ad_id);
                setSpotNumber("");
                setRateTotal(0)
                setModal(false);
                setRadioInfo([]);
                setIsActive(false);
                alert("saved")
            }
            else if(res.data.status === "Updated"){
                console.log("saved");
                console.log("myid",subscriptionid)
                //setSubscriptionid(res.data.scheduled_ad_id);
                setSpotNumber("");
                setRateTotal(0)
                setModal(false);
                setRadioInfo([]);
                setIsActive(false);
                alert("saved")
            }
        })
        .catch(error=>{
            console.log(error.response.data)
        })
      }
    return (
      <>
      <LoadingOverlay 
      active = {isActive}
      spinner={<BounceLoader color={'#4071e1'}/>}
      >
        <Header />
        {/* Page content */}
        <Container className=" mt--7" fluid>
          {/* Table */}

          <Row>
            <Col md="12">
            <FullCalendar
            plugins={[ dayGridPlugin ]}
            initialView="dayGridMonth"
            events={eventData}
            eventClick = {handleDateClick}
            height="100vh"
            />
        {console.log("eventData",eventData)}
            </Col>
          </Row>
          <br/>
          <Row>
           <Col md="8">
           </Col>
           <Col md="4">
          <Button className="text-uppercase" color="info" style={{float:"right"}} onClick={handleUpload}>
                Subscribe
            </Button>
           </Col> 
          </Row> 
          

          <Modal isOpen={modal} style={{ maxWidth:"90%"}}>
          <LoadingOverlay 
            active = {isActive}
            spinner={<BounceLoader color={'#4071e1'}/>}
            >
          <Form onSubmit={handleSave}>
            <ModalHeader style={{maxWidth:"100%"}}>
            <div style={{width:"100%"}}> 
            <Row>
            <Col md="12">    
              <h4 className="text-uppercase">{props.location.state.rate_card.title}</h4>
              <h4 className="text-uppercase">{selectCard.day}</h4>
              <h4 >UPLOADED VIDEO DURATION : {props.location.state.file_duration} sec</h4>
              <h4>TOTAL :¢ {rateTotal}</h4>
              </Col>
              </Row>
              </div>
              </ModalHeader>
              <ModalBody>
              <InputGroup>
                        <Input placeholder="Enter Title" type="text" style={{width:"100%"}} value={title} onChange={e=>setTitle(e.target.value)}/>
                </InputGroup>
                <br/>
                
                <h5>Time: {selectCard.time}</h5>
                <h5>Enter number of spots <input type="number" value={spotNumber} max={selectCard.spot} min={1} required onChange={e=>{setSpotNumber(e.target.value); setRateTotal(e.target.value*radioInfo.rate)}} disabled={radioInfo.length<=0}/> 1 to {selectCard.spot}</h5>
                <Table bordered>
                <thead style={{backgroundColor:"#353c4e", color:"white", fontSize:"12px"}}>
                        <tr>
                        <th>#</th>
                        <th>Duration</th>
                        <th>rate</th>
                        <th>select</th>
                        </tr>
                    </thead>
                    <tbody>
                        {console.log("check:",selectCard.rate_details)}
                        {selectCard.rate_details && selectCard.rate_details.map((value,i)=>(
                        <tr>
                        <th>{i+1}</th>
                        <td>{value.duration} {value.unit}</td>
                        <td>{value.rate}</td>
                        <td><input type="radio" id={`${i}`} name="rate" value={i} onChange={e=>{setRadioInfo(selectCard.rate_details[e.target.value]); setInCart_id(e.target.value)}} disabled={handleCompare(value.duration,value.unit)}/></td>
                        </tr>
                    ))}
                    </tbody>
                    </Table>
                    
                </ModalBody>
              <ModalFooter>
                  <Button color="info" type="submit">save</Button>
                  <Button color="danger" onClick={toggle}>close</Button>
                </ModalFooter>
                </Form>
                </LoadingOverlay>
            </Modal>
                    
        </Container>
        </LoadingOverlay>
      </>
    );
  }


export default Calender;
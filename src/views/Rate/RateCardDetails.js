
import React from "react";
import  { Prompt } from 'react-router-dom';
import NavigationPrompt from "react-router-navigation-prompt";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Input,
  Button,
  CardFooter,
  Nav,NavItem,NavLink,TabContent,TabPane,FormGroup,Label, FormFeedback, Spinner,ModalHeader,ModalFooter,Modal
} from "reactstrap";
import classnames from 'classnames';
// core components
import Header from "components/Headers/Header.js";
import LoadingOverlay from "react-loading-overlay";
import FadeLoader from "react-spinners/FadeLoader";
import axios from "axios";

let user = localStorage.getItem("access_token");
var domain = "https://media-backend.kokrokooad.com";

class RateCardDetails extends React.Component{
    state={
        dataUnsaved:true,
        isActive:false,
        isActiveSpinner:false,
        activeTab:"1",
        days:[],
        units:[],
        title:"",
        allow:true,
        modal:false,
        alertmessage:"",

        slotValue:2,
        newSlot:[],
        duration:"",
        unit:1,
        rate:"",
        startTime:"",
        EndTime:"",
        oldTImeFrames:[],
        slotNumber:"",
        timeCheck:false,

        slotValueTues:2,
        newSlotTues:[],
        durationTues:"",
        unitTues:1,
        rateTues:"",
        startTimeTues:"",
        EndTimeTues:"",
        slotNumberTues:"",
        oldTImeFramesTues:[],
        timeCheckTues:false,

        slotValueWed:2,
        newSlotWed:[],
        durationWed:"",
        unitWed:1,
        rateWed:"",
        startTimeWed:"",
        EndTimeWed:"",
        slotNumberWed:"",
        oldTImeFramesWed:[],
        timeCheckWed:false,

        slotValueThurs:2,
        newSlotThurs:[],
        durationThurs:"",
        unitThurs:1,
        rateThurs:"",
        startTimeThurs:"",
        EndTimeThurs:"",
        slotNumberThurs:"",
        oldTImeFramesThurs:[],
        timeCheckThurs:false,

        slotValueFri:2,
        newSlotFri:[],
        durationFri:"",
        unitFri:1,
        rateFri:"",
        startTimeFri:"",
        EndTimeFri:"",
        slotNumberFri:"",
        oldTImeFramesFri:[],
        timeCheckFri:false,

        slotValueSat:2,
        newSlotSat:[],
        durationSat:"",
        unitSat:1,
        rateSat:"",
        startTimeSat:"",
        EndTimeSat:"",
        slotNumberSat:"",
        oldTImeFramesSat:[],
        timeCheckSat:false,

        slotValueSun:2,
        newSlotSun:[],
        durationSun:"",
        unitSun:1,
        rateSun:"",
        startTimeSun:"",
        EndTimeSun:"",
        slotNumberSun:"",
        oldTImeFramesSun:[],
        timeCheckSun:false
    }

    componentDidMount(){
        this.setState({isActiveSpinner:true});
        console.log(this.props.location)
        if(this.props.location.state !== undefined){
            this.setState({title:this.props.location.state.rate_title});
        }
        else{
            this.props.history.push("/media/create-ratecards")
        }
        

        axios.get(`${domain}/api/fetch-days-and-units`)
        .then(res=>{
            console.log(res.data)
            this.setState({days:res.data.days, units:res.data.units,isActiveSpinner:false})
        })
    }

    componentWillUnmount(){
        console.log(this.props.location)
    }
    
    toggle = tab => {
        if(this.state.activeTab !== tab) this.setState({activeTab:tab});
      }

    AddSlotMonday=()=>{
        var tempSlot = [...this.state.newSlot];
        console.log(tempSlot)
        if(this.state.duration !=="" && this.state.rate !== "" && this.state.newSlot.length <=0 ){
            tempSlot.push({id:this.state.slotValue,duration:"",unit_id:1,rate:""});
            console.log("first:",tempSlot)
            return(this.setState({newSlot:tempSlot, slotValue:this.state.slotValue+1}));
        }
        else
        if(this.state.duration !=="" && this.state.rate !== "" && this.state.newSlot.length > 0){
           let lastElement = tempSlot[tempSlot.length -1];
            if(lastElement.duration && lastElement.rate){
                tempSlot.push({id:this.state.slotValue,duration:"",unit_id:1,rate:""});
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
        selectedIndex.unit_id = value;
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
        console.log("temp",newArray)
        return(this.setState({newSlot:newArray}))
    }

    handleSubmit=(e)=>{
       console.log("start submitting");
       this.setState({isActive:true});
        /* check time */
       
       if(this.state.oldTImeFrames.length <= 0 && this.state.startTime<this.state.EndTime){
        let tempSlot = [...this.state.newSlot];
        tempSlot.unshift({id:1,duration:this.state.duration,unit_id:this.state.unit,rate:this.state.rate});
         console.log(tempSlot);
         axios.post(`${domain}/api/ratecard/${this.props.location.state.title_id}/add-details`,
         {start_time:this.state.startTime, end_time:this.state.EndTime, day_id:1, durations:tempSlot, no_of_spots:this.state.slotNumber,rate_card_title:this.state.title},
         {headers:{ 'Authorization':`Bearer ${user}`}}) 
         .then(res=>{
             console.log(res.data);
             if(res.data.status === "success"){
             this.setState({
                 isActive:false,
                 oldTImeFrames:res.data.segments,
                 duration:"",
                 unit:1,
                 rate:"",
                 startTime:"",
                 EndTime:"",
                 slotNumber:"",
                 newSlot:[],
                 modal:true,
                 alertmessage:"Saved!!"
                });
             }
         })
         .catch(error=>{
             console.log(error)
         })
 
       }
       else{
           var checker;
           for(var i =0; i<this.state.oldTImeFrames.length; i++){
               if(this.state.startTime < this.state.oldTImeFrames[i].end_time && this.state.EndTime>this.state.oldTImeFrames[i].start_time){
                    this.setState({isActive:false, alertmessage:"Selected Time Intersects With A Saved Time", modal:true})
                    checker = false;
                    break;
               }
               else{
                   checker = true;
                   continue;
                
               }
           }

           if(checker === true && this.state.startTime<this.state.EndTime){
            let tempSlot = [...this.state.newSlot];
            tempSlot.unshift({id:1,duration:this.state.duration,unit_id:this.state.unit,rate:this.state.rate});
             console.log(tempSlot);
             axios.post(`${domain}/api/ratecard/${this.props.location.state.title_id}/add-details`,
             {start_time:this.state.startTime, end_time:this.state.EndTime, day_id:1, durations:tempSlot, no_of_spots:this.state.slotNumber,rate_card_title:this.state.title},
             {headers:{ 'Authorization':`Bearer ${user}`}}) 
             .then(res=>{
                 console.log(res.data);
                 if(res.data.status === "success"){
                 this.setState({
                    isActive:false,
                    oldTImeFrames:res.data.segments,
                    duration:"",
                    unit:1,
                    rate:"",
                    startTime:"",
                    EndTime:"",
                    slotNumber:"",
                    newSlot:[],
                    modal:true,
                    alertmessage:"Saved!!"
                });
                 
                 }
             })
             .catch(error=>{
                 console.log(error)
             })
           }
           else{
               this.setState({isActive:false})
           }
       }
       
        }

    /* tab 2 */

    AddSlotTuesday=()=>{
        var tempSlot = [...this.state.newSlotTues];
        console.log(tempSlot)
        if(this.state.durationTues !=="" && this.state.rateTues !== "" && this.state.newSlotTues.length <=0 ){
            tempSlot.push({id:this.state.slotValueTues,duration:"",unit_id:1,rate:""});
            console.log("first:",tempSlot)
            return(this.setState({newSlotTues:tempSlot, slotValueTues:this.state.slotValueTues+1}));
        }
        else
        if(this.state.durationTues !=="" && this.state.rateTues !== "" && this.state.newSlotTues.length > 0){
           let lastElement = tempSlot[tempSlot.length -1];
            if(lastElement.duration && lastElement.rate){
                tempSlot.push({id:this.state.slotValueTues,duration:"",unit_id:1,rate:""});
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
        selectedIndex.unit_id = value;
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
        console.log("start submitting");
        this.setState({isActive:true});
        if(this.state.oldTImeFramesTues.length<=0 && this.state.startTimeTues<this.state.EndTimeTues){
        let tempSlot = [...this.state.newSlotTues];
        tempSlot.unshift({id:1,duration:this.state.durationTues,unit_id:this.state.unitTues,rate:this.state.rateTues});
         console.log(tempSlot);
         axios.post(`${domain}/api/ratecard/${this.props.location.state.title_id}/add-details`,
         {start_time:this.state.startTimeTues, end_time:this.state.EndTimeTues, day_id:2, durations:tempSlot, no_of_spots:this.state.slotNumberTues,rate_card_title:this.state.title},
         {headers:{ 'Authorization':`Bearer ${user}`}}) 
         .then(res=>{
             console.log(res.data);
             if(res.data.status === "success"){
                this.setState({
                    isActive:false, 
                    oldTImeFramesTues:res.data.segments,
                    durationTues:"",
                    unitTues:1,
                    rateTues:"",
                    startTimeTues:"",
                    EndTimeTues:"",
                    slotNumberTues:"",
                    newSlotTues:[],
                    modal:true,
                    alertmessage:"Saved!!"
                });

             }
         })
         .catch(error=>{
             console.log(error)
         })
        }
        else{
            var checker;
            for(var i =0; i<this.state.oldTImeFramesTues.length; i++){
                if(this.state.startTimeTues < this.state.oldTImeFramesTues[i].end_time){
                     this.setState({isActive:false, alertmessage:"Selected Time Intersects With A Saved Time", modal:true})
                     checker = false;
                     break;
                }
                else{
                    checker = true;
                    continue;
                 
                }
            }
 
            if(checker === true && this.state.startTimeTues<this.state.EndTimeTues){
                let tempSlot = [...this.state.newSlotTues];
                tempSlot.unshift({id:1,duration:this.state.durationTues,unit_id:this.state.unitTues,rate:this.state.rateTues});
                 console.log(tempSlot);
                 axios.post(`${domain}/api/ratecard/${this.props.location.state.title_id}/add-details`,
                 {start_time:this.state.startTimeTues, end_time:this.state.EndTimeTues, day_id:2, durations:tempSlot, no_of_spots:this.state.slotNumberTues,rate_card_title:this.state.title},
                 {headers:{ 'Authorization':`Bearer ${user}`}}) 
                 .then(res=>{
                     console.log(res.data);
                     if(res.data.status === "success"){
                        this.setState({isActive:false, 
                            oldTImeFramesTues:res.data.segments,
                            durationTues:"",
                            unitTues:1,
                            rateTues:"",
                            startTimeTues:"",
                            EndTimeTues:"",
                            slotNumberTues:"",
                            newSlotTues:[],
                            modal:true,
                            alertmessage:"Saved!!"
                        });
        
                     }
                 })
                 .catch(error=>{
                     console.log(error)
                 })
            }
            else{
                this.setState({isActive:false})
            }
        }
        
        }
    

    /* tab 3 */

    AddSlotWednesday=()=>{
        var tempSlot = [...this.state.newSlotWed];
        console.log(tempSlot)
        if(this.state.durationWed !=="" && this.state.rateWed !== "" && this.state.newSlotWed.length <=0 ){
            tempSlot.push({id:this.state.slotValueWed,duration:"",unit_id:1,rate:""});
            console.log("first:",tempSlot)
            return(this.setState({newSlotWed:tempSlot, slotValueWed:this.state.slotValueWed+1}));
        }
        else
        if(this.state.durationWed !=="" && this.state.rateWed !== "" && this.state.newSlotWed.length > 0){
           let lastElement = tempSlot[tempSlot.length -1];
            if(lastElement.duration && lastElement.rate){
                tempSlot.push({id:this.state.slotValueWed,duration:"",unit_id:1,rate:""});
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
        selectedIndex.unit_id = value;
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
        console.log("start submitting");
        this.setState({isActive:true});
        if(this.state.oldTImeFramesWed<=0 && this.state.startTimeWed<this.state.EndTimeWed){
        let tempSlot = [...this.state.newSlotWed];
        tempSlot.unshift({id:1,duration:this.state.durationWed,unit_id:this.state.unitWed,rate:this.state.rateWed});
         console.log(tempSlot);
         axios.post(`${domain}/api/ratecard/${this.props.location.state.title_id}/add-details`,
         {start_time:this.state.startTimeWed, end_time:this.state.EndTimeWed, day_id:3, durations:tempSlot, no_of_spots:this.state.slotNumberWed,rate_card_title:this.state.title},
         {headers:{ 'Authorization':`Bearer ${user}`}}) 
         .then(res=>{
             console.log("data:",res.data);
             if(res.data.status === "success"){
                this.setState({isActive:false, 
                    oldTImeFramesWed:res.data.segments,
                    durationWed:"",
                    unitWed:1,
                    rateWed:"",
                    startTimeWed:"",
                    EndTimeWed:"",
                    slotNumberWed:"",
                    newSlotWed:[],
                    modal:true,
                    alertmessage:"Saved!!"
                });
             }
         })
         .catch(error=>{
             console.log(error.response.data)
         })
        }
        else{
            var checker;
            for(var i =0; i<this.state.oldTImeFramesWed.length; i++){
                if(this.state.startTimeWed < this.state.oldTImeFramesWed[i].end_time){
                     this.setState({isActive:false, alertmessage:"Selected Time Intersects With A Saved Time", modal:true})
                     checker = false;
                     break;
                }
                else{
                    checker = true;
                    continue;
                 
                }
            }
 
            if(checker === true && this.state.startTimeWed<this.state.EndTimeWed){
                let tempSlot = [...this.state.newSlotWed];
                tempSlot.unshift({id:1,duration:this.state.durationWed,unit_id:this.state.unitWed,rate:this.state.rateWed});
                 console.log(tempSlot);
                 axios.post(`${domain}/api/ratecard/${this.props.location.state.title_id}/add-details`,
                 {start_time:this.state.startTimeWed, end_time:this.state.EndTimeWed, day_id:3, durations:tempSlot, no_of_spots:this.state.slotNumberWed,rate_card_title:this.state.title},
                 {headers:{ 'Authorization':`Bearer ${user}`}}) 
                 .then(res=>{
                     console.log("data:",res.data);
                     if(res.data.status === "success"){
                        this.setState({isActive:false, 
                            oldTImeFramesWed:res.data.segments,
                            durationWed:"",
                            unitWed:1,
                            rateWed:"",
                            startTimeWed:"",
                            EndTimeWed:"",
                            slotNumberWed:"",
                            newSlotWed:[],
                            modal:true,
                            alertmessage:"Saved!!"
                        });
        
                     }
                 })
                 .catch(error=>{
                     console.log(error.response.data)
                 })
            }

        }
    }

    /* tab 4 */
    AddSlotThursday=()=>{
        var tempSlot = [...this.state.newSlotThurs];
        console.log(tempSlot)
        if(this.state.durationThurs !=="" && this.state.rateThurs !== "" && this.state.newSlotThurs.length <=0 ){
            tempSlot.push({id:this.state.slotValueThurs,duration:"",unit_id:1,rate:""});
            console.log("first:",tempSlot)
            return(this.setState({newSlotThurs:tempSlot, slotValueThurs:this.state.slotValueThurs+1}));
        }
        else
        if(this.state.durationThurs !=="" && this.state.rateThurs !== "" && this.state.newSlotThurs.length > 0){
           let lastElement = tempSlot[tempSlot.length -1];
            if(lastElement.duration && lastElement.rate){
                tempSlot.push({id:this.state.slotValueThurs,duration:"",unit_id:1,rate:""});
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
        selectedIndex.unit_id = value;
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
        console.log("start submitting");
        this.setState({isActive:true})
        if(this.state.oldTImeFramesThurs.length <=0 && this.state.startTimeThurs<this.state.EndTimeThurs){
        let tempSlot = [...this.state.newSlotThurs];
        tempSlot.unshift({id:1,duration:this.state.durationThurs,unit_id:this.state.unitThurs,rate:this.state.rateThurs});
         console.log(tempSlot);
         axios.post(`${domain}/api/ratecard/${this.props.location.state.title_id}/add-details`,
         {start_time:this.state.startTimeThurs, end_time:this.state.EndTimeThurs, day_id:4, durations:tempSlot, no_of_spots:this.state.slotNumberThurs,rate_card_title:this.state.title},
         {headers:{ 'Authorization':`Bearer ${user}`}}) 
         .then(res=>{
             console.log("data:",res.data);
             if(res.data.status === "success"){
                this.setState({isActive:false, 
                    oldTImeFramesThurs:res.data.segments,
                    durationThurs:"",
                    unitThurs:1,
                    rateThurs:"",
                    startTimeThurs:"",
                    EndTimeThurs:"",
                    slotNumberThurs:"",
                    newSlotThurs:[],
                    modal:true,
                    alertmessage:"Saved!!"
                });
             }
         })
         .catch(error=>{
             console.log(error.response.data)
         })
        }
        else{
            var checker;
            for(var i =0; i<this.state.oldTImeFramesThurs.length; i++){
                if(this.state.startTimeThurs < this.state.oldTImeFramesThurs[i].end_time){
                     this.setState({isActive:false, alertmessage:"Selected Time Intersects With A Saved Time", modal:true})
                     checker = false;
                     break;
                }
                else{
                    checker = true;
                    continue;
                 
                }
            }
 
            if(checker === true && this.state.startTimeThurs<this.state.EndTimeThurs){
                let tempSlot = [...this.state.newSlotThurs];
                tempSlot.unshift({id:1,duration:this.state.durationThurs,unit_id:this.state.unitThurs,rate:this.state.rateThurs});
                 console.log(tempSlot);
                 axios.post(`${domain}/api/ratecard/${this.props.location.state.title_id}/add-details`,
                 {start_time:this.state.startTimeThurs, end_time:this.state.EndTimeThurs, day_id:4, durations:tempSlot, no_of_spots:this.state.slotNumberThurs,rate_card_title:this.state.title},
                 {headers:{ 'Authorization':`Bearer ${user}`}}) 
                 .then(res=>{
                     console.log("data:",res.data);
                     if(res.data.status === "success"){
                        this.setState({isActive:false, 
                            oldTImeFramesThurs:res.data.segments,
                            durationThurs:"",
                            unitThurs:1,
                            rateThurs:"",
                            startTimeThurs:"",
                            EndTimeThurs:"",
                            slotNumberThurs:"",
                            newSlotThurs:[],
                            modal:true,
                            alertmessage:"Saved!!"
                        });
        
                     }
                 })
                 .catch(error=>{
                     console.log(error.response.data)
                 })
            }
        }
    }

    /* tab 5 */
    AddSlotFriday=()=>{
        var tempSlot = [...this.state.newSlotFri];
        console.log(tempSlot)
        if(this.state.durationFri !=="" && this.state.rateFri !== "" && this.state.newSlotFri.length <=0 ){
            tempSlot.push({id:this.state.slotValueFri,duration:"",unit_id:1,rate:""});
            console.log("first:",tempSlot)
            return(this.setState({newSlotFri:tempSlot, slotValueFri:this.state.slotValueFri+1}));
        }
        else
        if(this.state.durationFri !=="" && this.state.rateFri !== "" && this.state.newSlotFri.length > 0){
           let lastElement = tempSlot[tempSlot.length -1];
            if(lastElement.duration && lastElement.rate){
                tempSlot.push({id:this.state.slotValueFri,duration:"",unit_id:1,rate:""});
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
        selectedIndex.unit_id = value;
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
        console.log("start submitting");
        this.setState({isActive:true});
        if(this.state.oldTImeFramesFri.length <=0 && this.state.startTimeFri<this.state.EndTimeFri){
        let tempSlot = [...this.state.newSlotFri];
        tempSlot.unshift({id:1,duration:this.state.durationFri,unit_id:this.state.unitFri,rate:this.state.rateFri});
         console.log(tempSlot);
         axios.post(`${domain}/api/ratecard/${this.props.location.state.title_id}/add-details`,
         {start_time:this.state.startTimeFri, end_time:this.state.EndTimeFri, day_id:5, durations:tempSlot, no_of_spots:this.state.slotNumberFri,rate_card_title:this.state.title},
         {headers:{ 'Authorization':`Bearer ${user}`}}) 
         .then(res=>{
             console.log("data:",res.data);
             if(res.data.status === "success"){
                this.setState({isActive:false, 
                    oldTImeFramesFri:res.data.segments,
                    durationFri:"",
                    unitFri:1,
                    rateFri:"",
                    startTimeFri:"",
                    EndTimeFri:"",
                    slotNumberFri:"",
                    newSlotFri:[],
                    modal:true,
                    alertmessage:"Saved!!"
                    });

             }
         })
         .catch(error=>{
             console.log(error.response.data)
         })
        }
        else{
            var checker;
            for(var i =0; i<this.state.oldTImeFramesFri.length; i++){
                if(this.state.startTimeFri < this.state.oldTImeFramesFri[i].end_time){
                     this.setState({isActive:false, alertmessage:"Selected Time Intersects With A Saved Time", modal:true})
                     checker = false;
                     break;
                }
                else{
                    checker = true;
                    continue;
                 
                }
            }
 
            if(checker === true && this.state.startTimeFri<this.state.EndTimeFri){
                let tempSlot = [...this.state.newSlotFri];
                tempSlot.unshift({id:1,duration:this.state.durationFri,unit_id:this.state.unitFri,rate:this.state.rateFri});
                 console.log(tempSlot);
                 axios.post(`${domain}/api/ratecard/${this.props.location.state.title_id}/add-details`,
                 {start_time:this.state.startTimeFri, end_time:this.state.EndTimeFri, day_id:5, durations:tempSlot, no_of_spots:this.state.slotNumberFri,rate_card_title:this.state.title},
                 {headers:{ 'Authorization':`Bearer ${user}`}}) 
                 .then(res=>{
                     console.log("data:",res.data);
                     if(res.data.status === "success"){
                        this.setState({isActive:false, 
                            oldTImeFramesFri:res.data.segments,
                            durationFri:"",
                            unitFri:1,
                            rateFri:"",
                            startTimeFri:"",
                            EndTimeFri:"",
                            slotNumberFri:"",
                            newSlotFri:[],
                            modal:true,
                            alertmessage:"Saved!!"
                        });
        
                     }
                 })
                 .catch(error=>{
                     console.log(error)
                 })
            }

        }
    }

    /* tab 6 */
    AddSlotSaturday=()=>{
        var tempSlot = [...this.state.newSlotSat];
        console.log(tempSlot)
        if(this.state.durationSat !=="" && this.state.rateSat !== "" && this.state.newSlotSat.length <=0 ){
            tempSlot.push({id:this.state.slotValueSat,duration:"",unit_id:1,rate:""});
            console.log("first:",tempSlot)
            return(this.setState({newSlotSat:tempSlot, slotValueSat:this.state.slotValueSat+1}));
        }
        else
        if(this.state.durationSat !=="" && this.state.rateSat !== "" && this.state.newSlotSat.length > 0){
           let lastElement = tempSlot[tempSlot.length -1];
            if(lastElement.duration && lastElement.rate){
                tempSlot.push({id:this.state.slotValueSat,duration:"",unit_id:1,rate:""});
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
        console.log(tempSlot, value)
        selectedIndex.unit_id = value;
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
        console.log("start submitting");
        this.setState({isActive:true});
        if(this.state.oldTImeFramesSat.length<=0 && this.state.startTimeSat<this.state.EndTimeSat){
        let tempSlot = [...this.state.newSlotSat];
        tempSlot.unshift({id:1,duration:this.state.durationSat,unit_id:this.state.unitSat,rate:this.state.rateSat});
         console.log(tempSlot);
         axios.post(`${domain}/api/ratecard/${this.props.location.state.title_id}/add-details`,
         {start_time:this.state.startTimeSat, end_time:this.state.EndTimeSat, day_id:6, durations:tempSlot, no_of_spots:this.state.slotNumberSat,rate_card_title:this.state.title},
         {headers:{ 'Authorization':`Bearer ${user}`}}) 
         .then(res=>{
             console.log("data:",res.data);
             if(res.data.status === "success"){
                this.setState({isActive:false, 
                    oldTImeFramesSat:res.data.segments,
                    durationSat:"",
                    unitSat:1,
                    rateSat:"",
                    startTimeSat:"",
                    EndTimeSat:"",
                    slotNumberSat:"",
                    newSlotSat:[],
                    modal:true,
                    alertmessage:"Saved!!"
                });

             }
         })
         .catch(error=>{
             console.log(error.response.data)
         })
        }
        else{
            var checker;
            for(var i =0; i<this.state.oldTImeFramesSat.length; i++){
                if(this.state.startTimeSat < this.state.oldTImeFramesSat[i].end_time){
                     this.setState({isActive:false, alertmessage:"Selected Time Intersects With A Saved Time", modal:true})
                     checker = false;
                     break;
                }
                else{
                    checker = true;
                    continue;
                 
                }
            }
 
            if(checker === true && this.state.startTimeSat<this.state.EndTimeSat){
                let tempSlot = [...this.state.newSlotSat];
                tempSlot.unshift({id:1,duration:this.state.durationSat,unit_id:this.state.unitSat,rate:this.state.rateSat});
                 console.log(tempSlot);
                 axios.post(`${domain}/api/ratecard/${this.props.location.state.title_id}/add-details`,
                 {start_time:this.state.startTimeSat, end_time:this.state.EndTimeSat, day_id:6, durations:tempSlot, no_of_spots:this.state.slotNumberSat,rate_card_title:this.state.title},
                 {headers:{ 'Authorization':`Bearer ${user}`}}) 
                 .then(res=>{
                     console.log("data:",res.data);
                     if(res.data.status === "success"){
                        this.setState({isActive:false, 
                            oldTImeFramesSat:res.data.segments,
                            durationSat:"",
                            unitSat:1,
                            rateSat:"",
                            startTimeSat:"",
                            EndTimeSat:"",
                            slotNumberSat:"",
                            newSlotSat:[],
                            modal:true,
                            alertmessage:"Saved!!"
                        });
        
                     }
                 })
                 .catch(error=>{
                     console.log(error.response.data)
                 })
            }
        }
    }

    /* tab 7 */
    AddSlotSunday=()=>{
        var tempSlot = [...this.state.newSlotSun];
        console.log(tempSlot)
        if(this.state.durationSun !=="" && this.state.rateSun !== "" && this.state.newSlotSun.length <=0 ){
            tempSlot.push({id:this.state.slotValueSun,duration:"",unit_id:1,rate:""});
            console.log("first:",tempSlot)
            return(this.setState({newSlotSun:tempSlot, slotValueSun:this.state.slotValueSun+1}));
        }
        else
        if(this.state.durationSun !=="" && this.state.rateSun !== "" && this.state.newSlotSun.length > 0){
           let lastElement = tempSlot[tempSlot.length -1];
            if(lastElement.duration && lastElement.rate){
                tempSlot.push({id:this.state.slotValueSun,duration:"",unit_id:1,rate:""});
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
        selectedIndex.unit_id = value;
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
        console.log("start submitting");
        this.setState({isActive:true});
        if(this.state.oldTImeFramesSun.length<=0 && this.state.startTimeSun<this.state.EndTimeSun){
        let tempSlot = [...this.state.newSlotSun];
        tempSlot.unshift({id:1,duration:this.state.durationSun,unit_id:this.state.unitSun,rate:this.state.rateSun});
         console.log(tempSlot);
         axios.post(`${domain}/api/ratecard/${this.props.location.state.title_id}/add-details`,
         {start_time:this.state.startTimeSun, end_time:this.state.EndTimeSun, day_id:7, durations:tempSlot, no_of_spots:this.state.slotNumberSun,rate_card_title:this.state.title},
         {headers:{ 'Authorization':`Bearer ${user}`}}) 
         .then(res=>{
             console.log("data:",res.data);
             if(res.data.status === "success"){
                this.setState({isActive:false, 
                    oldTImeFramesSun:res.data.segments,
                    durationSun:"",
                    unitSun:1,
                    rateSun:"",
                    startTimeSun:"",
                    EndTimeSun:"",
                    slotNumberSun:"",
                    newSlotSun:[],
                    modal:true,
                    alertmessage:"Saved!!"
                });

             }
         })
         .catch(error=>{
             console.log(error.response.data)
         })
        }
        else{
            var checker;
            for(var i =0; i<this.state.oldTImeFramesSun.length; i++){
                if(this.state.startTimeSun < this.state.oldTImeFramesSun[i].end_time){
                     this.setState({isActive:false, alertmessage:"Selected Time Intersects With A Saved Time", modal:true})
                     checker = false;
                     break;
                }
                else{
                    checker = true;
                    continue;
                 
                }
            }
 
            if(checker === true && this.state.startTimeSun<this.state.EndTimeSun){
                let tempSlot = [...this.state.newSlotSun];
                tempSlot.unshift({id:1,duration:this.state.durationSun,unit_id:this.state.unitSun,rate:this.state.rateSun});
                 console.log(tempSlot);
                 axios.post(`${domain}/api/ratecard/${this.props.location.state.title_id}/add-details`,
                 {start_time:this.state.startTimeSun, end_time:this.state.EndTimeSun, day_id:7, durations:tempSlot, no_of_spots:this.state.slotNumberSun,rate_card_title:this.state.title},
                 {headers:{ 'Authorization':`Bearer ${user}`}}) 
                 .then(res=>{
                     console.log("data:",res.data);
                     if(res.data.status === "success"){
                        this.setState({isActive:false, 
                            oldTImeFramesSun:res.data.segments,
                            durationSun:"",
                            unitSun:1,
                            rateSun:"",
                            startTimeSun:"",
                            EndTimeSun:"",
                            slotNumberSun:"",
                            newSlotSun:[],
                            modal:true,
                            alertmessage:"Saved!!"
                        });
        
                     }
                 })
                 .catch(error=>{
                     console.log(error)
                 })
            }
        }
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
      <React.Fragment>
        <>
      <LoadingOverlay 
      active = {this.state.isActive}
      spinner={<FadeLoader color={'#4071e1'}/>}
      >
      {/* <Prompt
        when={this.state.allow}
        message="You have unsaved changes, are you sure you want to leave?"
        /> */}
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
        </NavigationPrompt>
      <Header/>
        <Container className=" mt--9" fluid>
        {this.state.isActiveSpinner?
          <Row>
            <Col md="12" style={{textAlign:"center"}}>
             <h4>Please Wait <Spinner size="sm" style={{marginLeft:"5px"}}/></h4> 
            </Col>
          </Row>
          :
          <>
          <Row>
            <Col md="10" sm="12" xs="12" lg="10" xl="10">
            <p style={{fontSize:"13px", fontWeight:500}}
            >Enter RateCard Details For Each Day Of The Week.</p>
            <Card style={{boxShadow:"0 2 px 12px rgba(0,0,0,0.1)"}}>
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
                style={{cursor:"pointer",textTransform:"uppercase",fontSize:"14px", fontWeight:"bold"}}
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
                    <FormGroup>
                        <Label for="exampleTime" id="boldstyle">Start Time</Label>
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
                        <Label for="exampleTime" id="boldstyle">End Time</Label>
                        <Input
                        invalid={this.state.timeCheck}
                        type="time"
                        name="time"
                        id="exampleTime"
                        value={this.state.EndTime}
                        onChange={e=>{e.target.value <= this.state.startTime? this.setState({timeCheck:true, EndTime:e.target.value}) : this.setState({timeCheck:false,EndTime:e.target.value})}}
                        placeholder="time placeholder"
                        />
                        <FormFeedback tooltip>End time must be greater than start time</FormFeedback>
                    </FormGroup>
                    </Col> 
                    </Row>
                    <Row>
                        <Col md="6">
                        <Row>
                        <Col>
                        <Label id="boldstyle">Number of Spots</Label>
                        </Col>
                        <Col>
                        <Input type="number" min="0" placeholder="Number of Spots" value={this.state.slotNumber} onChange={e=>this.setState({slotNumber:e.target.value})}/>
                        </Col>
                        </Row>    
                        </Col>
                        
                    </Row>
                    <br/>    
                    <Row>
                        <Col md="3" sm="3" xs="3" lg="3">
                        <Label id="boldstyle">Duration</Label>
                        <Input type="number" min="0" value={this.state.duration} onChange={e=>this.setState({duration:e.target.value})}/>
                        </Col>
                        <Col md="3" sm="3" xs="3" lg="3">
                        <Label id="boldstyle">Unit</Label>
                        <Input type="select" value={this.state.unit} onChange={e=>{this.setState({unit:e.target.value}); console.log(e.target.value)}}>
                            {this.state.units.map(value=>(<option key={value.id} value={value.id}>{value.unit}</option>))}
                        </Input>
                        </Col>
                        <Col md="4" sm="4" xs="4" lg="4">
                        <Label id="boldstyle">Rate</Label>
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
                            <Input type="number" value={this.state.newSlot[index].duration} onChange={(e)=>this.handleDurationChange(value.id, e.target.value)}/>
                            </Col>
                            <Col md="3" sm="3" xs="3" lg="3">
                            <Input type="select" value={this.state.newSlot[index].unit} onChange={(e)=>this.handleUnitChange(value.id, e.target.value)}>
                            {this.state.units.map(value=>(<option key={value.id} value={value.id}>{value.unit}</option>))}
                            </Input>
                            </Col>
                            <Col md="4" sm="4" xs="4" lg="4">
                            <Input type="number" value={this.state.newSlot[index].rate} onChange={(e)=>this.handleRateChange(value.id,e.target.value)}/>
                            </Col>
                            <Col md="2" sm="2" xs="2" lg="2" className="text-center">

                            <i className="fa fa-trash" style={{color:"red",fontSize:"20px",marginTop:"15px",cursor:"pointer"}} onClick={()=>this.handleDelete(value.id)}/>
                            </Col>
                        </Row>
                    ))}

                    <Row style={{marginTop:"20px"}}>
                        <Col md="6"sm="6"lg="6"xs="6">
                            <Button
                            color="info"
                            onClick={()=>this.handleSubmit()}
                            >
                                SAVE
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
                       <Label for="exampleTime" id="boldstyle">Start Time</Label>
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
                       <Label for="exampleTime"  id="boldstyle">End Time</Label>
                       <Input
                       invalid={this.state.timeCheckTues}
                       type="time"
                       name="time"
                       id="exampleTime"
                       value={this.state.EndTimeTues}
                       onChange={e=>{e.target.value <= this.state.startTimeTues? this.setState({timeCheckTues:true, EndTimeTues:e.target.value}) : this.setState({timeCheckTues:false,EndTimeTues:e.target.value})}}
                       placeholder="time placeholder"
                       />
                        <FormFeedback tooltip>End time must be greater than start time</FormFeedback>
                   </FormGroup>
                   
                   </Col> 
                   </Row>
                   <Row>
                        <Col md="6">
                        <Row>
                        <Col  id="boldstyle">
                        Number of Spots : 
                        </Col>
                        <Col>
                        <Input type="number" min="0" placeholder="Number of Spots" value={this.state.slotNumberTues} onChange={e=>this.setState({slotNumberTues:e.target.value})}/>
                        </Col>
                        </Row>    
                        </Col>
                        
                    </Row>
                    <br/> 
                   <Row>
                       <Col md="3" sm="3" xs="3" lg="3">
                       <Label  id="boldstyle">Duration</Label>
                       <Input type="number" min="0" value={this.state.durationTues} onChange={e=>this.setState({durationTues:e.target.value})}/>
                       </Col>
                       <Col md="3" sm="3" xs="3" lg="3">
                       <Label  id="boldstyle">Unit</Label>
                       <Input type="select" value={this.state.unitTues} onChange={e=>this.setState({unitTues:e.target.value})}>
                           {this.state.units.map(value=>(<option key={value.id} value={value.id}>{value.unit}</option>))}
                       </Input>
                       </Col>
                       <Col md="4" sm="4" xs="4" lg="4">
                       <Label  id="boldstyle">Rate</Label>
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
                           <Input type="number" value={this.state.newSlotTues[index].duration} onChange ={e=>this.handleDurationChangeTues(value.id,e.target.value)}/>
                           </Col>
                           <Col md="3" sm="3" xs="3" lg="3">
                           <Input type="select" value={this.state.newSlotTues[index].unit} onChange={e=>this.handleUnitChangeTues(value.id,e.target.value)}>
                           {this.state.units.map(value=>(<option key={value.id} value={value.id}>{value.unit}</option>))}
                           </Input>
                           </Col>
                           <Col md="4" sm="4" xs="4" lg="4">
                           <Input type="number" value={this.state.newSlotTues[index].rate} onChange={e=>this.handleRateChangeTues(value.id, e.target.value)}/>
                           </Col>
                           <Col md="2" sm="2" xs="2" lg="2" className="text-center">

                           <i className="fa fa-trash" style={{color:"red",fontSize:"20px",marginTop:"15px",cursor:"pointer"}} onClick={()=>this.handleDeleteTues(value.id)}/>
                           </Col>
                       </Row>
                   ))}

                   <Row style={{marginTop:"20px"}}>
                       <Col md="6"sm="6"lg="6"xs="6">
                           <Button
                           color="info"
                           onClick={()=>this.handleSubmitTues()}
                           >
                               SAVE
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
                        <Label for="exampleTime"  id="boldstyle">Start Time</Label>
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
                        <Label for="exampleTime"  id="boldstyle">End Time</Label>
                        <Input
                        invalid={this.state.timeCheckWed}
                        type="time"
                        name="time"
                        id="exampleTime"
                        value={this.state.EndTimeWed}
                        onChange={e=>{e.target.value <= this.state.startTimeWed? this.setState({timeCheckWed:true, EndTimeWed:e.target.value}) : this.setState({timeCheckWed:false,EndTimeWed:e.target.value})}}
                        placeholder="time placeholder"
                        />
                        <FormFeedback tooltip>End time must be greater than start time</FormFeedback>
                    </FormGroup>
                    </Col> 
                    </Row>
                    <Row>
                        <Col md="6">
                        <Row>
                        <Col  id="boldstyle">
                        Number of Spots : 
                        </Col>
                        <Col>
                        <Input type="number" min="0" placeholder="Number of Spots" value={this.state.slotNumberWed} onChange={e=>this.setState({slotNumberWed:e.target.value})}/>
                        </Col>
                        </Row>    
                        </Col>
                        
                    </Row>
                    <br/> 
                    <Row>
                        <Col md="3" sm="3" xs="3" lg="3">
                        <Label  id="boldstyle">Duration</Label>
                        <Input type="number" min="0" value={this.state.durationWed} onChange={e=>this.setState({durationWed:e.target.value})}/>
                        </Col>
                        <Col md="3" sm="3" xs="3" lg="3">
                        <Label  id="boldstyle">Unit</Label>
                        <Input type="select" value={this.state.unitWed} onChange={e=>this.setState({unitWed:e.target.value})}>
                            {this.state.units.map(value=>(<option key={value.id} value={value.id}>{value.unit}</option>))}
                        </Input>
                        </Col>
                        <Col md="4" sm="4" xs="4" lg="4">
                        <Label  id="boldstyle">Rate</Label>
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
                            <Input type="number" value={this.state.newSlotWed[index].duration} onChange={e=>this.handleDurationChangeWed(value.id, e.target.value)}/>
                            </Col>
                            <Col md="3" sm="3" xs="3" lg="3">
                            <Input type="select" value={this.state.newSlotWed[index].unit} onChange={e=>this.handleUnitChangeWed(value.id,e.target.value)}>
                            {this.state.units.map(value=>(<option key={value.id} value={value.id}>{value.unit}</option>))}
                            </Input>
                            </Col>
                            <Col md="4" sm="4" xs="4" lg="4">
                            <Input type="number" value={this.state.newSlotWed[index].rate} onChange={e=>this.handleRateChangeWed(value.id,e.target.value)}/>
                            </Col>
                            <Col md="2" sm="2" xs="2" lg="2" className="text-center">

                            <i className="fa fa-trash" style={{color:"red",fontSize:"20px",marginTop:"15px",cursor:"pointer"}} onClick={()=>this.handleDeleteWed(value.id)}/>
                            </Col>
                        </Row>
                    ))}

                    <Row style={{marginTop:"20px"}}>
                        <Col md="6"sm="6"lg="6"xs="6">
                            <Button
                            color="info"
                            onClick={()=>this.handleSubmitWed()}
                            >
                                SAVE
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
                        <Label for="exampleTime"  id="boldstyle">Start Time</Label>
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
                        <Label for="exampleTime"  id="boldstyle">End Time</Label>
                        <Input
                        invalid={this.state.timeCheckThurs}
                        type="time"
                        name="time"
                        id="exampleTime"
                        value={this.state.EndTimeThurs}
                        onChange={e=>{e.target.value <= this.state.startTimeThurs? this.setState({timeCheckThurs:true, EndTimeThurs:e.target.value}) : this.setState({timeCheckThurs:false,EndTimeThurs:e.target.value})}}
                        placeholder="time placeholder"
                        />
                        <FormFeedback tooltip>End time must be greater than start time</FormFeedback>
                    </FormGroup>
                    </Col> 
                    </Row>
                    <Row>
                        <Col md="6">
                        <Row>
                        <Col id="boldstyle">
                        Number of Spots : 
                        </Col>
                        <Col>
                        <Input type="number" min="0" placeholder="Number of Spots" value={this.state.slotNumberThurs} onChange={e=>this.setState({slotNumberThurs:e.target.value})}/>
                        </Col>
                        </Row>    
                        </Col>
                        
                    </Row>
                    <br/> 
                    <Row>
                        <Col md="3" sm="3" xs="3" lg="3">
                        <Label id="boldstyle">Duration</Label>
                        <Input type="number" min="0" value={this.state.durationThurs} onChange={e=>this.setState({durationThurs:e.target.value})}/>
                        </Col>
                        <Col md="3" sm="3" xs="3" lg="3">
                        <Label id="boldstyle">Unit</Label>
                        <Input type="select" value={this.state.unitThurs} onChange={e=>this.setState({unitThurs:e.target.value})}>
                            {this.state.units.map(value=>(<option key={value.id} value={value.id}>{value.unit}</option>))}
                        </Input>
                        </Col>
                        <Col md="4" sm="4" xs="4" lg="4">
                        <Label id="boldstyle">Rate</Label>
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
                            <Input type="number" value={this.state.newSlotThurs[index].duration} onChange={e=>this.handleDurationChangeThurs(value.id,e.target.value)}/>
                            </Col>
                            <Col md="3" sm="3" xs="3" lg="3">
                            <Input type="select" value={this.state.newSlotThurs[index].unit} onChange={e=>this.handleUnitChangeThurs(value.id, e.target.value)}>
                            {this.state.units.map(value=>(<option key={value.id} value={value.id}>{value.unit}</option>))}
                            </Input>
                            </Col>
                            <Col md="4" sm="4" xs="4" lg="4">
                            <Input type="number" value={this.state.newSlotThurs[index].rate} onChange={e=>this.handleRateChangeThurs(value.id, e.target.value)}/>
                            </Col>
                            <Col md="2" sm="2" xs="2" lg="2" className="text-center">

                            <i className="fa fa-trash" style={{color:"red",fontSize:"20px",marginTop:"15px",cursor:"pointer"}} onClick={()=>this.handleDeleteThurs(value.id)}/>
                            </Col>
                        </Row>
                    ))}

                    <Row style={{marginTop:"20px"}}>
                        <Col md="6"sm="6"lg="6"xs="6">
                            <Button
                            color="info"
                            onClick={()=>this.handleSubmitThurs()}
                            >
                                SAVE
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
                        <Label for="exampleTime" id="boldstyle">Start Time</Label>
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
                        <Label for="exampleTime" id="boldstyle">End Time</Label>
                        <Input
                        invalid={this.state.timeCheckFri}
                        type="time"
                        name="time"
                        id="exampleTime"
                        value={this.state.EndTimeFri}
                        onChange={e=>{e.target.value <= this.state.startTimeFri? this.setState({timeCheckFri:true, EndTimeFri:e.target.value}) : this.setState({timeCheckFri:false,EndTimeFri:e.target.value})}}
                        placeholder="time placeholder"
                        />
                        <FormFeedback tooltip>End time must be greater than start time</FormFeedback>
                    </FormGroup>
                    </Col> 
                    </Row>
                    <Row>
                        <Col md="6">
                        <Row>
                        <Col id="boldstyle">
                        Number of Spots : 
                        </Col>
                        <Col>
                        <Input type="number" min="0" placeholder="Number of Spots" value={this.state.slotNumberFri} onChange={e=>this.setState({slotNumberFri:e.target.value})}/>
                        </Col>
                        </Row>    
                        </Col>
                        
                    </Row>
                    <br/> 
                    <Row>
                        <Col md="3" sm="3" xs="3" lg="3">
                        <Label id="boldstyle">Duration</Label>
                        <Input type="number" min="0" value={this.state.durationFri} onChange={e=>this.setState({durationFri:e.target.value})}/>
                        </Col>
                        <Col md="3" sm="3" xs="3" lg="3">
                        <Label id="boldstyle">Unit</Label>
                        <Input type="select"  value={this.state.unitFri} onChange={e=>this.setState({unitFri:e.target.value})}>
                            {this.state.units.map(value=>(<option key={value.id} value={value.id}>{value.unit}</option>))}
                        </Input>
                        </Col>
                        <Col md="4" sm="4" xs="4" lg="4">
                        <Label id="boldstyle">Rate</Label>
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
                            <Input type="number" value={this.state.newSlotFri[index].duration} onChange={e=>this.handleDurationChangeFri(value.id,e.target.value)}/>
                            </Col>
                            <Col md="3" sm="3" xs="3" lg="3">
                            <Input type="select" value={this.state.newSlotFri[index].unit} onChange={e=>this.handleUnitChangeFri(value.id,e.target.value)}>
                            {this.state.units.map(value=>(<option key={value.id} value={value.id}>{value.unit}</option>))}
                            </Input>
                            </Col>
                            <Col md="4" sm="4" xs="4" lg="4">
                            <Input type="number" value={this.state.newSlotFri[index].rate} onChange={e=>this.handleRateChangeFri(value.id,e.target.value)}/>
                            </Col>
                            <Col md="2" sm="2" xs="2" lg="2" className="text-center">

                            <i className="fa fa-trash" style={{color:"red",fontSize:"20px",marginTop:"15px",cursor:"pointer"}} onClick={()=>this.handleDeleteFri(value.id)}/>
                            </Col>
                        </Row>
                    ))}

                    <Row style={{marginTop:"20px"}}>
                        <Col md="6"sm="6"lg="6"xs="6">
                            <Button
                            color="info"
                            onClick={()=>this.handleSubmitFri()}
                            >
                                SAVE
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
                        <Label for="exampleTime" id="boldstyle">Start Time</Label>
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
                        <Label for="exampleTime" id="boldstyle">End Time</Label>
                        <Input
                        invalid={this.state.timeCheckSat}
                        type="time"
                        name="time"
                        id="exampleTime"
                        value={this.state.EndTimeSat}
                        onChange={e=>{e.target.value <= this.state.startTimeSat? this.setState({timeCheckSat:true, EndTimeSat:e.target.value}) : this.setState({timeCheckSat:false,EndTimeSat:e.target.value})}}
                        placeholder="time placeholder"
                        />
                        <FormFeedback tooltip>End time must be greater than start time</FormFeedback>
                    </FormGroup>
                    </Col> 
                    </Row>
                    <Row>
                        <Col md="6">
                        <Row>
                        <Col id="boldstyle">
                        Number of Spots : 
                        </Col>
                        <Col>
                        <Input type="number" min="0" placeholder="Number of Spots" value={this.state.slotNumberSat} onChange={e=>this.setState({slotNumberSat:e.target.value})}/>
                        </Col>
                        </Row>    
                        </Col>
                        
                    </Row>
                    <br/> 
                    <Row>
                        <Col md="3" sm="3" xs="3" lg="3">
                        <Label id="boldstyle">Duration</Label>
                        <Input type="number" min="0" value={this.state.durationSat} onChange={e=>this.setState({durationSat:e.target.value})}/>
                        </Col>
                        <Col md="3" sm="3" xs="3" lg="3">
                        <Label id="boldstyle">Unit</Label>
                        <Input type="select" value={this.state.unitSat} onChange={e=>this.setState({unitSat:e.target.value})}>
                            {this.state.units.map(value=>(<option key={value.id} value={value.id}>{value.unit}</option>))}
                        </Input>
                        </Col>
                        <Col md="4" sm="4" xs="4" lg="4">
                        <Label id="boldstyle">Rate</Label>
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
                            <Input type="number" value={this.state.newSlotSat[index].duration} onChange={e=>this.handleDurationChangeSat(value.id,e.target.value)}/>
                            </Col>
                            <Col md="3" sm="3" xs="3" lg="3">
                            <Input type="select" value={this.state.newSlotSat[index].unit} onChange={e=>this.handleUnitChangeSat(value.id,e.target.value)}>
                            {this.state.units.map(value=>(<option key={value.id} value={value.id}>{value.unit}</option>))}
                            </Input>
                            </Col>
                            <Col md="4" sm="4" xs="4" lg="4">
                            <Input type="number" value={this.state.newSlotSat[index].rate} onChange={e=>this.handleRateChangeSat(value.id,e.target.value)}/>
                            </Col>
                            <Col md="2" sm="2" xs="2" lg="2" className="text-center">

                            <i className="fa fa-trash" style={{color:"red",fontSize:"20px",marginTop:"15px",cursor:"pointer"}} onClick={()=>this.handleDeleteSat(value.id)}/>
                            </Col>
                        </Row>
                    ))}

                    <Row style={{marginTop:"20px"}}>
                        <Col md="6"sm="6"lg="6"xs="6">
                            <Button
                            color="info"
                            onClick={()=>this.handleSubmitSat()}
                            >
                                SAVE
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
                        <Label for="exampleTime" id="boldstyle">Start Time</Label>
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
                        <Label for="exampleTime" id="boldstyle">End Time</Label>
                        <Input
                        invalid={this.state.timeCheckSun}
                        type="time"
                        name="time"
                        id="exampleTime"
                        value={this.state.EndTimeSun}
                        onChange={e=>{e.target.value <= this.state.startTimeSun? this.setState({timeCheckSun:true, EndTimeSun:e.target.value}) : this.setState({timeCheckSun:false,EndTimeSun:e.target.value})}}
                        placeholder="time placeholder"
                        />
                        <FormFeedback tooltip>End time must be greater than start time</FormFeedback>
                    </FormGroup>
                    </Col> 
                    </Row>
                    <Row>
                        <Col md="6">
                        <Row>
                        <Col id="boldstyle">
                        Number of Spots : 
                        </Col>
                        <Col>
                        <Input type="number" min="0" placeholder="Number of Spots" value={this.state.slotNumberSun} onChange={e=>this.setState({slotNumberSun:e.target.value})}/>
                        </Col>
                        </Row>    
                        </Col>
                        
                    </Row>
                    <br/> 
                    <Row>
                        <Col md="3" sm="3" xs="3" lg="3">
                        <Label id="boldstyle">Duration</Label>
                        <Input type="number" min="0" value={this.state.durationSun} onChange={e=>this.setState({durationSun:e.target.value})}/>
                        </Col>
                        <Col md="3" sm="3" xs="3" lg="3">
                        <Label id="boldstyle">Unit</Label>
                        <Input type="select" value={this.state.unitSun} onChange={e=>this.setState({unitSun:e.target.value})}>
                            {this.state.units.map(value=>(<option key={value.id} value={value.id}>{value.unit}</option>))}
                        </Input>
                        </Col>
                        <Col md="4" sm="4" xs="4" lg="4">
                        <Label id="boldstyle">Rate</Label>
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
                            <Input type="number" value={this.state.newSlotSun[index].duration} onChange={e=>this.handleDurationChangeSun(value.id,e.target.value)}/>
                            </Col>
                            <Col md="3" sm="3" xs="3" lg="3">
                            <Input type="select" value={this.state.newSlotSun[index].unit} onChange={e=>this.handleUnitChangeSun(value.id,e.target.value)}>
                            {this.state.units.map(value=>(<option key={value.id} value={value.id}>{value.unit}</option>))}
                            </Input>
                            </Col>
                            <Col md="4" sm="4" xs="4" lg="4">
                            <Input type="number" value={this.state.newSlotSun[index].rate} onChange={e=>this.handleRateChangeSun(value.id,e.target.value)}/>
                            </Col>
                            <Col md="2" sm="2" xs="2" lg="2" className="text-center">

                            <i className="fa fa-trash" style={{color:"red",fontSize:"20px",marginTop:"15px",cursor:"pointer"}} onClick={()=>this.handleDeleteSun(value.id)}/>
                            </Col>
                        </Row>
                    ))}

                    <Row style={{marginTop:"20px"}}>
                        <Col md="6"sm="6"lg="6"xs="6">
                            <Button
                            color="info"
                            onClick={()=>this.handleSubmitSun()}
                            >
                                SAVE
                            </Button>    
                        </Col>
                        
                    </Row>    
                </Container>
                </TabPane>
            </TabContent>
            </Col>
            </Row>
            </CardBody>
            <CardFooter>
                <Button
                style={{float:"right"}}
                color="primary"
                onClick={()=>{
                this.setState({allow:false});
                setTimeout(
                    function(){
                        
                            this.props.history.push("/media/preview/video",{title_id:this.props.location.state.title_id})
                    }
                    .bind(this),
                    500
                )
                }}
                >
                    PREVIEW
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
               {this.state.alertmessage}
            </ModalHeader>
            <ModalFooter>
                <Button color="danger" onClick={()=>this.setState({modal:false})}>Cancel</Button>
            </ModalFooter>
        </Modal>
        </LoadingOverlay>
        </>
      </React.Fragment>
    );
  }
}


export default RateCardDetails;

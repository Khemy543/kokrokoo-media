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
let user = localStorage.getItem("access_token");
var domain = "https://media.test.backend.kokrokooad.com";

class EditPrintDetails extends React.Component {
    
    state = {
        isActive:false,
        days:[],
        activeTab:"1",

        newSlot:[],
        slotValue:2,
        size:"",
        rate:"",
        page_section:"First Page",

        newSlotTues:[],
        slotValueTues:2,
        sizeTues:"",
        rateTues:"",
        page_sectionTues:"First Page",

        newSlotWed:[],
        slotValueWed:2,
        sizeWed:"",
        rateWed:"",
        page_sectionWed:"First Page",

        newSlotThurs:[],
        slotValueThurs:2,
        sizeThurs:"",
        rateThurs:"",
        page_sectionThurs:"First Page",

        newSlotFri:[],
        slotValueFri:2,
        sizeFri:"",
        rateFri:"",
        page_sectionFri:"First Page",

        newSlotSat:[],
        slotValueSat:2,
        sizeSat:"",
        rateSat:"",
        page_sectionSat:"First Page",

        newSlotSun:[],
        slotValueSun:2,
        sizeSun:"",
        rateSun:"",
        page_sectionSun:"First Page",
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
        

        axios.get(`${domain}/api/fetch-days-and-units`)
        .then(res=>{
            console.log(res.data)
            this.setState({days:res.data.days, units:res.data.units,isActive:false})
        })
    }

    toggle = tab => {
        if(this.state.activeTab !== tab) this.setState({activeTab:tab});
      }

      AddSlotMonday=()=>{
        var tempSlot = [...this.state.newSlot];
        console.log(tempSlot)
        if(this.state.size !=="" && this.state.rate !== "" && this.state.newSlot.length <=0 ){
            tempSlot.push({id:this.state.slotValue,size:"",cost:"", page_section:"First Page"});
            console.log("first:",tempSlot)
            return(this.setState({newSlot:tempSlot, slotValue:this.state.slotValue+1}));
        }
        else
        if(this.state.size !=="" && this.state.rate !== "" && this.state.newSlot.length > 0){
           let lastElement = tempSlot[tempSlot.length -1];
            if(lastElement.size && lastElement.cost){
                tempSlot.push({id:this.state.slotValue,size:"",cost:"",page_section:"First Page"});
                console.log("second:",tempSlot)
                return(this.setState({newSlot:tempSlot, slotValue:this.state.slotValue+1}));
            }
        }
          
      }

      handleSizeChange=(id , value)=>{
        var tempSlot = [...this.state.newSlot];
        const selected = tempSlot.find(item=>item.id===id);
        const index = tempSlot.indexOf(selected);
        const selectedIndex = tempSlot[index];
        console.log(tempSlot)
        selectedIndex.size = value;
        return(this.setState({newSlot:tempSlot}))

      }

      handleRateChange=(id , value)=>{
        var tempSlot = [...this.state.newSlot];
        const selected = tempSlot.find(item=>item.id===id);
        const index = tempSlot.indexOf(selected);
        const selectedIndex = tempSlot[index];
        console.log(tempSlot)
        selectedIndex.cost = value;
        return(this.setState({newSlot:tempSlot}))

      }

      handlePageChange=(id , value)=>{
        var tempSlot = [...this.state.newSlot];
        const selected = tempSlot.find(item=>item.id===id);
        const index = tempSlot.indexOf(selected);
        const selectedIndex = tempSlot[index];
        console.log(tempSlot)
        selectedIndex.page_section = value;
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
         let tempSlot = [...this.state.newSlot];
         tempSlot.unshift({id:1,size:this.state.size,cost:this.state.rate,page_section:this.state.page_section});
          console.log(tempSlot);
          axios.post(`${domain}/api/ratecard/${this.props.location.state.title_id}/add-details`,
          {day_id:1, details:tempSlot, rate_card_title:this.state.title},
          {headers:{ 'Authorization':`Bearer ${user}`}}) 
          .then(res=>{
              console.log(res.data);
              if(res.data.status === "saved"){
              this.setState({
                  isActive:false,
                  size:"",
                  rate:"",
                  page_section:"First Page",
                  newSlot:[],
                  title:res.data.rate_card_title
                 });
              alert("saved");
              }
          })
          .catch(error=>{
              console.log(error.response.data)
          })
  
        }


        AddSlotTuesday=()=>{
            var tempSlot = [...this.state.newSlotTues];
            console.log(tempSlot)
            if(this.state.sizeTues !=="" && this.state.rateTues !== "" && this.state.newSlotTues.length <=0 ){
                tempSlot.push({id:this.state.slotValueTues,size:"",cost:"",page_section:"First Page"});
                console.log("first:",tempSlot)
                return(this.setState({newSlotTues:tempSlot, slotValueTues:this.state.slotValue+1}));
            }
            else
            if(this.state.sizeTues !=="" && this.state.rateTues !== "" && this.state.newSlotTues.length > 0){
               let lastElement = tempSlot[tempSlot.length -1];
                if(lastElement.size && lastElement.cost){
                    tempSlot.push({id:this.state.slotValueTues,size:"",cost:"", page_section:"First Page"});
                    console.log("second:",tempSlot)
                    return(this.setState({newSlotTues:tempSlot, slotValueTues:this.state.slotValue+1}));
                }
            }
              
          }
    
          handleSizeChangeTues=(id , value)=>{
            var tempSlot = [...this.state.newSlotTues];
            const selected = tempSlot.find(item=>item.id===id);
            const index = tempSlot.indexOf(selected);
            const selectedIndex = tempSlot[index];
            console.log(tempSlot)
            selectedIndex.size = value;
            return(this.setState({newSlotTues:tempSlot}))
    
          }
    
          handleRateChangeTues=(id , value)=>{
            var tempSlot = [...this.state.newSlotTues];
            const selected = tempSlot.find(item=>item.id===id);
            const index = tempSlot.indexOf(selected);
            const selectedIndex = tempSlot[index];
            console.log(tempSlot)
            selectedIndex.cost = value;
            return(this.setState({newSlotTues:tempSlot}))
    
          }
          handlePageChangeTues=(id , value)=>{
            var tempSlot = [...this.state.newSlotTues];
            const selected = tempSlot.find(item=>item.id===id);
            const index = tempSlot.indexOf(selected);
            const selectedIndex = tempSlot[index];
            console.log(tempSlot)
            selectedIndex.page_section = value;
            return(this.setState({newSlotTues:tempSlot}))
    
          }
          handleDeleteTues=(id)=>{
            
            console.log("id:",id)
            var tempSlot = [...this.state.newSlotTues];
            let newArray = tempSlot.filter(item=>item.id !== id);
            console.log("temp",newArray)
            return(this.setState({newSlotTues:newArray}))
        }
    
        handleSubmitTues=(e)=>{
            console.log("start submitting");
            this.setState({isActive:true});
             let tempSlot = [...this.state.newSlotTues];
             tempSlot.unshift({id:1,size:this.state.sizeTues,cost:this.state.rateTues,page_section:this.state.page_sectionTues});
              console.log(tempSlot);
              axios.post(`${domain}/api/ratecard/${this.props.location.state.title_id}/add-details`,
              {day_id:2, details:tempSlot,rate_card_title:this.state.title},
              {headers:{ 'Authorization':`Bearer ${user}`}}) 
              .then(res=>{
                  console.log(res.data);
                  if(res.data.status === "saved"){
                  this.setState({
                      isActive:false,
                      sizeTues:"",
                      rateTues:"",
                      newSlotTues:[],
                      page_sectionTues:'First Page',
                      title:res.data.rate_card_title
                     });
                  alert("saved");
                  }
              })
              .catch(error=>{
                  console.log(error.response.data)
              })
      
            }


            AddSlotWednesday=()=>{
                var tempSlot = [...this.state.newSlotWed];
                console.log(tempSlot)
                if(this.state.sizeWed !=="" && this.state.rateWed !== "" && this.state.newSlotWed.length <=0 ){
                    tempSlot.push({id:this.state.slotValueWed,size:"",cost:"",page_section:"First Page"});
                    console.log("first:",tempSlot)
                    return(this.setState({newSlotWed:tempSlot, slotValueWed:this.state.slotValueWed+1}));
                }
                else
                if(this.state.sizeWed !=="" && this.state.rateWed !== "" && this.state.newSlotWed.length > 0){
                   let lastElement = tempSlot[tempSlot.length -1];
                    if(lastElement.size && lastElement.cost){
                        tempSlot.push({id:this.state.slotValueWed,size:"",cost:"", page_section:"First Page"});
                        console.log("second:",tempSlot)
                        return(this.setState({newSlotWed:tempSlot, slotValueWed:this.state.slotValueWed+1}));
                    }
                }
                  
              }
        
              handleSizeChangeWed=(id , value)=>{
                var tempSlot = [...this.state.newSlotWed];
                const selected = tempSlot.find(item=>item.id===id);
                const index = tempSlot.indexOf(selected);
                const selectedIndex = tempSlot[index];
                console.log(tempSlot)
                selectedIndex.size = value;
                return(this.setState({newSlotWed:tempSlot}))
        
              }
        
              handleRateChangeWed=(id , value)=>{
                var tempSlot = [...this.state.newSlotWed];
                const selected = tempSlot.find(item=>item.id===id);
                const index = tempSlot.indexOf(selected);
                const selectedIndex = tempSlot[index];
                console.log(tempSlot)
                selectedIndex.cost = value;
                return(this.setState({newSlotWed:tempSlot}))
        
              }
              handlePageChangeWed=(id , value)=>{
                var tempSlot = [...this.state.newSlotWed];
                const selected = tempSlot.find(item=>item.id===id);
                const index = tempSlot.indexOf(selected);
                const selectedIndex = tempSlot[index];
                console.log(tempSlot)
                selectedIndex.page_section = value;
                return(this.setState({newSlotWed:tempSlot}))
        
              }
              handleDeleteWed=(id)=>{
                
                console.log("id:",id)
                var tempSlot = [...this.state.newSlotWed];
                let newArray = tempSlot.filter(item=>item.id !== id);
                console.log("temp",newArray)
                return(this.setState({newSlotWed:newArray}))
            }
        
            handleSubmitWed=(e)=>{
                console.log("start submitting");
                this.setState({isActive:true});
                 let tempSlot = [...this.state.newSlotWed];
                 tempSlot.unshift({id:1,size:this.state.sizeWed,cost:this.state.rateWed, page_section:this.state.page_sectionWed});
                  console.log(tempSlot);
                  axios.post(`${domain}/api/ratecard/${this.props.location.state.title_id}/add-details`,
                  {day_id:3, details:tempSlot,rate_card_title:this.state.title},
                  {headers:{ 'Authorization':`Bearer ${user}`}}) 
                  .then(res=>{
                      console.log(res.data);
                      if(res.data.status === "saved"){
                      this.setState({
                          isActive:false,
                          sizeWed:"",
                          rateWed:"",
                          newSlotWed:[],
                          page_sectionWed:"First Page",
                          title:res.data.rate_card_title
                         });
                      alert("saved");
                      }
                  })
                  .catch(error=>{
                      console.log(error.response.data)
                  })
          
                }

                AddSlotThursday=()=>{
                    var tempSlot = [...this.state.newSlotThurs];
                    console.log(tempSlot)
                    if(this.state.sizeThurs !=="" && this.state.rateThurs !== "" && this.state.newSlotThurs.length <=0 ){
                        tempSlot.push({id:this.state.slotValueThurs,size:"",cost:"",page_section:"First Page"});
                        console.log("first:",tempSlot)
                        return(this.setState({newSlotThurs:tempSlot, slotValueThurs:this.state.slotValueThurs+1}));
                    }
                    else
                    if(this.state.sizeThurs !=="" && this.state.rateThurs !== "" && this.state.newSlotThurs.length > 0){
                       let lastElement = tempSlot[tempSlot.length -1];
                        if(lastElement.size && lastElement.cost){
                            tempSlot.push({id:this.state.slotValueThurs,size:"",cost:"", page_section:"First Page"});
                            console.log("second:",tempSlot)
                            return(this.setState({newSlotThurs:tempSlot, slotValueThurs:this.state.slotValueThurs+1}));
                        }
                    }
                      
                  }
            
                  handleSizeChangeThurs=(id , value)=>{
                    var tempSlot = [...this.state.newSlotThurs];
                    const selected = tempSlot.find(item=>item.id===id);
                    const index = tempSlot.indexOf(selected);
                    const selectedIndex = tempSlot[index];
                    console.log(tempSlot)
                    selectedIndex.size = value;
                    return(this.setState({newSlotThurs:tempSlot}))
            
                  }
            
                  handleRateChangeThurs=(id , value)=>{
                    var tempSlot = [...this.state.newSlotThurs];
                    const selected = tempSlot.find(item=>item.id===id);
                    const index = tempSlot.indexOf(selected);
                    const selectedIndex = tempSlot[index];
                    console.log(tempSlot)
                    selectedIndex.cost = value;
                    return(this.setState({newSlotThurs:tempSlot}))
            
                  }
                  handlePageChangeThurs=(id , value)=>{
                    var tempSlot = [...this.state.newSlotThurs];
                    const selected = tempSlot.find(item=>item.id===id);
                    const index = tempSlot.indexOf(selected);
                    const selectedIndex = tempSlot[index];
                    console.log(tempSlot)
                    selectedIndex.page_section = value;
                    return(this.setState({newSlotThurs:tempSlot}))
            
                  }
                  handleDeleteThurs=(id)=>{
                    
                    console.log("id:",id)
                    var tempSlot = [...this.state.newSlotThurs];
                    let newArray = tempSlot.filter(item=>item.id !== id);
                    console.log("temp",newArray)
                    return(this.setState({newSlotThurs:newArray}))
                }
            
                handleSubmitThurs=(e)=>{
                    console.log("start submitting");
                    this.setState({isActive:true});
                     let tempSlot = [...this.state.newSlotThurs];
                     tempSlot.unshift({id:1,size:this.state.sizeThurs,cost:this.state.rateThurs,page_section:this.state.page_sectionThurs});
                      console.log(tempSlot);
                      axios.post(`${domain}/api/ratecard/${this.props.location.state.title_id}/add-details`,
                      {day_id:4, details:tempSlot,rate_card_title:this.state.title},
                      {headers:{ 'Authorization':`Bearer ${user}`}}) 
                      .then(res=>{
                          console.log(res.data);
                          if(res.data.status === "saved"){
                          this.setState({
                              isActive:false,
                              sizeThurs:"",
                              rateThurs:"",
                              newSlotThurs:[],
                              page_sectionThurs:"First Page",
                              title:res.data.rate_card_title
                             });
                          alert("saved");
                          }
                      })
                      .catch(error=>{
                          console.log(error.response.data)
                      })
              
                    }

                    AddSlotFriday=()=>{
                        var tempSlot = [...this.state.newSlotFri];
                        console.log(tempSlot)
                        if(this.state.sizeFri !=="" && this.state.rateFri !== "" && this.state.newSlotFri.length <=0 ){
                            tempSlot.push({id:this.state.slotValueFri,size:"",cost:"",page_section:"First Page"});
                            console.log("first:",tempSlot)
                            return(this.setState({newSlotFri:tempSlot, slotValueFri:this.state.slotValueFri+1}));
                        }
                        else
                        if(this.state.sizeFri !=="" && this.state.rateFri !== "" && this.state.newSlotFri.length > 0){
                           let lastElement = tempSlot[tempSlot.length -1];
                            if(lastElement.size && lastElement.cost){
                                tempSlot.push({id:this.state.slotValueFri,size:"",cost:"", page_section:"First Page"});
                                console.log("second:",tempSlot)
                                return(this.setState({newSlotFri:tempSlot, slotValueFri:this.state.slotValueFri+1}));
                            }
                        }
                          
                      }
                
                      handleSizeChangeFri=(id , value)=>{
                        var tempSlot = [...this.state.newSlotFri];
                        const selected = tempSlot.find(item=>item.id===id);
                        const index = tempSlot.indexOf(selected);
                        const selectedIndex = tempSlot[index];
                        console.log(tempSlot)
                        selectedIndex.size = value;
                        return(this.setState({newSlotFri:tempSlot}))
                
                      }
                
                      handleRateChangeFri=(id , value)=>{
                        var tempSlot = [...this.state.newSlotFri];
                        const selected = tempSlot.find(item=>item.id===id);
                        const index = tempSlot.indexOf(selected);
                        const selectedIndex = tempSlot[index];
                        console.log(tempSlot)
                        selectedIndex.cost = value;
                        return(this.setState({newSlotFri:tempSlot}))
                
                      }
                      handlePageChangeFri=(id , value)=>{
                        var tempSlot = [...this.state.newSlotFri];
                        const selected = tempSlot.find(item=>item.id===id);
                        const index = tempSlot.indexOf(selected);
                        const selectedIndex = tempSlot[index];
                        console.log(tempSlot)
                        selectedIndex.page_section = value;
                        return(this.setState({newSlotFri:tempSlot}))
                
                      }
                      handleDeleteFri=(id)=>{
                        
                        console.log("id:",id)
                        var tempSlot = [...this.state.newSlotFri];
                        let newArray = tempSlot.filter(item=>item.id !== id);
                        console.log("temp",newArray)
                        return(this.setState({newSlotFri:newArray}))
                    }
                
                    handleSubmitFri=(e)=>{
                        console.log("start submitting");
                        this.setState({isActive:true});
                         let tempSlot = [...this.state.newSlotFri];
                         tempSlot.unshift({id:1,size:this.state.sizeFri,cost:this.state.rateFri, page_section:this.state.page_sectionFri});
                          console.log(tempSlot);
                          axios.post(`${domain}/api/ratecard/${this.props.location.state.title_id}/add-details`,
                          {day_id:5, details:tempSlot,rate_card_title:this.state.title},
                          {headers:{ 'Authorization':`Bearer ${user}`}}) 
                          .then(res=>{
                              console.log(res.data);
                              if(res.data.status === "saved"){
                              this.setState({
                                  isActive:false,
                                  sizeFri:"",
                                  rateFri:"",
                                  newSlotFri:[],
                                  page_sectionFri:"First Page",
                                  title:res.data.rate_card_title
                                 });
                              alert("saved");
                              }
                          })
                          .catch(error=>{
                              console.log(error.response.data)
                          })
                  
                        }

                        AddSlotSaturday=()=>{
                            var tempSlot = [...this.state.newSlotSat];
                            console.log(tempSlot)
                            if(this.state.sizeSat !=="" && this.state.rateSat !== "" && this.state.newSlotSat.length <=0 ){
                                tempSlot.push({id:this.state.slotValueSat,size:"",cost:"",page_section:"First Page"});
                                console.log("first:",tempSlot)
                                return(this.setState({newSlotSat:tempSlot, slotValueSat:this.state.slotValueSat+1}));
                            }
                            else
                            if(this.state.sizeSat !=="" && this.state.rateSat !== "" && this.state.newSlotSat.length > 0){
                               let lastElement = tempSlot[tempSlot.length -1];
                                if(lastElement.size && lastElement.cost){
                                    tempSlot.push({id:this.state.slotValueSat,size:"",cost:"", page_section:"First Page"});
                                    console.log("second:",tempSlot)
                                    return(this.setState({newSlotSat:tempSlot, slotValueSat:this.state.slotValueSat+1}));
                                }
                            }
                              
                          }
                    
                          handleSizeChangeSat=(id , value)=>{
                            var tempSlot = [...this.state.newSlotSat];
                            const selected = tempSlot.find(item=>item.id===id);
                            const index = tempSlot.indexOf(selected);
                            const selectedIndex = tempSlot[index];
                            console.log(tempSlot)
                            selectedIndex.size = value;
                            return(this.setState({newSlotSat:tempSlot}))
                    
                          }
                    
                          handleRateChangeSat=(id , value)=>{
                            var tempSlot = [...this.state.newSlotSat];
                            const selected = tempSlot.find(item=>item.id===id);
                            const index = tempSlot.indexOf(selected);
                            const selectedIndex = tempSlot[index];
                            console.log(tempSlot)
                            selectedIndex.cost = value;
                            return(this.setState({newSlotSat:tempSlot}))
                    
                          }
                          handlePageChangeSat=(id , value)=>{
                            var tempSlot = [...this.state.newSlotSat];
                            const selected = tempSlot.find(item=>item.id===id);
                            const index = tempSlot.indexOf(selected);
                            const selectedIndex = tempSlot[index];
                            console.log(tempSlot)
                            selectedIndex.page_section = value;
                            return(this.setState({newSlotSat:tempSlot}))
                    
                          }
                          handleDeleteSat=(id)=>{
                            
                            console.log("id:",id)
                            var tempSlot = [...this.state.newSlotSat];
                            let newArray = tempSlot.filter(item=>item.id !== id);
                            console.log("temp",newArray)
                            return(this.setState({newSlotSat:newArray}))
                        }
                    
                        handleSubmitSat=(e)=>{
                            console.log("start submitting");
                            this.setState({isActive:true});
                             let tempSlot = [...this.state.newSlotSat];
                             tempSlot.unshift({id:1,size:this.state.sizeSat,cost:this.state.rateSat, page_section:this.state.page_sectionSat});
                              console.log(tempSlot);
                              axios.post(`${domain}/api/ratecard/${this.props.location.state.title_id}/add-details`,
                              {day_id:6, details:tempSlot,rate_card_title:this.state.title},
                              {headers:{ 'Authorization':`Bearer ${user}`}}) 
                              .then(res=>{
                                  console.log(res.data);
                                  if(res.data.status === "saved"){
                                  this.setState({
                                      isActive:false,
                                      sizeSat:"",
                                      rateSat:"",
                                      newSlotSat:[],
                                      page_sectionSat:"First Page",
                                      title:res.data.rate_card_title
                                     });
                                  alert("saved");
                                  }
                              })
                              .catch(error=>{
                                  console.log(error.response.data)
                              })
                      
                            }


                            AddSlotSunday=()=>{
                                var tempSlot = [...this.state.newSlotSun];
                                console.log(tempSlot)
                                if(this.state.sizeSun !=="" && this.state.rateSun !== "" && this.state.newSlotSun.length <=0 ){
                                    tempSlot.push({id:this.state.slotValueSun,size:"",cost:"",page_section:"First Page"});
                                    console.log("first:",tempSlot)
                                    return(this.setState({newSlotSun:tempSlot, slotValueSun:this.state.slotValueSun+1}));
                                }
                                else
                                if(this.state.sizeSun !=="" && this.state.rateSun !== "" && this.state.newSlotSun.length > 0){
                                   let lastElement = tempSlot[tempSlot.length -1];
                                    if(lastElement.size && lastElement.cost){
                                        tempSlot.push({id:this.state.slotValueSun,size:"",cost:"", page_section:"First Page"});
                                        console.log("second:",tempSlot)
                                        return(this.setState({newSlotSun:tempSlot, slotValueSun:this.state.slotValueSun+1}));
                                    }
                                }
                                  
                              }
                        
                              handleSizeChangeSun=(id , value)=>{
                                var tempSlot = [...this.state.newSlotSun];
                                const selected = tempSlot.find(item=>item.id===id);
                                const index = tempSlot.indexOf(selected);
                                const selectedIndex = tempSlot[index];
                                console.log(tempSlot)
                                selectedIndex.size = value;
                                return(this.setState({newSlotSun:tempSlot}))
                        
                              }
                        
                              handleRateChangeSun=(id , value)=>{
                                var tempSlot = [...this.state.newSlotSun];
                                const selected = tempSlot.find(item=>item.id===id);
                                const index = tempSlot.indexOf(selected);
                                const selectedIndex = tempSlot[index];
                                console.log(tempSlot)
                                selectedIndex.cost = value;
                                return(this.setState({newSlotSun:tempSlot}))
                        
                              }
                              handlePageChangeSun=(id , value)=>{
                                var tempSlot = [...this.state.newSlotSun];
                                const selected = tempSlot.find(item=>item.id===id);
                                const index = tempSlot.indexOf(selected);
                                const selectedIndex = tempSlot[index];
                                console.log(tempSlot)
                                selectedIndex.page_section = value;
                                return(this.setState({newSlotSun:tempSlot}))
                        
                              }
                              handleDeleteSun=(id)=>{
                                
                                console.log("id:",id)
                                var tempSlot = [...this.state.newSlotSun];
                                let newArray = tempSlot.filter(item=>item.id !== id);
                                console.log("temp",newArray)
                                return(this.setState({newSlotSun:newArray}))
                            }
                        
                            handleSubmitSun=(e)=>{
                                console.log("start submitting");
                                this.setState({isActive:true});
                                 let tempSlot = [...this.state.newSlotSun];
                                 tempSlot.unshift({id:1,size:this.state.sizeSun,cost:this.state.rateSun, page_section:this.state.page_sectionSun});
                                  console.log(tempSlot);
                                  axios.post(`${domain}/api/ratecard/${this.props.location.state.title_id}/add-details`,
                                  {day_id:7, details:tempSlot,rate_card_title:this.state.title},
                                  {headers:{ 'Authorization':`Bearer ${user}`}}) 
                                  .then(res=>{
                                      console.log(res.data);
                                      if(res.data.status === "saved"){
                                      this.setState({
                                          isActive:false,
                                          sizeSun:"",
                                          rateSun:"",
                                          newSlotSun:[],
                                          page_sectionSun:"First Page",
                                          title:res.data.rate_card_title
                                         });
                                      alert("saved");
                                      }
                                  })
                                  .catch(error=>{
                                      console.log(error.response.data)
                                  })
                          
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
                        <Col md="3" sm="3" xs="3" lg="3">
                        <Label>Size</Label>
                        <Input type="text" value={this.state.size} onChange={e=>this.setState({size:e.target.value})} placeholder="Eg: 2X3 "/>
                        </Col>
                        <Col md="3" sm="3" xs="3" lg="3">
                        <Label>Rate</Label>
                        <Input type="number" min="0" value={this.state.rate} onChange={e=>this.setState({rate:e.target.value})}/>
                        </Col>
                        <Col md="3" sm="3" xs="3" lg="3">
                        <Label>Page Section</Label>
                        <Input type="select"  value={this.state.page_section} onChange={e=>this.setState({page_section:e.target.value})}>
                        <option value="Front Page">Front Page</option>
                        <option value="Back Page">Back Page</option>
                        <option value="Middle Page">Middle Page</option>
                        </Input>
                        </Col>
                        <Col md="3" sm="3" xs="3" lg="3" className="text-center">
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
                            <Input type="text" value={this.state.newSlot[index].size} onChange={(e)=>this.handleSizeChange(value.id, e.target.value)} placeholder="Eg: 2X3 "/>
                            </Col>
                            <Col md="3" sm="3" xs="3" lg="3">
                            <Input type="number" value={this.state.newSlot[index].cost} onChange={(e)=>this.handleRateChange(value.id,e.target.value)}/>
                            </Col>
                            <Col md="3" sm="3" xs="3" lg="3">
                            <Input type="select" value={this.state.newSlot[index].page_section} onChange={(e)=>this.handlePageChange(value.id,e.target.value)}>
                            <option value="Front Page">Front Page</option>
                            <option value="Back Page">Back Page</option>
                            <option value="Middle Page">Middle Page</option>
                            </Input>
                            </Col>
                            <Col md="3" sm="3" xs="3" lg="3" className="text-center">

                            <i className="fa fa-trash" style={{color:"red",fontSize:"20px",marginTop:"15px",cursor:"pointer"}} onClick={()=>this.handleDelete(value.id)}/>
                            </Col>
                        </Row>
                    ))}
                    <Row style={{marginTop:"20px"}}>
                        <Col md="6"sm="6"lg="6"xs="6">
                            <Button
                            color="danger"
                            onClick={()=>this.handleSubmit()}
                            >
                                SAVE
                            </Button>    
                        </Col>
                        
                    </Row> 
                </Container>
                </TabPane>
                <TabPane tabId="2">
                <Container> 
                   <Row>
                       <Col md="3" sm="3" xs="3" lg="3">
                       <Label>Size</Label>
                       <Input type="text" min="0" value={this.state.sizeTues} onChange={e=>this.setState({sizeTues:e.target.value})} placeholder="Eg: 2X3 "/>
                       </Col>
                       <Col md="3" sm="3" xs="3" lg="3">
                       <Label>Rate</Label>
                       <Input type="number" min="0" value={this.state.rateTues} onChange={e=>this.setState({rateTues:e.target.value})}/>
                       </Col>
                       <Col md="3" sm="3" xs="3" lg="3">
                        <Label>Page Section</Label>
                        <Input type="select" value={this.state.page_sectionTues} onChange={e=>this.setState({page_sectionTues:e.target.value})}>
                        <option value="Front Page">Front Page</option>
                        <option value="Back Page">Back Page</option>
                        <option value="Middle Page">Middle Page</option>
                        </Input>
                        </Col>
                       <Col md="3" sm="3" xs="3" lg="3" className="text-center">
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
                           <Input type="text" value={this.state.newSlotTues[index].size} onChange={(e)=>this.handleSizeChangeTues(value.id, e.target.value)} placeholder="Eg: 2X3 "/>
                           </Col>
                           <Col md="3" sm="3" xs="3" lg="3">
                           <Input type="number" value={this.state.newSlotTues[index].rate} onChange={(e)=>this.handleRateChangeTues(value.id,e.target.value)}/>
                           </Col>
                           <Col md="3" sm="3" xs="3" lg="3">
                           
                            <Input type="select" min="0" value={this.state.newSlotTues[index].page_section} onChange={e=>this.handlePageChangeTues(value.id,e.target.value)}>
                            <option value="Front Page">Front Page</option>
                            <option value="Back Page">Back Page</option>
                            <option value="Middle Page">Middle Page</option>
                            </Input>
                            </Col>
                           <Col md="3" sm="3" xs="3" lg="3" className="text-center">

                           <i className="fa fa-trash" style={{color:"red",fontSize:"20px",marginTop:"15px",cursor:"pointer"}} onClick={()=>this.handleDeleteTues(value.id)}/>
                           </Col>
                       </Row>
                   ))}
                   <Row style={{marginTop:"20px"}}>
                       <Col md="6"sm="6"lg="6"xs="6">
                           <Button
                           color="danger"
                           onClick={()=>this.handleSubmitTues()}
                           >
                               SAVE
                           </Button>    
                       </Col>
                       
                   </Row> 
               </Container>
                </TabPane>

                <TabPane tabId="3">
                <Container> 
                   <Row>
                       <Col md="3" sm="3" xs="3" lg="3">
                       <Label>Size</Label>
                       <Input type="text" min="0" value={this.state.sizeWed} onChange={e=>this.setState({sizeWed:e.target.value})} placeholder="Eg: 2X3 "/>
                       </Col>
                       <Col md="3" sm="3" xs="3" lg="3">
                       <Label>Rate</Label>
                       <Input type="number" min="0" value={this.state.rateWed} onChange={e=>this.setState({rateWed:e.target.value})}/>
                       </Col>
                       <Col md="3" sm="3" xs="3" lg="3">
                        <Label>Page Section</Label>
                        <Input type="select" min="0" value={this.state.page_sectionWed} onChange={e=>this.setState({page_sectionWed:e.target.value})}>
                        <option value="Front Page">Front Page</option>
                        <option value="Back Page">Back Page</option>
                        <option value="Middle Page">Middle Page</option>
                        </Input>
                        </Col>
                       <Col md="3" sm="3" xs="3" lg="3" className="text-center">
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
                           <Input type="text" value={this.state.newSlotWed[index].size} onChange={(e)=>this.handleSizeChangeWed(value.id, e.target.value)} placeholder="Eg: 2X3 "/>
                           </Col>
                           <Col md="3" sm="3" xs="3" lg="3">
                           <Input type="number" value={this.state.newSlotWed[index].cost} onChange={(e)=>this.handleRateChangeWed(value.id,e.target.value)}/>
                           </Col>
                           <Col md="3" sm="3" xs="3" lg="3">
                           
                            <Input type="select" min="0" value={this.state.newSlotWed[index].page_section} onChange={e=>this.handlePageChangeWed(value.id,e.target.value)}>
                            <option value="Front Page">Front Page</option>
                            <option value="Back Page">Back Page</option>
                            <option value="Middle Page">Middle Page</option>
                            </Input>
                            </Col>
                           <Col md="3" sm="3" xs="3" lg="3" className="text-center">

                           <i className="fa fa-trash" style={{color:"red",fontSize:"20px",marginTop:"15px",cursor:"pointer"}} onClick={()=>this.handleDeleteWed(value.id)}/>
                           </Col>
                       </Row>
                   ))}
                   <Row style={{marginTop:"20px"}}>
                       <Col md="6"sm="6"lg="6"xs="6">
                           <Button
                           color="danger"
                           onClick={()=>this.handleSubmitWed()}
                           >
                               SAVE
                           </Button>    
                       </Col>
                       
                   </Row> 
               </Container>
                </TabPane>

                <TabPane tabId="4">
                <Container> 
                   <Row>
                       <Col md="3" sm="3" xs="3" lg="3">
                       <Label>Size</Label>
                       <Input type="text" min="0" value={this.state.sizeThurs} onChange={e=>this.setState({sizeThurs:e.target.value})} placeholder="Eg: 2X3 "/>
                       </Col>
                       <Col md="3" sm="3" xs="3" lg="3">
                       <Label>Rate</Label>
                       <Input type="number" min="0" value={this.state.rateThurs} onChange={e=>this.setState({rateThurs:e.target.value})}/>
                       </Col>
                       <Col md="3" sm="3" xs="3" lg="3">
                        <Label>Page Section</Label>
                        <Input type="select" min="0" value={this.state.page_sectionThurs} onChange={e=>this.setState({page_sectionThurs:e.target.value})}>
                        <option value="Front Page">Front Page</option>
                        <option value="Back Page">Back Page</option>
                        <option value="Middle Page">Middle Page</option>
                        </Input>
                        </Col>
                       <Col md="3" sm="3" xs="3" lg="3" className="text-center">
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
                           <Input type="text" value={this.state.newSlotThurs[index].size} onChange={(e)=>this.handleSizeChangeThurs(value.id, e.target.value)} placeholder="Eg: 2X3 "/>
                           </Col>
                           <Col md="3" sm="3" xs="3" lg="3">
                           <Input type="number" value={this.state.newSlotThurs[index].cost} onChange={(e)=>this.handleRateChangeThurs(value.id,e.target.value)}/>
                           </Col>
                            <Col md="3" sm="3" xs="3" lg="3">
                           
                            <Input type="select" min="0" value={this.state.newSlotThurs[index].page_section} onChange={e=>this.handlePageChangeThurs(value.id,e.target.value)}>
                            <option value="Front Page">Front Page</option>
                            <option value="Back Page">Back Page</option>
                            <option value="Middle Page">Middle Page</option>
                            </Input>
                            </Col>
                           <Col md="3" sm="3" xs="3" lg="3" className="text-center">

                           <i className="fa fa-trash" style={{color:"red",fontSize:"20px",marginTop:"15px",cursor:"pointer"}} onClick={()=>this.handleDeleteThurs(value.id)}/>
                           </Col>
                       </Row>
                   ))}
                   <Row style={{marginTop:"20px"}}>
                       <Col md="6"sm="6"lg="6"xs="6">
                           <Button
                           color="danger"
                           onClick={()=>this.handleSubmitThurs()}
                           >
                               SAVE
                           </Button>    
                       </Col>
                       
                   </Row> 
               </Container>
                </TabPane>

                <TabPane tabId="5">
                <Container> 
                   <Row>
                       <Col md="3" sm="3" xs="3" lg="3">
                       <Label>Size</Label>
                       <Input type="text" min="0" value={this.state.sizeFri} onChange={e=>this.setState({sizeFri:e.target.value})} placeholder="Eg: 2X3 "/>
                       </Col>
                       <Col md="3" sm="3" xs="3" lg="3">
                       <Label>Rate</Label>
                       <Input type="number" min="0" value={this.state.rateFri} onChange={e=>this.setState({rateFri:e.target.value})}/>
                       </Col>
                       <Col md="3" sm="3" xs="3" lg="3">
                        <Label>Page Section</Label>
                        <Input type="select" min="0" value={this.state.page_sectionFri} onChange={e=>this.setState({page_sectionFri:e.target.value})}>
                        <option value="Front Page">Front Page</option>
                        <option value="Back Page">Back Page</option>
                        <option value="Middle Page">Middle Page</option>
                        </Input>
                        </Col>
                       <Col md="3" sm="3" xs="3" lg="3" className="text-center">
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
                           <Input type="text" value={this.state.newSlotFri[index].size} onChange={(e)=>this.handleSizeChangeFri(value.id, e.target.value)} placeholder="Eg: 2X3 "/>
                           </Col>
                           <Col md="3" sm="3" xs="3" lg="3">
                           <Input type="number" value={this.state.newSlotFri[index].cost} onChange={(e)=>this.handleRateChangeFri(value.id,e.target.value)}/>
                           </Col>
                           <Col md="3" sm="3" xs="3" lg="3">
                           
                            <Input type="select" min="0" value={this.state.newSlotSat[index].page_section} onChange={e=>this.handlePageChangeFri(value.id,e.target.value)}>
                            <option value="Front Page">Front Page</option>
                            <option value="Back Page">Back Page</option>
                            <option value="Middle Page">Middle Page</option>
                            </Input>
                            </Col>
                           <Col md="3" sm="3" xs="3" lg="3" className="text-center">

                           <i className="fa fa-trash" style={{color:"red",fontSize:"20px",marginTop:"15px",cursor:"pointer"}} onClick={()=>this.handleDeleteFri(value.id)}/>
                           </Col>
                       </Row>
                   ))}
                   <Row style={{marginTop:"20px"}}>
                       <Col md="6"sm="6"lg="6"xs="6">
                           <Button
                           color="danger"
                           onClick={()=>this.handleSubmitFri()}
                           >
                               SAVE
                           </Button>    
                       </Col>
                       
                   </Row> 
               </Container>
                </TabPane>

                <TabPane tabId="6">
                <Container> 
                   <Row>
                       <Col md="3" sm="3" xs="3" lg="3">
                       <Label>Size</Label>
                       <Input type="text" min="0" value={this.state.sizeSat} onChange={e=>this.setState({sizeSat:e.target.value})} placeholder="Eg: 2X3 "/>
                       </Col>
                       <Col md="3" sm="3" xs="3" lg="3">
                       <Label>Rate</Label>
                       <Input type="number" min="0" value={this.state.rateSat} onChange={e=>this.setState({rateSat:e.target.value})}/>
                       </Col>
                       <Col md="3" sm="3" xs="3" lg="3">
                        <Label>Page Section</Label>
                        <Input type="select" value={this.state.page_sectionSat} onChange={e=>this.setState({page_sectionSat:e.target.value})}>
                        <option value="Front Page">Front Page</option>
                        <option value="Back Page">Back Page</option>
                        <option value="Middle Page">Middle Page</option>
                        </Input>
                        </Col>
                       <Col md="3" sm="3" xs="3" lg="3" className="text-center">
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
                           <Input type="text" value={this.state.newSlotSat[index].size} onChange={(e)=>this.handleSizeChangeSat(value.id, e.target.value)} placeholder="Eg: 2X3 "/>
                           </Col>
                           <Col md="3" sm="3" xs="3" lg="3">
                           <Input type="number" value={this.state.newSlotSat[index].cost} onChange={(e)=>this.handleRateChangeSat(value.id,e.target.value)}/>
                           </Col>
                           <Col md="3" sm="3" xs="3" lg="3">
                           
                            <Input type="select"value={this.state.newSlotSat[index].page_section} onChange={e=>this.handlePageChangeSat(value.id,e.target.value)}>
                            <option value="Front Page">Front Page</option>
                            <option value="Back Page">Back Page</option>
                            <option value="Middle Page">Middle Page</option>
                            </Input>
                            </Col>
                           <Col md="3" sm="3" xs="3" lg="3" className="text-center">

                           <i className="fa fa-trash" style={{color:"red",fontSize:"20px",marginTop:"15px",cursor:"pointer"}} onClick={()=>this.handleDeleteSat(value.id)}/>
                           </Col>
                       </Row>
                   ))}
                   <Row style={{marginTop:"20px"}}>
                       <Col md="6"sm="6"lg="6"xs="6">
                           <Button
                           color="danger"
                           onClick={()=>this.handleSubmitSat()}
                           >
                               SAVE
                           </Button>    
                       </Col>
                       
                   </Row> 
               </Container>
                </TabPane>

                <TabPane tabId="7">
                <Container> 
                   <Row>
                       <Col md="3" sm="3" xs="3" lg="3">
                       <Label>Size</Label>
                       <Input type="text" min="0" value={this.state.sizeSun} onChange={e=>this.setState({sizeSun:e.target.value})} placeholder="Eg: 2X3 "/>
                       </Col>
                       <Col md="3" sm="3" xs="3" lg="3">
                       <Label>Rate</Label>
                       <Input type="number" min="0" value={this.state.rateSun} onChange={e=>this.setState({rateSun:e.target.value})}/>
                       </Col>
                       <Col md="3" sm="3" xs="3" lg="3">
                        <Label>Page Section</Label>
                        <Input type="select" min="0" value={this.state.page_sectionSun} onChange={e=>this.setState({page_sectionSun:e.target.value})}>
                        <option value="Front Page">Front Page</option>
                        <option value="Back Page">Back Page</option>
                        <option value="Middle Page">Middle Page</option>
                        </Input>
                        </Col>
                       <Col md="3" sm="3" xs="3" lg="3" className="text-center">
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
                           <Input type="text" value={this.state.newSlotSun[index].size} onChange={(e)=>this.handleSizeChangeSun(value.id, e.target.value)} placeholder="Eg: 2X3 "/>
                           </Col>
                           <Col md="3" sm="3" xs="3" lg="3">
                           <Input type="number" value={this.state.newSlotSun[index].cost} onChange={(e)=>this.handleRateChangeSun(value.id,e.target.value)}/>
                           </Col>
                           <Col md="3" sm="3" xs="3" lg="3">
                           
                            <Input type="select" min="0" value={this.state.newSlotSun[index].page_section} onChange={e=>this.handlePageChangeSun(value.id,e.target.value)}>
                            <option value="Front Page">Front Page</option>
                            <option value="Back Page">Back Page</option>
                            <option value="Middle Page">Middle Page</option>
                            </Input>
                            </Col>
                           <Col md="3" sm="3" xs="3" lg="3" className="text-center">

                           <i className="fa fa-trash" style={{color:"red",fontSize:"20px",marginTop:"15px",cursor:"pointer"}} onClick={()=>this.handleDeleteSun(value.id)}/>
                           </Col>
                       </Row>
                   ))}
                   <Row style={{marginTop:"20px"}}>
                       <Col md="6"sm="6"lg="6"xs="6">
                           <Button
                           color="danger"
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
            </Card>    
            </Col>
            </Row>
            <Row style={{marginTop:"25px", marginBottom:"20px"}}>
                <Col lg="10">
                
                <Button
                style={{backgroundColor:"#404E67",color:"white"}}
                block
                onClick={()=>this.props.history.push("/media/edit-ratecards/print",{title_id:this.props.location.state.title_id})}
                >
                    PREVIEW
                </Button>
                </Col>
            </Row> 
        </Container>
        </LoadingOverlay>
      </>
    );
  }
}


export default EditPrintDetails;




/* [{
id: 1,
day:{id:1, day:"Monday"},
title:"Rate Card title",
rate_card_title_id: 3,
no_of_spots:20,
durations:[
    {duration:"2X30", rate:20.00, unit:"Front Page"},
    {duration:"2X30", rate:20.00, unit:"Front Page"},
    {duration:"2X30", rate:20.00, unit:"Front Page"},
    {duration:"2X30", rate:20.00, unit:"Front Page"},
]
},
{
id: 2,
day:{id:1, day:"Monday"},
title:"Rate Card title",
rate_card_title_id: 3,
isAPrintCard: true,
details:[
    {duration:"2X30", rate:20.00, unit:"Front Page"},
    {duration:"2X30", rate:20.00, unit:"Front Page"},
    {duration:"2X30", rate:20.00, unit:"Front Page"},
    {duration:"2X30", rate:20.00, unit:"Front Page"},
]
},
{
id: 3,
day:{id:2, day:"Tuesday"},
title:"Rate Card title",
rate_card_title_id: 3,
isAPrintCard: true,
details:[
    {duration:"2X30", rate:20.00, unit:"Front Page"},
    {duration:"2X30", rate:20.00, unit:"Front Page"},
    {duration:"2X30", rate:20.00, unit:"Front Page"},
    {duration:"2X30", rate:20.00, unit:"Front Page"},
]
}] */
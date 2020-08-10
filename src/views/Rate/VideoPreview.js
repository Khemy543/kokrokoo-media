import React from "react";
// reactstrap components
import {
  Card,
  CardBody,
  Container,
  Row,
  Col, CardHeader, Nav, NavItem, NavLink,
  TabContent,TabPane,Input,Button
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
    details:[],
    page_section:[
      {id:1, page_section:"First Page"},
      {id:2, page_section:"Back Page"},
      {id:3,page_section:"Middle Page"}
    ]
  }

  componentDidMount(){

    axios.get("https://media-kokrokooad.herokuapp.com/api/fetch-days-and-units")
    .then(res=>{
        console.log(res.data)
        this.setState({days:res.data.days,isActive:false})
    });

    axios.get("https://media-kokrokooad.herokuapp.com/api/ratecard/" +this.props.location.state.title_id + "/preview",
      { headers: { 'Authorization': `Bearer ${user}` } })
      .then(res => {
        console.log(res.data);
        
      })
      .catch(error => {
        console.log(error.response.data)
      });



  }

  toggle = tab => {
    if(this.state.activeTab !== tab) this.setState({activeTab:tab});
  }

  getDetails=(id)=>{
    let tempData = this.state.data;
    const newId = Number(id)
    let selectedDetaisl = tempData.find(item=> item.day.id === newId);
    console.log(selectedDetaisl)
    if(selectedDetaisl !== undefined){
      this.setState({details:selectedDetaisl[0]})
    }
    else{
      this.setState({details:[]})
    }
  }

  handleRateChange=(id,value)=>{
    let tempDetails = this.state.details;
    const selectedDetail = tempDetails.find(item=>item.id === id);
    selectedDetail.cost  = value;
    this.setState({details:tempDetails})
  }

  handlePageChange=(id,value)=>{
    let tempDetails = this.state.details;
    const selectedDetail = tempDetails.find(item=>item.id === id);
    selectedDetail.page_section  = value;
    this.setState({details:tempDetails})
  }
  handeleSizeChange=(id, value)=>{
    let tempDetails = this.state.details;
    const selectedDetail = tempDetails.find(item=>item.id === id);
    selectedDetail.size  = value;
    this.setState({details:tempDetails})
  }

  handleDelete=(id)=>{
    let tempDetails = this.state.details;
    let selectedDetail = tempDetails.filter(item=>item.id !== id);
    this.setState({details:selectedDetail})
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
                  <h3 className=" mb-0">RATE CARD DETAILS</h3>
                </CardHeader>
                
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

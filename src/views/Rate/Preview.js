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

let user = localStorage.getItem("access_token");
var domain = "https://media.test.backend.kokrokooad.com";

class Preview extends React.Component{

  state={
    isActive:false,
    activeTab:"1",
    days:[],
    data:[],
    details:[],
    id_number:1,
    page_section:[
      {id:1, page_section:"First Page"},
      {id:2, page_section:"Back Page"},
      {id:3,page_section:"Middle Page"}
    ],
    title:""
  }

  componentDidMount(){
    this.setState({isActive:true});
    axios.get(`${domain}/api/fetch-days-and-units`)
    .then(res=>{
        console.log(res.data)
        this.setState({days:res.data.days})
    });

    axios.get(`${domain}/api/ratecard/${this.props.location.state.title_id}/preview`,
      { headers: { 'Authorization': `Bearer ${user}` } })
      .then(res => {
        console.log(res.data);
        if(res.data !== []){
        this.setState({data:res.data.details, title:res.data.rate_card_title});
          let tempData = res.data.details;
          let selectedDetaisl = tempData.find(item=> item.day.id === 1);
          console.log(selectedDetaisl);
          if(selectedDetaisl !== undefined){
          this.setState({details:selectedDetaisl[0], isActive:false})
          }
          else{
            this.setState({details:[], isActive:false})
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

  addSlot=()=>{
    let tempData = this.state.details;
    if(tempData[tempData.length-1].size && tempData[tempData.length-1].cost){
    tempData.push({id:`#${this.state.id_number}`, size:"", cost:"", page_section:"First Page"});
    this.setState({details:tempData, id_number:this.state.id_number+1})
    }
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
                          <Row>
                            <Col md="3">
                            <h3>Size</h3>
                            </Col>
                            <Col md="3">
                            <h3>Cost</h3>
                            </Col>
                            <Col md="3">
                            <h3>Page Section</h3>
                            </Col>
                            <Col md="2">
                            <h3 style={{textAlign:"center"}}>Delete</h3>
                            </Col>
                            <Col md="1">
                            <Button
                            color="info"
                            onClick={()=>this.addSlot()}
                            >
                            <i className="fa fa-plus"/>
                            </Button>
                            </Col>
                          </Row>
                          {this.state.details.map((value, index)=>(
                          <Row key={index} style={{marginBottom:"20px"}}>
                              <Col md="3"  sm="3" xs="3" lg="3">
                                <Input type="text" placeholder='Eg. 2"X3"' value={value.size} onChange={e=>{this.handeleSizeChange(value.id,e.target.value)}}/>
                              </Col>
                              <Col md="3"  sm="3" xs="3" lg="3">
                                <Input type="number" value={value.cost} onChange={e=>this.handleRateChange(value.id,e.target.value)}/>
                              </Col>
                              <Col md="3"  sm="3" xs="3" lg="3">
                                <Input type="select" value={value.page_section} onChange={e=>this.handlePageChange(value.id,e.target.value)}>
                                {this.state.page_section.map(item =>(
                                  <option value="Front Page" key={item.id} value={item.page_section}>{item.page_section}</option>
                                  ))}
                                </Input>
                              </Col>
                              <Col md="2" sm="2" xs="2" lg="2" className="text-center">
                           <i className="fa fa-trash" style={{color:"red",fontSize:"20px",marginTop:"15px",cursor:"pointer"}} onClick={()=>this.handleDelete(value.id)}/>
                           </Col>
                           <Col md="1">
                            </Col>
                          </Row>
                          ))}
                          <Row>
                            <Col md="5">
                              <Button
                              color="info"
                              >
                                Edit
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


export default Preview;

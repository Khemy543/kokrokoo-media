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
  Nav,NavItem,NavLink
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import axios from "axios";
//import history from "../history";
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


function RateCards(props) {
    const [ratecards, setRatecards] = React.useState([]);
    const [isActive, setIsActive] = React.useState(false);

    console.log("meida ghouse",props.location.state)

React.useEffect(()=>{
  setIsActive(true)
    axios.get("https://kokrokooad.herokuapp.com/api/view/"+props.location.state.media_house_id+"/ratecards",{
    headers:{ 'Authorization':`Bearer ${user}`}})
    .then(res=>{
        console.log(res.data);
        setRatecards(res.data);
        setIsActive(false);
    })
    .catch(error=>{
        console.log(error)
        setIsActive(false)
    })
},[])

    return (
      <>
      <LoadingOverlay 
      active = {isActive}
      spinner={<BounceLoader color={'#4071e1'}/>}
      >
      <Header/>
        <Container className=" mt--8" fluid>
            
          <Row>
              {ratecards.map(value=>(
                <Col lg="3" md="4" sm="6" xs="6">
              <Card className="card-stats mb-4 mb-xl-0" style={{cursor:"pointer"}} onClick={()=>props.history.push("/client/rate-card-details",
                  {title:value.title, id:value.id, card_details:value.card_details}
                  )}>
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            {value.title}
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            350,897
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fas fa-chart-bar" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <i className="fa fa-arrow-up" /> 3.48%
                        </span>{" "}
                        <span className="text-nowrap">Since last month</span>
                      </p>
                    </CardBody>
                  </Card>
              <br/>
            </Col>
              ))}
             
            </Row>
            <br/>
            <Row>
            <Col>
            <Button
            color="info"

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


export default RateCards;

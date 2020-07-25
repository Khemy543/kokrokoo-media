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
import { Link } from "react-router-dom";
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
  CardTitle
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";
import axios from "axios";

function CreatePublishedCompanies({history}) {
 const [media_houses, setMedia_houses] = React.useState([]);
 const [isActive, setIsActive] = React.useState(false);

 let media_id =localStorage.getItem('media_id');
 console.log(media_id);

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

 React.useEffect(()=>{
   setIsActive(true)
    axios.get("https://kokrokooad.herokuapp.com/api/view/"+media_id+"/published-companies",{
    headers:{ 'Authorization':`Bearer ${user}`}}
).then(res=>{
    console.log("media-houses:",res.data);
    setMedia_houses(res.data)
    setIsActive(false)
}).catch(error=>{
    console.log(error);
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
              {media_houses.map((value,index)=>(
                <Col lg="3" md="4" sm="6" xs="6">
            <Card className="card-stats mb-4 mb-xl-0" 
            onClick={()=>{console.log("me-d",value.id);history.push("/client/create-sub-rate-cards",{media_house_id:value.id, media_house_name:value.company_name})}}
            style={{cursor:"pointer"}}
            >
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            {value.company_name}
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
            </Col>
              ))}
            
          </Row>
          <br/>
          <Row>
              <Col>
              <Link to="/admin/create-subscription">
              <Button
              color="danger"
              
              >
              Back
                  </Button>
                 </Link> 
              </Col>
              
              </Row>
        </Container>
        </LoadingOverlay>
      </>
    );
  }


export default CreatePublishedCompanies;

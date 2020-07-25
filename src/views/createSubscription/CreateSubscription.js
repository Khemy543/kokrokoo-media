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
  Button
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";
import axios from "axios";

function CreateSubscription({history}){

const [media_types, setMedia_types] = React.useState([]);
const [media_id , setMedia_id] = React.useState(1);
const [isActive , setIsActive] = React.useState(false);

React.useEffect(()=>{
  setIsActive(true)
      axios.get("https://kokrokooad.herokuapp.com/api/media-types")
      .then(res=>{
          console.log(res.data);
          const media_types = res.data;
          setMedia_types(media_types);
          setIsActive(false)
      });
  },[])

  const pass_id=()=>{
    const meida_id = media_id;
    localStorage.setItem('media_id',media_id);
    history.push("/client/published-companies-create");
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
            <div className=" col">
              <Card className=" shadow">
                <CardHeader className=" bg-transparent">
                  <h3 className=" mb-0">SELECT MEDIA TYPES</h3>
                </CardHeader>
                <CardBody>
                  <Row className=" icon-examples">
                    
                      <Input type="select" value={media_id} onChange={e=>{setMedia_id(e.target.value); console.log(media_id)}}>
                      {media_types.map(value => <option key={value.id} value={value.id}>{value.mediaType}</option>)}
                      </Input>
                    <br/>
                    <br/>
                    <br/>
                      <Button
                      color="info"
                      type="submit"
                      onClick = {pass_id}
                      >
                      Next
                        </Button>
                        
                  </Row>
                </CardBody>
              </Card>
            </div>
          </Row>
        </Container>
        </LoadingOverlay>
      </>
    );
  }


export default CreateSubscription;

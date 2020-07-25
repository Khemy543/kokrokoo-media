
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
  Button,Form
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import axios from "axios";

function UploadFile(props){

  const [videoFile, setVideoFile] = React.useState(null);
  const [file_duration, setFile_duration] = React.useState(null);
  const [title, setTitle] =React.useState("");

  const pass=(e)=>{
    e.preventDefault()
    console.log(file_duration,videoFile);
    props.history.push("/client/calender",{file_duration:file_duration || null,videoFile:videoFile,rate_card:props.location.state, videoTitle:title})
  }

    return (
      <>
        <Header />
        {/* Page content */}
        <Container className=" mt--7" fluid>
          {/* Table */}
          <Row>
            <Col>
              <Card className=" shadow">
                <CardHeader className=" bg-transparent">
                  <h3 className=" mb-0">UPLOAD MEDIA FILE</h3>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={pass}>
                  <Row>
                    <Col md="8">
                    <Input placeholder="Enter Title" type="text" style={{width:"100%"}} value={title} onChange={e=>setTitle(e.target.value)} required/>
                    </Col>
                    
                  </Row>
                  <Row className=" icon-examples">
                    <Col md="8">
                        <Input
                          type="file"
                          onChange={e => {
                            const file = e.target.files[0];
                            setVideoFile(file);
                          }}
                        />
                        <br/>

                        {videoFile && (
                          <video
                            controls={true}
                            width="250"
                            onLoadedMetadata={e => {
                              setFile_duration(e.target.duration);
                            }}
                            required
                          >
                            <source src={URL.createObjectURL(videoFile)} 
                              type="video/mp4" />
                          </video>
                        )}
                        {file_duration && (
                          <div>
                            <p>
                              <code>Duration: {file_duration} sec</code>
                            </p>
                          </div>
                        )}
                        </Col>
                        <Col>
                        <Button
                          color="info"
                          type="submit"
                          >
                          Next
                        </Button>
                        </Col>
                        
                  </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
          
        </Container>
      </>
    );
  }



export default UploadFile;

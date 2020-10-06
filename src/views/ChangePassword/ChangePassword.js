import React from "react";
import {
    Container,Row,Col, Table, Input, Card, CardBody, Button, Form
} from "reactstrap";
import Header from "components/Headers/Header.js";

class ChangePassword extends React.Component{

    state={
        eye1:false,
        eye2:false,
        eye3:false
    }

    render(){
        return(
            <>
            <Header />
            <Container className="mt--7" fluid>
            <p
            style={{fontSize:"13px", fontWeight:500}}
            >Change Your Account <span style={{color:"red"}}>Password</span> Anytime.</p>
            <Row style={{marginTop:"30px"}}>
            <Col md="6" lg="6" sm="12" xs="12" className="ml-auto mr-auto">
                <Card className="card-plain shadow" style={{backgroundColor:"white", borderRadius:"0px"}}>
                    <CardBody>
                    <Form>
                        <h3>Change Password</h3>
                        <Row style={{marginTop:"20px"}}>
                        <Col>
                        <label>Password</label>
                        <Input type="password" placeholder="Old Password"/>
                        </Col>
                        </Row>

                        <Row style={{marginTop:"20px"}}>
                        <Col>
                        <label>New Password</label>
                        <Input type="password" placeholder="New Password"/>
                        </Col>
                        </Row>

                        <Row style={{marginTop:"20px"}}>
                        <Col>
                        <label>ReType Password</label>
                        <Input type="password" placeholder="Retype Password"/>
                        </Col>
                        </Row>

                        <Button type="submit" color="primary" style={{marginTop:"20px"}}>Change Password</Button>
                    </Form>
                    </CardBody>
                </Card>
            </Col>
            </Row>
            </Container>
            </>
        )
    }
}
export default ChangePassword;
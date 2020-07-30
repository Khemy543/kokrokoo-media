import React from "react";
import{
    Col,
    Card,
    CardBody,
    Row,
    Button, Spinner
} from "reactstrap";

function RateCard(props){
    const {id, rate_card_title, service_description} = props.ratecard
    return(
        <Col md="4" lg="4" sm="6" xs="6" style={{marginBottom:"20px"}}>
        <Card className="card-plain" style={{backgroundColor:"white", cursor:"pointer",boxShadow:"0 2px 12px rgba(0,0,0,0.1)"}}>
            <CardBody onClick={()=>{props.history.push("/media/ratecard-details",{rate_id:id})}}> 
                <Row>
                
                <Col>
                    <h3>{rate_card_title}</h3>
                    <h4>{service_description}</h4>
                </Col>
                </Row>
            </CardBody>
    </Card>
    </Col>
    )
}


export default RateCard;
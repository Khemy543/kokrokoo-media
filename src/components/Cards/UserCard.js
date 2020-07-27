import React from "react";
import{
    Col,
    Card,
    CardBody,
    Row,
    Button, Spinner
} from "reactstrap";

function UserCard(props){
       const {name, email, title, phone1, phone2, role,id } = props.user
    return(
        <Col md="6" style={{marginBottom:"20px"}}>
        <Card className="card-plain" style={{backgroundColor:"white", cursor:"pointer",boxShadow:"0 2px 12px rgba(0,0,0,0.1)"}}>
            <CardBody onClick={()=>{props.history.push("/media/admin-details",{admin_id:id})}}> 
                <Row>
                <Col md="8" sm="8" lg="8" xs="8">
                <h3>{name}</h3>
                <h4>{email}</h4>
                <h4>{phone1}</h4>
                <h4>{phone2}</h4>
                <p style={{fontSize:"13px",marginTop:"0px",marginBottom:"0px"}}>{title}</p>
                <p style={{fontSize:"13px",marginTop:"0px",marginBottom:"0px"}}>{role}</p>
                </Col>
                <Col md="4" sm="4" lg="4" xs="4">
                <div className="avatar">
                <img
                    alt="#"
                    className="img-circle img-no-padding img-responsive"
                    src={require("../../assets/img/new_logo.png")}
                    style={{border:"1px solid #eaeaea"}}
                />
                </div>
                </Col>
                </Row>
            </CardBody>
    </Card>
    </Col>
    )
}


export default UserCard;
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
        <Col md="4" lg="4" sm="6" xs="6" style={{marginBottom:"20px"}}>
        <Card className="card-plain shadow" style={{backgroundColor:"white", cursor:"pointer"}}>
            <CardBody onClick={()=>{props.history.push("/media/admin-details",{admin_id:id})}}> 
                <Row>
                
                <Col md="5" sm="5" lg="5" xs="5">
                <div className="avatar">
                <img
                    alt="#"
                    className="img-circle img-no-padding img-responsive"
                    src={require("../../assets/img/new_logo.png")}
                    style={{border:"1px solid #eaeaea"}}
                />
                </div>
                <h3 style={{textTransform:"uppercase"}}>{name}</h3>
                <p style={{fontSize:"13px",marginTop:"0px",marginBottom:"0px"}}>{title}</p>
                </Col>
                <Col md="7" sm="7" lg="7" xs="7" style={{textAlign:"right"}}>
                <h4>{email}</h4>
                <h4>{phone1}</h4>
                <h4>{phone2}</h4>
                <p style={{fontSize:"13px",marginTop:"0px",marginBottom:"0px"}}>{role}</p>
                </Col>
                </Row>
            </CardBody>
    </Card>
    </Col>
    )
}


export default UserCard;
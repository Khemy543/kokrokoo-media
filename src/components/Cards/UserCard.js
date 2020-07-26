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
        <Col md="6">
        <Card className="card-plain" style={{backgroundColor:"white", cursor:"pointer",boxShadow:"0 2px 12px rgba(0,0,0,0.1)"}}>
            <CardBody onClick={()=>{props.history.push("/media/admin-details",{admin_id:id})}}> 
                <h3>{name}</h3>
                <h4>{email}</h4>
                <h4>{phone1}</h4>
                <h4>{phone2}</h4>
                <p style={{fontSize:"13px",marginTop:"0px",marginBottom:"0px"}}>{title}</p>
                <p style={{fontSize:"13px",marginTop:"0px",marginBottom:"0px"}}>{role}</p>
            </CardBody>
    </Card>
    </Col>
    )
}


export default UserCard;
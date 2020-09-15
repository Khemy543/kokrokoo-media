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
  Spinner,
  Nav,NavItem,NavLink,TabContent,TabPane,Form,FormGroup,Label
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import LoadingOverlay from "react-loading-overlay";
import FadeLoader from "react-spinners/FadeLoader";
import axios from "axios";

let user =null;
let all_data = JSON.parse(localStorage.getItem('storageData'));
if(all_data !== null){
  user = all_data[0];
}

function CreateFromExisting(props) {
    const [isActive, setIsActive] = React.useState(false);
    const [isActiveSpinner, setIsActiveSpinner] = React.useState(false);
    const [titles, setTitles] = React.useState([]);
    const [id,setId] = React.useState(1)


    React.useEffect(()=>{
        setIsActiveSpinner(true)
        axios.get("https://media-kokrokooad.herokuapp.com/api/ratecard/get-existing-titles",
        {headers:{ 'Authorization':`Bearer ${user}`}})
        .then(res=>{
            console.log(res.data);
            setTitles(res.data.existing_titles);
            setIsActiveSpinner(false)
        })
        .catch(error=>{
            console.log(error)
        })
    },[])

    const pass=()=>{
        /* axios.post("https://media-kokrokooad.herokuapp.com/api/ratecard/1/create-from-existing",title,
        {headers:{ 'Authorization':`Bearer ${user}`}})
        .then(res=>{
            console.log(res.data);
        })
        .catch(error=>{
            console.log(error.response.data)
        }) */
        props.history.push("/media/new-title",{id:id});
    }
    

    
    return (
      <>
      <LoadingOverlay 
      active = {isActive}
      spinner={<FadeLoader color={'#4071e1'}/>}
      >
      <Header/>
        <Container className=" mt--8" fluid>
        {isActiveSpinner?
          <Row>
            <Col md="12" style={{textAlign:"center"}}>
             <h4>Please Wait <Spinner size="sm" style={{marginLeft:"5px"}}/></h4> 
            </Col>
          </Row>
          :
          <>
          <Row>
            <Col md="10" sm="12" lg="10" xl="10" xs="12">
            <p style={{fontSize:"13px", fontWeight:500}}
            >Create RateCard From Existing RateCards, Select A RateCard <span style={{color:"red"}}>Title</span></p>
            <Card className="shadow">
            <CardHeader className=" bg-transparent">
                  <h3 className=" mb-0">ENTER NEW TITLE</h3>
            </CardHeader>

            <CardBody>
            <Row>
                <Col md="12">
                <Input type="select" value={id} onChange={e=>setId(e.target.value)}>
                {titles.map((value)=>(
                    <option key={value.id} value={value.id}>{value.title}</option>
                ))}
                </Input>
                <br/> 
                    <Button
                    color="info"
                    onClick={pass}
                    >
                    Next
                    </Button>
                    </Col>
                </Row>
            </CardBody>    
            </Card>    
            </Col>
            </Row>
          </>
        }

        </Container>
        </LoadingOverlay>
      </>
    );
  }


export default CreateFromExisting;

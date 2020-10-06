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
  Nav,NavItem,NavLink,TabContent,TabPane
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import UserCard from "../../components/Cards/UserCard.js";
import LoadingOverlay from "react-loading-overlay";
import FadeLoader from "react-spinners/FadeLoader";
import axios from "axios";
import Pagination from "react-js-pagination";


let user = localStorage.getItem("access_token");
var domain = "https://media.test.backend.kokrokooad.com";

function ViewUsers({history}) {
    const [isActive, setIsActive] = React.useState(false);
    const [users, setUsers] = React.useState([]);

    React.useEffect(()=>{

        getUsers();
    },[])

    function getUsers(pageNumber=1){
        setIsActive(true);
      axios.get(`${domain}/api/super-admin/get-all/staff?page=${pageNumber}`,
      {headers:{ 'Authorization':`Bearer ${user}`}})
      .then(res=>{
          setUsers(res.data);
          setIsActive(false)
      })
      .catch(error=>{
      });
    }

    function renderUsers(){
        const {data, meta} = users;
        return(
        <React.Fragment>
        <Row>
            {console.log("data:",data)}
            {data && data.map(user=>{
            return<UserCard key={user.id} user={user} history={history}/>
        })}
        </Row>
        
        <Row style={{marginTop:'20px'}}>
        <Col md="10" className="ml-auto mr-auto">    
        <Pagination
        totalItemsCount={meta&&meta.total}
        activePage={meta&&meta.current_page}
        itemsCountPerPage={meta&&meta.per_page}
        onChange={(pageNumber)=>getUsers(pageNumber)}
        itemClass="page-item"
        linkClass="page-link"
        firstPageText="First"
        lastPageText = "Last"
        />
        </Col>
        </Row>
        </React.Fragment>
    )

    }
  
    
    return (
      <>
      <LoadingOverlay 
      active = {isActive}
      spinner={<FadeLoader color={'#4071e1'}/>}
      >
      <Header/>
        <Container className=" mt--7" fluid>
            
          <Row>
            <Col lg="12">
            {users && renderUsers()}
            </Col>
            </Row>
        </Container>
        </LoadingOverlay>
      </>
    );
  }


export default ViewUsers;

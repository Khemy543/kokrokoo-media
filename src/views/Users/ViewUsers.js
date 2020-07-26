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
  CardTitle,
  Nav,NavItem,NavLink,TabContent,TabPane
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import UserCard from "../../components/Cards/UserCard.js";
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";
import axios from "axios";
import Pagination from "react-js-pagination";
//require("bootstrap/less/bootstrap.less");


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

function ViewUsers({history}) {
    const [isActive, setIsActive] = React.useState(false);
    const [users, setUsers] = React.useState([]);

    React.useEffect(()=>{
        axios.get("https://media-kokrokooad.herokuapp.com/api/super-admin/get-all/staff",
        {headers:{ 'Authorization':`Bearer ${user}`}})
        .then(res=>{
            console.log(res.data)
        });
        getUsers();
    },[])

    function getUsers(pageNumber=1){
        setIsActive(true);
      axios.get("http://media-kokrokooad.herokuapp.com/api/super-admin/get-all/staff?page="+pageNumber+"",
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
      spinner={<BounceLoader color={'#4071e1'}/>}
      >
      <Header/>
        <Container className=" mt--7" fluid>
            
          <Row>
            <Col md="10">
            {users && renderUsers()}
            </Col>
            </Row>
        </Container>
        </LoadingOverlay>
      </>
    );
  }


export default ViewUsers;

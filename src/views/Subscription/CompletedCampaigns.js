import React from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
  Spinner
} from "reactstrap";


import Header from "components/Headers/Header.js";
import axios from "axios";
import Pagination from "react-js-pagination";

let user = localStorage.getItem("access_token");
var domain = "https://media.test.backend.kokrokooad.com";

function CompletedCampaigns (props){
  const [subscriptions, setSubscription] = React.useState([]);
  const [isActiveSpinner, setIsActiveSpinner] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [meta, setMeta] = React.useState([])

  React.useEffect(()=>{
    getSubscriptions()
  },[])

  function getSubscriptions(pageNumber=1){
    setIsActiveSpinner(true)
    axios.get(`${domain}/api/subscriptions/completed/subscription?page=${pageNumber}`,
    { headers: { 'Authorization': `Bearer ${user}` } })
    .then(res=>{
      console.log(res.data);
      setData(res.data.data)
      setMeta(res.data.meta)
      setIsActiveSpinner(false)
    })
    .catch(error=>{
      console.log(error)
    })
  }

  const getDetails=(id,payment_amount)=>{
    props.history.push("/media/completed-details",{id:id, payment_amount})
  }

    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
        {isActiveSpinner?
          <Row>
            <Col md="12" style={{textAlign:"center"}}>
             <h4>Please Wait <Spinner size="sm" style={{marginLeft:"5px"}}/></h4> 
            </Col>
          </Row>
          :
          <>
          {!isActiveSpinner && data.length<=0?
                <Row>
                <Col md="12" style={{textAlign:"center"}}>
                <h4>No Completed Campaigns</h4> 
                </Col>
              </Row>
              :
            <>
          <Row>
            <Col className="mb-5 mb-xl-0" lg="12">
            <Card>
              {/* <CardHeader>
                Show Entries
              </CardHeader> */}
              <CardBody style={{overflowX:"scroll"}}>
              <Table striped bordered>
                  <thead style={{backgroundColor:"#01a9ac",color:"black",height:""}}>
                    <tr>
                      <th>#</th>
                      <th>Campaign ID</th>
                      <th>Campaign Title</th>
                      <th>Rate Card</th>
                      <th>Date Created</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {data.map((value,index)=>(
                    <tr>
                      <th scope="row">{index +1}</th>
                      <td>{value.generated_id}</td>
                      <td>{value.title}</td>
                      <td>{value.rate_card_title}</td>
                      <td>{value.date}</td>
                      <td style={{textAlign:"center"}}>
                      <Button color="info" style={{borderRadius:"100%", padding:"2px 5px 2px 5px"}} onClick={()=>getDetails(value.id, value.payment_amount)}><i className="fa fa-eye"/></Button>
                      </td>
                    </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
              <CardBody>
              <Pagination
                totalItemsCount={meta&&meta.total}
                activePage={meta&&meta.current_page}
                itemsCountPerPage={meta&&meta.per_page}
                onChange={(pageNumber)=>getSubscriptions(pageNumber)}
                itemClass="page-item"
                linkClass="page-link"
                firstPageText="First"
                lastPageText = "Last"
                />
              </CardBody>
              {/* <CardFooter>
                Showing 1 to 5 of Entries
              </CardFooter>    */}
            </Card>  
            </Col>
          </Row>
          </>
          }
          </>
        }
        </Container>
      </>
    );
  }

export default CompletedCampaigns;

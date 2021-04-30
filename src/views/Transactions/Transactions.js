import React from "react";
import axios from "axios";

// reactstrap components
import {  Container, Row, Card, CardBody, CardFooter, Table, Col, Spinner,Button } from "reactstrap";

// core components
import Header from "components/Headers/Header.js";
import Pagination from "react-js-pagination";

let user =localStorage.getItem('access_token');
var domain = "https://media.test.backend.kokrokooad.com";
function Transactions(props) {
const [transactions, setTransactions] = React.useState([]);
const [isActive, setIsActive] = React.useState(true);
const [data, setData] = React.useState([]);

  React.useEffect(()=>{
    getTransactions();
  },[])

  function getTransactions(pageNumber=1){
    setIsActive(true)
    axios.get(`${domain}/api/all-subscriptions?page=${pageNumber}`,
    {headers:{ 'Authorization':`Bearer ${user}`}})
    .then(res=>{
        console.log(res.data);
        setTransactions(res.data);
        setData(res.data.data)
        setIsActive(false)
    })
    .catch(error=>{
        console.log(error);
        setIsActive(false);
        setTransactions([])
    })
}


  const {meta} = transactions
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className=" mt--9" fluid>
          {isActive?
            <Row>
                <Col md="12" style={{textAlign:"center"}}>
                <h4>Please Wait <Spinner size="sm" style={{marginLeft:"5px"}}/></h4> 
                </Col>
            </Row>
              :
            <>
              {!isActive && transactions.length<=0?
                <Row>
                <Col md="12" style={{textAlign:"center"}}>
                <h4>No Payment Made</h4> 
                </Col>
              </Row>
              :
            <>
            <p style={{fontSize:"13px", fontWeight:500}}
                >View Your Transactions.</p>
              <Row style={{marginTop:"20px"}}>
                <Col lg="12" md="12" xl="12" sm="12" xs="12">
                <Card style={{boxShadow:"0 2px 12px rgba(0,0,0,0.1)"}}>
                <CardBody style={{overflowX:"scroll"}}>
                <Table striped bordered>
                <thead style={{backgroundColor:"#01a9ac",color:"black"}}>
                <tr>
                  <th>#</th>
                  <th>Id</th>
                  <th>Currency</th>
                  <th>Total(Exclusive Of Tax)</th>
                  <th>Gross Total (Tax Inclusive)</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              {data.map((value,key)=>(
              <tr>
                    <td>{key+1}</td>
                    <td>{value.generated_id}</td>
                    <td>GHS</td>
                    <td>{value.payment_amount.campaign_total_amount_with_discount}</td>
                    <td>{value.payment_amount.campaign_grand_total_with_tax}</td>
                    <td>{value.status}</td>
                    <td><Button color="info" style={{borderRadius:"100%", padding:"2px 5px 2px 5px"}}
                    onClick={()=>props.history.push('/media/transaction-details',{
                      id:value.id, payment_amount:value.payment_amount
                    })}
                    ><i className="fa fa-eye"/></Button></td>
                    
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
                onChange={(pageNumber)=>getTransactions(pageNumber)}
                itemClass="page-item"
                linkClass="page-link"
                firstPageText="First"
                lastPageText = "Last"
                />
              </CardBody>
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

export default Transactions;

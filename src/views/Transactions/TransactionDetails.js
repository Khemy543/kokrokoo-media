import React from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Button,
  Col,Table,CardFooter,Spinner
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import axios from "axios";

let user =localStorage.getItem('access_token');
var domain = "https://media-backend.kokrokooad.com";

class TransactionDetails extends React.Component{

  state={
    isActive:false,
    cart:[],
    total:0,
    tax:0,
    grandTotal:0,
    user:[]
  }



  componentDidMount() {
    this.setState({isActive:true})
    let cart = this.props.location.state.cart;
    console.log("cart:",cart)
    let total =0;
    axios.all(cart.map(u => axios.get(`${domain}/api/subscription/${u.id}/details`,
    {headers:{ 'Authorization':`Bearer ${user}`}})))
      .then(axios.spread((...res) => {
        // all requests are now complete
        console.log(res);

        let newData = this.getSeparate(res);
        console.log("newData",newData);
        
        for(var i=0; i<cart.length; i++){
          total = total + cart[i].total_amount;
        }

        this.setState(() => {
          return {cart: newData, total:total }
        })

      }));

      axios.get(`${domain}/api/client`,{
      headers:{ 'Authorization':`Bearer ${user}`}
        }
        )
        .then(res=>{
        console.log(res.data);
        this.setState({user:res.data.user, isActive:false})
        });
  }

  getSeparate=(data)=>{
    let cart = this.props.location.state.cart;
    let newData = []
    for(var i=0; i<data.length;i++){
      newData.push({data:data[i].data, title:cart[i].title, total_amount:cart[i].total_amount})
    }
    return newData;
  }


  render(){
    const {name, email , title} = this.state.user;
  return (
    <>
        <Header />
        {/* Page content */}
        <Container className=" mt--8" fluid>
        {this.state.isActive?
        <Row>
            <Col md="12" style={{textAlign:"center"}}>
             <h4>Please Wait <Spinner size="sm" style={{marginLeft:"5px"}}/></h4> 
            </Col>
        </Row>
        :
        <Row>
            <Col md="12">
                <Card>
                    <CardHeader>
                      <Row>
                        <Col>
                          <img src={require("../../assets/img/brand/kokro-yellow.png")} alt="#" style={{height:"50px", width:"auto"}}/>
                        </Col>
                        <Col md="3" className="address">
                          <p>Kokrokoo Advertising Partners</p>
                          <p>P.O.BOX SK 2179</p>
                          <p>Sakumono</p>
                          <p>Ghana</p>
                        </Col>
                      </Row>
                    </CardHeader>
                    <CardBody style={{paddingTop:"0px"}}>
                        <Row style={{backgroundColor:"whitesmoke"}}>
                          <Col md="12" style={{marginBottom:"15px", marginTop:"15px"}}>
                            <h2 style={{marginBottom:"0px"}}>Invoice {this.props.location.state.generated_invoice_id}</h2>
                            <p style={{marginBottom:"0px", fontSize:"14px"}}>Invoice Date {this.props.location.state.created_at}</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="12" style={{marginBottom:"15px", marginTop:"15px"}} className="to-address">
                          <h3>Invoice To</h3>
                          <p>{name}</p>
                          <p style={{textTransform:"lowercase"}}>{email}</p>
                          <p>{title}</p>
                          </Col>
                        </Row>
                        {this.state.cart&&this.state.cart.map((thing,index)=>(
                          <div key={index}>
                          <h3 style={{textTransform:"capitalize"}}>Subscription Title - {thing.title}</h3>
                         
                        <Row  style={{marginBottom:"30px"}}>
                          <Col md="12">
                              <Table  bordered>
                              <thead style={{backgroundColor:"#01a9ac",color:"black",height:""}}>
                                <tr>
                                <td>#</td>
                                <td>duration</td>
                                <td>Rate</td>
                                <td>Selected Spots</td>
                                <td>Time Segment</td>
                                <td>Date</td>
                                <td>Amount</td>
                                </tr>
                                </thead>
                                <tbody>
                                {thing.data.map((item,key)=>(
                                  <>
                                {item.details.map((value,index)=>(
                                  <tr>
                                    <td>{index + 1}</td>
                                    <td>{value.duration.duration} {value.duration.unit.unit}</td>
                                    <td>{value.duration.rate}</td>
                                    <td>{value.selected_spots}</td>
                                    <td>{value.ratecard.start_time} - {value.ratecard.end_time}</td>
                                    <td>{item.selected_date} - {item.day.day}</td>
                                    <td>{Number(value.amount) * (item.no_of_weeks+1)}</td>
                                  </tr>
                                  ))}
                                 </>
                                ))}
                                <tr>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td style={{fontWeight:600}}>Total Amount - {thing.total_amount}</td>
                                </tr>
                                </tbody>
                            </Table>
                          </Col>
                        </Row>
                        </div>
                        ))}
                        
                        
                    </CardBody>
                    <CardFooter>
                        <Row>
                          <Col md="8">
                              <p style={{fontSize:"14px", fontWeight:600}}>Total Before Tax: GHS {this.state.total}</p>
                              <p style={{fontSize:"14px", fontWeight:600}}>VAT (12.5%) : GHS {this.state.total * 0.125}</p>
                              <p style={{fontSize:"14px", fontWeight:600}}>Total After VAT : GHS {this.state.total * 1.125}</p>
                              <p style={{fontSize:"14px", fontWeight:600}}>NHIL+GetFund (5%) : GHS {this.state.total * 1.125 * 0.05}</p>
                              <p style={{fontSize:"14px", fontWeight:600}}>Total After Tax: GHS {this.state.total * 1.125 * 1.05}</p>
                          </Col>
                          {/* <Col md="4">
                                  <Button
                                  color="info"
                                  onClick={()=>this.props.history.push("/client/payment/details",{amount:this.state.total * 1.175, email:email, cart_id:this.props.location.state.invoice.cart_id,
                                  invoice_id:this.props.location.state.invoice.generated_invoice_id
                                  })}
                                  >
                                    Proceed To Payment
                                  </Button>
                          </Col> */}
                        </Row>
                        </CardFooter>
                </Card>
            </Col>

        </Row>
        }
        </Container>
    </>
  );
}
}


export default TransactionDetails;

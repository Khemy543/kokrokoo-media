import React from "react";
import {
    Row,
    Col,
    Table,
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Button
} from "reactstrap";


class InvoiceCard extends React.Component{
 

    render(){
      console.log("props:",this.props)
        return(
            <>
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
                            <h2 style={{marginBottom:"0px"}}>Invoice {this.props.next.invoice.generated_invoice_id}</h2>
                            <p style={{marginBottom:"0px", fontSize:"14px"}}>Invoice Date {this.props.next.invoice.created_at}</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="12" style={{marginBottom:"15px", marginTop:"15px"}} className="to-address">
                          <h3>Invoice To</h3>
                          <p>{this.props.data.user.name}</p>
                          <p style={{textTransform:"lowercase"}}>{this.props.data.user.email}</p>
                          </Col>
                        </Row>
                        {this.props.data.cart&&this.props.data.cart.map((thing,index)=>(
                        <div key={index}>
                        <Row  style={{marginBottom:"30px"}}>
                          <Col md="12">
                          {thing.company.media_type !== "Print"?
                              <Table  bordered>
                              <thead>
                              <tr>
                                <td style={{fontSize:"14px",fontWeight:"bold"}} colspan="6">Campaign Title - {thing.title}<br/>
                                Media House : {thing.company.media_house}<br/>
                                Media Type : {thing.company.media_type}<br/>
                                Ratecard Service : {thing.rate_card_title.title}</td>
                              </tr>
                              </thead>
                                <thead style={{backgroundColor:"#01a9ac",color:"black",height:""}}>
                                <tr>
                                <td>duration</td>
                                <td>Rate</td>
                                <td>Selected Spots</td>
                                <td>Time Segment</td>
                                <td>Date</td>
                                <td>Amount</td>
                                </tr>
                                </thead>
                                <tbody>
                                {thing.subscriptions.map((item,key)=>(
                                  <>
                                {item.details.map((value,index)=>(
                                  <tr>
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
                                  <td colSpan="6">
                                    Total Amount : {thing.total_amount.campaign_total_amount_without_discount}<br/>
                                    Discount : {thing.total_amount.discount_amount}<br/>
                                    Total Amount With Discount : {thing.total_amount.campaign_total_amount_with_discount}
                                  </td>
                                </tr>
                                </tbody>
                            </Table>
                            :
                            <Table  bordered>
                              <thead>
                              <tr>
                                <td style={{fontSize:"14px",fontWeight:"bold"}} colspan="6">Campaign Title - {thing.title}<br/>
                                Media House : {thing.company.media_house}<br/>
                                Media Type : {thing.company.media_type}<br/>
                                Ratecard Service : {thing.rate_card_title.title}</td>
                              </tr>
                              </thead>
                              <thead style={{backgroundColor:"#01a9ac",color:"black",height:""}}>
                                <tr>
                                <td>Size</td>
                                <td>Page Section</td>
                                <td>Cost</td>
                                <td>Date</td>
                                <td>Amount</td>
                                </tr>
                                </thead>
                                <tbody>
                                {thing.subscriptions.map((item,key)=>(
                                  <>
                                  {item.details.map((value,index)=>(
                                  <tr>
                                    <td>{value.ratecard.size}</td>
                                    <td>{value.ratecard.page_section}</td>
                                    <td>{value.ratecard.cost}</td>
                                    <td>{item.selected_date} - {item.day.day}</td>
                                    <td>{Number(value.ratecard.cost) * (item.no_of_weeks+1)}</td>
                                  </tr>
                                  ))}
                                </>
                                ))}
                                <tr>
                                  <td colSpan="6">
                                    Total Amount : {thing.total_amount.campaign_total_amount_without_discount}<br/>
                                    Discount : {thing.total_amount.discount_amount}<br/>
                                    Total Amount With Discount : {thing.total_amount.campaign_total_amount_with_discount}
                                  </td>
                                </tr>
                                </tbody>
                            </Table>
                            }
                          </Col>
                        </Row>
                        </div>
                        ))}
                        
                        
                    </CardBody>
                    <CardBody>
                        <Row>
                          <Col md="8">
                              <p style={{fontSize:"14px", fontWeight:600}}>Total Before Tax: GHS {this.props.data.total}</p>
                              <p style={{fontSize:"14px", fontWeight:600}}>VAT (12.5%) : GHS {(this.props.data.total * 0.125).toFixed(2)}</p>
                              <p style={{fontSize:"14px", fontWeight:600}}>Total After VAT : GHS {(this.props.data.total * 1.125).toFixed(2)}</p>
                              <p style={{fontSize:"14px", fontWeight:600}}>GetFund (2.5%) : GHS {(this.props.data.total * 1.125 * 0.025).toFixed(2)}</p>
                              <p style={{fontSize:"14px", fontWeight:600}}>NHIL (2.5%) : GHS {(this.props.data.total * 1.125 * 0.025).toFixed(2)}</p>
                              <p style={{fontSize:"14px", fontWeight:600}}>Total After Tax: GHS {(this.props.data.total * 1.125 * 1.05).toFixed(2)}</p>
                          </Col>
                        </Row>
                        </CardBody>
                </Card>
            </Col>
            </>
        )
    };
}

export default InvoiceCard;
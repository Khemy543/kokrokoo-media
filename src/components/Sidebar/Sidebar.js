
import React from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";
import axios from "axios";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  ModalHeader,
  ModalBody,
  Modal,
  ModalFooter
} from "reactstrap";
import {RateConsumer} from "../../context.js";

let user = localStorage.getItem('access_token')
var domain = "https://media.test.backend.kokrokooad.com";

class Sidebar extends React.Component {
  state = {
    collapseOpen: false,
    dashboardCollapse:true,
    subscriptionsCollapse:false,
    transactionCollapse:false,
    rateCollapse:false,
    reportCollapse:false,
    userCollapse:false,
    profileCollapse:false,
    volumeCollapse:false,
    paymentCollapse:false,
    published:localStorage.getItem('published'),
    modal:false,
    message:"",
    messageModal:false
  };
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  // toggles collapse between opened and closed (true/false)
  toggleCollapse = () => {
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };
  // closes the collapse
  closeCollapse = () => {
    this.setState({
      collapseOpen: false
    });
  };

  //toggle dashboard
  toggleDashboardCollapse=()=>{
    this.setState({
      dashboardCollapse:!this.state.dashboardCollapse,
      subscriptionsCollapse:false,
      transactionCollapse:false,
      rateCollapse:false,
      reportCollapse:false,
      userCollapse:false,
      profileCollapse:false,
      volumeCollapse:false,
      paymentCollapse:false
    })
  }

  toggleSubscriptionCollapse=()=>{
    this.setState({
      subscriptionsCollapse:!this.state.subscriptionsCollapse,
      dashboardCollapse:false,
      transactionCollapse:false,
      rateCollapse:false,
      reportCollapse:false,
      userCollapse:false,
      profileCollapse:false,
      volumeCollapse:false,
      paymentCollapse:false
    })
  }
  toggleTransCollapse=()=>{
    this.setState({
      transactionCollapse:!this.state.transactionCollapse,
      subscriptionsCollapse:false,
      dashboardCollapse:false,
      rateCollapse:false,
      reportCollapse:false,
      userCollapse:false,
      profileCollapse:false,
      volumeCollapse:false,
      paymentCollapse:false
    })
  }
  toggleRateCollapse=()=>{
    this.setState({
      rateCollapse:!this.state.rateCollapse,
      subscriptionsCollapse:false,
      transactionCollapse:false,
      dashboardCollapse:false,
      reportCollapse:false,
      userCollapse:false,
      profileCollapse:false,
      volumeCollapse:false,
      paymentCollapse:false

    })
  }
  toggleReportCollapse=()=>{
    this.setState({
      reportCollapse:!this.state.reportCollapse,
      subscriptionsCollapse:false,
      transactionCollapse:false,
      rateCollapse:false,
      dashboardCollapse:false,
      userCollapse:false,
      profileCollapse:false,
      volumeCollapse:false,
      paymentCollapse:false

    })
  }
  toggleUserCollapse=()=>{
    this.setState({
      userCollapse:!this.state.userCollapse,
      subscriptionsCollapse:false,
      transactionCollapse:false,
      rateCollapse:false,
      reportCollapse:false,
      dashboardCollapse:false,
      profileCollapse:false,
      volumeCollapse:false,
      paymentCollapse:false

    })
  }

  toggleProfile=()=>{
    this.setState({
      profileCollapse:!this.state.profileCollapse,
      subscriptionsCollapse:false,
      transactionCollapse:false,
      rateCollapse:false,
      reportCollapse:false,
      userCollapse:false,
      dashboardCollapse:false,
      volumeCollapse:false,
      paymentCollapse:false

    })
  }

  toggleVolumeCollapse=()=>{
    this.setState({
      profileCollapse:false,
      subscriptionsCollapse:false,
      transactionCollapse:false,
      rateCollapse:false,
      reportCollapse:false,
      userCollapse:false,
      dashboardCollapse:false,
      volumeCollapse:!this.state.volumeCollapse,
      paymentCollapse:false


    })
  }
  togglePaymentCollapse=()=>{
    this.setState({
      profileCollapse:false,
      subscriptionsCollapse:false,
      transactionCollapse:false,
      rateCollapse:false,
      reportCollapse:false,
      userCollapse:false,
      dashboardCollapse:false,
      volumeCollapse:false,
      paymentCollapse:!this.state.paymentCollapse


    })
  }
  // creates the links that appear in the left menu / Sidebar
  createDashboardLinks = routes => {
    return routes.map((prop, key) => {
      if(prop.invisible){
        return null
      }
      else if(prop.header === "dashboard"){
      return (
        <NavItem key={key}>
          <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={this.closeCollapse}
            activeClassName="active"
            style={{fontSize:"14px", fontWeight:600, color:"white"}}
          >
          <i className = "fa fa-chevron-right" style={{fontSize:"10px"}}/>
            {prop.name}
          </NavLink>
        </NavItem>
      )
    }
    })
  }
  createSubLinks = routes => {
    return routes.map((prop, key) => {
      if(prop.invisible){
        return null
      }
      else if(prop.header === "subscriptions"){
      return (
        <NavItem>
          <NavLink
          key={key}
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={this.closeCollapse}
            activeClassName="active"
            style={{fontSize:"14px", fontWeight:600,color:"white"}}
          >
          <i className = "fa fa-chevron-right" style={{fontSize:"10px"}}/>
            {prop.name}
          </NavLink>
          </NavItem>
      )
    }
    })
  }

  createTransLinks = routes => {
    return routes.map((prop, key) => {
      if(prop.invisible){
        return null
      }
      else if(prop.header === "transactions"){
      return (
        <NavItem key={key}>
          <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={this.closeCollapse}
            activeClassName="active"
            style={{fontSize:"14px", fontWeight:600,color:"white"}}
          >
          <i className = "fa fa-chevron-right" style={{fontSize:"10px"}}/>
            {prop.name}
          </NavLink>
        </NavItem>
      )
    }
    })
  }

  createRateLinks = routes => {
    return routes.map((prop, key) => {
      if(prop.invisible){
        return null
      }
      else if(prop.header === "rate"){
      return (
        <NavItem key={key}>
          <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={this.closeCollapse}
            activeClassName="active"
            style={{fontSize:"14px", fontWeight:600,color:"white"}}
          >
          <i className = "fa fa-chevron-right" style={{fontSize:"10px"}}/>
            {prop.name}
          </NavLink>
        </NavItem>
      )
    }
    })
  }

  createUserLinks = routes => {
    return routes.map((prop, key) => {
      if(prop.invisible){
        return null
      }
      else if(prop.header === "user"){
      return (
        <NavItem key={key}>
          <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={this.closeCollapse}
            activeClassName="active"
            style={{fontSize:"14px", fontWeight:600,color:"white"}}
          >
          <i className = "fa fa-chevron-right" style={{fontSize:"10px"}}/>
            {prop.name}
          </NavLink>
        </NavItem>
      )
    }
    })
  }

  createReportLinks = routes => {
    return routes.map((prop, key) => {
      if(prop.invisible){
        return null
      }
      else if(prop.header === "report"){
      return (
        <NavItem key={key}>
          <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={this.closeCollapse}
            activeClassName="active"
            style={{fontSize:"14px", fontWeight:600,color:"white"}}
          >
          <i className = "fa fa-chevron-right" style={{fontSize:"10px"}}/>
            {prop.name}
          </NavLink>
        </NavItem>
      )
    }
    })
  }
  createProfileRoutes = routes => {
    return routes.map((prop, key) => {
      if(prop.invisible){
        return null
      }
      else if(prop.header === "profile"){
      return (
        <NavItem key={key}>
          <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={this.closeCollapse}
            activeClassName="active"
            style={{fontSize:"14px", fontWeight:600,color:"white"}}
          >
          <i className = "fa fa-chevron-right" style={{fontSize:"10px"}}/>
            {prop.name}
          </NavLink>
        </NavItem>
      )
    }
    })
  }

  createVolumeRoutes = routes => {
    return routes.map((prop, key) => {
      if(prop.invisible){
        return null
      }
      else if(prop.header === "volume"){
      return (
        <NavItem key={key}>
          <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={this.closeCollapse}
            activeClassName="active"
            style={{fontSize:"14px", fontWeight:600,color:"white"}}
          >
          <i className = "fa fa-chevron-right" style={{fontSize:"10px"}}/>
            {prop.name}
          </NavLink>
        </NavItem>
      )
    }
    })
  }

  createPaymentRoutes = routes => {
    return routes.map((prop, key) => {
      if(prop.invisible){
        return null
      }
      else if(prop.header === "payment"){
      return (
        <NavItem key={key}>
          <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={this.closeCollapse}
            activeClassName="active"
            style={{fontSize:"14px", fontWeight:600,color:"white"}}
          >
          <i className = "fa fa-chevron-right" style={{fontSize:"10px"}}/>
            {prop.name}
          </NavLink>
        </NavItem>
      )
    }
    })
  }



  handlePublish=()=>{
    axios.post(`${domain}/api/super-admin/publish-company`,null,
    {headers:{ 'Authorization':`Bearer ${user}`}})
    .then(res=>{
      console.log(res.data);
      if(res.data.status === "Company is live already" || res.data.status === "Turned services on"){
        this.setState({published:true,messageModal:true, message:res.data.status});
        setTimeout(
          function() {
              this.setState({ messageModal: false });
          }
          .bind(this),
          1500
      );
      }
    })
    .catch(error=>{
      console.log(error.response.data)
    })
  }
  
  handleUnPublish=()=>{
    this.setState({modal:false})
    axios.post(`${domain}/api/super-admin/unpublish-company`,null,
    {headers:{ 'Authorization':`Bearer ${user}`}})
    .then(res=>{
      console.log(res.data);
      if(res.data.status === "Turned services off" || res.data.status ==="Services are already off"){
        this.setState({published:false,messageModal:true, message:res.data.status});
        setTimeout(
          function() {
              this.setState({ messageModal: false });
          }
          .bind(this),
          1500
      );
  
      }
    })
    .catch(error=>{
      console.log(error.response.data)
    })
  }

  render() {
    const { bgColor, routes, logo } = this.props;
    let navbarBrandProps;
    if (logo && logo.innerLink) {
      navbarBrandProps = {
        to: logo.innerLink,
        tag: Link
      };
    } else if (logo && logo.outterLink) {
      navbarBrandProps = {
        href: logo.outterLink,
        target: "_blank"
      };
    }
    return (
      <Navbar
        className="navbar-vertical fixed-left navbar-light"
        expand="md"
        id="sidenav-main"
        style={{backgroundColor:"#404E67"}}
      >
        <Container fluid>
          {/* Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={this.toggleCollapse}
          >
            <span className="navbar-toggler-icon" />
          </button>
          {/* Brand */}
          {logo ? (
            <NavbarBrand className="pt-0" {...navbarBrandProps}>
              <img
                alt={logo.imgAlt}
                className="navbar-brand-img"
                src={logo.imgSrc}
              />
            </NavbarBrand>
          ) : null}
          {/* User */}
          <Nav className="align-items-center d-md-none">
            <UncontrolledDropdown nav>
              <DropdownToggle nav className="nav-link-icon">
                <i className="ni ni-bell-55" />
              </DropdownToggle>
              <DropdownMenu
                aria-labelledby="navbar-default_dropdown_1"
                className="dropdown-menu-arrow"
                right
              >
                <DropdownItem>Action</DropdownItem>
                <DropdownItem>Another action</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Something else here</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav>
              <DropdownToggle nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src={require("assets/img/theme/team-1-800x800.jpg")}
                    />
                  </span>
                </Media>
              </DropdownToggle>
              <RateConsumer>
                {value=>(
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </DropdownItem>
                <DropdownItem  tag={Link} to="/media/user-profile">
                  <i className="ni ni-single-02" />
                  <span>My profile</span>
                </DropdownItem>
                {!this.state.published?
                  <DropdownItem onClick={()=>{this.handlePublish()}}>
                    <i className="fa fa-bell-o" />
                    <span>Publish</span>
                  </DropdownItem>
                  :
                  <DropdownItem onClick={()=>this.setState({modal:true})}>
                    <i className="fa fa-bell-slash-o" />
                    <span>Unpublish</span>
                  </DropdownItem>
                  }
                <DropdownItem divider />
                <DropdownItem onClick={()=>value.logout()}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            )}
            </RateConsumer>
            </UncontrolledDropdown>
            
          </Nav>
            <Modal isOpen={this.state.modal}>
            <ModalBody>
              Do you want to Unpublish Company?
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={()=>{this.handleUnPublish()}}>Yes</Button>
              <Button color="info" onClick={()=>this.setState({moda:false})}>No</Button>
            </ModalFooter>
            </Modal>
            <Modal isOpen={this.state.messageModal}>
            <ModalHeader style={{borderBottom:"1px solid rgb(64 78 103 / 30%)"}}>
              Message
            </ModalHeader>
              <ModalBody style={{textAlign:"center"}}>
                {this.state.message}
              </ModalBody>

            </Modal>
          {/* Collapse */}
          <Collapse navbar isOpen={this.state.collapseOpen}>
            {/* Collapse header */}
            <div className="navbar-collapse-header d-md-none">
              <Row>
                {logo ? (
                  <Col className="collapse-brand" xs="6">
                    {logo.innerLink ? (
                      <Link to={logo.innerLink}>
                        <img alt={logo.imgAlt} src={logo.imgSrc} />
                      </Link>
                    ) : (
                      <a href={logo.outterLink}>
                        <img alt={logo.imgAlt} src={logo.imgSrc} />
                      </a>
                    )}
                  </Col>
                ) : null}
                <Col className="collapse-close" xs="6">
                  <button
                    className="navbar-toggler"
                    type="button"
                    onClick={this.toggleCollapse}
                  >
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            {/* Form */}
            <Form className="mt-4 mb-3 d-md-none">
              <InputGroup className="input-group-rounded input-group-merge">
                <Input
                  aria-label="Search"
                  className="form-control-rounded form-control-prepended"
                  placeholder="Search"
                  type="search"
                />
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <span className="fa fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Form>
            <h4>Navigations</h4>
            <hr className="my-3" />
            {/*<Nav navbar>{this.createLinks(routes)}</Nav> */}

            <Nav navbar>
              <NavItem onClick={this.toggleDashboardCollapse}>
                <NavLink style={{fontSize:"14px", fontWeight:600, cursor:"pointer",color:"white"}}>
                <i className="fa fa-home"/>Dashboard{/* <i className = {this.state.dashboardCollapse?"fa fa-chevron-down":"fa fa-chevron-right"} style={{fontSize:"10px",textAlign:"right",float:"right"}}/> */}
                </NavLink>
              </NavItem>
              <Collapse isOpen={this.state.dashboardCollapse}>
                {this.createDashboardLinks(routes)} 
              </Collapse>

              <NavItem onClick={this.toggleRateCollapse}>
                <NavLink style={{fontSize:"14px", fontWeight:600, cursor:"pointer",color:"white"}}>
                <i className="fa fa-eye"/>Rate Cards
                </NavLink>
              </NavItem>
              <Collapse isOpen={this.state.rateCollapse}>
                {this.createRateLinks(routes)}
                </Collapse> 

                <NavItem onClick={this.toggleSubscriptionCollapse}>
                <NavLink style={{fontSize:"14px", fontWeight:600, cursor:"pointer",color:"white"}}>
                <i className="fa fa-briefcase"/>Campaigns
                </NavLink>
              </NavItem>
              <Collapse isOpen={this.state.subscriptionsCollapse}>
                {this.createSubLinks(routes)}
                </Collapse>

                <NavItem onClick={this.toggleTransCollapse}>
                <NavLink style={{fontSize:"14px", fontWeight:600, cursor:"pointer",color:"white"}}>
                <i className="fa fa-credit-card"/>Transactions
                </NavLink>
              </NavItem>
              <Collapse isOpen={this.state.transactionCollapse}>
                {this.createTransLinks(routes)}
                </Collapse> 

                <NavItem onClick={this.toggleVolumeCollapse}>
                <NavLink style={{fontSize:"14px", fontWeight:600, cursor:"pointer",color:"white"}}>
                <i className="fa fa-thumbs-down"/>Volume Discount
                </NavLink>
              </NavItem>
              <Collapse isOpen={this.state.volumeCollapse}>
                {this.createVolumeRoutes(routes)}
                </Collapse> 

                <NavItem onClick={this.togglePaymentCollapse}>
                <NavLink style={{fontSize:"14px", fontWeight:600, cursor:"pointer",color:"white"}}>
                <i className="fa fa-money"/>Payment
                </NavLink>
              </NavItem>
              <Collapse isOpen={this.state.paymentCollapse}>
                {this.createPaymentRoutes(routes)}
                </Collapse> 


              {/* <NavItem onClick={this.toggleReportCollapse}>
                <NavLink style={{fontSize:"14px", fontWeight:600, cursor:"pointer",color:"white"}}>
                <i className="fa fa-book"/>Report
                </NavLink>
              </NavItem>
              <Collapse isOpen={this.state.reportCollapse}>
                {this.createReportLinks(routes)}
                </Collapse> */} 

              <NavItem onClick={this.toggleUserCollapse}>
                <NavLink style={{fontSize:"14px", fontWeight:600, cursor:"pointer",color:"white"}}>
                <i className="fa fa-users"/>Users
                </NavLink>
              </NavItem>
              <Collapse isOpen={this.state.userCollapse}>
                {this.createUserLinks(routes)}
                </Collapse>  

                <NavItem onClick={this.toggleProfile}>
                <NavLink style={{fontSize:"14px", fontWeight:600, cursor:"pointer",color:"white"}}>
                <i className="fa fa-cog"/>Settings
                </NavLink>
              </NavItem>
              <Collapse isOpen={this.state.profileCollapse}>
                {this.createProfileRoutes(routes)}
                </Collapse>

            </Nav>
            {/* Divider */}
            <hr className="my-3" />
           
            {/* Navigation */}
            
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

Sidebar.defaultProps = {
  routes: [{}]
};

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired
  })
};

export default Sidebar;

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
/*eslint-disable*/
import React from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";

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
  Progress,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";

var ps;

class Sidebar extends React.Component {
  state = {
    collapseOpen: false,
    dashboardCollapse:true,
    subscriptionsCollapse:false,
    transactionCollapse:false,
    rateCollapse:false,
    reportCollapse:false,
    userCollapse:false,
    profileCollapse:false
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
    this.setState({dashboardCollapse:!this.state.dashboardCollapse})
  }

  toggleSubscriptionCollapse=()=>{
    this.setState({subscriptionsCollapse:!this.state.subscriptionsCollapse})
  }
  toggleTransCollapse=()=>{
    this.setState({transactionCollapse:!this.state.transactionCollapse})
  }
  toggleRateCollapse=()=>{
    this.setState({rateCollapse:!this.state.rateCollapse})
  }
  toggleReportCollapse=()=>{
    this.setState({reportCollapse:!this.state.reportCollapse})
  }
  toggleUserCollapse=()=>{
    this.setState({userCollapse:!this.state.userCollapse})
  }

  toggleProfile=()=>{
    this.setState({profileCollapse:!this.state.profileCollapse})
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
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </DropdownItem>
                <DropdownItem  tag={Link} to="/media/user-profile">
                  <i className="ni ni-single-02" />
                  <span>My profile</span>
                </DropdownItem>
                <DropdownItem to="/media/user-profile" tag={Link}>
                  <i className="ni ni-settings-gear-65" />
                  <span>Settings</span>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
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
                <i className="fa fa-briefcase"/>Subscriptions
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

              <NavItem onClick={this.toggleReportCollapse}>
                <NavLink style={{fontSize:"14px", fontWeight:600, cursor:"pointer",color:"white"}}>
                <i className="fa fa-book"/>Report
                </NavLink>
              </NavItem>
              <Collapse isOpen={this.state.reportCollapse}>
                {this.createReportLinks(routes)}
                </Collapse> 

              <NavItem onClick={this.toggleUserCollapse}>
                <NavLink style={{fontSize:"14px", fontWeight:600, cursor:"pointer",color:"white"}}>
                <i className="fa fa-users"/>Users
                </NavLink>
              </NavItem>
              <Collapse isOpen={this.state.userCollapse}>
                {this.createUserLinks(routes)}>
                </Collapse>  

                <NavItem onClick={this.toggleProfile}>
                <NavLink style={{fontSize:"14px", fontWeight:600, cursor:"pointer",color:"white"}}>
                <i className="fa fa-user"/>Profile
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

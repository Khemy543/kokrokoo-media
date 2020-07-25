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
//import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import history from "./history";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
//import AuthLayout from "layouts/Auth.js";
import Login from "./views/examples/Login.js";
import "./index.css";


class App extends React.Component{
  render(){
    return(
  <BrowserRouter history={history}>
    <Switch>
      <Route path="/media" render={props => <AdminLayout {...props} />} />
      <Route exact path="/" component = {Login}/>
      <Redirect from="/homepage" to="/media/index" />
    </Switch>
  </BrowserRouter>
);
}}
export default App;
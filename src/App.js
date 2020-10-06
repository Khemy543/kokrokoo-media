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
import "assets/scss/argon-dashboard-react.scss";

import "font-awesome/css/font-awesome.css";
import "font-awesome/less/font-awesome.less";
import AdminLayout from "layouts/Admin.js";
import Login from "./views/examples/Login.js";
import ProtectedLoginRoute from "./ProtectedLoginRoute.js";
import "./index.css";
import ForgetPassword from "views/PasswordReset/ForgetPassword";


class App extends React.Component{
  render(){
    return(
  <BrowserRouter history={history}>
    <Switch>
      <Route path="/media" render={props => <AdminLayout {...props} history={history}/>} />
      <ProtectedLoginRoute exact path="/" component = {Login}/>
      <Route exact path="/auth/forget-password" component={ForgetPassword} />
      <Redirect from="/homepage" to="/media/index" />
    </Switch>
  </BrowserRouter>
);
}}
export default App;
import React from "react";
import axios from "axios";
import decode from "jwt-decode";

const RateContext = React.createContext();

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

class RateProvider extends React.Component{

    state={
        cart:[]
    }

    componentDidMount(){
       this.isTokenExpired();/* 
       localStorage.clear(); */
    }

    isTokenExpired() {
        try {
            const decoded = decode(user);
            if (decoded.exp < Date.now() / 1000) { // Checking if token is expired.
                localStorage.clear();
            }
        }
        catch (err) {
            return false;
        }
    }

    render(){
        return(
            <RateContext.Provider value={{
                ...this.state
            }}>
            {this.props.children}
            </RateContext.Provider>
        );
    }
}

const RateConsumer = RateContext.Consumer;



export {RateProvider,RateConsumer};
import React from "react";
import axios from "axios";

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
        axios.get("https://kokrokooad.herokuapp.com/api/all-subscriptions",{headers:{'Authorization':`Bearer ${user}`}})
        .then(res=>{
            console.log("mysubs:",res.data.data);
            this.setState({cart:res.data.data})
        })
        .catch(error=>{
            console.log(error);
        })
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
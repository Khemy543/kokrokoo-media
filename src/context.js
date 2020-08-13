import React from "react";
import axios from "axios";
import decode from "jwt-decode";
import LoadingOverlay from "react-loading-overlay";
import FadeLoader from "react-spinners/FadeLoader";

const RateContext = React.createContext();

let user =1;
let all_data = JSON.parse(localStorage.getItem('storageData'));
console.log("all_data:", all_data);
if(all_data !== null){
  user = all_data[0];
}

class RateProvider extends React.Component{

    state = {
        cart:[]
    };

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


    //check invalid token
   /*  checkToken=()=>{
        axios.get("https://media-kokrokooad.herokuapp.com/api/user",{
        headers:{ 'Authorization':`Bearer ${user}`}})
        .then(res=>{
            console.log(res.data)
        })
        .catch(error=>{
            if(!error.response){
                alert("please check your internet connection")
            }
            else{
            console.log(error.response.status);
            if(error.response.status === 401){
                localStorage.clear();
                window.location.reload("/")
            }
            } 
        })
    } */

    logout=()=>{
        this.setState({isActive:true});
        axios.post("https://media-kokrokooad.herokuapp.com/api/user/logout",null,
        {headers:{ 'Authorization':`Bearer ${user}`}})
        .then(res=>{
            console.log(res.data);
            if(res.data.status === "logout success"){
                localStorage.clear();
                window.location.reload("/")
            }
        })
        .catch(error=>{
            console.log(error);
        })
    }

    render(){
        return(
            <RateContext.Provider value={{
                ...this.state,
                logout:this.logout
            }}>
            <LoadingOverlay 
            active = {this.state.isActive}
            spinner={<FadeLoader color={'#4071e1'}/>}
            >
            {this.props.children}
            </LoadingOverlay>
            </RateContext.Provider>
        );
    }
}

const RateConsumer = RateContext.Consumer;



export {RateProvider,RateConsumer};
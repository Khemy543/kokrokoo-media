import React from "react";
import axios from "axios";
import decode from "jwt-decode";
import LoadingOverlay from "react-loading-overlay";
import FadeLoader from "react-spinners/FadeLoader";

const RateContext = React.createContext();

/* axios.interceptors.request.use(request=>{
    console.log(request);
    return request;
  })
  
  
  axios.interceptors.response.use(
      response=>{
    console.log(response);
    return response;
  },
  error=>{
      console.log(error);
      if(!error.response){
          alert("Please Check Your Internet Connection")
      }
  }) */

  
  let user = localStorage.getItem("access_token");
  var domain = "https://media-backend.kokrokooad.com";

class RateProvider extends React.Component{

    state = {
        cart:[],
        modal:false,
        media_type:null
    };

    componentDidMount(){
       this.isTokenExpired();/* 
       localStorage.clear(); */

       axios.get(`${domain}/api/company-profile`,{
        headers:{ 'Authorization':`Bearer ${user}`}
            })
            .then(res=>{
            console.log(res.data)
              this.setState({media_type:res.data.media_type.mediaType});
              localStorage.setItem("media_type",res.data.media_type.mediaType)
          })
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



    logout=()=>{
        axios.post(`${domain}/api/user/logout`,null,
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
               {/*  <Modal isOpen={this.state.modal}>
                    <ModalHeader>
                    {this.state.message}
                    </ModalHeader>
                    <ModalFooter>
                    <Button color="danger" onClick={()=>this.setState({modal:false})}>
                    close
                    </Button>
                    </ModalFooter>
                </Modal> */}
            </RateContext.Provider>
        );
    }
}

const RateConsumer = RateContext.Consumer;



export {RateProvider,RateConsumer};
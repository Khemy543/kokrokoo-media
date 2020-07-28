import React from 'react'
import { Route,Redirect } from 'react-router-dom';

class ProtectedLoginRoute extends React.Component {

    render() {
        const Component = this.props.component;
        const path = this.props.path;
        
        const isAuthenticated = localStorage.getItem('storageData')
        
        if(isAuthenticated !== null){
            return (
                <Redirect to={{ pathname: '/media/index' }} />
        )} 
        else{
        return(
            <Route path ={path} component={Component} />
        )}
    }
}

export default ProtectedLoginRoute;  
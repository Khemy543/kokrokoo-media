import React from 'react'
import { Route,Redirect } from 'react-router-dom';

class ProtectedRoute extends React.Component {

    render() {
        console.log("protected:", this.props.key)
        const Component = this.props.component;
        const path = this.props.path;
        const key = this.props.key;
        const isAuthenticated = localStorage.getItem('access_token')
        
        if(isAuthenticated === null){
            return (
                <Redirect to={{ pathname: '/' }} />
        )} 
        else{
        return(
            <Route 
            path={path}
            component={Component}
            key={key}
           />
        )}
    }
}

export default ProtectedRoute;  
import React from 'react'
import { Redirect, Route } from 'react-router-dom';

export default function AuthRoute(props) {
    const checkLoggedIn = () => {
        if(localStorage.getItem("jwtToken") != null){
            return <Route {...props}/>
        }else{
            return <Redirect to="/login"/>
        }
    }

    return (
        <>
            {checkLoggedIn()}
        </>
    )
}
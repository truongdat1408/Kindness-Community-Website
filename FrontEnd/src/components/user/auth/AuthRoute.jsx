import React from 'react'
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function AuthRoute(props) {
    const user = useSelector(state => state.auth.user);
    const checkLoggedIn = () => {
        if(localStorage.getItem("jwtToken") != null){
            // const user = use(state => state.auth.user);
            if(user.roles.includes("ROLE_ADMIN") || user.roles.includes("ROLE_MOD"))
                return <Route {...props}/>
            else
                return <Redirect to="/"/>
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


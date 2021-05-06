import { Button } from '@material-ui/core';
import {auth, provider} from './Firebase';
import React from 'react';
import './Login.css'

const Login = () => {
    const login =() => {
        auth.signInWithPopup(provider).catch((error) => alert(error.message))

    }
    return (
        <div className="login">
            <div className="login_logo">
            <img src="https://icon-library.com/images/mess-icon/mess-icon-28.jpg" alt=""/>
            <h1>iMessage</h1>
            </div>
            <Button onClick={login}>Sign in</Button>
        </div>
    );
};

export default Login;
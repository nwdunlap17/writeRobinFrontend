import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class LoginButton extends Component {

    checkForLogin = () => {
        if (localStorage.getItem('auth_token') && localStorage.getItem('auth_token') !== 'null'){
            return (<p>{localStorage.getItem('user')}</p>)
        } else {
            return (<Link to={'/login'}>Login</Link>)
        }
    }

    render(){
        return this.checkForLogin()
    }
}
import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

class SignInForm extends Component{
        constructor(props){
        super(props)
        this.state = {username: '', password: ''}
    }

    updateUsername = event => {
        this.setState({username: event.target.value})
    }

    updatePassword = event => {
        this.setState({password: event.target.value})
    }
    
    submitLogin = event => {
        event.preventDefault()
        fetch(`${this.props.backendURL}/login`,{
            method: "POST",
            headers:{
                // 'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            }) 
        })
        .then(resp => resp.json())
        .then(json => {
            localStorage.setItem('auth_token',json.token)
            localStorage.setItem('user',json.username)
            this.props.updateUserName(this.state.username)
        })
    }

    render(){

        let redirect = (localStorage.getItem('auth_token') && localStorage.getItem('auth_token') !== 'null')? <Redirect to='/home'/> : null
        return (
            <div>
            <form onSubmit={this.submitLogin}>
                <p>Username:</p>
                <input type='text' value={this.state.username} onChange={this.updateUsername}></input>
                <p>Password:</p>
                <input type='password' value={this.state.password} onChange={this.updatePassword}></input>
                <button type='submit'>Login</button>
            </form>
            {redirect}
            </div>
    )   }
}

export default SignInForm;

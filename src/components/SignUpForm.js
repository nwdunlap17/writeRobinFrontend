import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

class SignUpForm extends Component{
        constructor(){
        super()
        this.state = {username: '', password: '', password2: '', failed: false, redirect: false}
    }

    updateUsername = event => {
        this.setState({username: event.target.value})
    }

    updatePassword = event => {
        this.setState({password: event.target.value})
    }
    updatePassword2 = event => {
        this.setState({password2: event.target.value})
    }
    
    submitLogin = event => {
        event.preventDefault()
        if (this.state.password !== this.state.password2){
            window.alert('Passwords must match.');
            return
        }
        fetch(`${this.props.backendURL}/users`,{
            method: "POST",
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                user: {
                username: this.state.username,
                password: this.state.password
                }
            }) 
        })
        .then(res => res.json())
        .then(json => { 
            console.log('setting new credentials', json)
            if (json.message === 'success'){
                localStorage.setItem('auth_token',json.token)
                localStorage.setItem('user',json.username)
                this.props.updateUserName(this.state.username)
                this.setState({redirect: true})
            }
            else {
                this.setState({failed: true})
            }
         })
    }

    render(){
        return (
            <form onSubmit={this.submitLogin}>
                {this.state.failed?
                <div class="alert alert-danger" role="alert">
                    That username is already taken!
                </div> : null}
                {this.state.redirect? <Redirect to='/home'/> : null}


                <p>Username:</p>
                <input type='text' value={this.state.username} onChange={this.updateUsername}></input>
                <p>Password:</p>
                <input type='password' value={this.state.password} onChange={this.updatePassword}></input>
                <p>Confirm Password:</p>
                <input type='password' value={this.state.password2} onChange={this.updatePassword2}></input>
                <button type='submit'>Sign Up</button>
            </form>
    )   }
}

export default SignUpForm;
